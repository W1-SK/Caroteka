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
    <>
      <Navbar pageTitle="Databáze" activePage="Databáze" />

      <main className="w-full h-screen px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-evenly lg:gap-10">
          <section className="flex w-full flex-col items-center gap-3 lg:w-1/3">
            <h2 className="font-title text-h3 sm:text-h2">Hráč</h2>
            <ul className="flex w-full flex-col gap-4 rounded-xl bg-violet-400/60 p-5 sm:p-6 md:gap-5 md:p-8 lg:gap-6 lg:p-10">
              <LiDb to="/databaze/rasy" icon={Skull} text="Rasy" />
              <LiDb to="/databaze/kouzla" icon={Wand2} text="Kouzla" />
              <LiDb to="/databaze/predmety" icon={Sword} text="Předměty" />
              <LiDb to="/databaze/povolani" icon={Shield} text="Povolání" />
              <LiDb to="/databaze/zazemi" icon={Castle} text="Zázemí" />
              <LiDb to="/databaze/odbornosti" icon={Key} text="Odbornosti" />
            </ul>
          </section>

          <section className="flex w-full flex-col items-center gap-3 lg:w-1/3">
            <h2 className="font-title text-h3 sm:text-h2">Pravidla</h2>
            <ul className="flex w-full flex-col gap-4 rounded-xl bg-emerald-300/50 p-5 sm:p-6 md:gap-5 md:p-8 lg:gap-6 lg:p-10">
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
        </div>
      </main>

      <Footer />
    </>
  );
}

export default DatabasePage;
