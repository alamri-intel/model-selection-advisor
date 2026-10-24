# Pricing and routing reference — verify before quoting

Snapshot date: 2026-10-24. These figures go stale. Confirm on the provider's
pricing page before using them in a budget or a public statement.

## Anthropic list prices (USD per MTok, input / output)

| Model | Tier | Price |
| --- | --- | --- |
| Fable 5.1 / Mythos 5.1 | frontier | 10 / 50 |
| Opus 5.5 | large | 4 / 20 |
| Opus 5 | large (prev) | 5 / 25 |
| Sonnet 5.5 | mid | 2 / 10 |
| Haiku 5.5 | small | 0.10 / 0.50 (≤100K prompt); 0.50 / 2.50 above |

Frontier vs newest large tier is about 2.5x; vs the previous large tier 2x.

## Discounts

- Batch: 50% off input and output at Anthropic, OpenAI and Google.
- Prompt caching: Anthropic cache reads 0.1x base input (0.05x on Opus 5.5 /
  Sonnet 5.5, 0.025x on Fable 5.1 / Mythos 5.1); writes 1.25x (5-min) or 2x
  (1-hour). OpenAI cached input 50% off, automatic on prefixes over 1,024
  tokens. Google context caching about 90% off plus storage charges.

## Safety fallback (Anthropic, documented)

Opus 5 and Opus 5.5 run classifiers on every request. Opus 5/5.5 may fall back
to Opus 4.8 when the cyber classifier flags a potentially higher-risk offensive
security request; Opus 5.5 falls back to Opus 5 on biology dual-use and
frontier-LLM-development requests. The request is re-run on the fallback model
in the same conversation and billed at that model's rate. Users in those fields
should check which model actually answered before attributing quality to a
tier.
