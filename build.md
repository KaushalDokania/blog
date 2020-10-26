## How to build and deploy

1. For the repo `KaushalDokania/blog`
    1. Add the new blog post or make any changes.
    2. Run the server and test the changes

        ```bash
        hugo new posts/why-go-is-better-than-java?.md
        hugo server -D
        ```

    3. Un-draft the new post when ready and test again
    4. Commit the changes

        **Note:** Make sure the `baseURL` in configuration is ***kaushaldokania.github.io*** 

        ```bash
        git add .
        git commit -m "Adding new post - Why Go is better than Java?"
        git push origin master
        ```

2. For the repo `KaushalDokania/kaushaldokania.github.io`
    1. Run `hugo` in the first repo to build and generate the static HTML site into the `public` directory
    2. Go to `public` directory
    3. Commit the changes

        ```bash
        git add .
        git commit -m "Rebuilding site"
        git push origin master
        ```