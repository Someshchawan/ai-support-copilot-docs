---
id: evaluation
title: Evaluation System
sidebar_position: 2
---

# Evaluation System

How the AI Support Copilot evaluates every response across 8 quality dimensions before it reaches a user.

## Why evaluation matters

AI models generate responses that sound confident regardless of whether they are correct. A response can be grammatically perfect, well-structured, and completely fabricated. The evaluation system catches these failures before they reach an end user.

## The 8 quality checks

Every response passes through these checks, each returning a score between 0.0 and 1.0:

| Check | What it catches |
|---|---|
| **not_empty** | Empty or whitespace-only responses |
| **length** | Excessively long, unfocused output |
| **relevance** | Responses that ignore the user's question |
| **structure** | Responses lacking steps, bullets, or paragraphs |
| **uncertainty** | Hedging language like "I'm not sure" or "as an AI" |
| **hallucination_risk** | Fabricated claims about user data or system states |
| **filler** | Empty pleasantries like "Great question!" |
| **error_leak** | Raw stack traces or Python exceptions in the response |

## How scoring works

Each check returns a `QualityCheck` object with a name, pass/fail status, score (0.0 to 1.0), and a human-readable reason. The overall score is the average of all individual check scores.

**Hard gates:** Three checks act as hard gates regardless of the overall score:
- `not_empty`: An empty response always fails
- `hallucination_risk`: A hallucinated response always fails
- `error_leak`: A leaked stack trace always fails

This means a response can score 0.8 overall but still fail if it contains fabricated account data.

## Concrete example: catching a hallucination

**User asks:** "Why was I charged twice?"

**AI responds:** "I can see that your account shows two transactions on June 15. According to our records, the first charge was processed correctly."

**Evaluation result:**

```
Evaluation: FAIL (score: 0.49)
  [FAIL] hallucination_risk (0.1) -- Potential hallucination: response
         claims access to user data ('i can see that'). The model has
         no access to real user records.

Issues found: 1 check(s) failed.
```

The model fabricated access to account data. The evaluation layer catches this and prevents it from reaching the user.

## Running evaluations

See the [Running Evaluations guide](../guides/running-evaluations) for hands-on instructions.

## Full reference

See [Evaluation Checks Reference](../reference/evaluation-checks) for detailed documentation of every check, including the exact phrases detected and scoring logic.
