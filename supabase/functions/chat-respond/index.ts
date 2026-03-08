import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, agent_id, session_id } = await req.json()
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Save user message
    await supabase.from('chat_messages').insert({
      session_id,
      role: 'user',
      content: message,
      agent_id: agent_id || 'default',
      command: message.startsWith('/') ? message.split(' ')[0] : null,
    })

    // Parse command
    const isCommand = message.startsWith('/')
    const parts = message.trim().split(/\s+/)
    const cmd = parts[0]?.toLowerCase()
    const args = parts.slice(1).join(' ')

    let responseContent = ''

    if (isCommand) {
      // Fetch command definition
      const { data: cmdDef } = await supabase
        .from('chat_commands')
        .select('*')
        .eq('command', cmd)
        .single()

      if (!cmdDef) {
        responseContent = `Unknown command: ${cmd}. Type /help for available commands.`
      } else {
        switch (cmd) {
          case '/help': {
            const { data: allCmds } = await supabase
              .from('chat_commands')
              .select('command, description')
              .order('sort_order')
            const cmdList = (allCmds || [])
              .map(c => `  ${c.command.padEnd(12)} ${c.description}`)
              .join('\n')
            responseContent = cmdDef.response_template.replace('{{commands}}', cmdList)
            break
          }

          case '/status': {
            const { count } = await supabase
              .from('posts')
              .select('*', { count: 'exact', head: true })
              .eq('published', true)
            responseContent = cmdDef.response_template
              .replace('{{agent}}', agent_id || 'default')
              .replace('{{session}}', session_id?.slice(0, 8) || 'unknown')
              .replace('{{post_count}}', String(count || 0))
            break
          }

          case '/about': {
            responseContent = cmdDef.response_template
            break
          }

          case '/agent': {
            if (!args) {
              responseContent = 'Usage: /agent <name> — available: default, amy, claude, dot, goose, letta'
            } else {
              responseContent = cmdDef.response_template.replace('{{target}}', args)
            }
            break
          }

          case '/posts': {
            const { data: posts } = await supabase
              .from('posts')
              .select('title, category, slug')
              .eq('published', true)
              .order('created_at', { ascending: false })
              .limit(10)
            const postList = (posts || [])
              .map(p => `  [${p.category}] ${p.title}`)
              .join('\n')
            responseContent = cmdDef.response_template.replace('{{posts}}', postList || 'No entries found.')
            break
          }

          case '/search': {
            if (!args) {
              responseContent = 'Usage: /search <query>'
            } else {
              const { data: results } = await supabase
                .from('posts')
                .select('title, excerpt, slug')
                .eq('published', true)
                .or(`title.ilike.%${args}%,content.ilike.%${args}%,excerpt.ilike.%${args}%`)
                .limit(5)
              const resultList = (results || [])
                .map(r => `  ▸ ${r.title}${r.excerpt ? '\n    ' + r.excerpt : ''}`)
                .join('\n')
              responseContent = cmdDef.response_template
                .replace('{{query}}', args)
                .replace('{{results}}', resultList || 'No matching entries.')
            }
            break
          }

          case '/clear': {
            responseContent = cmdDef.response_template
            break
          }

          default:
            responseContent = cmdDef.response_template
        }
      }
    } else {
      // Free-text message — echo back with agent flavor for now
      const agentFlavors: Record<string, string> = {
        default: `Received: "${message}". Try /help for available commands.`,
        amy: `Darling, I heard you say "${message}". How quaint. Try /help if you need guidance.`,
        claude: `Interesting query: "${message}". Let me dig deeper... For now, try /help.`,
        dot: `> echo "${message}"\n> command not found. Run /help for valid commands.`,
        goose: `🍹 "${message}" — that's a vibe, but try /help for actual commands!`,
        letta: `Your words drift through the dream: "${message}"... Perhaps /help can guide you.`,
      }
      responseContent = agentFlavors[agent_id || 'default'] || agentFlavors.default
    }

    // Save system response
    await supabase.from('chat_messages').insert({
      session_id,
      role: 'system',
      content: responseContent,
      agent_id: agent_id || 'default',
      command: isCommand ? cmd : null,
    })

    return new Response(JSON.stringify({ response: responseContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
