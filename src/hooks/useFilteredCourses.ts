import { useState, useEffect } from 'react';
import { useClient } from '@/lib/useClient';
import type { Course, CourseCategory } from '@/types/courses';

interface UseFilteredCoursesOptions {
  limit?: number;
  initialCategories?: number[];
}

interface UseFilteredCoursesResult {
  courses: { [key: string]: Course[] };
  categories: CourseCategory[];
  selectedCategories: CourseCategory[];
  setSelectedCategories: (categories: CourseCategory[]) => void;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;
  loadMore: () => void;
}

export function useFilteredCourses({
  limit = 10,
  initialCategories = []
}: UseFilteredCoursesOptions = {}): UseFilteredCoursesResult {
  const supabase = useClient();
  
  const [courses, setCourses] = useState<{ [key: string]: Course[] }>({});
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CourseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(limit);
  const [totalCount, setTotalCount] = useState(0);
  
  // Fetch categories on initial load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('course_categories')
          .select('*')
          .order('name');
          
        if (error) throw error;
        
        setCategories(data);
        
        // If initial categories are provided, set them as selected
        if (initialCategories.length > 0) {
          const initialSelected = data.filter(cat => initialCategories.includes(cat.id));
          setSelectedCategories(initialSelected);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      }
    };
    
    fetchCategories();
  }, [supabase, initialCategories.join(',')]);
  
  // Fetch courses when selected categories change or display limit changes
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let query = supabase.from('courses').select('*', { count: 'exact' });
        
        // If categories are selected, filter by them
        if (selectedCategories.length > 0) {
          const categoryIds = selectedCategories.map(cat => cat.id);
          
          // Get course IDs for the selected categories
          const { data: relationData, error: relationError } = await supabase
            .from('course_categories_relation')
            .select('course_id')
            .in('category_id', categoryIds);
            
          if (relationError) throw relationError;
          
          if (relationData && relationData.length > 0) {
            // Get unique course IDs (a course might be in multiple categories)
            const courseIds = [...new Set(relationData.map(rel => rel.course_id))];
            query = query.in('id', courseIds);
          } else {
            // No courses match these categories
            setCourses({});
            setTotalCount(0);
            setIsLoading(false);
            return;
          }
        }
        
        // Add pagination and sorting
        query = query.order('title').limit(displayLimit);
        
        const { data: coursesData, error: coursesError, count } = await query;
        
        if (coursesError) throw coursesError;
        if (count !== null) setTotalCount(count);
        
        // Get user progress if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        let formattedCourses: Course[] = [];
        
        if (user) {
          // Fetch progress for authenticated user
          const { data: progressData, error: progressError } = await supabase
            .from('user_course_progress')
            .select('*')
            .eq('user_id', user.id);
            
          if (progressError) throw progressError;
          
          // Format courses with progress
          formattedCourses = coursesData.map(course => {
            const userProgress = progressData?.find(p => p.course_id === course.id);
            return {
              id: course.id,
              title: course.title,
              subtitle: course.subtitle,
              cover: course.cover,
              progress: userProgress?.progress || 0
            };
          });
        } else {
          // Format courses without progress
          formattedCourses = coursesData.map(course => ({
            id: course.id,
            title: course.title,
            subtitle: course.subtitle,
            cover: course.cover,
            progress: 0
          }));
        }
        
        // Group courses by first letter of title for display
        const groupedCourses: { [key: string]: Course[] } = {};
        
        formattedCourses.forEach(course => {
          const firstLetter = course.title.charAt(0).toUpperCase();
          if (!groupedCourses[firstLetter]) {
            groupedCourses[firstLetter] = [];
          }
          groupedCourses[firstLetter].push(course);
        });
        
        setCourses(groupedCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [supabase, selectedCategories, displayLimit]);
  
  const loadMore = () => {
    setDisplayLimit(prevLimit => prevLimit + limit);
  };
  
  const hasMore = totalCount > displayLimit;
  
  return {
    courses,
    categories,
    selectedCategories,
    setSelectedCategories,
    isLoading,
    error,
    totalCount,
    hasMore,
    loadMore
  };
}