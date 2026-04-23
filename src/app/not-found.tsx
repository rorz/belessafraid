import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl px-6 py-20 sm:px-8 sm:py-24">
      <article className="markdoc w-full font-serif">
        <h1>Not found</h1>
        <p>This route was not generated at build time.</p>
        <p>
          Return to the <Link href="/">index</Link>.
        </p>
      </article>
    </main>
  );
}
