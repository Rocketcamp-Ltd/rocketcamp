import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClient } from '@/lib/useClient';
import { RoutePath, AppRoutes } from '@/app/router/config';

export function useOnboarding() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const supabase = useClient();
  const hasCheckedRef = React.useRef(false);

  useEffect(() => {
    // Проверяем только один раз за сеанс
    if (hasCheckedRef.current) return;
    
    const checkOnboardingStatus = async () => {
      setIsLoading(true);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsOnboardingComplete(false);
        setIsLoading(false);
        return;
      }

      // Check if user has completed onboarding
      try {
        // Don't use .single() to avoid PGRST116 error
        const { data, error } = await supabase
          .from('user_onboarding')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error checking onboarding status:', error);
          setIsOnboardingComplete(false);
        } else if (data && data.length > 0) {
          // User has an onboarding record
          setIsOnboardingComplete(data[0].is_completed || false);
        } else {
          // No onboarding record, create one
          const { error: insertError } = await supabase
            .from('user_onboarding')
            .insert({ 
              user_id: user.id, 
              is_completed: false,
              answers: '{}' 
            });
            
          if (insertError) {
            console.error('Error creating onboarding record:', insertError);
          }
            
          setIsOnboardingComplete(false);
        }
      } catch (err) {
        console.error('Error in onboarding check:', err);
        setIsOnboardingComplete(false);
      } finally {
        hasCheckedRef.current = true;
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [supabase]);
  const redirectToOnboarding = () => {
    navigate(RoutePath[AppRoutes.AUTH_ONBOARDING]);
  };

  const completeOnboarding = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    try {
      // Check if the record exists first
      const { data } = await supabase
        .from('user_onboarding')
        .select('id')
        .eq('user_id', user.id);
        
      if (data && data.length > 0) {
        // Update existing record
        await supabase
          .from('user_onboarding')
          .update({ 
            is_completed: true,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
      } else {
        // Insert new record
        await supabase
          .from('user_onboarding')
          .insert({ 
            user_id: user.id, 
            is_completed: true,
            updated_at: new Date().toISOString(),
            answers: '{}'
          });
      }

      setIsOnboardingComplete(true);
    } catch (error) {
      console.error('Error updating onboarding status:', error);
    }
  };

  return { 
    isOnboardingComplete, 
    isLoading, 
    redirectToOnboarding, 
    completeOnboarding 
  };
}