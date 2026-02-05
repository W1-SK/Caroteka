import { Link } from "react-router-dom";
import Navbar from "../components/navbar.tsx";
import BackgroundIcons from "../components/bgIcons.tsx";

function LoginPage() {
  return (
    <>
      <Navbar pageTitle="Přihlášení" activePage="" />
      <main className="flex justify-center items-center flex-col w-full h-screen">
        <BackgroundIcons count={90} seed={18} />

        <article className="flex flex-col bg-slate-100/90 p-12 gap-4 rounded-2xl">
          <h1 className="text-h5 font-title">Přihlášení</h1>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-text-m font-title">
                Uživatelské jméno
              </label>
              <input
                type="text"
                name="username"
                required
                className="h-12 outline-none border-2 border-violet-300/80 p-2 text-text-l rounded-lg hover:bg-violet-100/50 focus:bg-violet-200/50"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-text-m font-title">
                Heslo
              </label>
              <input
                type="password"
                name="password"
                required
                className="h-12 outline-none border-2 border-violet-300/80 p-2 text-text-l rounded-lg hover:bg-violet-100/50 focus:bg-violet-200/50"
              />
            </div>
            <input
              type="button"
              value="Přihlásit se"
              className="h-10 bg-violet-500/95 hover:bg-violet-500/60 text-slate-50 hover:text-slate-950 text-button-l font-action rounded-lg cursor-pointer transition-colors"
            />
            <span className="text-center text-slate-500">
              Nemáte účet?{" "}
              <Link
                to="/registrace"
                className="no-underline text-emerald-500 font-action hover:text-emerald-500/50"
              >
                Registrovat se
              </Link>
            </span>
          </form>
        </article>
      </main>
    </>
  );
}

export default LoginPage;
