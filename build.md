## Writing and publishing

```bash
git clone --recurse-submodules git@github.com:KaushalDokania/blog.git   # or: git submodule update --init
hugo new posts/my-post-title.md     # creates a draft in content/posts/
hugo server -D                      # live preview at http://localhost:1313 (includes drafts)
```

1. Write the post, then set `draft: false`, add `description` and `tags`.
2. `git add . && git commit -m "Add post: <title>" && git push origin master`

The `Deploy` workflow (`.github/workflows/deploy.yaml`) builds the site with Hugo and pushes the output to
`KaushalDokania/kaushaldokania.github.io`, which GitHub Pages serves. Nothing else to do by hand.

### One-time setup

The workflow pushes with an SSH deploy key:

1. `ssh-keygen -t ed25519 -N "" -f pages_deploy_key`
2. Add `pages_deploy_key.pub` as a deploy key **with write access** on `kaushaldokania.github.io`.
3. Add the private key as the secret `PAGES_DEPLOY_KEY` on `blog`, then delete both local key files.

### Local requirements

Hugo extended v0.167.0 (`brew install hugo`). The theme is the `themes/hello-friend-ng` submodule.
