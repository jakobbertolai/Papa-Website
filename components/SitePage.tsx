"use client";

import { useState } from "react";

type Language = "de" | "it";
type PageName = "home" | "services" | "practice" | "about" | "contact" | "imprint" | "privacy";

type PageProps = {
  language: Language;
  page: PageName;
};

const mapUrl =
  "https://www.google.com/maps/search/Otto+Huber+Stra%C3%9Fe+45?entry=gmail&source=g";
const phoneHref = "tel:+390473661012";

const routes: Record<Language, Record<PageName, string>> = {
  de: {
    home: "/",
    services: "/leistungen",
    practice: "/praxis",
    about: "/dr-bertol",
    contact: "/kontakt",
    imprint: "/impressum",
    privacy: "/datenschutz",
  },
  it: {
    home: "/it",
    services: "/it/prestazioni",
    practice: "/it/studio",
    about: "/it/dr-bertol",
    contact: "/it/contatto",
    imprint: "/it/note-legali",
    privacy: "/it/privacy",
  },
};

const labels = {
  de: {
    menu: "Menü",
    close: "Schließen",
    home: "Start",
    services: "Leistungen",
    practice: "Praxis",
    about: "Dr. Bertol",
    contact: "Kontakt",
    specialty: "Facharzt für Orthopädie",
    appointment: "Termin über das Sekretariat",
    call: "Sekretariat anrufen",
    map: "Karte öffnen",
    skip: "Zum Inhalt springen",
    photo: "Praxisfoto wird nachgereicht",
    footer: "Praxis für konservative orthopädische Behandlung",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
  it: {
    menu: "Menu",
    close: "Chiudi",
    home: "Inizio",
    services: "Prestazioni",
    practice: "Studio",
    about: "Dr. Bertol",
    contact: "Contatti",
    specialty: "Specialista in ortopedia",
    appointment: "Appuntamenti tramite segreteria",
    call: "Chiama la segreteria",
    map: "Apri la mappa",
    skip: "Vai al contenuto",
    photo: "Foto dello studio in arrivo",
    footer: "Studio di ortopedia conservativa",
    imprint: "Note legali",
    privacy: "Privacy",
  },
};

function Header({ language, page }: PageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const text = labels[language];
  const languageTarget = language === "de" ? "it" : "de";
  const languageLabel = language === "de" ? "IT" : "DE";
  const navItems: PageName[] = ["home", "services", "practice", "about", "contact"];

  return (
    <header className="site-header">
      <a className="skip-link" href="#content">
        {text.skip}
      </a>
      <div className="header-inner">
        <a className="brand" href={routes[language].home} aria-label="Dr. Erich Bertol">
          <img src="/eb-logo.png" alt="EB Erich Bertol" />
          <span className="brand-copy">
            <strong>Dr. Erich Bertol</strong>
            <span>{text.specialty}</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label={text.menu}>
          {navItems.map((item) => (
            <a key={item} href={routes[language][item]} aria-current={page === item ? "page" : undefined}>
              {text[item]}
            </a>
          ))}
          <a className="language-link" href={routes[languageTarget][page]} lang={languageTarget}>
            {languageLabel}
          </a>
        </nav>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? text.close : text.menu}
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-menu" data-open={menuOpen} aria-label={text.menu}>
        {navItems.map((item) => (
          <a key={item} href={routes[language][item]} onClick={() => setMenuOpen(false)}>
            {text[item]}
          </a>
        ))}
        <a className="language-mobile" href={routes[languageTarget][page]} lang={languageTarget}>
          {languageLabel}
        </a>
      </nav>
    </header>
  );
}

function Footer({ language }: Pick<PageProps, "language">) {
  const text = labels[language];
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <strong>Dr. Erich Bertol</strong>
          <br />
          {text.footer}
        </div>
        <div>
          Otto-Huber-Straße 45, 39012 Meran
          <br />
          <a href={phoneHref}>0473 661012</a>
        </div>
        <div className="footer-legal">
          <a href={routes[language].imprint}>{text.imprint}</a>
          <a href={routes[language].privacy}>{text.privacy}</a>
        </div>
      </div>
    </footer>
  );
}

function PhotoPlaceholder({ language }: Pick<PageProps, "language">) {
  return (
    <div className="photo-placeholder" role="img" aria-label={labels[language].photo}>
      <span>{labels[language].photo}</span>
    </div>
  );
}

