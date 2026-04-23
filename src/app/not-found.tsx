import Link from "next/link";
import { ReaderArticle } from "@/components/reader/article";

export default function NotFound() {
  return (
    <ReaderArticle>
      <h1>Not found</h1>
      <p>This route was not generated at build time.</p>
      <p>
        Return to the <Link href="/">index</Link>.
      </p>
    </ReaderArticle>
  );
}
