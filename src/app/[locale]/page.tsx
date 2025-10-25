'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Header from '../components/Header';
import Logo from '../components/Logo';
import ContactForm from '../components/contact-us/ContactForm';
import './page.scss';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="expresni-prace">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                {t('hero.title')}<br />
                <span className="hero-subtitle-text">{t('hero.subtitle')}</span>
                <span className="hero-accent"> {t('hero.accent')}</span>
              </h1>
              <p className="hero-description">
                {t('hero.description')}
              </p>
            </div>
            <div className='hero-main'>

              <div className="hero-main__description">

                <div className="hero-img-container">
                  <div className="cta-section">
                    <button className="hero-cta">{t('hero.cta')}</button>

                  </div>
                  <Image
                    src="/hero.png"
                    alt="Hero"
                    width={1568}
                    height={595}
                    quality={100}
                    priority
                    className="hero-image"
                  />
                  <div className="hero-img-filler"></div>
                  <div className="hero-img-description">
                    <h2>{t('hero.builtForAction.title')}</h2>
                    <p>{t('hero.builtForAction.description')}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us" id="about">
        <div className="about-content">
          <div className="about-image">
            <Image
              src="/aboutUs.jpg"
              alt="About us"
              width={1500}
              height={844}
              quality={100}
              priority
              className="team-image"
            />
          </div>
          <div className="about-text">
            <h2>{t('aboutUs.title')}</h2>
            <p>{t('aboutUs.description1')}</p>
            <p>{t('aboutUs.description2')}</p>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="for-employers" id="employers">
        <div className="container for-employers-container">
          <div className="employers-text">
            <h2 className="section-title">{t('forEmployers.title')}</h2>
            <div className="employers-intro">
              <p>{t('forEmployers.intro1')}</p>
              <p>{t('forEmployers.intro2')}</p>
            </div>
          </div>
            <div className="employer-card">
              <Image
                src="/forEmployers/docsIcon.svg"
                alt="Fast Selection"
                width={104}
                height={104}
                className="card-icon"
              />
              <h3>{t('forEmployers.services.fastSelection')}</h3>
            </div>
            <div className="employer-card">
              <Image
                src="/forEmployers/chartIcon.svg"
                alt="Flexible Terms"
                width={104}
                height={104}
                className="card-icon"
              />
              <h3>{t('forEmployers.services.flexibleTerms')}</h3>
            </div>
            <div className="employer-card">
              <Image
                src="/forEmployers/walletIcon.svg"
                alt="Optimization"
                width={104}
                height={104}
                className="card-icon"
              />
              <h3>{t('forEmployers.services.optimization')}</h3>
            </div>
            <div className="employer-card">
              <Image
                src="/forEmployers/responsibIcon.svg"
                alt="Responsibility"
                width={104}
                height={104}
                className="card-icon"
              />
              <h3>{t('forEmployers.services.responsibility')}</h3>
            </div>
            <div className="employer-card">
              <Image
                src="/forEmployers/timeIcon.svg"
                alt="Time Savings"
                width={104}
                height={104}
                className="card-icon"
              />
              <h3>{t('forEmployers.services.timeSavings')}</h3>
            </div>
            <div className="employer-card">
              <Image
                src="/forEmployers/hrIcon.svg"
                alt="Support"
                width={104}
                height={104}
                className="card-icon"
              />
              <h3>{t('forEmployers.services.support')}</h3>
            </div>
        </div>
      </section>

      {/* For Employees Section */}
      <section className="for-employees" id="employees">
          <div className="employees-content">
            <div className="employees-text">
              <h2>{t('forEmployees.title')}</h2>
              <ul className="benefits-list">
                <li>{t('forEmployees.benefits.income')}</li>
                <li>{t('forEmployees.benefits.contract')}</li>
                <li>{t('forEmployees.benefits.taxes')}</li>
                <li>{t('forEmployees.benefits.transportation')}</li>
                <li>{t('forEmployees.benefits.training')}</li>
              </ul>
            </div>
            <div className="employees-image">
                <Image
                src="/handshake.png"
                alt="Support"
                width={1070}
                height={484}
                className="handshake-photo"
              />
            </div>
          </div>
      </section>

      {/* Available Vacancies Section */}
      <section className="vacancies" id="vacancies">
        <div className="container">
          <h2 className="section-title">{t('availableVacancies.title')}</h2>
          <div className="vacancies-grid">
            <div className="vacancy-card">
              <Image
                src="/services/deliveryIcon.svg"
                alt="Courier Delivery"
                width={66}
                height={66}
                className="vacancy-icon"
              />
              <span>{t('availableVacancies.jobs.courierDelivery')}</span>
            </div>
            <div className="vacancy-card">
              <Image
                src="/services/construction.svg"
                alt="Construction"
                width={66}
                height={66}
                className="vacancy-icon"
              />
              <span>{t('availableVacancies.jobs.construction')}</span>
            </div>
            <div className="vacancy-card">
              <Image
                src="/services/taxi.svg"
                alt="Taxi"
                width={66}
                height={66}
                className="vacancy-icon"
              />
              <span>{t('availableVacancies.jobs.taxi')}</span>
            </div>
            <div className="vacancy-card">
              <Image
                src="/services/cleaning.svg"
                alt="Cleaning"
                width={66}
                height={66}
                className="vacancy-icon"
              />
              <span>{t('availableVacancies.jobs.cleaning')}</span>
            </div>
            <div className="vacancy-card large">
              <Image
                src="/services/labour.svg"
                alt="General Labor"
                width={66}
                height={66}
                className="vacancy-icon"
              />
              <span>{t('availableVacancies.jobs.generalLabor')}</span>
            </div>
            <div className="vacancy-card proposal">
              <span>{t('availableVacancies.jobs.yourProposals')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Logo className="footer-logo" />
              <p className="footer-tagline">{t('footer.tagline')}</p>
            </div>
            <div className="footer-nav">
              <h3>{t('footer.navigation')}</h3>
              <ul>
                <li><a href="#home">{t('navigation.home')}</a></li>
                <li><a href="#about">{t('navigation.aboutUs')}</a></li>
                <li><a href="#employers">{t('navigation.forEmployers')}</a></li>
                <li><a href="#employees">{t('navigation.forEmployees')}</a></li>
                <li><a href="#vacancies">{t('navigation.availableVacancies')}</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <div className="social-icons">
                <a href="#" className="social-link viber"></a>
                <a href="#" className="social-link telegram"></a>
                <a href="#" className="social-link whatsapp"></a>
                <a href="#" className="social-link facebook"></a>
              </div>
              <p className="copyright">{t('footer.copyright')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}