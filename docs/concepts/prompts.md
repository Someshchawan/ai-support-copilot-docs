---
id: prompts
title: Prompt Design
sidebar_position: 1
---

# Prompt Design

How the AI Support Copilot constructs prompts for consistent, high-quality responses.

## Why prompt design matters

The quality of an AI response depends heavily on how the prompt is structured. A poorly designed prompt produces vague, inconsistent, or irrelevant responses. A well-designed prompt gives the model clear instructions, context, and constraints.

## System and user role separation

The copilot separates every prompt into two distinct roles:

**System message:** Defines how the model should behave. This is set once and stays consistent across all interactions.

```python
SYSTEM_PROMPT = (
    "You are a helpful, accurate, and concise customer support assistant. "
    "Always provide step-by-step instructions when applicable. "
    "If you do not have enough information to answer confidently, "
    "say so clearly rather than guessing. "
    "Never fabricate account details, transaction records, or system states."
)
```

**User message:** Contains what the user is actually asking, optionally with additional context.

```python
USER_PROMPT_WITHOUT_CONTEXT = (
    "Question: {user_input}\n\n"
    "Provide a clear and helpful answer."
)
```

## Why this separation matters

Mixing system instructions and user input into a single string produces less consistent results. When the model receives a clear system message, it applies those behavioral constraints uniformly across all queries rather than treating instructions as part of the user's question.

## Context injection

When additional context is available (such as product documentation or user history), the copilot injects it between the system and user messages:

```python
USER_PROMPT_WITH_CONTEXT = (
    "Context: {context}\n\n"
    "Question: {user_input}\n\n"
    "Provide a clear, step-by-step answer."
)
```

This pattern ensures the model grounds its response in the provided context rather than relying entirely on its training data.

## Anti-hallucination by design

Notice the system prompt includes: "Never fabricate account details, transaction records, or system states." This instruction works in conjunction with the [hallucination detection check](evaluation) in the evaluation layer. The prompt tells the model not to fabricate; the evaluation catches it if the model does anyway. Defense in depth.

## Next steps

- [Evaluation System](evaluation): How responses are scored after generation
- [Build a Chatbot](../guides/build-chatbot): Apply these concepts in a working implementation
