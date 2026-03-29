import "../../index.css";
import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import LiDb from "../components/liDb.tsx";
import {
  Sword,
  Wand2,
  Shield,
  Scroll,
  BookOpen,
  Skull,
  Heart,
  Trophy,
  Key,
  Map,
  Compass,
  Castle,
} from "lucide-react";

function DatabasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar pageTitle="Databáze" activePage="Databáze" />

      <main className="lg:min-h-[900px] flex-1 flex flex-col lg:justify-center">
        <article className="mt-28 mb-20 flex flex-col gap-12 lg:mt-0 lg:mb-0 lg:flex-row lg:items-start lg:justify-center lg:px-8">
          <section className="flex flex-col items-center lg:flex-1">
            <h2 className="font-title text-h3 sm:text-h2">Hráč</h2>
            <ul className="w-full flex flex-col gap-4 bg-primary-300 p-8 lg:rounded-4xl">
              <LiDb to="/databaze/rasy" icon={Skull} text="Rasy" />
              <LiDb to="/databaze/kouzla" icon={Wand2} text="Kouzla" />
              <LiDb to="/databaze/predmety" icon={Sword} text="Předměty" />
              <LiDb to="/databaze/povolani" icon={Shield} text="Povolání" />
              <LiDb to="/databaze/zazemi" icon={Castle} text="Zázemí" />
              <LiDb to="/databaze/odbornosti" icon={Key} text="Odbornosti" />
            </ul>
          </section>

          <section className="flex flex-col items-center lg:flex-1">
            <h2 className="font-title text-h3 sm:text-h2">Pravidla</h2>
            <ul className="w-full flex flex-col gap-4 bg-secondary-300 p-8 lg:rounded-4xl">
              <LiDb to="/databaze/prirucky" icon={Map} text="Příručky" />
              <LiDb to="/databaze/slovnicek" icon={BookOpen} text="Slovníček" />
              <LiDb to="/databaze/bestiar" icon={Trophy} text="Bestiář" />
              <LiDb
                to="/databaze/dobrodruzstvi"
                icon={Compass}
                text="Dobrodružství"
              />
              <LiDb to="/databaze/stavy" icon={Heart} text="Stavy" />
              <LiDb to="/databaze/rozsireni" icon={Scroll} text="Rozšíření" />
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default DatabasePage;
