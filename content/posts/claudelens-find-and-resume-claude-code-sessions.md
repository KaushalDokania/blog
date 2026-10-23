---
title: "Claude Code Can't Find Your Renamed Sessions, So I Built ClaudeLens"
date: 2026-10-23
draft: false
author: "Kaushal Dokania"
description: "A small Go terminal UI to search, preview and resume Claude Code sessions across projects, including sessions that moved through git worktrees."
tags: ["claude-code", "go", "tui", "tooling"]
series: ["Building with Claude Code"]
---

I use Claude Code every day. Right now my `~/.claude/projects` folder holds 134 sessions and about 1 GB of transcripts. I usually remember what I worked on, but not which project it was in, and `/resume` does not help. So I built a small terminal tool called ClaudeLens to fix it.

This post covers what it does, how it finds sessions, and one resume bug that took me a while to understand.

## What is the problem?

Two things make old sessions hard to find.

First, names you set with `/rename` are not indexed for search. This is a [known issue](https://github.com/anthropics/claude-code/issues/26249). Second, the picker only looks at the current project, so a session from another project never shows up.

## What does ClaudeLens do?

It lists the sessions from every project in one place. You search, read the conversation, and resume with one key.

- **Cross-project list.** Every session from every project.
- **Layered search.** A fast index search, plus optional semantic search through [claude-mem](https://www.npmjs.com/package/claude-mem) if you run it.
- **Preview.** Scroll the conversation before you commit to resuming it.
- **One-key resume.** In a new tab on iTerm2, Terminal.app and tmux, or in the current tab on Warp.

Install and run it:

```bash
go install github.com/KaushalDokania/claudelens@latest
claudelens --search "auth refactor"
```

<!-- TODO(kaushal): short screen recording of search, preview, resume (muted mp4). -->

## How does it find sessions?

It does not have a database or a background process. It reads what Claude Code already writes under `~/.claude/`.

```text
~/.claude/projects/*/sessions-index.json   summaries, timestamps, branches
~/.claude/sessions/*.json                  names from /rename (active sessions)
~/.claude/projects/*/*.jsonl               full conversation, used for preview
localhost:37777 (optional)                 claude-mem: summaries and semantic search
```

In simple words, it cannot get out of sync with Claude Code, because it only reads Claude Code's own files.

## Why does `claude --resume` say "no conversation found"?

This is the bug that cost me time. `claude --resume <id>` only works when you run it from the right directory. The right directory is the one whose encoded name matches the session's storage folder under `~/.claude/projects/`. The encoding replaces every character that is not a letter or digit with `-`. So `/Users/me/work/my.repo` is stored as `-Users-me-work-my-repo`.

The catch is that a session can move. I start in the main checkout, switch to a git worktree halfway, and the transcript now records more than one working directory. If I resume from the wrong one, Claude Code says it found nothing, even though the session is sitting on disk.

ClaudeLens reads every working directory recorded in the session. It picks the one that encodes to the real storage folder, not just the first one it saw.

## How does it resume in a new tab?

It depends on the terminal.

| Terminal | What ClaudeLens does |
|----------|----------------------|
| iTerm2 | New tab through AppleScript |
| Terminal.app | New window through AppleScript |
| tmux | `tmux new-window` |
| Warp | Resumes in the current tab |

Warp was the awkward one. It has no AppleScript support, and its `warp://` URL scheme cannot run commands. My first attempts relied on that URL scheme and were unreliable, and I dropped them. What works is replacing the ClaudeLens process itself with `claude --resume` in the right directory. That is one keypress and nothing to break. If it is not possible, ClaudeLens falls back to a Warp tab config, and then to copying the full `cd && claude --resume ...` command to the clipboard.

## What did I learn about Bubbletea layouts?

Many of my early commits were layout fixes, which says something. Three things finally made the panes stable:

- **Clip everything to exact sizes.** Pad or truncate each pane to its width and height, then hard-clip the whole `View()` to the terminal height.
- **Truncate with ANSI awareness.** Cutting a styled string by bytes breaks the escape codes. Use lipgloss `Width` and `MaxWidth` instead of `len`.
- **Draw the borders yourself.** Lipgloss borders fought with my height clipping. A small box-drawing function was simpler.

## What would I change?

I would add the recording first. A one-minute demo explains the tool better than this post does. I would also look at whether the worktree handling can be simplified, since it only exists because sessions move between directories.

ClaudeLens is MIT licensed and small. If you lose sessions the way I do, try it, and open an issue if it does not find yours: [github.com/KaushalDokania/claudelens](https://github.com/KaushalDokania/claudelens).

Thanks for reading.
