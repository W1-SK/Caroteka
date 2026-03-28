import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import TextBox from "../components/textBox.tsx";
import BackgroundIcons from "../components/bgIcons.tsx";
import { useResponsiveValue } from "../hooks/useResponsiveValue.ts";

function LandingPage() {
  const iconCount = useResponsiveValue({
    base: 70,
    sm: 90,
    md: 120,
    lg: 180,
    xl: 220,
  });

  return (
    <>
      <Navbar pageTitle="Domácí stránka" activePage="Domů" />

      <main className="relative flex w-full flex-col items-center gap-12 px-4 pb-10 pt-24 sm:gap-16 sm:px-6 sm:pb-12 sm:pt-28 md:gap-20 lg:gap-28 lg:px-10 lg:pb-16 lg:pt-32 xl:px-16">
        <BackgroundIcons count={iconCount} />

        <svg
          viewBox="0 0 1000 300"
          className="h-auto w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
        >
          <defs>
            <path
              id="textCurve"
              d="M 100 250 Q 500 100 900 250"
              fill="transparent"
            />
          </defs>
          <text
            className="font-logo fill-slate-950"
            fontSize="180"
            letterSpacing="8"
          >
            <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
              ČAROTÉKA
            </textPath>
          </text>
        </svg>

        <article className="flex w-full max-w-7xl flex-col gap-10 sm:gap-12 md:gap-16 lg:gap-20">
          <TextBox
            heading="O Čarotéce"
            text="Tvůj prostor pro objevování a sdílení příběhů! Čarotéka je online platforma, kde můžeš prozkoumat databáze příšer, kouzel a předmětů, připravit si herní sezení pomocí intuitivních nástrojů a ponořit se do interaktivních DnD dobrodružství. Ať už jsi hráč, nebo Pán jeskyně, najdeš tady vše, co potřebuješ k epickey fantasy zábavě."
            color="primary"
            side="left"
          />
          <TextBox
            heading="Databáze"
            text="Prozkoumej tajemství fantasy světů! Naše databáze ti nabízí přehledné informace o nestvůrách, kouzlech, předmětech a dalším obsahu pro tvé hry. Filtruj podle obtížnosti, typu nebo prostředí a najdi přesně to, co potřebuješ pro své dobrodružství. Ideální pro přípravu soubojů, tvorbu questů nebo jen inspiraci."
            color="secondary"
            side="right"
          />
          <TextBox
            heading="Hráč"
            text="Interaktivní prostředí, kde se tvé postavy stávají skutečnými hrdiny! Vytvoř si svého dobrodruha, sleduj jeho vývoj, spravuj inventář a ponořuj se do příběhů vytvořených Pány jeskyně. Hraj, spolupracuj s ostatními a užij si plnohodnotný herní zážitek přímo v prohlížeči."
            color="tertiary"
            side="left"
          />
          <TextBox
            heading="Pán jeskyně"
            text="Nástroje pro přípravu a vedení epických kampaní! Vytvárej vlastní questy, spravuj NPC, organizuj herní sezení a sleduj postup hráčů v reálném čase. S našimi intuitivními nástroji máš vše pod kontrolou – od mapování dungeonů po správu loot tabulek. Staň se mistrem vyprávění!"
            color="primary"
            side="right"
          />
          <TextBox
            heading="Svět"
            text="Buduj své vlastní fantasy světy! Vytvoř unikátní lokace, kultury, frakce a jejich historie. Propoj je s questy a postavami a vytvoř živoucí svět, ve kterém se tvé příběhy odehrávají. Sdílej své světy s komunitou nebo je nech soukromé jen pro tvou skupinu."
            color="secondary"
            side="left"
          />
          <TextBox
            heading="O nás"
            text="Jsme tým dvou studentů na střední IT škole. Oba se zajímáme o web development a hru Dungeons & Dragons, a tak jsme se rozhodli spojit naše zájmy a vytvořit Čarotéku. Kdybyste měli jakékoliv dotazy, nápady či cokoli jiného, neváhejte nás kontaktovat."
            color="tertiary"
            side="right"
          />
        </article>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
