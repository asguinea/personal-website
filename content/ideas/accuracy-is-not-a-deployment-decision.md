---
title: "Accuracy is not a deployment decision"
description: "Why a strong model score does not tell a team when an AI system should act, defer, escalate or stop."
category: "Trustworthy AI"
weight: 10
eyebrow: "Field note · Trustworthy AI"
draft: true
---

Model accuracy answers a narrow question: how often did the model produce the expected output on a particular dataset under a particular evaluation design?

A deployment decision has to answer several additional questions:

- What kinds of errors occur, and who bears their consequences?
- Does the system recognise conditions that differ from its evidence base?
- How is uncertainty communicated to the person responsible for the outcome?
- What happens when evidence is ambiguous, conflicting or incomplete?
- Who can override the system, and is that intervention operationally realistic?

These are not post-deployment governance details. They are architecture requirements.

## Four states, not one confidence score

For high-stakes systems, I find it more useful to reason about four operational states:

1. **Act:** available evidence and context support autonomous execution.
2. **Defer:** the system needs more information before a decision is justified.
3. **Escalate:** a qualified human must interpret the situation and own the next step.
4. **Stop:** continuing would exceed a defined operating boundary.

The difficult work is not writing these labels. It is defining the evidence, thresholds, workflows and accountability behind them.

That is why uncertainty belongs in the system design from the beginning. A model can be statistically impressive while the surrounding product remains operationally indefensible.

<div class="note-cta"><strong>Decision to examine:</strong> Can your current architecture explain when the AI is permitted to act and what happens when it is not?</div>
