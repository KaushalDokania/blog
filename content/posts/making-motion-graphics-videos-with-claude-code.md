---
title: "Making Motion Graphics Videos With Claude Code"
date: 2026-10-26
draft: false
author: "Kaushal Dokania"
description: "Claude Code has no video button, but a skill can turn it into one. The main approaches, what I built, and every effect I have tried, running live."
tags: ["claude-code", "skills", "motion-graphics", "video"]
series: ["Building with Claude Code"]
---

Claude Code can make motion graphics videos, but only if you give it the right skill. There is no built-in video feature. A skill teaches it a toolkit, and then it writes the code that draws the animation. I have been trying this for a few weeks. Everything you see moving in this post is plain SVG and CSS from my own catalog, running live on this page.

## What does "Claude Code makes videos" mean?

Claude Code does not edit footage. It writes code, and the code draws every frame. A renderer then turns those frames into an MP4.

That has one big benefit. The video is source code. I can read it, change one colour, and render again. I cannot do that with a clip from a video generator.

Here is a small scene from my catalog. The cloud drifts, the LEDs blink, the gear turns and the packets travel. Nothing in it is a video file.

{{< motion demos="scene" large="true" >}}

## Which approaches exist?

I found three popular ones, plus mine. I only read their docs and a few tutorials. I have not built anything with the first three, so treat this as a map, not a review.

- **Remotion.** Videos are React components. Remotion publishes agent skills, so Claude Code knows its conventions. Install with `npx skills add remotion-dev/skills`. The skills cover creating a project, animation, captions, maps and rendering. A third-party guide says larger companies need a paid licence, which I did not verify. Check before you use it for work.
- **HyperFrames.** Videos are plain HTML, CSS and JavaScript. Headless Chrome steps through each frame and FFmpeg encodes them. It is Apache 2.0 and says it is built for agents. It needs Node 22 and FFmpeg. One reviewer notes that fully deterministic output only works on Linux, which I did not test.
- **Manim.** The Python library behind the 3Blue1Brown style of maths video. Several Claude Code skills already wrap it, and some add a planning step before any code. It is the best fit for equations and graphs. I would not use it for product diagrams.
- **A plain web page as the master.** This is what I use. One HTML page holds all scenes and runs from a single clock. A script seeks the page to each frame and captures it. It is the same idea as HyperFrames, built by hand around a skill.

## What did I build?

I used a motion-explainer skill with a template of scene patterns. Claude writes the page. Everything else runs on my Mac:

- Kokoro, a small local text-to-speech model, records the narration.
- Whisper checks the audio against the script and gives word timings for subtitles.
- Playwright and Chrome capture the frames.
- ffmpeg joins video and audio.

{{< pipeline >}}

A 5.5 minute test video came out at 1080p and 60 fps with subtitles. After a one-time model download, only the Claude session needs the internet.

The order matters. The script comes first because narration length sets scene length. The theme comes before the build because colours are tokens in the page, and changing them late means reworking every scene. The voice comes after the page, so the clips are fitted to the scenes.

## How does an element enter the scene?

This is the first thing a scene needs. Four moves cover most of it. Fade and slide is the quiet default. Pop with overshoot is for things that should feel alive. A pulse ring and a highlight sweep tell the viewer where to look.

{{< motion demos="fade pop pulse highlight" >}}

## How do I show flow?

Explainers are mostly about things moving through a system. A line that draws itself shows the path. A token riding the path shows data moving. A spinning arrow shows a loop, and a stagger shows a list arriving item by item.

{{< motion demos="draw token loop stagger" >}}

## How do text and numbers appear?

Spoken words and written words should arrive together, so text types out as the narration reaches it. Numbers count up to their value. Bars grow from the baseline. A shape can morph into another to show one thing becoming the next.

{{< motion demos="type count bars morph" >}}

## How do I move between scenes?

A crossfade is a soft cut. A slide or wipe pushes the old scene out. A camera push zooms into one part, then pulls back. A slowly drifting backdrop adds depth, so a still scene never feels frozen.

{{< motion demos="crossfade slide push backdrop" >}}

## What makes it a video and not a web page?

The effects above run on their own CSS timers. The ones below run from one clock, and that is the real trick. In simple words, if a thing can be a function of time, it can be a scene. Because everything reads the same clock, the page can jump to any frame and render it. That is how the export works.

Easing is the first example. All three dots make the same move, and only the curve changes. Flat feels mechanical, smooth feels calm and the spring feels playful. Parallax moves far layers less than near ones, which gives flat shapes depth. The focus pull animates a blur filter, so a card sharpens into view.

{{< motion demos="easing parallax focus" large="true" >}}

## How do I explain a system?

This is where I spend most of my time. A spotlight mask dims everything except the part the narration is on. Path morphing lets one shape become another, because all four shapes share the same 24 points. A line chart with a riding marker draws the trend and reads out the value as it goes.

{{< motion demos="spotlight shapes line" large="true" >}}

## How do I show data and code?

Rows can re-sort themselves, with each bar gliding to its new place, which shows a ranking change better than two separate charts. Code can type itself, strike through the old line and reveal the fix. A shape can also follow a curve and turn with it, because position and heading both come from the same path.

{{< motion demos="resort code follow" large="true" >}}

## How do these options compare?

| Option | You write | Strength | Watch out for |
|--------|-----------|----------|---------------|
| Remotion | React | Large ecosystem, captions, Studio preview | Licence terms for companies |
| HyperFrames | HTML | Agent-first, Apache 2.0, no build step | Newer, thinner ecosystem |
| Manim | Python | Maths and graphs | Not for product visuals |
| My HTML page | HTML and SVG | Full control, runs offline | I maintain the glue myself |

## What went wrong?

- Narration length changes shift every later scene. Edit one line and you must re-render.
- The text-to-speech model mispronounces names. I keep a small pronunciation list per project.
- Frame capture is slow, so I render in parallel workers.
- My catalog covers motion well but not 3D or maps. Remotion and HyperFrames both look further ahead there, though I have not tried them.

## What would I do first?

If you want a result today, install the Remotion or HyperFrames skill and ask for a 20 second logo reveal. It is the fastest way to see the idea work. If you want something that fits your own diagrams and runs offline, build a single time-driven page, as I did, and add effects from a catalog as you need them.

I have not compared render quality or cost across these tools, so I cannot say which one is best. I can say that treating the first output as a draft and iterating on it worked better than trying to describe the whole video in one prompt.

Thanks for reading.

## Sources

- [Remotion agent skills](https://www.remotion.dev/docs/ai/skills)
- [HyperFrames on GitHub](https://github.com/heygen-com/hyperframes)
- [How to use Remotion agent skills with Claude Code (Tella)](https://www.tella.com/blog/how-to-use-remotion-agent-skills-with-claude-code)
- [HyperFrames vs Remotion (Wireflow)](https://www.wireflow.ai/blog/hyperframes-vs-remotion)
- [Manim skill for Claude Code (yusuke710)](https://github.com/yusuke710/manim-skill)
- [Manim skills (adithya-s-k)](https://github.com/adithya-s-k/manim_skill)
