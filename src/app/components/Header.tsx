'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';
import './Header.scss';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  // Close mobile menu when clicking outside (excluding burger button)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideMenu = mobileMenuRef.current?.contains(target);
      const clickedBurgerButton = burgerButtonRef.current?.contains(target);

      if (!clickedInsideMenu && !clickedBurgerButton) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setIsLanguageDropdownOpen(false);
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Wait for menu to close, then scroll
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300); // Match the menu close animation duration
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="nav">
            <a href="#home" className="nav-link">{t('navigation.home')}</a>
            <a href="#about" className="nav-link">{t('navigation.aboutUs')}</a>
            <a href="#employers" className="nav-link">{t('navigation.forEmployers')}</a>
            <a href="#employees" className="nav-link">{t('navigation.forEmployees')}</a>
            <a href="#vacancies" className="nav-link">{t('navigation.availableVacancies')}</a>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <div className="language-selector" ref={languageDropdownRef}>
              <button
                className="lang-dropdown-toggle"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              >
                {locale === 'en' ? 'EN' : 'CZ'}
                <svg
                  className={`dropdown-arrow ${isLanguageDropdownOpen ? 'open' : ''}`}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isLanguageDropdownOpen && (
                <div className="lang-dropdown-menu">
                  <button
                    className={`lang-dropdown-item ${locale === 'en' ? 'active' : ''}`}
                    onClick={() => switchLanguage('en')}
                  >
                    EN
                  </button>
                  <button
                    className={`lang-dropdown-item ${locale === 'cs' ? 'active' : ''}`}
                    onClick={() => switchLanguage('cs')}
                  >
                    CZ
                  </button>
                </div>
              )}
            </div>
            <button className="contact-btn desktop-only">{t('navigation.contactUs')}</button>

            {/* Burger Menu Button */}
            <button
              ref={burgerButtonRef}
              className="burger-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`burger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`burger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`burger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
          {/* Mobile Menu Logo */}
          <Logo className="mobile-menu-logo" />

          <nav className="mobile-nav">
            <a href="#home" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, 'home')}>
              {t('navigation.home')}
            </a>
            <a href="#about" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, 'about')}>
              {t('navigation.aboutUs')}
            </a>
            <a href="#employers" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, 'employers')}>
              {t('navigation.forEmployers')}
            </a>
            <a href="#employees" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, 'employees')}>
              {t('navigation.forEmployees')}
            </a>
            <a href="#vacancies" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, 'vacancies')}>
              {t('navigation.availableVacancies')}
            </a>
          </nav>

          {/* Mobile Menu Actions */}
          <div className="mobile-menu-actions">
            <div className="mobile-language-selector">
              <button
                className={`mobile-lang-btn ${locale === 'en' ? 'active' : ''}`}
                onClick={() => {
                  switchLanguage('en');
                  setIsMobileMenuOpen(false);
                }}
              >
                EN
              </button>
              <button
                className={`mobile-lang-btn ${locale === 'cs' ? 'active' : ''}`}
                onClick={() => {
                  switchLanguage('cs');
                  setIsMobileMenuOpen(false);
                }}
              >
                CZ
              </button>
            </div>
            <a
              href="#contact"
              className="contact-btn mobile-contact-btn"
              onClick={(e) => handleNavLinkClick(e, 'contact')}
            >
              {t('navigation.contactUs')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
