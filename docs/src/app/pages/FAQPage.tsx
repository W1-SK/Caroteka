import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

function FAQ() {
  return (
    <>
      <Navbar pageTitle="FAQ" activePage="" />

      <main className="w-full h-screen px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <section className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center gap-4 text-center sm:gap-5">
          <h1 className="text-xl leading-relaxed sm:text-2xl lg:text-3xl">
            Zatím jsme nedostali tolik otázek. Až se tak stane, ty nejčastější
            najdete zde.
          </h1>

          <Link
            className="text-tertiary-500 transition-colors hover:text-tertiary-500/50"
            to="/"
          >
            Zpátky domů?
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default FAQ;