function Location({ language }: Pick<PageProps, "language">) {
  const text = labels[language];
  return (
    <section className="location-block" aria-labelledby="location-title">
      <p className="eyebrow">{language === "de" ? "Standort" : "Sede"}</p>
      <h2 id="location-title">Meran</h2>
      <p>
        Otto-Huber-Straße 45
        <br />
        39012 Meran
      </p>
      <p>{language === "de" ? "Barrierefreier Zugang" : "Accesso senza barriere"}</p>
      <a className="button" href={mapUrl} target="_blank" rel="noreferrer">
        {text.map}
      </a>
    </section>
  );
}

function Home({ language }: Pick<PageProps, "language">) {
  const de = language === "de";
  const text = labels[language];
  return (
    <>
      <section className="home-hero">
        <div>
          <p className="eyebrow">{de ? "Praxis in Meran" : "Studio a Merano"}</p>
          <h1>{de ? "Konservative orthopädische Behandlung" : "Trattamento ortopedico conservativo"}</h1>
          <p className="intro-copy">
            {de
              ? "Im Mittelpunkt der konservativen Orthopädie steht die Heilung, nicht die Reparatur."
              : "Al centro dell’ortopedia conservativa c’è la guarigione, non la riparazione."}
          </p>
          <div className="button-row">
            <a className="button button-accent" href={phoneHref}>
              {text.call}
            </a>
            <a className="button" href={routes[language].services}>
              {text.services}
            </a>
          </div>
        </div>
        <div className="hero-side">
          <h3>{text.appointment}</h3>
          <p>
            {de
              ? "Termine nur nach Voranmeldung über das Sekretariat."
              : "Appuntamenti solo previa prenotazione tramite la segreteria."}
          </p>
          <a className="phone-link" href={phoneHref}>
            0473 661012
          </a>
        </div>
      </section>

      <section className="quiet-band">
        <div className="section two-column">
          <div>
            <p className="eyebrow">{de ? "Schwerpunkte" : "Ambiti"}</p>
            <h2>{de ? "Orientierung statt Informationsflut." : "Orientamento senza sovraccarico di informazioni."}</h2>
          </div>
          <ul className="fact-list">
            <li>
              <strong>{de ? "Infiltrationen" : "Infiltrazioni"}</strong>
              <span>{de ? "Gezielt und ärztlich abgewogen." : "Mirate e valutate dal medico."}</span>
            </li>
            <li>
              <strong>{de ? "Manuelle Medizin" : "Medicina manuale"}</strong>
              <span>{de ? "Konservative orthopädische Behandlung." : "Trattamento ortopedico conservativo."}</span>
            </li>
            <li>
              <strong>{de ? "Schmerztherapie und Prävention" : "Terapia del dolore e prevenzione"}</strong>
              <span>{de ? "Bei Bedarf individuell besprochen." : "Da discutere individualmente quando necessario."}</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section two-column">
        <PhotoPlaceholder language={language} />
        <Location language={language} />
      </section>
    </>
  );
}

function Services({ language }: Pick<PageProps, "language">) {
  const de = language === "de";
  const rows = de
    ? [
        ["01", "Infiltrationen"],
        ["02", "Manuelle Medizin"],
        ["03", "Spezielle Schmerztherapie"],
        ["04", "Prävention"],
      ]
    : [
        ["01", "Infiltrazioni"],
        ["02", "Medicina manuale"],
        ["03", "Terapia speciale del dolore"],
        ["04", "Prevenzione"],
      ];
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">{de ? "Leistungen" : "Prestazioni"}</p>
        <h1>{de ? "Konservative Behandlung bei fehlender Operationsindikation." : "Trattamento conservativo quando non è indicato un intervento chirurgico."}</h1>
      </section>
      <section className="page-grid">
        <div className="service-list">
          {rows.map(([number, name]) => (
            <div className="service-row" key={number}>
              <span>{number}</span>
              <strong>{name}</strong>
            </div>
          ))}
        </div>
        <aside className="side-note">
          <h3>{de ? "Häufige Anliegen" : "Motivi frequenti"}</h3>
          <ul className="pill-list">
            <li>{de ? "Knieschmerzen" : "Dolore al ginocchio"}</li>
            <li>{de ? "Kreuzschmerzen" : "Mal di schiena"}</li>
          </ul>
        </aside>
      </section>
      <section className="quiet-band">
        <div className="section">
          <p className="quote">
            {de
              ? "Medikamentöse Behandlung gezielt anwenden statt mit Tabletten zu behandeln."
              : "Applicare il trattamento farmacologico in modo mirato, invece di trattare semplicemente con compresse."}
          </p>
          <p className="quote-note">
            {de
              ? "Heilung ist kein Versprechen. Jede ärztliche Handlung hat eine Wirkung und möglicherweise eine Nebenwirkung."
              : "La guarigione non è una promessa. Ogni atto medico ha un effetto e può avere anche effetti indesiderati."}
          </p>
        </div>
      </section>
    </>
  );
}

