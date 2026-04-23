import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMarkdocPage, getMarkdocPages } from "@/lib/markdoc";

type RouteParams = {
  slug?: string[];
};

type MarkdocPageProps = {
  params: Promise<RouteParams>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams(): Promise<RouteParams[]> {
  const pages = await getMarkdocPages();

  return pages.map((page) => {
    if (page.slug.length === 0) {
      return {};
    }

    return { slug: page.slug };
  });
}

export async function generateMetadata({
  params,
}: MarkdocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = slug ?? [];
  const page = await getMarkdocPage(resolvedSlug);

  if (!page) {
    return {};
  }

  const title =
    typeof page.frontmatter.title === "string"
      ? page.frontmatter.title
      : undefined;

  return {
    title: resolvedSlug.length === 0 ? undefined : title,
    description:
      typeof page.frontmatter.description === "string"
        ? page.frontmatter.description
        : undefined,
  };
}

export default async function MarkdocPage({ params }: MarkdocPageProps) {
  const { slug } = await params;
  const page = await getMarkdocPage(slug ?? []);

  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl px-6 py-20 sm:px-8 sm:py-24">
      <article className="markdoc w-full font-serif">{page.content}</article>
    </main>
  );
}
