---
title: Process
description: How static Markdoc pages are generated in this app.
---

# {% $markdoc.frontmatter.title %}

The pipeline is deliberately simple.

1. The build walks `content/pages/` for `.md` and `.mdoc` files.
2. Each file becomes a route slug.
3. `generateStaticParams` returns the full list of slugs.
4. The route is locked with `dynamicParams = false`, so pages outside that list do not exist.
5. Markdoc parses the document, frontmatter is read once, and the page is rendered as static content.

Nothing in this setup creates pages at request time.

Return to the [index](/).
