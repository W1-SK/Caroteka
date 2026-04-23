import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import { useState } from "react";
import Button from "../components/button.tsx";
import TabButton from "../components/tabButton.tsx";

function LootGenPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Navbar pageTitle="Generátor pokladu" activePage="Pán jeskyně" />
      <main className="w-full h-screen flex justify-center items-center">
        <article>
          <nav>
            <TabButton
              text="Náhodný poklad dle nebezbečnosti"
              color="primary"
            />
            <TabButton text="Tabuly pokladu" color="secondary" />
          </nav>
          <section>
            <ul>
              <li></li>
              <li></li>
            </ul>
            <Button text="Vygenerovat" color="primary" />
            <Button text="Vymazat" color="danger" />
          </section>
        </article>
        <article></article>
      </main>
      <Footer />
    </>
  );
}

export default LootGenPage;
