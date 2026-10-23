---
title: "A Council of Disagreeing Agents, and Second Opinions From Other Models"
date: 2026-10-23
draft: false
author: "Kaushal Dokania"
description: "Two Claude Code skills that fight confirmation bias: an adversarial council of isolated personas, and read-only reviewers that run a different model over your proposal."
tags: ["claude-code", "agents", "skills", "code-review"]
series: ["Building with Claude Code"]
---

When I ask an AI whether my plan is good, it usually says yes. A confident "looks good" that was never tested is the failure I worry about most. So I wrote two Claude Code skills that try to attack a plan instead of agreeing with it.

The first real use was on the skill itself. I asked the council to review its own design, and it unanimously argued for a change: stop saving sessions by default. I made that change.

One skill runs a council of isolated personas. The other asks a different model for a second opinion. I will explain both, and where they fall short.

## What is the council?

`/council` starts several independent subagents. Each one attacks the question through a single lens, and then I combine their answers. The goal is disagreement, not consensus. A council that agrees with everything is worse than no council, because it gives false confidence.

{{< mermaid >}}
graph TD
  Q[Question plus optional diff or files] --> P[Pick a panel]
  P --> A[Persona 1]
  P --> B[Persona 2]
  P --> C[Persona 3 to 5]
  A --> S[Chairman synthesis]
  B --> S
  C --> S
  S --> R[Verdict, confidence, preserved dissent]
{{< /mermaid >}}

## How is it built?

Seven design choices matter.

- **Isolation.** Each persona runs in its own context and never sees the others, so they cannot anchor on each other's answers.
- **Panels by question type.** There are product, code, architecture and debug panels. The architecture panel uses Contrarian-Risk, First-Principles, Operability-SRE, Cost-and-Complexity and Executor.
- **A shared contract.** Every persona must raise at least three concrete objections tied to the real artifact, such as a file and line or the exact claim. Generic praise is banned, and approving is not allowed.
- **Structured output.** Each persona returns a verdict, its objections, its single biggest risk and the one thing it would fix. That makes the synthesis mechanical.
- **Dissent is kept.** A minority view is recorded, not averaged away. If the lenses fundamentally disagree, confidence is LOW and the output says the decision is mine to make.
- **An anti-ceremony guard.** Trivial or factual questions skip the council.
- **Optional rigor.** `--review` adds an anonymized peer round and a judge that critiques the discussion itself. `--quick` uses three cheap personas.

It also saves nothing by default. The council reviewed its own skill and argued for that. Saved sessions contain architecture and security reasoning, backup tools can sync them off the machine, and nothing ever expires them. So saving is opt-in with `--save`.

## What is the limit?

Isolated contexts give independent reasoning, but every persona is still the same model with the same training biases. The judge is the same model too. Independence is not diversity. For a high-stakes call, I want a different model in the loop.

## What are second opinions from other models?

That is the second family of skills: `/ask-codex`, `/ask-cursor`, `/ask-opus` and `/ask-fable`. Each one starts a read-only reviewer subagent. The subagent runs a different CLI against the repo and returns a structured verdict.

- `/ask-codex` runs the OpenAI Codex CLI.
- `/ask-cursor` runs Cursor's headless agent.
- `/ask-opus` and `/ask-fable` run `claude -p` with a larger model at high effort. They help when the main session is on a cheaper model.

The verdict has a fixed shape (AGREE, DISAGREE or CONCERNS) with concrete citations, and the reviewer cannot edit anything. Each call has a budget cap, so a quick second look does not turn into a surprise bill.

## How do I use them?

1. For a trivial question, I just ask. No ceremony.
2. For a real fork in the road, I run `/council` with the matching panel.
3. For a high-stakes or hard-to-reverse decision, I run the council with `--review`, then one cross-model reviewer on the result.

## What would I change?

I have not measured how often this changes an outcome, so I treat it as a habit, not a proof. What it does reliably is make me write down the strongest objection before I commit. That alone has been worth the extra minute.

What I would change next is a small log of decisions with the council's verdict and what actually happened, so I can check whether it helps. I do not have that data yet.

Thanks for reading.
