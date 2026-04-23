import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar   from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import Hero     from './components/Hero';
import Stats    from './components/Stats';
import Services from './components/Services';
import Transformations from './components/Transformations';
import Contact  from './components/Contact';
import Footer   from './components/Footer';
import PaymentPage from './pages/PaymentPage';
import PrivacyPolicy from './pages/PrivacyPolicy';

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Transformations />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-brand-bg min-h-screen text-brand-light overflow-x-hidden">
        <div className="fixed top-0 left-0 right-0 z-50">
          <PromoBanner />
          <Navbar />
        </div>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
