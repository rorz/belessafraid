import type { ReactNode } from "react";

type ReaderArticleProps = {
  children: ReactNode;
};

export function ReaderArticle({ children }: ReaderArticleProps) {
  return (
    <main className="reader-shell">
      <article className="reader-prose">{children}</article>
    </main>
  );
}
