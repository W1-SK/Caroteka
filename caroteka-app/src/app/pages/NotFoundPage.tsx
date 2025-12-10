import { Link } from 'react-router-dom';
import Navbar from "../components/navbar.tsx";

function NotFoundPage() {
    return (
        <>
            <Navbar pageTitle="404" activePage=""/>
            <main className="flex justify-center items-center flex-col w-full h-screen">
                <h1 className="text-3xl">Error 404, I guess we all find an empty dungeon sometimes..</h1>
                <Link className="text-blue-500" to="/">Back to homepage?</Link>
            </main>
        </>
    )
}

export default NotFoundPage;
