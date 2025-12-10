import { Link } from 'react-router-dom';
import Navbar from "../components/navbar.tsx";

function LoginPage() {
    return (
        <>
            <Navbar pageTitle="Domácí stránka" activePage=""/>
            <main className="flex justify-center items-center flex-col w-full h-screen">
                <h1 className="text-3xl">Login coming soon!</h1>
                <Link className="text-blue-500" to="/">Back to homepage?</Link>
            </main>
        </>
    )
}

export default LoginPage;
