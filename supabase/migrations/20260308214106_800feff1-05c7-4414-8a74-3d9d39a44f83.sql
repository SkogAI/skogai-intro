
-- Chat messages table for persistent conversation history
CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL DEFAULT gen_random_uuid()::text,
  role text NOT NULL CHECK (role IN ('user', 'system')),
  content text NOT NULL,
  agent_id text NOT NULL DEFAULT 'default',
  command text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Chat commands registry
CREATE TABLE public.chat_commands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command text NOT NULL UNIQUE,
  description text NOT NULL,
  action_type text NOT NULL CHECK (action_type IN ('navigation', 'query', 'system')),
  response_template text NOT NULL,
  agent_overrides jsonb DEFAULT '{}'::jsonb,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS: chat_messages readable/writable by anyone (no auth yet)
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read chat messages" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Anyone can insert chat messages" ON public.chat_messages FOR INSERT WITH CHECK (true);

-- RLS: chat_commands readable by anyone, managed by admins
ALTER TABLE public.chat_commands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read commands" ON public.chat_commands FOR SELECT USING (true);
CREATE POLICY "Admins can manage commands" ON public.chat_commands FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Seed default commands
INSERT INTO public.chat_commands (command, description, action_type, response_template, sort_order) VALUES
  ('/help', 'Show available commands', 'system', 'Available commands:\n{{commands}}', 1),
  ('/status', 'Show system status', 'system', '⟐ System nominal. Agent: {{agent}}. Session: {{session}}. Entries indexed: {{post_count}}.', 2),
  ('/about', 'About the SkogAI lore system', 'system', 'SkogAI Lore Repository — the memory system that preserves stories, experiments, brilliant failures, and evolutionary leaps. Built with intention.', 3),
  ('/agent', 'Switch active agent (usage: /agent amy)', 'navigation', 'Switching agent to {{target}}...', 4),
  ('/posts', 'List recent lore entries', 'query', 'Recent entries:\n{{posts}}', 5),
  ('/search', 'Search lore entries (usage: /search <query>)', 'query', 'Search results for "{{query}}":\n{{results}}', 6),
  ('/clear', 'Clear terminal history', 'system', 'Terminal cleared.', 7);