function Practice({ language }: Pick<PageProps, "language">) {
  const de = language === "de";
  const text = labels[language];
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">{de ? "Praxis" : "Studio"}</p>
        <h1>{de ? "Ein Standort. Klar erreichbar." : "Un’unica sede. Facile da raggiungere."}</h1>
        <p className="intro-copy">
          {de
            ? "Die Praxis befindet sich in Meran. Termine werden über das Sekretariat vereinbart."
            : "Lo studio si trova a Merano. Gli appuntamenti vengono concordati tramite la segreteria."}
        </p>
      </section>
      <section className="page-grid">
        <Location language={language} />
        <div className="side-note">
          <h3>{de ? "In der Praxis" : "Nello studio"}</h3>
          <ul className="fact-list">
            <li><strong>{de ? "Barrierefreiheit" : "Accessibilità"}</strong></li>
            <li><strong>{de ? "Manuelle Diagnostik" : "Diagnostica manuale"}</strong></li>
            <li><strong>{text.appointment}</strong></li>
          </ul>
        </div>
      </section>
      <section className="quiet-band">
        <div className="section">
          <PhotoPlaceholder language={language} />
        </div>
      </section>
    </>
  );
}

function About({ language }: Pick<PageProps, "language">) {
  const de = language === "de";
  const items = de
    ? [
        ["1991", "Promotion an der Leopold-Franzens-Universität Innsbruck."],
        ["2002", "Abschluss Facharzt für Orthopädie, Ärztekammer Wien."],
        ["2002–06", "Oberarzt, Abteilung Orthopädie am Krankenhaus Meran; Schwerpunkt Wirbelsäulenchirurgie."],
        ["2006", "Niederlassung in einer Praxis für konservative Orthopädie in Plaus."],
        ["2017", "Niederlassung in einer Praxis für konservative Orthopädie in Meran."],
        ["2026", "Hauptsitz der Praxis in Meran."],
      ]
    : [
        ["1991", "Laurea presso l’Università Leopold Franzens di Innsbruck."],
        ["2002", "Specializzazione in ortopedia, Ordine dei medici di Vienna."],
        ["2002–06", "Medico dirigente presso il reparto di ortopedia dell’ospedale di Merano; focus sulla chirurgia della colonna vertebrale."],
        ["2006", "Apertura di uno studio di ortopedia conservativa a Plaus."],
        ["2017", "Apertura di uno studio di ortopedia conservativa a Merano."],
        ["2026", "Sede principale dello studio a Merano."],
      ];
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">{de ? "Dr. Erich Bertol" : "Dr. Erich Bertol"}</p>
        <h1>{de ? "Facharzt für Orthopädie." : "Specialista in ortopedia."}</h1>
        <p className="intro-copy">
          {de ? "Konservative orthopädische Behandlung in Meran." : "Trattamento ortopedico conservativo a Merano."}
        </p>
      </section>
      <section className="page-grid">
        <ol className="timeline">
          {items.map(([year, item]) => (
            <li key={year}>
              <time>{year}</time>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <PhotoPlaceholder language={language} />
      </section>
    </>
  );
}

function Contact({ language }: Pick<PageProps, "language">) {
  const de = language === "de";
  const text = labels[language];
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">{de ? "Kontakt" : "Contatti"}</p>
        <h1>{text.appointment}</h1>
        <p className="intro-copy">
          {de
            ? "Für Termine und organisatorische Fragen wenden Sie sich bitte telefonisch an das Sekretariat."
            : "Per appuntamenti e questioni organizzative, contattate telefonicamente la segreteria."}
        </p>
      </section>
      <section className="page-grid">
        <div>
          <div className="contact-panel">
            <div>
              <h3>{de ? "Sekretariat" : "Segreteria"}</h3>
              <p>{de ? "Terminvereinbarung nur nach Voranmeldung." : "Appuntamenti solo previa prenotazione."}</p>
            </div>
            <a className="phone-link" href={phoneHref}>0473 661012</a>
          </div>
          <div className="contact-panel">
            <div>
              <h3>{de ? "Praxis Meran" : "Studio Merano"}</h3>
              <p>Otto-Huber-Straße 45, 39012 Meran</p>
            </div>
            <a className="button" href={mapUrl} target="_blank" rel="noreferrer">{text.map}</a>
          </div>
        </div>
        <aside className="side-note">
          <h3>{de ? "Beim ersten Termin" : "Per il primo appuntamento"}</h3>
          <p>{de ? "Bitte vorhandene Befunde, Bilder und Medikamente mitbringen." : "Portare eventuali referti, immagini e medicinali."}</p>
        </aside>
      </section>
    </>
  );
}

function Legal({ language, page }: PageProps) {
  const de = language === "de";
  const isPrivacy = page === "privacy";
  const text = labels[language];

  if (isPrivacy) {
    return (
      <>
        <section className="page-intro legal-intro">
          <p className="eyebrow">{text.privacy}</p>
          <h1>{de ? "Datenschutz in Vorbereitung." : "Informativa sulla privacy in preparazione."}</h1>
          <p className="intro-copy">
            {de
              ? "Diese Seite ist ein Entwurf und darf erst nach rechtlicher Prüfung veröffentlicht werden."
              : "Questa pagina è una bozza e può essere pubblicata solo dopo una verifica legale."}
          </p>
        </section>
        <section className="legal-content">
          <div className="legal-row">
            <h2>{de ? "Verantwortlicher" : "Titolare del trattamento"}</h2>
            <p>Dr. Erich Bertol<br />Otto-Huber-Straße 45<br />39012 Meran<br />Tel. 0473 661012</p>
          </div>
          <div className="legal-row">
            <h2>{de ? "Stand dieses Entwurfs" : "Stato di questa bozza"}</h2>
            <p>
              {de
                ? "Die Website enthält kein Kontaktformular, keine E-Mail-Adresse, keine Online-Terminbuchung und keine eingebettete Karte. Der Kartenbutton öffnet Google Maps erst nach einem Klick."
                : "Il sito non contiene moduli di contatto, indirizzi e-mail, prenotazioni online o mappe incorporate. Il pulsante della mappa apre Google Maps solo dopo un clic."}
            </p>
          </div>
          <div className="legal-row legal-alert">
            <h2>{de ? "Vor Veröffentlichung ergänzen" : "Da completare prima della pubblicazione"}</h2>
            <p>
              {de
                ? "Cookie- und Tracking-Einstellungen, konkrete Aufbewahrungsfristen, Empfänger personenbezogener Daten sowie alle gesetzlich erforderlichen Angaben müssen vor dem Launch mit einer fachkundigen Stelle geprüft und ergänzt werden."
                : "Le impostazioni relative a cookie e tracciamento, i tempi di conservazione, i destinatari dei dati personali e tutte le informazioni richieste dalla legge devono essere verificati e completati da una figura competente prima della pubblicazione."}
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-intro legal-intro">
        <p className="eyebrow">{text.imprint}</p>
        <h1>{de ? "Angaben zur Praxis." : "Dati dello studio."}</h1>
        <p className="intro-copy">
          {de
            ? "Die folgenden Angaben sind als Entwurf vorbereitet und müssen vor Veröffentlichung ergänzt und geprüft werden."
            : "Le seguenti informazioni sono predisposte come bozza e devono essere completate e verificate prima della pubblicazione."}
        </p>
      </section>
      <section className="legal-content">
        <div className="legal-row">
          <h2>{de ? "Verantwortlich für die Inhalte" : "Responsabile dei contenuti"}</h2>
          <p>Dr. Erich Bertol<br />Facharzt für Orthopädie<br />Otto-Huber-Straße 45<br />39012 Meran<br />Tel. 0473 661012</p>
        </div>
        <div className="legal-row">
          <h2>{de ? "Berufsbezeichnung" : "Titolo professionale"}</h2>
          <p>{de ? "Facharzt für Orthopädie" : "Specialista in ortopedia"}</p>
        </div>
        <div className="legal-row legal-alert">
          <h2>{de ? "Vor Veröffentlichung ergänzen" : "Da completare prima della pubblicazione"}</h2>
          <p>
            {de
              ? "Steuer- oder Mehrwertsteuernummer, zuständige Berufskammer beziehungsweise Berufsverzeichnis, geltende berufsrechtliche Angaben sowie weitere gesetzlich notwendige Informationen liegen noch nicht vor."
              : "Il codice fiscale o la partita IVA, l’ordine professionale o il registro professionale competente, le norme professionali applicabili e altre informazioni richieste dalla legge non sono ancora disponibili."}
          </p>
        </div>
      </section>
    </>
  );
}

export default function SitePage({ language, page }: PageProps) {
  let content;
  switch (page) {
    case "services": content = <Services language={language} />; break;
    case "practice": content = <Practice language={language} />; break;
    case "about": content = <About language={language} />; break;
    case "contact": content = <Contact language={language} />; break;
    case "imprint":
    case "privacy": content = <Legal language={language} page={page} />; break;
    default: content = <Home language={language} />;
  }

  return (
    <>
      <Header language={language} page={page} />
      <main id="content">{content}</main>
      <Footer language={language} />
    </>
  );
}
