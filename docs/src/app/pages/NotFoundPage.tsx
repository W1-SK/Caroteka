import { Link } from "react-router-dom";
import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import BackgroundIcons from "../components/bgIcons.tsx";
import { useResponsiveValue } from "../hooks/useResponsiveValue.ts";

function NotFoundPage() {
  const iconCount = useResponsiveValue({
    base: 30,
    sm: 40,
    md: 60,
    lg: 80,
    xl: 100,
  });

  return (
    <>
      <Navbar pageTitle="404" activePage="" />
      <main className="flex justify-center items-center flex-col w-full h-screen">
        <BackgroundIcons count={iconCount} bg="bg-danger-500" seed={224} />
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
