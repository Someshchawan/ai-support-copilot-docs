---
id: running-evaluations
title: Running Evaluations
sidebar_position: 2
---

# Running Evaluations

How to use the evaluation system to test AI response quality, both interactively and through automated tests.

## Interactive evaluation mode

Run the copilot with live quality scoring:

```bash
python evals/response_quality.py
```

Every response is scored across 8 dimensions and the evaluation summary is displayed alongside the answer:

```
Response:
To reset your password, follow these steps:
1. Go to the login page
2. Click "Forgot Password"
3. Enter your email address
4. Follow the link sent to your inbox

Evaluation: PASS (score: 0.93)
  [PASS] not_empty (1.0) -- Response has sufficient content.
  [PASS] relevance (0.75) -- Response appears relevant to the query.
  [PASS] structure (0.9) -- Response uses 2 structural element(s).
  [PASS] hallucination_risk (1.0) -- No hallucination signals detected.
```

## Programmatic evaluation

Use the evaluator in your own code:

```python
from evals.response_quality import ResponseEvaluator

evaluator = ResponseEvaluator()
result = evaluator.evaluate(
    user_query="How do I configure SSL?",
    response_text="To configure SSL for your server...",
    expected_keywords=["SSL", "certificate", "HTTPS"]  # optional
)

print(f"Score: {result.overall_score}")
print(f"Passed: {result.passed}")

for check in result.failed_checks:
    print(f"Failed: {check.name} -- {check.reason}")
```

## Running the test suite

The project includes 17 automated tests that demonstrate each check catching a real failure:

```bash
python -m pytest tests/test_evaluation.py -v
```

Expected output:

```
tests/test_evaluation.py::TestGoodResponses::test_structured_step_by_step_response PASSED
tests/test_evaluation.py::TestHallucinationDetection::test_fabricated_account_access PASSED
tests/test_evaluation.py::TestErrorLeakDetection::test_stack_trace_in_response PASSED
...
17 passed in 0.04s
```

## Custom evaluation thresholds

Configure the evaluator with custom thresholds:

```python
evaluator = ResponseEvaluator(
    min_length=50,        # minimum response length in characters
    max_length=3000,      # maximum before flagging as too long
    min_score_threshold=0.7  # stricter pass threshold
)
```

## Next steps

- [Evaluation Checks Reference](../reference/evaluation-checks): Detailed documentation of every check
- [Troubleshooting](../troubleshooting/api-errors): Debug common API issues
