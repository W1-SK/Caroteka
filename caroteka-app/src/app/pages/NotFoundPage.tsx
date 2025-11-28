import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <>
            <main className="flex justify-center items-center flex-col w-full h-screen">
                <h1 className="text-3xl">Error 404, I guess we all find an empty dungeon sometimes..</h1>
                <Link className="text-blue-500" to="/">Back to homepage?</Link>
            </main>
        </>
    )
}

export default NotFoundPage;
