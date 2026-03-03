//import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Router from "./components/Router.jsx";
import Search from "./pages/Search.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <>
      <Header />

      <Router route="/" component={Home} />
      <Router route="/search" component={Search} />
      <Router route="/contact" component={Contact} />

      <Footer />
    </>
  );
}

export default App;
