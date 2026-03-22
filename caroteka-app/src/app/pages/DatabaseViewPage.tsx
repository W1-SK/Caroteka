import "../../index.css";
import Navbar from "../components/navbar.tsx";
import { useParams } from "react-router-dom";

const titles: Record<string, string> = {
  rasy: "Rasy",
  kouzla: "Kouzla",
  predmety: "Předměty",
  povolani: "Povolání",
  zazemi: "Zázemí",
  odbornosti: "Odbornosti",
  prirucky: "Příručky",
  slovnicek: "Slovníček",
  bestiar: "Bestiář",
  dobrodruzstvi: "Dobrodružství",
  stavy: "Stavy",
  rozsireni: "Rozšíření",
};

function DatabaseViewPage() {
  const { type } = useParams();
  const title = type && titles[type];

  return (
    <>
      <Navbar pageTitle={`Databáze: ${title}`} activePage="Databáze" />
    </>
  );
}

export default DatabaseViewPage;
