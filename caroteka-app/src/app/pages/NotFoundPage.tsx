import { Link } from "react-router-dom";
import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import BackgroundIcons from "../components/bgIcons.tsx";

function NotFoundPage() {
  return (
    <>
      <Navbar pageTitle="404" activePage="" />
      <main className="flex justify-center items-center flex-col w-full h-screen">
        <BackgroundIcons count={60} bg="bg-danger-500" seed={224} />
        <h1 className="text-5xl font-title">Error 404</h1>
        <p className="text-lg">Stránka nebyla nalezena</p>
        <Link className="text-blue-500" to="/">
          Zpátky domů?
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
