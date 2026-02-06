import "../../index.css";
import { Link } from "react-router";

function Footer() {
  return (
    <>
      <footer className="w-full text-xs bg-teal-200/40 px-4 py-2 flex items-center justify-center gap-20">
        <p>Copyright &copy; 2025 Čarotéka. Všechna práva vyhrazena.</p>
        <nav className="flex items-center justify-between gap-4">
          <Link to="/" className="border-r border-dark-tr-50 pr-4">
            Základy ochrany soukromí
          </Link>
          <Link to="/" className="border-r border-dark-tr-50 pr-4">
            Používání cookies
          </Link>
          <Link to="/" className="border-r border-dark-tr-50 pr-4">
            Podmínky použití
          </Link>
          <Link to="/" className="border-r border-dark-tr-50 pr-4">
            Mapa webu
          </Link>
          <Link to="/faq" className="border-r border-dark-tr-50 pr-4">
            FAQ
          </Link>
          <Link to="/">Domů</Link>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
