// import { useState } from 'react'
import '../../index.css'
import Navbar from '../components/navbar.tsx'
import Footer from "../components/footer.tsx";
import TextBox from '../components/textBox.tsx'

function LandingPage() {
    return (
        <>
            <Navbar pageTitle="Domácí stránka" activePage="Domů"/>
            <main className="w-full flex flex-col items-center gap-40 p-40">
                <h1 className="font-logo text-9xl">ČAROTÉKA</h1> {/* DOESNT YET WRAP AROUND A CIRCLE */}
                <article className="w-full flex flex-col gap-20">
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
                        text="Kdo vi, my totiz urcite ne."
                        color="tertiary"
                        side="right"
                    />
                </article>
            </main>
            <Footer/>
        </>
    )
}

export default LandingPage