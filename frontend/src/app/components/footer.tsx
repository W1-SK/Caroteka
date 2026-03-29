import { Link } from "react-router";

function Footer() {
  const links = [
    { to: "/", label: "Základy ochrany soukromí" },
    { to: "/", label: "Používání cookies" },
    { to: "/", label: "Podmínky použití" },
    { to: "/", label: "Mapa webu" },
    { to: "/faq", label: "FAQ" },
    { to: "/", label: "Domů" },
  ];

  return (
    <footer className="w-full bg-tertiary-200/40 px-4 py-4 text-xs">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 md:gap-5 xl:flex-row xl:justify-center xl:gap-12">
        <p className="text-center leading-relaxed xl:text-left">
          Copyright &copy; 2025 Čarotéka.&nbsp;
          <br className="block sm:hidden" />
          Všechna práva vyhrazena.
        </p>

        <nav className="flex w-full flex-col items-center gap-2 text-center md:flex-row md:flex-wrap md:justify-center md:gap-x-4 md:gap-y-2 xl:w-auto xl:flex-nowrap xl:items-center xl:gap-0">
          {links.map((link, index) => (
            <Link
              key={link.label}
              to={link.to}
              className={`
                hover:text-primary-600 focus:text-primary-600 transition-colors
                xl:px-4
                ${index !== links.length - 1 ? "xl:border-r xl:border-black/20" : ""}
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
