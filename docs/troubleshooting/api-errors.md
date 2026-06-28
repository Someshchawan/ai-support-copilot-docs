---
id: api-errors
title: API Errors & Troubleshooting
sidebar_position: 1
---

# API Errors and Troubleshooting

Common issues you may encounter when using the AI Support Copilot and how to resolve them.

## Authentication errors

**Error:** `API Error: 401 Unauthorized`

**Cause:** Your API key is missing, invalid, or expired.

**Fix:**
1. Verify your API key is set correctly:
   ```bash
   echo $API_KEY
   ```
2. If empty, set it:
   ```bash
   export API_KEY="your_api_key_here"
   ```
3. Verify the key is valid by checking your API provider's dashboard.

## Rate limit errors

**Error:** `API Error: API returned 429 after 3 attempts`

**Cause:** You have exceeded your API provider's rate limit. The copilot automatically retries 3 times with exponential backoff (1s, 2s, 4s) but all attempts were rate-limited.

**Fix:**
- Wait 60 seconds and try again
- Check your API provider's rate limit dashboard
- Consider upgrading to a higher rate limit tier
- Reduce request frequency in your application

## Connection errors

**Error:** `API Error: Connection failed after 3 attempts`

**Cause:** The API server is unreachable due to network issues, DNS resolution failure, or the server being down.

**Fix:**
- Check your internet connection
- Verify the API URL is correct
- Check the API provider's status page for outages
- Try again after a few minutes

## Timeout errors

**Error:** `API Error: Request timed out after 3 attempts`

**Cause:** The API server did not respond within the configured timeout period (default: 15 seconds).

**Fix:**
- Increase the timeout: `AISupportCopilot(timeout=30)`
- Check if the API provider is experiencing high latency
- Simplify your query to reduce processing time

## Module not found errors

**Error:** `ModuleNotFoundError: No module named 'requests'`

**Cause:** Project dependencies are not installed.

**Fix:**
```bash
pip install -r requirements.txt
```

## Empty or low-quality responses

**Symptom:** The copilot returns responses that are too short, irrelevant, or contain filler phrases.

**Diagnosis:** Run in evaluation mode to see quality scores:
```bash
python evals/response_quality.py
```

Check which specific quality checks are failing. Common causes:
- **Relevance failing:** Your query may be too vague. Try a more specific question.
- **Structure failing:** The model may not be using step-by-step formatting. This is prompt-dependent.
- **Uncertainty failing:** The model does not have enough context to answer confidently.

## Evaluation test failures

**Error:** Tests fail when running `python -m pytest tests/test_evaluation.py`

**Cause:** This typically happens if the evaluation module has been modified and a check's behavior has changed.

**Fix:**
- Review the specific test failure message
- Check if the evaluation thresholds or phrase lists have been modified
- Ensure you are on the latest version of the code
