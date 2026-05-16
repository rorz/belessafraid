export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12">
      <p className="text-mist-500">&copy; Rory McMeekin {year}</p>
    </footer>
  );
};
