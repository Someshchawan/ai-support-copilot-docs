---
id: evaluation-checks
title: Evaluation Checks Reference
sidebar_position: 2
---

# Evaluation Checks Reference

Detailed documentation of every quality check in the evaluation system, including what each check detects, how it scores, and concrete examples.

## not_empty

**What it catches:** Empty, whitespace-only, or below-minimum-length responses.

**Hard gate:** Yes. If this check fails, the entire evaluation fails regardless of other scores.

**Scoring:**
- Empty response: 0.0
- Below minimum length (default 20 chars): 0.2
- Sufficient content: 1.0

## length

**What it catches:** Excessively long responses that signal rambling or unfocused output.

**Default maximum:** 2000 characters

**Scoring:**
- Over maximum: 0.3
- Within range: 1.0

## relevance

**What it catches:** Responses that completely ignore the user's question.

**How it works:** Extracts significant keywords from the user's query (filtering out stop words) and checks how many appear in the response.

**Scoring:**
- Zero keyword matches: 0.0
- Under 30% match: 0.3
- Proportional above 30%: 0.5 to 1.0

**Example of a caught failure:**
- Query: "How do I reset my password?"
- Response: "Our company was founded in 2015 and has grown to serve over 10 million users worldwide."
- Score: 0.0 (none of "reset", "password" appear)

## structure

**What it catches:** Responses lacking formatting that would make them more useful (numbered steps, bullets, paragraphs, headings).

**Scoring:**
- No structural elements: 0.4
- Each element adds 0.2 (capped at 1.0)

## uncertainty

**What it catches:** Hedging or refusal language suggesting the model cannot confidently answer.

**Detected phrases:** "i'm not sure", "i don't know", "i cannot", "i can't", "as an ai", "i don't have access", "it depends", "i am not able to", "please consult", "i apologize"

**Scoring:**
- Two or more phrases: 0.2 (fails)
- One phrase: 0.6 (passes with warning)
- None: 1.0

## hallucination_risk

**What it catches:** Phrases where the model fabricates access to user data, account information, or system states it does not have.

**Hard gate:** Yes. If this check fails, the entire evaluation fails.

**Detected phrases:** "according to our records", "your account shows", "i can see that", "based on your history", "our database indicates", "i have checked your", "your file shows", "our system confirms"

**Scoring:**
- Any phrase detected: 0.1
- None detected: 1.0

**Why this matters:** An AI support assistant has no access to real user data. When it says "your account shows two transactions," it is fabricating specifics to sound helpful. This is the most dangerous type of AI failure because the user is likely to believe it.

## filler

**What it catches:** Responses that open with empty pleasantries instead of getting to the answer.

**Detected opening phrases:** "great question", "that's a great question", "sure, i'd be happy to", "absolutely", "of course", "no problem at all", "certainly"

**Scoring:**
- Opens with filler: 0.5
- Direct opening: 1.0

## error_leak

**What it catches:** Raw error messages, stack traces, or Python exceptions appearing in a user-facing response.

**Hard gate:** Yes. If this check fails, the entire evaluation fails.

**Detected patterns:** `Traceback (most recent call last)`, `raise *Error`, `File "*.py"`, `requests.exceptions.*`, `KeyError:`, `TypeError:`, `IndexError:`, `JSONDecodeError`

**Scoring:**
- Any pattern detected: 0.0
- None detected: 1.0

## keyword_coverage (optional)

**What it catches:** Missing expected terms when you provide a list of keywords the response should contain. Useful for regression testing against known-good answers.

**Scoring:**
- Below 50% coverage: fails
- Proportional above 50%: passes
