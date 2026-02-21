import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import LogBox from "../components/logBox.tsx";

function UpdateLogPage() {
  return (
    <>
      <Navbar pageTitle="Záznamy změn" activePage="" />
      <main className="w-full flex flex-col items-center gap-16 pt-72 pb-20">
        <LogBox
          version="0.0.0"
          date="15. února 2026"
          color="primary"
          added={["vytvořena Čarotéka", "stránky pro registraci a přihlášení"]}
          fixed={["žádné opravy, k tomu budou sloužit příští verze"]}
          changed={["změny také žádné, kdo by to byl čekal u první verze"]}
          removed={[
            "doufám že v týhle kategorii toho do budoucna moc nebude, každé odstranění znamená ztracená práce na tom co se odstranilo..",
          ]}
        />
        <LogBox
          version="0.0.0"
          date="15. února 2026"
          color="secondary"
          added={["neco"]}
          fixed={[]}
          changed={["neco3"]}
          removed={[]}
        />
        <LogBox
          version="0.0.0"
          date="15. února 2026"
          color="tertiary"
          added={[]}
          fixed={["neco2"]}
          changed={[]}
          removed={[]}
        />
        <LogBox
          version="0.0.0"
          date="15. února 2026"
          color="primary"
          added={["neco"]}
          fixed={["neco2"]}
          changed={[]}
          removed={[]}
        />
      </main>
      <Footer />
    </>
  );
}

export default UpdateLogPage;
