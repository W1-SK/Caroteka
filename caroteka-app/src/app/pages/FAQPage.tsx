import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

function FAQ() {
  return (
    <>
      <Navbar pageTitle="FAQ" activePage="" />
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl">
          Zatím jsme nedostali tolik otázek. Až se tak stane, ty nejčastější
          najdete zde.
        </h1>
        <Link className="text-tertiary-500 hover:text-tertiary-500/50" to="/">
          Zpátky domů?
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default FAQ;
