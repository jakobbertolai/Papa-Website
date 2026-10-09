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
    photo: "Dr. Erich Bertol bei der orthopädischen Befundbesprechung",
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
    photo: "Dr. Erich Bertol durante la valutazione ortopedica",
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
  const navItems: PageName[] = ["home", "services", "about"];

  return (
    <header className="site-header">
      <a className="skip-link" href="#content">
        {text.skip}
      </a>
      <div className="header-inner">
        <a className="brand" href={routes[language].home} aria-label="Dr. Erich Bertol">
          <img src="/eb-monogram.png" alt="EB" />
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
          <a href={routes[language].contact} aria-current={page === "contact" || page === "practice" ? "page" : undefined}>
            {text.contact}
          </a>
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
        <a href={routes[language].contact} onClick={() => setMenuOpen(false)}>{text.contact}</a>
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
    <div className="photo-placeholder" role="img" aria-label={labels[language].photo} />
  );
}

function Location({ language, variant = "dark" }: Pick<PageProps, "language"> & { variant?: "dark" | "light" }) {
  const text = labels[language];
  return (
    <section className={`location-block location-block--${variant}`} aria-labelledby="location-title">
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
      <section className="home-identity">
        <img className="home-identity-logo" src="/eb-monogram.png" alt="EB" />
        <div>
          <h1>Erich Bertol</h1>
          <p>{de ? "Facharzt für Orthopädie" : "Specialista in ortopedia"}</p>
        </div>
      </section>
      <section className="home-hero">
        <div>
          <img className="home-orthopedic-logo" src="/orthopedic-logo.png" alt="Orthopedic" />
          <h2 className="home-practice-title">{de ? "Praxis in Meran für konservative Orthopädie" : "Trattamento ortopedico conservativo"}</h2>
          <p className="intro-copy">
            {de
              ? "Konservative Behandlung ist die Alternative zur operativen Behandlung."
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
          <a className="phone-link" href={phoneHref}>
            0473 661012
          </a>
        </div>
      </section>

      <section className="quiet-band">
        <div className="section two-column">
          <div>
            <h2>{de ? "Schmerztherapie und Prävention durch" : "La vostra salute al centro."}</h2>
          </div>
          <ul className="fact-list">
            {de ? (
              <>
                <li><strong>Manuelle Medizin</strong></li>
                <li><strong>Infiltrationen</strong></li>
              </>
            ) : (
              <>
                <li><strong>Infiltrazioni</strong><span>Mirate e valutate dal medico.</span></li>
                <li><strong>Medicina manuale</strong><span>Trattamento ortopedico conservativo.</span></li>
                <li><strong>Terapia del dolore e prevenzione</strong><span>Da discutere individualmente quando necessario.</span></li>
              </>
            )}
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
        ["01", "Abnutzung von Gelenken"],
        ["02", "Nerveneinklemmungen durch Bandscheiben"],
        ["03", "Blockaden an der Wirbelsäule"],
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
        <h1>{de ? "Konservative Behandlung" : "Trattamento conservativo"}</h1>
        {de && <p className="page-subtitle">Prävention gegen / Behandlung von:</p>}
      </section>
      <section className="page-grid single-column">
        <div className="service-list">
          {rows.map(([number, name]) => (
            <div className="service-row" key={number}>
              <span>{number}</span>
              <strong>{name}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Practice({ language }: Pick<PageProps, "language">) {
  const de = language === "de";
  return (
    <>
      <section className="page-intro practice-intro">
        <div>
          <h1>{de ? "Direkt vor Ort." : "Direttamente sul posto."}</h1>
          <p className="intro-copy">
            {de
              ? "Die Praxis befindet sich in Meran. Termine werden über das Sekretariat vereinbart."
              : "Lo studio si trova a Merano. Gli appuntamenti vengono concordati tramite la segreteria."}
          </p>
        </div>
        <img
          className="practice-photo"
          src="/praxis-wartebereich.png"
          alt={de ? "Wartebereich der Praxis Dr. Erich Bertol" : "Sala d’attesa dello studio del Dr. Erich Bertol"}
        />
      </section>
      <section className="page-grid single-column">
        <Location language={language} />
      </section>
    </>
  );
}

function About({ language }: Pick<PageProps, "language">) {
  const de = language === "de";
  const items = de
    ? [
        ["1980", "Matura am Humanistischen Gymnasium Bozen."],
        ["1991", "Promotion an der Leopold-Franzens-Universität Innsbruck."],
        ["1992", "Zivildienst beim Roten Kreuz Bad Ischl (Oberösterreich)."],
        ["1992–1996", "Allgemeinmedizin: Turnusarzt am Landeskrankenhaus Schärding am Inn (Oberösterreich)."],
        ["1996–1997", "Mitarbeit am Orthopädischen Landeskrankenhaus Stolzalpe bei Prof. R. Graf (Steiermark)."],
        ["1997–1999", "Assistenzarzt für Orthopädie und Unfallchirurgie am Krankenhaus Meran bei Chefarzt Dr. H. Waldner (Südtirol)."],
        ["1999–2002", "Assistenzarzt Orthopädie I° an der Hessingklinik Augsburg bei Prof. Dr. Dr. Klaus Asmus Matzen (Bayern)."],
        ["2002", "Abschluss Facharzt für Orthopädie, Ärztekammer Wien."],
        ["2002–06", "Oberarzt, Abteilung Orthopädie am Krankenhaus Meran; Schwerpunkt Wirbelsäulenchirurgie."],
        ["2006", "Niederlassung in einer Praxis für konservative Orthopädie in Plaus (Südtirol)."],
        ["2010", "Niederlassung in einer Praxis für konservative Orthopädie in Neumarkt (Südtirol)."],
        ["2017", "Hauptsitz in einer Praxis für konservative Orthopädie in Meran (Südtirol)."],
      ]
    : [
        ["1980", "Maturità al Liceo classico di Bolzano."],
        ["1991", "Laurea presso l’Università Leopold Franzens di Innsbruck."],
        ["1992", "Servizio civile presso la Croce Rossa di Bad Ischl (Alta Austria)."],
        ["1992–1996", "Medicina generale: medico tirocinante presso l’ospedale provinciale di Schärding am Inn (Alta Austria)."],
        ["1996–1997", "Collaborazione presso l’ospedale ortopedico provinciale Stolzalpe con il Prof. R. Graf (Stiria)."],
        ["1997–1999", "Medico assistente di ortopedia e traumatologia presso l’ospedale di Merano con il primario Dr. H. Waldner (Alto Adige)."],
        ["1999–2002", "Medico assistente di ortopedia I° presso la Hessingklinik di Augusta con il Prof. Dr. Dr. Klaus Asmus Matzen (Baviera)."],
        ["2002", "Specializzazione in ortopedia, Ordine dei medici di Vienna."],
        ["2002–06", "Medico dirigente presso il reparto di ortopedia dell’ospedale di Merano; focus sulla chirurgia della colonna vertebrale."],
        ["2006", "Apertura di uno studio di ortopedia conservativa a Plaus (Alto Adige)."],
        ["2010", "Apertura di uno studio di ortopedia conservativa a Egna (Alto Adige)."],
        ["2017", "Sede principale dello studio di ortopedia conservativa a Merano (Alto Adige)."],
      ];
  return (
    <>
      <section className="page-intro">
        <h1>{de ? "Facharzt für Orthopädie." : "Specialista in ortopedia."}</h1>
      </section>
      <section className="page-grid single-column">
        <ol className="timeline">
          {items.map(([year, item]) => (
            <li key={year}>
              <time>{year}</time>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function Contact({ language }: Pick<PageProps, "language">) {
  const de = language === "de";
  return (
    <>
      <section className="page-intro contact-intro">
        <h1>{de ? "Termin nach Vereinbarung." : "Appuntamento su prenotazione."}</h1>
        <p className="intro-copy">
          {de
            ? "Für Termine und organisatorische Fragen wenden Sie sich bitte telefonisch an das Sekretariat."
            : "Per appuntamenti e questioni organizzative, contattate telefonicamente la segreteria."}
        </p>
      </section>
      <section className="page-grid contact-grid">
        <div>
          <div className="contact-panel">
            <div>
              <h3>{de ? "Sekretariat" : "Segreteria"}</h3>
            </div>
            <a className="phone-link" href={phoneHref}>0473 661012</a>
          </div>
        </div>
      </section>
      <section className="contact-practice quiet-band" aria-label={de ? "Praxis" : "Studio"}>
        <div className="section practice-contact-content">
          <div>
            <p className="intro-copy">
              {de
                ? "Die Praxis befindet sich in Meran. Termine werden über das Sekretariat vereinbart."
                : "Lo studio si trova a Merano. Gli appuntamenti vengono concordati tramite la segreteria."}
            </p>
          </div>
          <img
            className="practice-photo"
            src="/praxis-wartebereich.png"
            alt={de ? "Wartebereich der Praxis Dr. Erich Bertol" : "Sala d’attesa dello studio del Dr. Erich Bertol"}
          />
        </div>
      </section>
      <section className="contact-location-section" aria-label={de ? "Standort" : "Sede"}>
        <div className="page-grid contact-grid">
          <div>
            <Location language={language} variant="light" />
            <img
              className="contact-map"
              src="/praxis-karte.png"
              alt={de ? "Karte zur Praxis Dr. Erich Bertol in Meran" : "Mappa dello studio del Dr. Erich Bertol a Merano"}
            />
          </div>
        </div>
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
