# blog

This repo contains the sources for my personal website and blog [https://kaushaldokania.github.io/](https://kaushaldokania.github.io/)

This website is powered by [Hugo](https://gohugo.io/)(a static site generator written in Go) and deployed by [GitHub pages](https://pages.github.com/).

### More Information

**Hugo version used**
```bash
$ hugo version
Hugo Static Site Generator v0.64.1/extended windows/amd64 BuildDate: unknown

```

**Hugo Theme**

The Hugo theme which is currently active on this website is [hugo-theme-hello-friend-ng](https://github.com/rhazdon/hugo-theme-hello-friend-ng) by [Djordje Atlialp](https://github.com/rhazdon)

### How it works

The GitHub pages are served from [another repository](https://github.com/KaushalDokania/kaushaldokania.github.io) which has been added as a submodule to this repo in the `public` directory. `public` directory is where hugo generates the static HTML site with the `hugo` command.