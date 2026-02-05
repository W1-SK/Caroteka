import { Link } from "react-router-dom";
import Navbar from "../components/navbar.tsx";
import BackgroundIcons from "../components/bgIcons.tsx";
import FormInput from "../components/formInput.tsx";

function RegisterPage() {
  return (
    <>
      <Navbar pageTitle="Registrace" activePage="" />
      <main className="flex justify-center items-center flex-col w-full h-screen">
        <BackgroundIcons count={90} seed={27} />

        <article className="flex flex-col bg-slate-100/90 p-12 gap-4 rounded-2xl">
          <h1 className="text-h5 font-title">Registrace</h1>

          <form className="flex flex-col gap-4">
            <FormInput
              label="Uživatelské jméno"
              type="text"
              name="username"
              color="secondary"
            />
            <FormInput
              label="E-mail"
              type="email"
              name="email"
              color="secondary"
            />
            <FormInput
              label="Heslo"
              type="password"
              name="password"
              color="secondary"
            />
            <FormInput
              label="Kontrola hesla"
              type="password"
              name="re-password"
              color="secondary"
            />
            <input
              type="button"
              value="Registrovat se"
              className="h-10 bg-emerald-500/90 hover:bg-emerald-400/60 text-slate-50 hover:text-slate-950 text-button-l font-action rounded-lg cursor-pointer transition-colors"
            />
            <span className="text-center text-slate-500">
              Máte již účet?{" "}
              <Link
                to="/prihlaseni"
                className="no-underline text-violet-500 font-action hover:text-violet-500/50"
              >
                Přihlásit se
              </Link>
            </span>
          </form>
        </article>
      </main>
    </>
  );
}

export default RegisterPage;
