# Arsenal 2025/26 Champions Longform Site

Static GitHub Pages site for a non-official Arsenal 2025/26 Premier League title celebration.

## Live page

GitHub Pages serves from `docs/`:

https://dongdongsmall.github.io/arsenal-editorial-hub/

Taste-skill second version:

https://dongdongsmall.github.io/arsenal-editorial-hub/taste/

## Local preview

```bash
cd docs
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## Verification

```bash
node scripts/verify-site.mjs
node scripts/verify-taste-site.mjs
```

The verifier checks the longform homepage structure, responsive metadata, champion facts, official source links, visual-system classes, mobile CSS, and updated search data.

## Sources

- Premier League official title confirmation and season summary.
- Premier League official trophy-lift article.
- Emirates Stadium image by Huy Phan on Unsplash.

This is a fan-made page and is not affiliated with Arsenal Football Club or the Premier League.
