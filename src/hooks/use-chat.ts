import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface ChatMessage {
  id: string
  role: 'user' | 'system'
  content: string
  agent_id: string
  command: string | null
  created_at: string
}

interface ChatCommand {
  command: string
  description: string
  action_type: string
}

export function useChat(agentId: string, onAgentChange?: (agentId: string | null) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [commands, setCommands] = useState<ChatCommand[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const sessionIdRef = useRef<string>(
    localStorage.getItem('lore-chat-session') || crypto.randomUUID()
  )

  // Persist session id
  useEffect(() => {
    localStorage.setItem('lore-chat-session', sessionIdRef.current)
  }, [])

  // Load commands
  useEffect(() => {
    supabase
      .from('chat_commands')
      .select('command, description, action_type')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setCommands(data)
      })
  }, [])

  // Load history for this session
  useEffect(() => {
    supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionIdRef.current)
      .order('created_at', { ascending: true })
      .limit(100)
      .then(({ data }) => {
        if (data) setMessages(data as ChatMessage[])
      })
  }, [])

  const sendMessage = useCallback(async (message: string) => {
    const trimmed = message.trim()
    if (!trimmed) return

    // Handle /clear locally
    if (trimmed === '/clear') {
      setMessages([])
      return
    }

    // Optimistic user message
    const optimisticMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      agent_id: agentId,
      command: trimmed.startsWith('/') ? trimmed.split(' ')[0] : null,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, optimisticMsg])
    setIsLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke('chat-respond', {
        body: {
          message: trimmed,
          agent_id: agentId,
          session_id: sessionIdRef.current,
        },
      })

      if (error) throw error

      const responseMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'system',
        content: data.response,
        agent_id: agentId,
        command: trimmed.startsWith('/') ? trimmed.split(' ')[0] : null,
        created_at: new Date().toISOString(),
      }
      setMessages(prev => [...prev, responseMsg])

      // Handle /agent navigation command
      if (trimmed.startsWith('/agent ') && onAgentChange) {
        const target = trimmed.split(' ')[1]?.toLowerCase()
        if (target) {
          setTimeout(() => {
            onAgentChange(target === 'default' ? null : target)
          }, 500)
        }
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'system',
        content: `Error: ${(err as Error).message}`,
        agent_id: agentId,
        command: null,
        created_at: new Date().toISOString(),
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }, [agentId, onAgentChange])

  return { messages, commands, isLoading, sendMessage, sessionId: sessionIdRef.current }
}
