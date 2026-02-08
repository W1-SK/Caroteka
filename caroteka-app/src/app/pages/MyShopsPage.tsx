import "../../index.css";
import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import { Link } from "react-router-dom";
import LiShops from "../components/liShops.tsx";

function MyShopsPage() {
  return (
    <>
      <Navbar pageTitle="404" activePage="" />
      <main className="w-full min-h-screen flex justify-center p-32 pt-48">
        <ul className="w-full grid grid-cols-5 gap-8">
          {Array.from({ length: 28 }, (_, i) => {
            const colors: ("primary" | "secondary" | "tertiary")[] = [
              "primary",
              "secondary",
              "tertiary",
            ];
            const colorIndex = i % 3;

            return (
              <LiShops
                key={i}
                color={colors[colorIndex]}
                text={`Obchod ${i + 1}`}
              />
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default MyShopsPage;
