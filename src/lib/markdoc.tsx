import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import Markdoc from "@markdoc/markdoc";
import React, { cache } from "react";
import { parse as parseYaml } from "yaml";
import config from "../../markdoc/config";

const CONTENT_ROOT = path.join(process.cwd(), "content", "pages");
const MARKDOC_EXTENSIONS = new Set([".md", ".mdoc"]);

export type MarkdocFrontmatter = {
  title?: string;
  description?: string;
  [key: string]: unknown;
};

export type MarkdocPage = {
  slug: string[];
  href: string;
  filePath: string;
  frontmatter: MarkdocFrontmatter;
  content: React.ReactNode;
};

function slugToHref(slug: string[]) {
  return slug.length === 0 ? "/" : `/${slug.join("/")}`;
}

function slugToKey(slug: string[]) {
  return slug.join("/");
}

function filePathToSlug(filePath: string) {
  const withoutExtension = filePath.replace(/\.(md|mdoc)$/u, "");
  const segments = withoutExtension.split(path.sep);

  if (segments.at(-1) === "index") {
    segments.pop();
  }

  return segments;
}

function parseFrontmatter(frontmatter: unknown): MarkdocFrontmatter {
  if (typeof frontmatter !== "string" || frontmatter.trim().length === 0) {
    return {};
  }

  const parsed = parseYaml(frontmatter);

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }

  return parsed as MarkdocFrontmatter;
}

async function walkMarkdocFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walkMarkdocFiles(absolutePath);
      }

      if (!MARKDOC_EXTENSIONS.has(path.extname(entry.name))) {
        return [];
      }

      return [absolutePath];
    }),
  );

  return files.flat().sort();
}

async function loadMarkdocPage(absolutePath: string): Promise<MarkdocPage> {
  const filePath = path.relative(CONTENT_ROOT, absolutePath);
  const source = await readFile(absolutePath, "utf8");
  const ast = Markdoc.parse(source);
  const frontmatter = parseFrontmatter(ast.attributes.frontmatter);
  const slug = filePathToSlug(filePath);
  const href = slugToHref(slug);
  const tree = Markdoc.transform(ast, {
    ...config,
    variables: {
      markdoc: {
        frontmatter,
        href,
        slug,
      },
    },
  });

  return {
    slug,
    href,
    filePath,
    frontmatter,
    content: Markdoc.renderers.react(tree, React),
  };
}

export const getMarkdocPages = cache(async () => {
  const files = await walkMarkdocFiles(CONTENT_ROOT);
  return Promise.all(files.map((filePath) => loadMarkdocPage(filePath)));
});

const getMarkdocPageByKey = cache(async (slugKey: string) => {
  const pages = await getMarkdocPages();
  return pages.find((page) => slugToKey(page.slug) === slugKey) ?? null;
});

export function getMarkdocPage(slug: string[]) {
  return getMarkdocPageByKey(slugToKey(slug));
}
