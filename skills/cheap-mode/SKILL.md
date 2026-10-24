---
name: cheap-mode
description: Runs the user's request on the mid tier at low effort for this turn. Claude Code only; invoked by the user as /cheap-mode for routine work that does not need the default model.
model: sonnet
effort: low
disable-model-invocation: true
---

Perform the user's request directly with the model and effort set above.
No commentary about the model choice. If the task turns out to need more
reasoning than this setting allows, say so in one line and stop.
