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
      <main className="h-screen w-full flex justify-evenly items-center">
        <section className="w-1/3 flex flex-col gap-2 items-center">
          <h2 className="font-title text-h2">Hráč</h2>
          <ul className="w-full bg-violet-400/60 p-10 rounded-xl flex flex-col gap-6">
            <LiDb to="/databaze/rasy" icon={Skull} text="Rasy" />
            <LiDb to="/databaze/kouzla" icon={Wand2} text="Kouzla" />
            <LiDb to="/databaze/predmety" icon={Sword} text="Předměty" />
            <LiDb to="/databaze/povolani" icon={Shield} text="Povolání" />
            <LiDb to="/databaze/zazemi" icon={Castle} text="Zázemí" />
            <LiDb to="/databaze/odbornosti" icon={Key} text="Odbornosti" />
          </ul>
        </section>
        <section className="w-1/3 flex flex-col gap-2 items-center">
          <h2 className="font-title text-h2">Pravidla</h2>
          <ul className="w-full bg-emerald-300/50 p-10 rounded-xl flex flex-col gap-6">
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
      </main>
      <Footer />
    </>
  );
}

export default DatabasePage;
