import type { ReactNode } from "react";
import { HomeLink } from "../home-link";
import { Footer } from "../footer";

type ReaderArticleProps = {
  children: ReactNode;
};

export function ReaderArticle({ children }: ReaderArticleProps) {
  return (
    <main className="reader-shell">
      <HomeLink />
      <article className="reader-prose">{children}</article>
      <Footer />
    </main>
  );
}
