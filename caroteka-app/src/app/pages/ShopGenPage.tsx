import "../../index.css";
import Navbar from "../components/navbar.tsx";
import { Link } from "react-router-dom";
import Footer from "../components/footer.tsx";

function ShopGenPage() {
  return (
    <>
      <Navbar pageTitle="404" activePage="" />
      <main className="flex justify-center items-center flex-col w-full h-screen">
        <h1 className="text-3xl">
          Error 404, všichni občas narazíme na prázdnou jeskyni..
        </h1>
        <Link className="text-blue-500" to="/">
          Zpátky domů?
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default ShopGenPage;
