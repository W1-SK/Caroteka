// import { useState } from 'react'
import '../../index.css'
import Navbar from '../components/navbar.tsx'
import Footer from "../components/footer.tsx";

function LandingPage() {
    return (
        <>
            <Navbar pageTitle="Domácí stránka" activePage="Domů"/>
            <Footer/>
        </>
    )
}


export default LandingPage
