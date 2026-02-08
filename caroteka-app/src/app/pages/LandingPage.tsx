import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import TextBox from "../components/textBox.tsx";
import BackgroundIcons from "../components/bgIcons.tsx";

function LandingPage() {
  return (
    <>
      <Navbar pageTitle="Domácí stránka" activePage="Domů" />
      <main className="w-full flex flex-col items-center gap-28 p-40 pt-48 relative">
        <BackgroundIcons count={220} />
        <svg viewBox="0 0 1000 300" className="w-full max-w-4xl h-auto">
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
        <article className="w-full max-w-[1600px] min-w-[600px] flex flex-col gap-20">
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
