"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const HomeLink = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return isHome ? null : (
    <Link href="/" className="mb-8 text-mist-500">
      &larr; Home
    </Link>
  );
};
