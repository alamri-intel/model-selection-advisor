export type Effort = 'low' | 'medium' | 'high'
export type Route = { label: string; model: string | null; effort: Effort | null }

declare module 'claude-code' {
  interface PluginState {
    'auto-router': { route: Route | null }
  }
}
