import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

function FAQ() {
  return (
    <>
      <Navbar pageTitle="FAQ" activePage="" />
      <main className="flex justify-center items-center flex-col w-full h-screen">
        <h1 className="text-3xl">
          Zatím jsme nedostali tolik otázek. Až se tak stane, ty nejčastější
          najdete zde.
        </h1>
        <Link className="text-blue-500" to="/">
          Zpátky domů?
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default FAQ;
