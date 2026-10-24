import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Route } from '../types'

// The route chosen for the turn that the last submitted prompt starts.
const route = atom({ plugin: 'auto-router', key: 'route' } as const, null)

const LABELS = [
  'trivial: one-sentence edit, short rewrite, translation, formatting, quick lookup, yes/no question',
  'routine: drafting, editing a document, summarizing one thing, ordinary coding, routine analysis',
  'hard: multi-step reasoning, debugging across components, architecture, ambiguous analysis, long agentic work',
] as const

// Where each label runs. `null` keeps whatever the session is set to.
const PLAN: Record<string, Route> = {
  trivial: { label: 'trivial', model: 'haiku', effort: 'low' },
  routine: { label: 'routine', model: 'sonnet', effort: 'medium' },
  hard: { label: 'hard', model: null, effort: null },
}

export const register: Register = on => {
  on('prompt.submit', async ($, e, next) => {
    const text = e.text ?? ''

    // Slash commands and explicit overrides are left alone.
    // "!keep" anywhere in the prompt pins the session model for this turn.
    if (text.startsWith('/') || text.includes('!keep')) {
      await update($, route, () => null)
      $.ui.status(undefined)
      return next(e)
    }

    let chosen: Route | null = null
    try {
      const label = await $.model.classify(text, [...LABELS])
      const key = label?.split(':')[0]?.trim()
      chosen = key && PLAN[key] ? PLAN[key] : null
    } catch {
      chosen = null
    }

    await update($, route, () => chosen)
    $.ui.status(
      chosen && chosen.model
        ? `auto-router: ${chosen.label} → ${chosen.model} · ${chosen.effort}`
        : chosen
          ? `auto-router: ${chosen.label} → session model`
          : 'auto-router: unclassified → session model',
    )

    return next(e)
  })

  on('turn.step', async function* ($, e, next) {
    // Main loop only; subagents keep their own model.
    if (e.agentId !== undefined) return yield* next(e)

    const r = await read($, route)
    if (!r || !r.model) return yield* next(e)

    return yield* next({ ...e, model: r.model, effort: r.effort ?? e.effort })
  })
}
