import React from 'react'

export interface MarkdownTheme {
  h1?: string
  h2?: string
  h3?: string
  p?: string
  ul?: string
  li?: string
  bold?: string
  italic?: string
  code?: string
  codeBlock?: string
  hr?: string
  listMarker?: React.ReactNode
}

const defaultTheme: MarkdownTheme = {
  h1: 'text-2xl font-bold mt-8 mb-4',
  h2: 'text-xl font-bold mt-6 mb-3',
  h3: 'text-lg font-semibold mt-5 mb-2',
  p: 'mb-4 leading-relaxed',
  ul: 'mb-4 space-y-1.5',
  li: 'flex items-start gap-2',
  bold: 'font-bold',
  italic: 'italic',
  code: 'px-1.5 py-0.5 bg-foreground/10 text-sm font-mono',
  codeBlock: 'block p-4 bg-foreground/5 border border-foreground/10 text-sm font-mono mb-4 overflow-x-auto whitespace-pre',
  hr: 'border-t border-foreground/10 my-6',
}

export function renderMarkdown(
  content: string,
  theme: MarkdownTheme = {},
  specialNotation?: (line: string) => React.ReactNode | null
): React.ReactNode[] {
  const t = { ...defaultTheme, ...theme }
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeBuffer: string[] = []
  let listBuffer: React.ReactNode[] = []

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className={t.ul}>
          {listBuffer}
        </ul>
      )
      listBuffer = []
    }
  }

  lines.forEach((line, i) => {
    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false
        elements.push(
          <pre key={`code-${i}`} className={t.codeBlock}>
            {codeBuffer.join('\n')}
          </pre>
        )
        codeBuffer = []
      } else {
        flushList()
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      return
    }

    // Special notation hook
    if (specialNotation) {
      const special = specialNotation(line)
      if (special) {
        flushList()
        elements.push(<React.Fragment key={`special-${i}`}>{special}</React.Fragment>)
        return
      }
    }

    // HR
    if (line.trim() === '---' || line.trim() === ':::') {
      flushList()
      elements.push(<hr key={`hr-${i}`} className={t.hr} />)
      return
    }

    // Headings
    if (line.startsWith('### ')) {
      flushList()
      elements.push(<h3 key={`h3-${i}`} className={t.h3}>{formatInline(line.slice(4), t)}</h3>)
      return
    }
    if (line.startsWith('## ')) {
      flushList()
      elements.push(<h2 key={`h2-${i}`} className={t.h2}>{formatInline(line.slice(3), t)}</h2>)
      return
    }
    if (line.startsWith('# ')) {
      flushList()
      elements.push(<h1 key={`h1-${i}`} className={t.h1}>{formatInline(line.slice(2), t)}</h1>)
      return
    }

    // List items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const text = line.trim().slice(2)
      listBuffer.push(
        <li key={`li-${i}`} className={t.li}>
          {t.listMarker || <span className="text-foreground/30 mt-1 select-none">—</span>}
          <span>{formatInline(text, t)}</span>
        </li>
      )
      return
    }

    // Empty line
    if (line.trim() === '') {
      flushList()
      return
    }

    // Paragraph
    flushList()
    elements.push(<p key={`p-${i}`} className={t.p}>{formatInline(line, t)}</p>)
  })

  flushList()
  return elements
}

function formatInline(text: string, t: MarkdownTheme): React.ReactNode {
  // Process bold, italic, inline code
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/^(.*?)`([^`]+)`(.*)$/)
    if (codeMatch) {
      if (codeMatch[1]) parts.push(formatBoldItalic(codeMatch[1], t, key++))
      parts.push(<code key={`ic-${key++}`} className={t.code}>{codeMatch[2]}</code>)
      remaining = codeMatch[3]
      continue
    }

    parts.push(formatBoldItalic(remaining, t, key++))
    break
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>
}

function formatBoldItalic(text: string, t: MarkdownTheme, key: number): React.ReactNode {
  // Bold
  const boldParts = text.split(/\*\*(.+?)\*\*/)
  if (boldParts.length > 1) {
    return (
      <React.Fragment key={`bi-${key}`}>
        {boldParts.map((part, i) =>
          i % 2 === 1
            ? <strong key={i} className={t.bold}>{part}</strong>
            : formatItalicOnly(part, t, i)
        )}
      </React.Fragment>
    )
  }

  return formatItalicOnly(text, t, key)
}

function formatItalicOnly(text: string, t: MarkdownTheme, key: number): React.ReactNode {
  if (!text) return null
  const italicParts = text.split(/\*(.+?)\*/)
  if (italicParts.length > 1) {
    return (
      <React.Fragment key={`it-${key}`}>
        {italicParts.map((part, i) =>
          i % 2 === 1
            ? <em key={i} className={t.italic}>{part}</em>
            : <React.Fragment key={i}>{part}</React.Fragment>
        )}
      </React.Fragment>
    )
  }
  return text
}
