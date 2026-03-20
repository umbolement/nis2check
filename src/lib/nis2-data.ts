// NIS2 Directive - Sectors, Questions, Scoring Logic
// Based on EU Directive 2022/2555 and German NIS2UmsuCG

export type SectorCategory = "annex1" | "annex2" | "none";
export type EntitySize = "small" | "medium" | "large";
export type RiskLevel = "high" | "medium" | "low" | "none";

export interface Sector {
  id: string;
  name: string;
  category: SectorCategory;
  subsectors?: string[];
  sizeExempt?: boolean; // true = affected regardless of size
}

export interface QuickCheckAnswers {
  sector: string;
  employees: string;
  revenue: string;
  digitalServices: string[];
  kritisSupplier: string;
}

export interface AssessmentResult {
  riskLevel: RiskLevel;
  entityType: "essential" | "important" | "not_applicable";
  title: string;
  description: string;
  obligations: string[];
  nextSteps: string[];
  penaltyRange: string;
}

// Official NIS2 Sectors (Annex I = High Criticality, Annex II = Other Critical)
export const sectors: Sector[] = [
  // Annex I - Sectors of High Criticality
  {
    id: "energie",
    name: "Energie",
    category: "annex1",
    subsectors: ["Strom", "Fernwärme/-kälte", "Erdöl", "Erdgas", "Wasserstoff"],
  },
  {
    id: "verkehr",
    name: "Verkehr / Transport",
    category: "annex1",
    subsectors: ["Luftverkehr", "Schienenverkehr", "Schifffahrt", "Straßenverkehr"],
  },
  {
    id: "bankwesen",
    name: "Bankwesen",
    category: "annex1",
  },
  {
    id: "finanzmarkt",
    name: "Finanzmarktinfrastrukturen",
    category: "annex1",
  },
  {
    id: "gesundheit",
    name: "Gesundheitswesen",
    category: "annex1",
    subsectors: ["Krankenhäuser", "Labore", "Pharma", "Medizinprodukte", "Forschung"],
  },
  {
    id: "trinkwasser",
    name: "Trinkwasserversorgung",
    category: "annex1",
  },
  {
    id: "abwasser",
    name: "Abwasserentsorgung",
    category: "annex1",
  },
  {
    id: "digitale_infra",
    name: "Digitale Infrastruktur",
    category: "annex1",
    subsectors: [
      "Internet-Knoten (IXP)",
      "DNS-Dienste",
      "TLD-Registrierung",
      "Cloud Computing",
      "Rechenzentren",
      "Content Delivery Networks",
      "Vertrauensdienste",
      "Elektronische Kommunikation",
    ],
    sizeExempt: true,
  },
  {
    id: "ikt_dienste",
    name: "IKT-Dienstleistungsmanagement (B2B)",
    category: "annex1",
    subsectors: ["Managed Service Provider", "Managed Security Service Provider"],
  },
  {
    id: "oeffentliche_verwaltung",
    name: "Öffentliche Verwaltung",
    category: "annex1",
  },
  {
    id: "weltraum",
    name: "Weltraum",
    category: "annex1",
  },

  // Annex II - Other Critical Sectors
  {
    id: "post",
    name: "Post- und Kurierdienste",
    category: "annex2",
  },
  {
    id: "abfall",
    name: "Abfallbewirtschaftung",
    category: "annex2",
  },
  {
    id: "chemie",
    name: "Chemikalien (Herstellung, Produktion, Vertrieb)",
    category: "annex2",
  },
  {
    id: "lebensmittel",
    name: "Lebensmittel (Produktion, Verarbeitung, Vertrieb)",
    category: "annex2",
  },
  {
    id: "verarbeitendes_gewerbe",
    name: "Verarbeitendes Gewerbe / Herstellung",
    category: "annex2",
    subsectors: [
      "Medizinprodukte",
      "Datenverarbeitung / Elektronik / Optik",
      "Elektrische Ausrüstungen",
      "Maschinenbau",
      "Kraftfahrzeuge / Anhänger",
      "Sonstiger Fahrzeugbau",
    ],
  },
  {
    id: "digitale_dienste",
    name: "Anbieter digitaler Dienste",
    category: "annex2",
    subsectors: ["Online-Marktplätze", "Online-Suchmaschinen", "Soziale Netzwerke"],
  },
  {
    id: "forschung",
    name: "Forschungseinrichtungen",
    category: "annex2",
  },
];

// Special digital infrastructure services that are size-exempt
export const sizeExemptServices = [
  "dns",
  "tld",
  "vertrauensdienste_qualifiziert",
  "elektronische_kommunikation",
];

