import "../../index.css";
import Footer from "../components/footer.tsx";
import Navbar from "../components/navbar.tsx";
import LiDbView from "../components/liDbView.tsx";
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
      <main>
        <article className="flex flex-col gap-8 m-8 mt-24 p-6 bg-primary-100/60 rounded-2xl">
          <section className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-title font-medium text-h3">Lecive slovo</h1>
              <p className="text-s italic">Zaklinani 1. urovne</p>
            </div>
            <h2 className="text-h5 font-title font-semibold">PHB'14</h2>
          </section>

          <ul className="flex flex-col">
            <LiDbView title="Vyvolani" text="1 bonusova akce" />
            <LiDbView title="Dosah" text="12 sahu" />
            <LiDbView title="Slozky" text="V" />
            <LiDbView title="Trvani" text="Ihned" />
            <LiDbView title="Povolani" text="Bard, druid, klerik" />
          </ul>

          <p className="text-s">
            Tvor dle tve volby, ktereho vidis v dosahu, si obnovi zivoty rovne
            1k4 + tva oprava sesilaci vlastnosti. Toto kouzlo nijak nepusobi na
            nemrtve ani vytvory. Na vyssich urovnich. Sesles-li toto kouzlo
            pouzitim pozice kouzla 2. ci vyssi urovne, za kazdou dalsi uroven
            pozice nad 1. se zvysi leceni o 1k4.
          </p>
        </article>
        <article></article>
      </main>
      <Footer />
    </>
  );
}

export default DatabaseViewPage;
