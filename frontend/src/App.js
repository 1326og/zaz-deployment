import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import QuoteForm from "./components/QuoteForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <QuoteForm />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
