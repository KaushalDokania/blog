---
title: "Blog feature showcase"
date: 2026-10-23
draft: true
description: "Draft used to check diagrams, media, callouts and embedded HTML. Delete before publishing real posts."
tags: ["meta"]
---

{{< alert >}}Callouts, diagrams, video and embedded HTML all work in a post.{{< /alert >}}

## Diagram

{{< mermaid >}}
graph LR
  A[Write markdown] --> B[git push]
  B --> C[GitHub Actions: hugo build]
  C --> D[GitHub Pages]
{{< /mermaid >}}

## Embedded HTML page

{{< html-embed src="hello.html" height="160" title="Counter demo" >}}

## Math and code

{{< katex >}}

Inline math \(E = mc^2\), and a code block:

```go
fmt.Println("hello")
```

## Media

Video: `{{</* video src="clip.mp4" autoplay=true loop=true muted=true */>}}` (put the file in `static/`). YouTube: `{{</* youtubeLite id="VIDEO_ID" */>}}`. Images: drop them next to the post in a page bundle and use `![alt](image.png)` or the `figure` shortcode.
