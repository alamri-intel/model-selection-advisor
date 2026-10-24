# Changelog

## 3.0.0 — 2026-10-24
- Advisor rewritten around the provider's current decision rule: start at the
  recommended default, effort first, tier second, downgrade only after a sample
  comparison. The task-class matrix is now the list of downgrade candidates.
- Description rewritten (what it does, then when); false positives on
  "write about pricing" and "already chose the effort" removed.
- Prices, ratios and the safety-fallback note moved to `reference/pricing.md`.
- Added `cheap-mode` skill and `volume-worker` subagent (Claude Code only);
  these set model and effort instead of recommending.
- Added marketplace.json, LICENSE, CHANGELOG.

## 2.1.0
- Trigger tightened, fact-checked install paths and cost claims.

## 2.0.0
- Public version: internal references and price table removed.
