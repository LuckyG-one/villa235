import { useReveal } from "./hooks/useReveal.js";
import { useI18n } from "./i18n/LanguageContext.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Experience from "./components/Experience.jsx";
import Facts from "./components/Facts.jsx";
import Story from "./components/Story.jsx";
import Journey from "./components/Journey.jsx";
import Floorplan from "./components/Floorplan.jsx";
import Area from "./components/Area.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Posters from "./components/Posters.jsx";
import Park from "./components/Park.jsx";
import Practical from "./components/Practical.jsx";
import Split from "./components/Split.jsx";
import Contact from "./components/Contact.jsx";
import BrandSignature from "./components/BrandSignature.jsx";
import Footer from "./components/Footer.jsx";
import "./app.css";

export default function App() {
  const { lang } = useI18n();
  // Re-run reveal observer when language changes (content swaps).
  useReveal([lang]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Facts />
        <Story />
        <Journey />
        <Floorplan />
        <ErrorBoundary>
          <Area />
        </ErrorBoundary>
        <Posters />
        <Park />
        <Practical />
        <Split />
        <Contact />
        <BrandSignature />
      </main>
      <Footer />
    </>
  );
}