export const digitalServiceOptions = [
  { id: "dns", label: "DNS-Dienste" },
  { id: "cloud", label: "Cloud Computing" },
  { id: "rechenzentrum", label: "Rechenzentrum / Hosting" },
  { id: "tld", label: "TLD-Namenregister" },
  { id: "vertrauensdienste_qualifiziert", label: "Qualifizierte Vertrauensdienste" },
  { id: "elektronische_kommunikation", label: "Öffentliche elektronische Kommunikation" },
  { id: "cdn", label: "Content Delivery Network (CDN)" },
  { id: "msp", label: "Managed Service Provider" },
  { id: "mssp", label: "Managed Security Service Provider" },
  { id: "keine", label: "Keine der genannten" },
];

function getEntitySize(employees: string, revenue: string): EntitySize {
  if (employees === "250+" || revenue === "50m+") return "large";
  if (employees === "50-249" || revenue === "10-50m") return "medium";
  return "small";
}

function hasSizeExemptService(digitalServices: string[]): boolean {
  return digitalServices.some((s) => sizeExemptServices.includes(s));
}

export function evaluateQuickCheck(answers: QuickCheckAnswers): AssessmentResult {
  const sector = sectors.find((s) => s.id === answers.sector);
  const entitySize = getEntitySize(answers.employees, answers.revenue);
  const hasExemptService = hasSizeExemptService(answers.digitalServices);

  // Case 1: Size-exempt digital services → always affected
  if (hasExemptService) {
    return {
      riskLevel: "high",
      entityType: "essential",
      title: "Sehr wahrscheinlich betroffen",
      description:
        "Sie betreiben digitale Dienste, die unabhängig von der Unternehmensgröße unter NIS2 fallen. Als Betreiber qualifizierter Vertrauensdienste, DNS-Dienste, TLD-Register oder öffentlicher elektronischer Kommunikationsnetze gelten besondere Pflichten.",
      obligations: [
        "Registrierung beim BSI innerhalb von 3 Monaten",
        "Umfassendes Risikomanagement implementieren",
        "Meldepflicht bei Sicherheitsvorfällen (24h Erstmeldung)",
        "Geschäftsleitungs-Haftung für Cybersicherheit",
        "Regelmäßige Sicherheitsaudits",
        "Lieferkettensicherheit gewährleisten",
      ],
      nextSteps: [
        "Sofortige Gap-Analyse Ihrer Cybersicherheitsmaßnahmen",
        "BSI-Registrierung vorbereiten",
        "Incident-Response-Prozess etablieren",
        "Geschäftsleitung schulen (persönliche Haftung!)",
      ],
      penaltyRange: "Bis zu €10 Mio. oder 2% des weltweiten Jahresumsatzes",
    };
  }

  // Case 2: Sector match with sufficient size
  if (sector && sector.category !== "none") {
    const isAnnex1 = sector.category === "annex1";

    if (entitySize === "large") {
      return {
        riskLevel: "high",
        entityType: isAnnex1 ? "essential" : "important",
        title: "Sehr wahrscheinlich betroffen",
        description: `Als ${entitySize === "large" ? "großes" : "mittleres"} Unternehmen im Sektor "${sector.name}" fallen Sie ${isAnnex1 ? "als wesentliche Einrichtung (Essential Entity)" : "als wichtige Einrichtung (Important Entity)"} unter NIS2.`,
        obligations: [
          "Registrierung beim BSI",
          "Risikomanagement-Maßnahmen nach Art. 21 NIS2",
          `Meldepflicht bei Sicherheitsvorfällen (${isAnnex1 ? "24h" : "72h"} Erstmeldung)`,
          "Geschäftsleitungs-Haftung",
          isAnnex1 ? "Regelmäßige Audits und Überprüfungen" : "Anlassbezogene Überprüfungen möglich",
          "Lieferkettensicherheit",
        ],
        nextSteps: [
          "Vollständige NIS2-Betroffenheitsanalyse durchführen",
          "Gap-Analyse: Ist vs. Soll Cybersicherheitsniveau",
          "Budget für NIS2-Compliance einplanen",
          "Verantwortlichen für NIS2-Umsetzung benennen",
        ],
        penaltyRange: isAnnex1
          ? "Bis zu €10 Mio. oder 2% des weltweiten Jahresumsatzes"
          : "Bis zu €7 Mio. oder 1,4% des weltweiten Jahresumsatzes",
      };
    }

    if (entitySize === "medium") {
      return {
        riskLevel: "high",
        entityType: "important",
        title: "Wahrscheinlich betroffen",
        description: `Als mittleres Unternehmen im Sektor "${sector.name}" fallen Sie voraussichtlich als wichtige Einrichtung unter NIS2. Mittlere Unternehmen (50-249 Mitarbeiter oder €10-50M Umsatz) in NIS2-Sektoren sind grundsätzlich erfasst.`,
        obligations: [
          "Registrierung beim BSI",
          "Risikomanagement-Maßnahmen nach Art. 21 NIS2",
          "Meldepflicht bei Sicherheitsvorfällen (72h Erstmeldung)",
          "Geschäftsleitungs-Haftung",
          "Lieferkettensicherheit",
        ],
        nextSteps: [
          "Detaillierte Betroffenheitsanalyse durchführen",
          "Aktuelle Cybersicherheitsmaßnahmen dokumentieren",
          "NIS2-Compliance-Roadmap erstellen",
          "Geschäftsleitung informieren und einbinden",
        ],
        penaltyRange: "Bis zu €7 Mio. oder 1,4% des weltweiten Jahresumsatzes",
      };
    }

    // Small company in NIS2 sector
    if (answers.kritisSupplier === "ja") {
      return {
        riskLevel: "medium",
        entityType: "not_applicable",
        title: "Indirekt betroffen (Lieferkette)",
        description: `Obwohl Ihr Unternehmen aufgrund der Größe nicht direkt unter NIS2 fällt, sind Sie als Zulieferer für kritische Infrastruktur indirekt betroffen. NIS2-pflichtige Unternehmen müssen ihre Lieferkettensicherheit gewährleisten — das betrifft auch Sie.`,
        obligations: [
          "Cybersicherheitsanforderungen Ihrer Auftraggeber erfüllen",
          "Sicherheitsnachweise auf Anforderung bereitstellen",
          "Vertragliche Sicherheitsverpflichtungen einhalten",
        ],
        nextSteps: [
          "Anforderungen Ihrer NIS2-pflichtigen Kunden erfragen",
          "Grundlegende Cybersicherheitsmaßnahmen implementieren",
          "Sicherheitszertifizierung erwägen (ISO 27001)",
          "Bereitschaft für Sicherheitsaudits herstellen",
        ],
        penaltyRange: "Keine direkten NIS2-Bußgelder, aber vertragliche Konsequenzen möglich",
      };
    }

    return {
      riskLevel: "low",
      entityType: "not_applicable",
      title: "Wahrscheinlich nicht direkt betroffen",
      description: `Ihr Unternehmen liegt unter den Schwellenwerten für NIS2 (unter 50 Mitarbeiter und unter €10M Umsatz). Allerdings operieren Sie im Sektor "${sector.name}" — beobachten Sie mögliche Änderungen und prüfen Sie Lieferketten-Anforderungen.`,
      obligations: [],
      nextSteps: [
        "Prüfen, ob Ihre Kunden NIS2-pflichtig sind (Lieferkettenanforderungen)",
        "Grundlegende Cybersicherheitshygiene aufrechterhalten",
        "Entwicklung der Regulierung beobachten",
      ],
      penaltyRange: "Nicht direkt anwendbar",
    };
  }

  // Case 3: KRITIS supplier but no NIS2 sector
  if (answers.kritisSupplier === "ja") {
    return {
      riskLevel: "medium",
      entityType: "not_applicable",
      title: "Möglicherweise indirekt betroffen",
      description:
        "Ihr Unternehmen fällt nicht in einen NIS2-Sektor, aber als Zulieferer für kritische Infrastruktur könnten Lieferketten-Anforderungen auf Sie zukommen.",
      obligations: [
        "Sicherheitsanforderungen der KRITIS-Kunden beachten",
        "Vertragliche Cybersicherheitsverpflichtungen prüfen",
      ],
      nextSteps: [
        "Mit Ihren KRITIS-Kunden über deren NIS2-Anforderungen sprechen",
        "Grundlegende Sicherheitsmaßnahmen implementieren",
        "ISO 27001 oder vergleichbare Zertifizierung erwägen",
      ],
      penaltyRange: "Keine direkten NIS2-Bußgelder",
    };
  }

  // Case 4: Not affected
  return {
    riskLevel: "none",
    entityType: "not_applicable",
    title: "Voraussichtlich nicht betroffen",
    description:
      "Nach aktuellem Stand fällt Ihr Unternehmen nicht unter die NIS2-Richtlinie. Sie operieren nicht in einem der 18 regulierten Sektoren und liefern nicht an kritische Infrastruktur. Gute Cybersicherheitspraktiken sind dennoch empfehlenswert.",
    obligations: [],
    nextSteps: [
      "Allgemeine Cybersicherheitsstandards einhalten (Best Practice)",
      "Regulatorische Entwicklungen beobachten",
      "Prüfen, ob künftige Geschäftsfelder in NIS2-Sektoren fallen",
    ],
    penaltyRange: "Nicht anwendbar",
  };
}
