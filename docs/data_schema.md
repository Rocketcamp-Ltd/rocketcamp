-- 1. Create tables
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
email TEXT UNIQUE NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
name TEXT,
surname TEXT,
settings JSONB DEFAULT '{}'::JSONB
);

CREATE TABLE courses (
id SERIAL PRIMARY KEY,
title TEXT NOT NULL,
subtitle TEXT,
description TEXT,
cover TEXT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE lessons (
id SERIAL PRIMARY KEY,
course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
title TEXT NOT NULL,
description TEXT,
cover TEXT NOT NULL,
steps JSONB DEFAULT '[]'::JSONB,
order_index INTEGER NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE course_categories (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
alias TEXT UNIQUE NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE course_categories_relation (
id SERIAL PRIMARY KEY,
course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
category_id INTEGER REFERENCES course_categories(id) ON DELETE CASCADE,
UNIQUE(course_id, category_id)
);

CREATE TABLE user_course_progress (
id SERIAL PRIMARY KEY,
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
progress INTEGER DEFAULT 0,
is_bookmarked BOOLEAN DEFAULT FALSE,
is_completed BOOLEAN DEFAULT FALSE,
last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
UNIQUE(user_id, course_id)
);

CREATE TABLE user_lesson_progress (
id SERIAL PRIMARY KEY,
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
progress INTEGER DEFAULT 0,
is_done BOOLEAN DEFAULT FALSE,
current_step INTEGER DEFAULT -1,
visible_steps INTEGER[] DEFAULT '{}',
completed_steps INTEGER[] DEFAULT '{}',
last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
UNIQUE(user_id, lesson_id)
);

CREATE TABLE user_onboarding (
id SERIAL PRIMARY KEY,
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
is_completed BOOLEAN DEFAULT FALSE,
answers JSONB DEFAULT '{}'::JSONB,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert sample data
-- Categories
INSERT INTO course_categories (name, alias) VALUES
('Management', 'management'),
('Programming', 'programming'),
('Data Science', 'data-science'),
('Digital Marketing', 'digital-marketing'),
('Design', 'design'),
('Business', 'business'),
('Personal Development', 'personal-development'),
('Finance', 'finance'),
('Language Learning', 'language-learning'),
('Health & Wellness', 'health-wellness');

-- Courses
INSERT INTO courses (title, subtitle, description, cover) VALUES
('Course 1', 'Subtitle 1', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 2', 'Subtitle 2', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 3', 'Subtitle 3', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 4', 'Subtitle 4', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 5', 'Subtitle 5', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 6', 'Subtitle 6', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 7', 'Subtitle 7', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 8', 'Subtitle 8', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 9', 'Subtitle 9', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400'),
('Course 10', 'Subtitle 10', 'Body text for your whole article or post. We''ll put in some lorem ipsum to show how a filled-out page might look: Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400');

-- Lessons
INSERT INTO lessons (course_id, title, description, cover, order_index, steps) VALUES
(1, 'Lesson 1', 'The staff in a chain of three busy coffee shops feel stressed and overworked. We''ll use transaction data to help them keep up with customer demand.', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400', 1,
'[
{
"id": 1,
"cover": "https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400",
"coverAnnotation": "cover annotation",
"text": "It looks like Store 11 has the most need. But demand for coffee is not constant throughout the day, so it would be helpful to see how this varies over time. Which visualization would you choose for this?",
"isDone": false,
"component": null
},
{
"id": 2,
"cover": "https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400",
"coverAnnotation": "cover annotation",
"text": "Which visualization would you choose for this?",
"isDone": false,
"component": {
"type": "selectedButtons",
"items": [
{ "id": 1, "label": "item 1" },
{ "id": 2, "label": "item 2" }
]
}
},
{
"id": 3,
"cover": "https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400",
"coverAnnotation": "cover annotation",
"text": "text 224gwrgwrg lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
"isDone": false,
"component": {
"type": "radioButtons",
"items": [
{ "id": 1, "label": "item 1" },
{ "id": 2, "label": "item 2" }
]
}
}
]'),
(1, 'Lesson 2', 'descr 2', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400', 2, '[]'),
(1, 'Lesson 3', 'descr 3', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400', 3, '[]'),
(1, 'Lesson 4', 'descr 4', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400', 4, '[]'),
(1, 'Lesson 5', 'descr 5', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400', 5, '[]'),
(2, 'Lesson 1', 'descr 1', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400', 1, '[]'),
(2, 'Lesson 2', 'descr 2', 'https://assets-prd.ignimgs.com/2022/08/02/lord-of-the-rings-slideshow-1659474667014.jpg?width=1400', 2, '[]');

-- Course-Category Relations
INSERT INTO course_categories_relation (course_id, category_id) VALUES
(1, 1), -- Course 1 is in Management
(1, 6), -- Course 1 is in Business
(2, 2), -- Course 2 is in Programming
(3, 3), -- Course 3 is in Data Science
(4, 4), -- Course 4 is in Digital Marketing
(5, 5), -- Course 5 is in Design
(6, 6), -- Course 6 is in Business
(7, 7), -- Course 7 is in Personal Development
(8, 8), -- Course 8 is in Finance
(9, 9), -- Course 9 is in Language Learning
(10, 10); -- Course 10 is in Health & Wellness

-- 3. Configure Row-Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_categories_relation ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read all courses and categories
CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
CREATE POLICY "Lessons are viewable by everyone" ON lessons FOR SELECT USING (true);
CREATE POLICY "Categories are viewable by everyone" ON course_categories FOR SELECT USING (true);
CREATE POLICY "Category relations are viewable by everyone" ON course_categories_relation FOR SELECT USING (true);

-- Users can only read, update their own progress
CREATE POLICY "Users can view their own progress" ON user_course_progress
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_course_progress
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_course_progress
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Similar policies for lesson progress
CREATE POLICY "Users can view their own lesson progress" ON user_lesson_progress
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson progress" ON user_lesson_progress
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson progress" ON user_lesson_progress
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view and update their own profile
CREATE POLICY "Users can view their own profile" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
FOR UPDATE USING (auth.uid() = id);

-- Users can manage their own onboarding data
CREATE POLICY "Users can view their own onboarding" ON user_onboarding
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding" ON user_onboarding
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding" ON user_onboarding
FOR INSERT WITH CHECK (auth.uid() = user_id);
