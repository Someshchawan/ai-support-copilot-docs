---
id: quickstart
title: Quickstart
sidebar_position: 2
---

# Quickstart

Get the AI Support Copilot running in under 5 minutes.

## Prerequisites

- Python 3.9 or higher
- An API key from OpenAI or a compatible provider
- Git installed on your machine

## Step 1: Clone the repository

```bash
git clone https://github.com/Someshchawan/ai-support-copilot.git
cd ai-support-copilot
```

## Step 2: Install dependencies

```bash
pip install -r requirements.txt
```

## Step 3: Set your API key

```bash
export API_KEY="your_api_key_here"
```

On Windows, use `set API_KEY=your_api_key_here` instead.

## Step 4: Run the example

```bash
python examples/basic_chat.py
```

You should see:

```
🤖 AI Support Copilot
Type 'exit' to quit

Ask something:
```

## Step 5: Try your first query

Type a question like:

```
How do I reset my password?
```

The copilot will process your query through the full pipeline: prompt construction, API call with retry logic, response parsing, and return a structured answer.

## Step 6: Run with evaluation mode

To see quality scoring on every response:

```bash
python evals/response_quality.py
```

This runs the same chatbot but evaluates each response across 8 quality dimensions and displays the score alongside the answer.

## Step 7: Run the test suite

```bash
python -m pytest tests/test_evaluation.py -v
```

All 17 tests should pass, each demonstrating a specific failure mode being caught by the evaluation system.

## Next steps

- [Prompt Design](concepts/prompts): Understand how prompts are constructed
- [Evaluation System](concepts/evaluation): Learn how responses are scored
- [Build a Chatbot](guides/build-chatbot): Step-by-step implementation guide
