---
id: retry-logic
title: Retry Logic
sidebar_position: 3
---

# Retry Logic and Error Handling

How the AI Support Copilot handles API failures gracefully using structured retry with exponential backoff.

## Why retry logic matters

API calls fail. Rate limits hit. Servers return 500 errors. Connections time out. A production system that shows a raw error message to the user every time this happens is not production-ready.

## How it works

The copilot retries failed requests up to 3 times with exponential backoff:

| Attempt | Wait time | Cumulative |
|---|---|---|
| 1st attempt | Immediate | 0s |
| 2nd attempt | 1 second | 1s |
| 3rd attempt | 2 seconds | 3s |

## Which errors trigger retry

Not all errors should be retried. The copilot distinguishes between transient errors (worth retrying) and permanent errors (not worth retrying):

**Retryable (transient):**
- `429` Too Many Requests (rate limit)
- `500` Internal Server Error
- `502` Bad Gateway
- `503` Service Unavailable
- `504` Gateway Timeout
- Connection timeouts
- Connection errors

**Not retryable (permanent):**
- `401` Unauthorized (bad API key)
- `400` Bad Request (malformed input)
- `403` Forbidden

## Logging at every stage

Every attempt, retry, and failure is logged using Python's standard logging module:

```
2026-06-25 10:30:01 [INFO] src.copilot: API request attempt 1/3
2026-06-25 10:30:02 [WARNING] src.copilot: Received 429 on attempt 1/3. Retrying in 1.0s...
2026-06-25 10:30:03 [INFO] src.copilot: API request attempt 2/3
```

This gives developers full visibility into what happened during a failed interaction, which is essential for debugging production issues.

## What the user sees

When all retries are exhausted, the user receives a clean error message:

```
API Error: API returned 429 after 3 attempts.
```

Raw stack traces, exception objects, and internal error details are never exposed. The [error_leak check](evaluation) in the evaluation system acts as a second safety net for this.
