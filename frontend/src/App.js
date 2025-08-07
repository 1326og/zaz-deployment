import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import QuoteForm from "./components/QuoteForm";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <>
      <Helmet>
        <title>Zaz Precision Auto Detailing LLC | Mobile Car Detailing Services NJ</title>
        <meta name="description" content="Professional mobile auto detailing services in New Jersey. Reset Detail premium package, paint correction, interior & exterior detailing. We come to you! Call (973) 534-0023 for free quote." />
        <meta name="keywords" content="mobile car detailing NJ, auto detailing New Jersey, paint correction, Reset Detail package, interior detailing, exterior detailing, headlight restoration, mobile detailing near me" />
        <link rel="canonical" href="https://zazprecisionautodetailing.com" />
        
        {/* Additional Open Graph tags */}
        <meta property="og:title" content="Zaz Precision Auto Detailing LLC | Mobile Car Detailing Services NJ" />
        <meta property="og:description" content="Professional mobile auto detailing services in New Jersey. Reset Detail premium package, paint correction, interior & exterior detailing. We come to you!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zazprecisionautodetailing.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Zaz Precision Auto Detailing LLC | Mobile Car Detailing Services NJ" />
        <meta name="twitter:description" content="Professional mobile auto detailing services in New Jersey. Reset Detail premium package, paint correction, interior & exterior detailing. We come to you!" />
        
        {/* Additional SEO tags */}
        <meta name="geo.region" content="US-NJ" />
        <meta name="geo.placename" content="New Jersey" />
        <meta name="geo.position" content="40.7357;-74.1724" />
        <meta name="ICBM" content="40.7357, -74.1724" />
      </Helmet>
      
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <About />
          <QuoteForm />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;