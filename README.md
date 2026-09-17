# Hilokal JWT Grabber

A Chrome extension that captures the session `Cookie` header sent on
hilokal.com's "settings" request, so you can grab it after logging in.

## Repo structure

```
extension/       ← the actual Chrome extension source (load this unpacked)
docs/            ← the GitHub Pages download site + prebuilt .zip
```

## Publishing the download page on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages** in your repo.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`.
4. Set **Branch** to `main` (or whichever branch you pushed) and folder to
   `/docs`.
5. Save. GitHub will give you a URL like
   `https://<your-username>.github.io/<repo-name>/` within a minute or two.

That page has a **Download Extension** button and short install steps for
anyone who visits it.

## Updating the extension

If you change anything in `extension/`, rebuild the zip that the download
page serves:

```bash
cd extension
zip -r ../docs/hilokal-jwt-extension.zip . -x ".*"
```

Then commit and push — the download link on the Pages site will always point
to `docs/hilokal-jwt-extension.zip`, so it updates automatically once pushed.

## Why not a real "Install" button?

Chrome only allows true one-click installs for extensions published on the
**Chrome Web Store** — this is a security restriction, not something a
GitHub Pages site can bypass. If you want that experience later, publishing
to the Chrome Web Store (one-time $5 developer fee + review) is the way to
get it.
