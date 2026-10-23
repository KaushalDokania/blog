---
title: "Sentinel: A Personal Command Center Dashboard"
date: 2026-10-23
draft: false
author: "Kaushal Dokania"
description: "How I built a read-only personal dashboard, driven by a Claude Code skill, that pulls chat, issues, pull requests, notes and AI sessions into one local HTML page."
tags: ["claude-code", "dashboard", "automation", "developer-productivity"]
series: ["Building with Claude Code"]
---

I built a small tool called Sentinel that answers one question: what needs my attention right now? It collects data from my chat, issue tracker, code host, notes app and AI sessions, and writes one local HTML page. A Claude Code skill does the collecting. I have not measured how much time it saves.

## What problem does it solve?

My work state lives in five places. Chat has mentions. The issue tracker has tickets. The code host has pull requests and failing checks. The notes app has tasks. My AI sessions have half-finished work.

Checking each one is slow. Worse, none of them tells me which item matters most. I wanted one list, sorted by urgency.

## What is a "collector"?

A collector is a small unit that reads one source and returns JSON in a fixed shape. In simple words, it is an adapter with no side effects.

Sentinel has one collector per source. Each one runs in parallel. If one fails, the dashboard still renders the others and shows a warning in the failed panel.

## How does it work end to end?

```text
config.json -> collectors (parallel) -> action items -> HTML + JSON
```

1. Read a config file. Each source has an `enabled` flag.
2. Run all enabled collectors at once.
3. Merge the results into a single priority list.
4. Embed the data as JSON in a self-contained HTML file.
5. Open the file in the browser.

The page uses inline CSS and vanilla JavaScript. It has no build step and works from a `file://` path. The raw JSON is also saved next to it, which makes debugging easy.

## How does it decide what is urgent?

The rules are simple and written down. They are not a model's guess. These are the kinds of rules I use:

- A critical-priority ticket is critical.
- A pull request with a failing check is high.
- A review request waiting on me is medium.
- A chat mention that contains a question or an action word is medium.
- A task past its due date is high.
- A thread I joined that has new replies is low.

The list is sorted by urgency, then by recency. I feel plain rules are the right call here. I can read them, argue with them and change them in a minute.

## Why a Claude Code skill and not a script?

Some sources I reach through command line tools. Others I reach through MCP connectors that already hold my login. A skill lets Claude call both and write the glue.

The skill is a markdown file that describes the steps, the JSON shapes and the safety rules. The same file runs by hand, from a shell wrapper using `claude -p`, or on a recurring schedule.

The cost is that every refresh runs a model session. A plain script would be faster and cheaper per run. I did not compare the two.

## Which options did I reject?

- A hosted dashboard: it would need my data on someone else's server.
- Write access to the sources: a dashboard that posts or edits is a risk I do not need. Sentinel is read-only.
- A framework front end: I considered one for the layout. A single static file was easier to keep working.
- Historical charts: I left them out of scope. The page shows now, not trends.

## What went wrong?

- One source exposes calendar events in a format my connector could not parse. I disabled that collector instead of working around it.
- A search for "my pull requests" returned nothing until I used the author filter instead of the assignee filter. Assignee is rarely set.
- Scheduled sessions expire after a while, so auto-refresh needs renewing. I have not found a clean fix.

## What would I change?

I would move the collection step out of the model and into a plain script, and keep the model only for summarising. It would be cheaper and more repeatable. I would also store each refresh, so I could see how my queue changes over a week.

I would also keep secrets and identifiers out of the skill file from day one, and load them from a config file instead.

Thanks for reading.
