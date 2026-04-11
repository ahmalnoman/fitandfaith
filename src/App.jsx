import { LanguageProvider } from './context/LanguageContext';
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import Stats    from './components/Stats';
import Services from './components/Services';
import Contact  from './components/Contact';
import Footer   from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-brand-bg min-h-screen text-brand-light overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
