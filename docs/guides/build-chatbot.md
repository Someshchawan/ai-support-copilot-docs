---
id: build-chatbot
title: Build a Chatbot
sidebar_position: 1
---

# Build a Chatbot

A step-by-step guide to building your own AI-powered support chatbot using the patterns demonstrated in this project.

## What you will build

A command-line chatbot that:
- Accepts user questions
- Constructs structured prompts with system/user role separation
- Calls an AI API with retry logic
- Evaluates every response for quality before displaying it

## Step 1: Set up the project

```bash
git clone https://github.com/Someshchawan/ai-support-copilot.git
cd ai-support-copilot
pip install -r requirements.txt
export API_KEY="your_api_key_here"
```

## Step 2: Understand the pipeline

The copilot follows a four-stage pipeline:

1. **Prompt construction:** Builds a messages array with separated system and user roles
2. **API call:** Sends the request with automatic retry for transient errors
3. **Response parsing:** Extracts the assistant's message from the API response
4. **Evaluation:** Scores the response across 8 quality dimensions

## Step 3: Initialize the copilot

```python
from src.copilot import AISupportCopilot

copilot = AISupportCopilot()
```

The constructor reads your API key from the `API_KEY` environment variable. You can also pass it directly:

```python
copilot = AISupportCopilot(api_key="your_key_here")
```

## Step 4: Build the prompt

```python
messages = copilot.build_prompt("How do I reset my password?")
```

This returns a list of message dictionaries:

```python
[
    {"role": "system", "content": "You are a helpful..."},
    {"role": "user", "content": "Question: How do I reset my password?\n\nProvide a clear and helpful answer."}
]
```

## Step 5: Call the API

```python
api_response = copilot.call_api(messages)
```

This handles retry logic automatically. If the API returns a 429 rate limit error, the copilot waits and retries up to 3 times with exponential backoff.

## Step 6: Parse the response

```python
answer = copilot.parse_response(api_response)
print(answer)
```

## Step 7: Add evaluation

```python
from evals.response_quality import ResponseEvaluator

evaluator = ResponseEvaluator()
result = evaluator.evaluate("How do I reset my password?", answer)

print(result.summary())

if not result.passed:
    print("Warning: Response failed quality checks.")
    for check in result.failed_checks:
        print(f"  Failed: {check.name} -- {check.reason}")
```

## Step 8: Put it all together

The simplest version uses `get_response`, which runs the full pipeline internally:

```python
response = copilot.get_response("How do I reset my password?")
print(response)
```

For production use, run the individual steps so you can evaluate and log each stage:

```python
messages = copilot.build_prompt(user_input)
api_response = copilot.call_api(messages)
answer = copilot.parse_response(api_response)
result = evaluator.evaluate(user_input, answer)

if result.passed:
    show_to_user(answer)
else:
    log_quality_failure(result)
    show_fallback_message()
```

## Next steps

- [Running Evaluations](running-evaluations): Deep dive into using the evaluation system
- [API Errors & Troubleshooting](../troubleshooting/api-errors): Debug common issues
