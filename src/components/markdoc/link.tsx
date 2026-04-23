import Link from "next/link";
import type { ReactNode } from "react";

type MarkdocLinkProps = {
  href: string;
  title?: string;
  children?: ReactNode;
};

function isExternalHref(href: string) {
  return /^(?:[a-z]+:)?\/\//i.test(href);
}

export function MarkdocLink({ href, title, children }: MarkdocLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} title={title}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} title={title}>
      {children}
    </Link>
  );
}
