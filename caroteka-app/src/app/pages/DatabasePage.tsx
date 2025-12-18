import '../../index.css'
import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import LiDb from "../components/liDb.tsx";

function DatabasePage() {
    return (
        <>
            <Navbar pageTitle="Databáze" activePage="Databáze"/>
            <main className="w-full h-screen flex justify-evenly items-center">
                <section className="w-1/3 flex flex-col gap-2 items-center">
                    <h2 className="font-title text-h2">Hráč</h2>
                    <ul className="w-full bg-violet-400/60 p-10 rounded-xl flex flex-col gap-6">
                        <LiDb text="Rasy" />
                        <LiDb text="Rasy" />
                        <LiDb text="Rasy" />
                        <LiDb text="Rasy" />
                        <LiDb text="Rasy" />
                        <LiDb text="Rasy" />
                    </ul>
                </section>
                <section className="w-1/3 flex flex-col gap-2 items-center">
                    <h2 className="font-title text-h2">Pravidla</h2>
                    <ul className="w-full bg-emerald-300/50 p-10 rounded-xl flex flex-col gap-6">
                        <LiDb text="Stavy" />
                        <LiDb text="Stavy" />
                        <LiDb text="Stavy" />
                        <LiDb text="Stavy" />
                        <LiDb text="Stavy" />
                        <LiDb text="Stavy" />
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    )
}


export default DatabasePage
