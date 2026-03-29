import { Link } from "react-router-dom";
import Navbar from "../components/navbar.tsx";
import BackgroundIcons from "../components/bgIcons.tsx";
import FormInput from "../components/formInput.tsx";
import Footer from "../components/footer.tsx";
import { useResponsiveValue } from "../hooks/useResponsiveValue.ts";

function LoginPage() {
  const iconCount = useResponsiveValue({
    base: 50,
    sm: 70,
    md: 120,
    lg: 180,
    xl: 220,
  });

  return (
    <>
      <Navbar pageTitle="Přihlášení" activePage="" />
      <main className="w-full h-screen flex flex-col justify-center items-center pt-20">
        <BackgroundIcons count={iconCount} seed={18} />

        <article className="flex flex-col bg-slate-100/90 p-12 gap-4 rounded-2xl">
          <h1 className="text-h5 font-title">Přihlášení</h1>

          <form className="flex flex-col gap-4">
            <FormInput
              label="Uživatelské jméno"
              type="text"
              name="username"
              color="primary"
            />
            <FormInput
              label="Heslo"
              type="password"
              name="password"
              color="primary"
            />
            <input
              type="button"
              value="Přihlásit se"
              className="h-10 bg-primary-500/95 hover:bg-primary-500/60 text-slate-50 hover:text-slate-950 text-button-l font-action rounded-lg cursor-pointer transition-colors"
            />
            <span className="text-center text-slate-500">
              Nemáte účet?{" "}
              <Link
                to="/registrace"
                className="no-underline text-secondary-500 font-action hover:text-secondary-500/50"
              >
                Registrovat se
              </Link>
            </span>
          </form>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;
