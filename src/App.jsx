import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import Stats    from './components/Stats';
import Services from './components/Services';
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
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-brand-bg min-h-screen text-brand-light overflow-x-hidden">
        <Navbar />
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
