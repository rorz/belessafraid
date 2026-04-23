# belessafraid

This project now runs on [vinext](https://github.com/cloudflare/vinext): the Next.js API surface reimplemented on Vite.

The app code is still standard Next-style App Router code under `src/app/`, and `next.config.ts` is still used. `next` remains installed because vinext still relies on parts of the Next.js package for compatibility and types.

## Getting Started

Run the vinext development server:

```bash
bun run dev
```

Build and start the production server:

```bash
bun run build
bun run start
```

The default app route lives at `src/app/page.tsx`.

## Compatibility Notes

- `next/font/google` works, but vinext loads Google fonts from the CDN instead of self-hosting them at build time.
- `next/image` works through vinext's compatibility layer.
