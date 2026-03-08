
-- Seed team members
INSERT INTO public.posts (title, content, excerpt, category, image_url, metadata, sort_order, published) VALUES
('Marcus ''The Pixel Bandit''', 'Notorious for stealing ordinary footage and transforming it into extraordinary visual experiences. Approach with caution - carries dangerous levels of creative vision and technical expertise.', 'ARMED CREATIVE ROBBERY', 'team', '', '{"bounty": "$8,500", "rotation": "rotate-3", "mustacheStyle": "artistic"}'::jsonb, 1, true),
('Sofia ''The Frame Thief''', 'Wanted for stealing impossible creative briefs and turning them into award-winning masterpieces. Armed with strategic thinking and dangerous levels of project management skills.', 'GRAND THEFT OF IMAGINATION', 'team', '', '{"bounty": "$6,200", "rotation": "rotate-2", "mustacheStyle": "handlebar"}'::jsonb, 2, true),
('Jake ''The Render Rogue''', 'Ringleader of rendering crimes, orchestrating elaborate computational operations. Wanted for leading sophisticated processing schemes that push hardware beyond its limits.', 'MASTERMINDING TECHNICAL HEISTS', 'team', '', '{"bounty": "$11,800", "rotation": "rotate-2", "mustacheStyle": "thick"}'::jsonb, 3, true),
('Maya ''The Code Crusher''', 'Wanted for conjuring flawless code from chaotic requirements using forbidden programming magic. Known to transform complex problems into elegant solutions with mysterious technical powers.', 'DIGITAL WIZARDRY & ALGORITHM SORCERY', 'team', '', '{"bounty": "$9,300", "rotation": "-rotate-2", "mustacheStyle": "curly"}'::jsonb, 4, true),
('Connor ''The Digital Desperado''', 'Mastermind behind revolutionary content creation operations. Wanted for disrupting traditional production methods and making competitors question their entire approach.', 'PRODUCTION WITH INTENT TO AMAZE', 'team', '', '{"bounty": "$13,700", "rotation": "rotate-1", "mustacheStyle": "villainous"}'::jsonb, 5, true),
('Zara ''The Motion Maverick''', 'Notorious for crafting motion graphics so smooth they defy the laws of physics. Armed with After Effects mastery and a dangerous eye for kinetic perfection.', 'ANIMATION MANIPULATION & EFFECT FORGERY', 'team', '', '{"bounty": "$7,900", "rotation": "-rotate-1", "mustacheStyle": "artistic"}'::jsonb, 6, true),
('Leo ''The Effect Enforcer''', 'A nomadic visual effects outlaw who drifts from project to project, leaving behind a trail of jaw-dropping composites and impossible cinematic magic. Master of the digital realm.', 'WANDERING VFX SYNTHESIS SCHEMES', 'team', '', '{"bounty": "$10,400", "rotation": "rotate-3", "mustacheStyle": "handlebar"}'::jsonb, 7, true);

-- Seed services
INSERT INTO public.posts (title, content, excerpt, category, image_url, metadata, sort_order, published) VALUES
('Campaign & Ad Content', 'Multi-platform video campaigns ready for every channel—YouTube, TikTok, Instagram, and beyond.', 'Campaign & Ad Content', 'service', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&auto=format', '{"color": "accent-emerald", "rotation": "rotate-2"}'::jsonb, 1, true),
('Brand Films & Stories', 'Cinematic brand videos that capture your essence and connect with audiences on an emotional level.', 'Brand Films & Stories', 'service', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop&auto=format', '{"color": "accent-blue", "rotation": "-rotate-1"}'::jsonb, 2, true),
('Trailers & Promos', 'High-impact teasers that hook viewers instantly—perfect for launches, events, and announcements.', 'Trailers & Promos', 'service', 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=300&fit=crop&auto=format', '{"color": "accent-purple", "rotation": "rotate-1"}'::jsonb, 3, true),
('Short-Form Films', 'Festival-ready mini-movies up to 5 minutes—ideal for investors, events, and premium content.', 'Short-Form Films', 'service', 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=300&fit=crop&auto=format', '{"color": "accent-emerald", "rotation": "-rotate-2"}'::jsonb, 4, true),
('Animation & Motion', 'Stylized animated content that explains complex ideas without needing live actors.', 'Animation & Motion', 'service', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop&auto=format', '{"color": "accent-blue", "rotation": "rotate-3"}'::jsonb, 5, true),
('Social Content', 'Thumb-stopping vertical videos delivered in batches to keep your feed consistently engaging.', 'Social Content', 'service', 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=300&fit=crop&auto=format', '{"color": "accent-purple", "rotation": "-rotate-1"}'::jsonb, 6, true);

-- Seed awards
INSERT INTO public.posts (title, content, excerpt, category, image_url, metadata, sort_order, published) VALUES
('Best Film Award', 'Best Film category recognition', 'Best Film', 'award', '', '{"variant": "light"}'::jsonb, 1, true),
('Audience Choice', 'Audience voted favorite', 'Audience Choice', 'award', '', '{"variant": "light"}'::jsonb, 2, true),
('Innovation Award', 'Innovation in filmmaking', 'Innovation', 'award', '', '{"variant": "light"}'::jsonb, 3, true),
('Directors Choice', 'Selected by panel of directors', 'Directors Choice', 'award', '', '{"variant": "dark"}'::jsonb, 4, true),
('Excellence Award', 'Overall excellence in production', 'Excellence', 'award', '', '{"variant": "dark"}'::jsonb, 5, true),
('Rising Talent', 'Emerging creative talent recognition', 'Rising Talent', 'award', '', '{"variant": "light"}'::jsonb, 6, true);

-- Seed portfolio item
INSERT INTO public.posts (title, content, excerpt, category, image_url, metadata, sort_order, published) VALUES
('The Lonely Journey', 'A powerful commercial exploring the isolation that startup founders face and how joining Hampton''s community can transform that journey. This piece captures the emotional weight of entrepreneurship and the relief that comes with finding your tribe.', 'Our latest commercial for Hampton - exploring the lonely journey of startup founders and the power of community.', 'portfolio', '', '{"video_url": "https://www.youtube.com/embed/fIbDWDh6aYw?rel=0&showinfo=0&modestbranding=1", "client": "Hampton", "tag": "Commercial", "details": {"industry": "Community Platform", "style": "Narrative Drama", "tone": "Emotional Journey", "format": "Digital Commercial"}}'::jsonb, 1, true);
