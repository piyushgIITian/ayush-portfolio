import Cursor from "./components/Cursor.jsx";
import Navigation from "./components/Navigation.jsx";
import Hero from "./components/Hero.jsx";
import Provenance from "./components/Provenance.jsx";
import Timeline from "./components/Timeline.jsx";
import Education from "./components/Education.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Awards from "./components/Awards.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Cursor />
      <Navigation />
      <main className="relative z-[2]">
        <Hero />
        <Provenance />
        <Timeline />
        <Education />
        <Skills />
        <Projects />
        <Awards />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
