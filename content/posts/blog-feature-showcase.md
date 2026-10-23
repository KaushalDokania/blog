---
title: "Blog feature showcase"
date: 2026-10-23
draft: true
description: "Draft used to check diagrams, media, callouts and embedded HTML. Delete before publishing real posts."
tags: ["meta"]
---

{{< alert >}}Callouts, diagrams, video and embedded HTML all work in a post.{{< /alert >}}

## Diagram

{{< fig title="From draft to live" subtitle="Publishing pipeline" caption="Every push to master builds the site and deploys it to GitHub Pages." >}}
{{< mermaid >}}
graph LR
  A[Write markdown] --> B[git push]
  B --> C[GitHub Actions: hugo build]
  C --> D[GitHub Pages]
{{< /mermaid >}}
{{< /fig >}}

## Chart

{{< fig title="Posts per year" subtitle="Illustrative data" caption="A Chart.js chart inside a figure card." >}}
{{< chart >}}
type: 'bar',
data: {
  labels: ['2020', '2026'],
  datasets: [{ label: 'Posts', data: [2, 3], backgroundColor: ['#3b82f6', '#60a5fa'] }]
},
options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
{{< /chart >}}
{{< /fig >}}

## Pull quote

{{< pullquote by="Example" >}}A council that agrees with everything is worse than no council.{{< /pullquote >}}

## Table

| Component | Shortcode |
|-----------|-----------|
| Figure card | `fig` |
| Pull quote | `pullquote` |
| Embedded page | `html-embed` |
| Diagram | `mermaid` |

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
