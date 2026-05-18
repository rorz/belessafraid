import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 flex justify-between align-baseline text-mist-500">
      <p className="text-sm">&copy; Rory McMeekin {year}</p>
      <div className="flex gap-2 text-sm">
        <Link target="_blank" href="https://github.com/rorz">
          GitHub
        </Link>
        <Link target="_blank" href="https://linkedin.com/in/rorz">
          LinkedIn
        </Link>
        <Link target="_blank" href="https://x.com/rorzio">
          X
        </Link>
      </div>
    </footer>
  );
};
