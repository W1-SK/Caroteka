import { Link } from "react-router";

function Footer() {
  return (
    <footer className="w-full flex justify-center items-center px-4 py-2 gap-20 text-xs bg-tertiary-200/40">
      <p>Copyright &copy; 2025 Čarotéka. Všechna práva vyhrazena.</p>
      <nav className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="border-r border-black/20 hover:text-primary-600 focus:text-primary-600 pr-4"
        >
          Základy ochrany soukromí
        </Link>
        <Link
          to="/"
          className="border-r border-black/20 hover:text-primary-600 focus:text-primary-600 pr-4"
        >
          Používání cookies
        </Link>
        <Link
          to="/"
          className="border-r border-black/20 hover:text-primary-600 focus:text-primary-600 pr-4"
        >
          Podmínky použití
        </Link>
        <Link
          to="/"
          className="border-r border-black/20 hover:text-primary-600 focus:text-primary-600 pr-4"
        >
          Mapa webu
        </Link>
        <Link
          to="/faq"
          className="border-r border-black/20 hover:text-primary-600 focus:text-primary-600 pr-4"
        >
          FAQ
        </Link>
        <Link to="/">Domů</Link>
      </nav>
    </footer>
  );
}

export default Footer;
