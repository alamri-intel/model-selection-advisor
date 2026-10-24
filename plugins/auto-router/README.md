# auto-router

Routes each turn to the cheapest model that clears the bar, automatically.

How it works: when you submit a prompt, a small fast model classifies it as
trivial (one-sentence edit, translation, lookup), routine (drafting, editing,
ordinary coding) or hard (multi-step reasoning, debugging across components,
architecture). Trivial turns run on Haiku at low effort, routine turns on
Sonnet at medium, and hard turns stay on whatever model and effort the session
is set to. The status line shows the decision. Subagents keep their own model.

Overrides: a prompt that starts with `/` (a slash command) or contains `!keep`
runs on the session model. The classifier call itself is one short Haiku
request per prompt.

Cost note: the switch applies per request, so a turn that routes to Haiku pays
Haiku rates for the whole turn, including its tool calls. A misclassified hard
task on Haiku is the failure mode; add `!keep` and resend.
