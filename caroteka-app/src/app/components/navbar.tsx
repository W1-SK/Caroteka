import '../../index.css'
import NavbarButton from './navbarButton.tsx'
import Button from "./button.tsx";
import ThemeButton from "./themeButton.tsx";

interface NavbarProps {
    pageTitle: string;
    activePage: string;
}
function Navbar(props: NavbarProps){
    return(
        <>
            <header className={"flex w-full flex-col"}>
                <div className={"flex justify-between items-center border-b border-dark-tr-20 p-4"}>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <div className={"bg-primary w-12 h-12"}/>
                        {/* zmenit na obrazek */}
                        <p className={"font-logo text-logo-text"}>ČAROTÉKA</p>
                    </div>
                    <h6 className={"absolute left-1/2 -translate-x-1/2 font-action text-action-h6"}>{props.pageTitle}</h6>
                    <div className={"flex gap-3"}>
                        <ThemeButton color="dark"
                                     icon={
                                         <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             className="w-6 h-6 text-light"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                         >
                                             <path
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round"
                                                 strokeWidth={2}
                                                 d="M12 4v16m8-8H4"
                                             />
                                         </svg>
                                     }/>
                        <Button text="Přihlásit se" color="primary"/>
                        <Button text="Registrovat se" color="secondary"/>
                    </div>
                </div>
                <nav className={"flex w-full items-center justify-center gap-3"}>
                    <NavbarButton text="Domů" isActive={props.activePage === "Domů"} />
                    <NavbarButton text="Databáze" isActive={props.activePage === "Databáze"} />
                    <NavbarButton text="Hráč" isActive={props.activePage === "Hráč"} />
                    <NavbarButton text="Pán jeskyně" isActive={props.activePage === "Pán jeskyně"} />
                    <NavbarButton text="Svět" isActive={props.activePage === "Svět"} />
                </nav>
            </header>
        </>
    )
}

export default Navbar
