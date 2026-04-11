// src/components/Footer.jsx
import { useLang } from '../context/LanguageContext';
import { content } from '../content/content';
import logo from '../assets/logo.png';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-brand-bg border-t border-brand-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Fit and Faith Logo" className="h-8 w-auto opacity-70" />
        <p className="text-brand-muted text-xs text-center">
          © {new Date().getFullYear()} Fit and Faith — {content.footer.rights[lang]}
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/fitandfaitht"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-brand-white text-xs transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/message/SYHAEEMXHMMSA1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-brand-white text-xs transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
