'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, Terminal } from 'lucide-react'
import type { AgentTheme } from '@/lib/agent-themes'
import { useChat, type ChatMessage } from '@/hooks/use-chat'

function CommandAutocomplete({
  input,
  commands,
  onSelect,
  theme,
}: {
  input: string
  commands: { command: string; description: string }[]
  onSelect: (cmd: string) => void
  theme: AgentTheme
}) {
  if (!input.startsWith('/') || input.includes(' ')) return null
  const matches = commands.filter(c => c.command.startsWith(input) && c.command !== input)
  if (matches.length === 0) return null

  return (
    <div
      className="absolute bottom-full left-0 right-0 mb-1 border border-foreground/10 backdrop-blur-sm max-h-48 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.85)' }}
    >
      {matches.map(m => (
        <button
          key={m.command}
          onClick={() => onSelect(m.command)}
          className="w-full text-left px-4 py-2 text-xs font-mono hover:bg-foreground/10 flex justify-between gap-4 cursor-pointer"
          style={{ color: theme.accentColor }}
        >
          <span>{m.command}</span>
          <span className="opacity-40 text-[10px]">{m.description}</span>
        </button>
      ))}
    </div>
  )
}

function MessageLine({ msg, theme }: { msg: ChatMessage; theme: AgentTheme }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`text-xs leading-relaxed ${theme.fontFamily}`}>
      <span
        className="font-bold mr-2 text-[10px] tracking-wider uppercase"
        style={{ color: isUser ? theme.accentColor : 'var(--muted-foreground)' }}
      >
        {isUser ? '>' : '⟐'}
      </span>
      <span className="whitespace-pre-wrap" style={{ color: isUser ? 'inherit' : 'var(--muted-foreground)' }}>
        {msg.content}
      </span>
    </div>
  )
}

export function LoreTerminal({
  theme,
  onAgentChange,
}: {
  theme: AgentTheme
  onAgentChange?: (agentId: string | null) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState('')
  const { messages, commands, isLoading, sendMessage } = useChat(theme.id, onAgentChange)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input on expand
  useEffect(() => {
    if (isExpanded) inputRef.current?.focus()
  }, [isExpanded])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage(input)
    setInput('')
    setHistoryIndex(-1)
  }, [input, isLoading, sendMessage])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isExpanded) {
      setIsExpanded(false)
    }
    // History navigation
    const userMsgs = messages.filter(m => m.role === 'user')
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIdx = Math.min(historyIndex + 1, userMsgs.length - 1)
      setHistoryIndex(newIdx)
      const msg = userMsgs[userMsgs.length - 1 - newIdx]
      if (msg) setInput(msg.content)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = historyIndex - 1
      if (newIdx < 0) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(newIdx)
        const msg = userMsgs[userMsgs.length - 1 - newIdx]
        if (msg) setInput(msg.content)
      }
    }
  }, [isExpanded, messages, historyIndex])

  const handleAutocomplete = useCallback((cmd: string) => {
    setInput(cmd + ' ')
    inputRef.current?.focus()
  }, [])

  // Compact inline input
  if (!isExpanded) {
    return (
      <section className={`relative ${theme.timelineBg} border-t border-foreground/5`}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <form onSubmit={(e) => {
            e.preventDefault()
            if (input.trim()) {
              setIsExpanded(true)
              // Small delay to let it expand, then send
              setTimeout(() => sendMessage(input), 100)
              setInput('')
            } else {
              setIsExpanded(true)
            }
          }} className="relative flex items-center gap-3">
            <Terminal className="w-3.5 h-3.5 flex-shrink-0 opacity-30" style={{ color: theme.accentColor }} />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={theme.id === 'dot' ? '$ _' : 'Type / for commands...'}
              className={`flex-1 bg-transparent text-xs outline-none placeholder:opacity-30 ${theme.fontFamily}`}
              style={{ color: theme.accentColor }}
            />
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="p-1.5 opacity-30 hover:opacity-70 gentle-animation cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>
    )
  }

  // Full expanded terminal
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative ${theme.timelineBg} border-t border-foreground/5`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-3.5 h-3.5 opacity-50" style={{ color: theme.accentColor }} />
            <span className={`text-[10px] tracking-[0.3em] uppercase opacity-50 ${theme.fontFamily}`}>
              {theme.id === 'dot' ? '~/skogai/terminal' : 'Terminal'}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1.5 opacity-30 hover:opacity-70 gentle-animation cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="min-h-[200px] max-h-[60vh] overflow-y-auto space-y-2 mb-4 pr-2"
        >
          {messages.length === 0 && (
            <div className={`text-xs opacity-30 ${theme.fontFamily}`}>
              {theme.id === 'dot'
                ? '$ skogai --help\nType /help for available commands.'
                : 'Welcome to the terminal. Type /help to get started.'}
            </div>
          )}
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageLine msg={msg} theme={theme} />
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="text-xs opacity-30">
              <span className="animate-pulse">⟐ ...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative">
          <CommandAutocomplete
            input={input}
            commands={commands}
            onSelect={handleAutocomplete}
            theme={theme}
          />
          <div className="flex items-center gap-3 border-t border-foreground/5 pt-3">
            <span className="text-xs opacity-30" style={{ color: theme.accentColor }}>{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={theme.id === 'dot' ? '$ _' : 'Type a message or /command...'}
              className={`flex-1 bg-transparent text-xs outline-none placeholder:opacity-30 ${theme.fontFamily}`}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </motion.section>
  )
}
