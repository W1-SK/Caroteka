import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <>
            <main className="flex justify-center items-center flex-col w-full h-screen">
                <h1 className="text-3xl">Login coming soon!</h1>
                <Link className="text-blue-500" to="/">Back to homepage?</Link>
            </main>
        </>
    )
}

export default LoginPage;
