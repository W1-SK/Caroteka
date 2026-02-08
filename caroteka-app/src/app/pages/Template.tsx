import Navbar from "../components/navbar.tsx";
import Footer from "../components/footer.tsx";
import { Link } from "react-router-dom";
import Button from "../components/button.tsx";

function Template() {
  return (
    <>
      <Navbar pageTitle="Template" activePage="" />
      <main className="w-full h-screen flex justify-center items-center">
        <Button color="primary" text="button" />
        <Button color="secondary" text="button" />
        <Button color="tertiary" text="button" />
        <Button color="success" text="button" />
        <Button color="danger" text="button" />
      </main>
      <Footer />
    </>
  );
}

export default Template;
