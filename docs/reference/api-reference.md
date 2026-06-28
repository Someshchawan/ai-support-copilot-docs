---
id: api-reference
title: API Reference
sidebar_position: 1
---

# API Reference

Complete reference for the AI Support Copilot's Python classes and methods.

## AISupportCopilot

The main class for interacting with the AI support pipeline.

### Constructor

```python
AISupportCopilot(
    api_key: Optional[str] = None,
    api_url: str = "https://api.openai.com/v1/chat/completions",
    model: str = "gpt-4.1-mini",
    timeout: int = 15
)
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `api_key` | str or None | `API_KEY` env var | Your API key. Falls back to environment variable. |
| `api_url` | str | OpenAI completions URL | The API endpoint to call. |
| `model` | str | `gpt-4.1-mini` | The model to use for generation. |
| `timeout` | int | 15 | Request timeout in seconds. |

### get_response

```python
get_response(user_input: str, context: Optional[str] = None) -> str
```

Runs the full pipeline: validate input, build prompt, call API, parse response. This is the primary method most consumers should use.

### build_prompt

```python
build_prompt(user_input: str, context: Optional[str] = None) -> list[dict[str, str]]
```

Builds a structured messages array with separated system and user roles. Returns a list of message dicts ready for the chat completions API.

### call_api

```python
call_api(messages: list[dict[str, str]]) -> dict[str, Any]
```

Sends a request to the API with automatic retry and exponential backoff for transient errors (429, 5xx, timeouts, connection errors). Returns the parsed JSON response or an error dict.

### parse_response

```python
parse_response(api_response: dict[str, Any]) -> str
```

Extracts the assistant's message text from the API response. Handles the standard `choices[0]["message"]["content"]` format.

## ResponseEvaluator

The evaluation engine that scores AI responses across 8 quality dimensions.

### Constructor

```python
ResponseEvaluator(
    min_length: int = 20,
    max_length: int = 2000,
    min_score_threshold: float = 0.6
)
```

### evaluate

```python
evaluate(
    user_query: str,
    response_text: str,
    expected_keywords: Optional[list[str]] = None
) -> EvaluationResult
```

Runs all quality checks and returns an `EvaluationResult` containing individual check scores and an aggregated overall score.

## EvaluationResult

The result object returned by `ResponseEvaluator.evaluate()`.

### Properties

| Property | Type | Description |
|---|---|---|
| `overall_score` | float | Weighted average of all check scores (0.0 to 1.0) |
| `passed` | bool | True if the response meets all quality thresholds |
| `failed_checks` | list[QualityCheck] | Only the checks that did not pass |
| `checks` | list[QualityCheck] | All check results |

### Methods

| Method | Returns | Description |
|---|---|---|
| `summary()` | str | Human-readable evaluation summary |
