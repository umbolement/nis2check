// Full NIS2 Assessment - 25 Questions across 7 Categories
// Based on Art. 21 NIS2 Directive requirements

export interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  helpText?: string;
  options: { value: number; label: string }[];
}

export interface CategoryScore {
  category: string;
  label: string;
  score: number;
  maxScore: number;
  percentage: number;
  status: "good" | "partial" | "critical";
  findings: string[];
  recommendations: string[];
}

export interface FullAssessmentResult {
  overallScore: number;
  maxScore: number;
  percentage: number;
  complianceLevel: "compliant" | "partial" | "non_compliant";
  categories: CategoryScore[];
  topPriorities: string[];
  estimatedCost: string;
  estimatedTime: string;
}

export const assessmentCategories = [
  { id: "risk", label: "Risikomanagement" },
  { id: "incident", label: "Incident Management" },
  { id: "continuity", label: "Business Continuity" },
  { id: "supply", label: "Lieferkettensicherheit" },
  { id: "network", label: "Netzwerk- & Informationssicherheit" },
  { id: "access", label: "Zugangsmanagement" },
  { id: "governance", label: "Governance & Meldepflichten" },
];

export const assessmentQuestions: AssessmentQuestion[] = [
  // Category 1: Risikomanagement (4 questions)
  {
    id: "risk_1",
    category: "risk",
    question: "Verfügt Ihr Unternehmen über eine dokumentierte Cybersicherheitsstrategie?",
    helpText: "Eine formale, von der Geschäftsleitung genehmigte Strategie für Informationssicherheit.",
    options: [
      { value: 0, label: "Nein, keine vorhanden" },
      { value: 1, label: "Informell / nicht dokumentiert" },
      { value: 2, label: "Dokumentiert, aber nicht aktuell" },
      { value: 3, label: "Ja, dokumentiert und regelmäßig aktualisiert" },
    ],
  },
  {
    id: "risk_2",
    category: "risk",
    question: "Führen Sie regelmäßige Risikoanalysen für Ihre IT-Systeme durch?",
    helpText: "Systematische Identifikation, Bewertung und Behandlung von Cyberrisiken.",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Ad-hoc / bei Bedarf" },
      { value: 2, label: "Jährlich" },
      { value: 3, label: "Mindestens halbjährlich mit dokumentierten Ergebnissen" },
    ],
  },
  {
    id: "risk_3",
    category: "risk",
    question: "Ist die Geschäftsleitung aktiv in Cybersicherheitsentscheidungen eingebunden?",
    helpText: "NIS2 verlangt persönliche Verantwortung der Geschäftsleitung.",
    options: [
      { value: 0, label: "Nein, IT-Thema wird delegiert" },
      { value: 1, label: "Gelegentliche Information" },
      { value: 2, label: "Regelmäßige Reports an die GL" },
      { value: 3, label: "GL genehmigt Maßnahmen und nimmt an Schulungen teil" },
    ],
  },
  {
    id: "risk_4",
    category: "risk",
    question: "Existiert ein dediziertes Budget für Cybersicherheit?",
    options: [
      { value: 0, label: "Kein separates Budget" },
      { value: 1, label: "Teil des allgemeinen IT-Budgets" },
      { value: 2, label: "Eigenes Budget, aber nicht ausreichend" },
      { value: 3, label: "Eigenes Budget, ausreichend dimensioniert" },
    ],
  },

  // Category 2: Incident Management (4 questions)
  {
    id: "incident_1",
    category: "incident",
    question: "Gibt es einen dokumentierten Incident-Response-Plan?",
    helpText: "Ein festgelegter Prozess zur Erkennung, Analyse und Reaktion auf Sicherheitsvorfälle.",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Informell vorhanden" },
      { value: 2, label: "Dokumentiert, aber nicht getestet" },
      { value: 3, label: "Dokumentiert, regelmäßig getestet und aktualisiert" },
    ],
  },
  {
    id: "incident_2",
    category: "incident",
    question: "Können Sie Sicherheitsvorfälle innerhalb von 24 Stunden an das BSI melden?",
    helpText: "NIS2 verlangt eine Erstmeldung innerhalb von 24h, Folgemeldung innerhalb von 72h.",
    options: [
      { value: 0, label: "Keine Meldefähigkeit vorhanden" },
      { value: 1, label: "Unsicher / nicht getestet" },
      { value: 2, label: "Prozess definiert, aber nicht geübt" },
      { value: 3, label: "Ja, Prozess definiert, Verantwortliche benannt, regelmäßig geübt" },
    ],
  },
  {
    id: "incident_3",
    category: "incident",
    question: "Setzen Sie Systeme zur Erkennung von Cyberangriffen ein (SIEM, IDS/IPS)?",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Basis-Antivirenschutz" },
      { value: 2, label: "IDS/IPS oder SIEM vorhanden" },
      { value: 3, label: "SOC oder Managed Detection & Response aktiv" },
    ],
  },
  {
    id: "incident_4",
    category: "incident",
    question: "Werden Sicherheitsvorfälle systematisch dokumentiert und analysiert?",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Gelegentlich" },
      { value: 2, label: "Ja, Dokumentation vorhanden" },
      { value: 3, label: "Ja, mit Lessons-Learned-Prozess und kontinuierlicher Verbesserung" },
    ],
  },

  // Category 3: Business Continuity (3 questions)
  {
    id: "continuity_1",
    category: "continuity",
    question: "Existiert ein Business Continuity Plan (BCP) für IT-Ausfälle?",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Informal / nicht dokumentiert" },
      { value: 2, label: "Dokumentiert, aber nicht getestet" },
      { value: 3, label: "Dokumentiert, regelmäßig getestet" },
    ],
  },
  {
    id: "continuity_2",
    category: "continuity",
    question: "Haben Sie ein Backup-Konzept mit regelmäßigen Tests der Wiederherstellung?",
    options: [
      { value: 0, label: "Keine regelmäßigen Backups" },
      { value: 1, label: "Backups vorhanden, aber nie getestet" },
      { value: 2, label: "Regelmäßige Backups, gelegentliche Tests" },
      { value: 3, label: "3-2-1 Backup-Strategie mit regelmäßigen Recovery-Tests" },
    ],
  },
  {
    id: "continuity_3",
    category: "continuity",
    question: "Gibt es Disaster-Recovery-Prozeduren für kritische Systeme?",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Teilweise, für einzelne Systeme" },
      { value: 2, label: "Für die meisten kritischen Systeme" },
      { value: 3, label: "Vollständig, mit definierten RTO/RPO und regelmäßigen Tests" },
    ],
  },

  // Category 4: Lieferkettensicherheit (3 questions)
  {
    id: "supply_1",
    category: "supply",
    question: "Bewerten Sie die Cybersicherheit Ihrer Lieferanten und Dienstleister?",
    helpText: "NIS2 verlangt die Berücksichtigung der Sicherheit in der gesamten Lieferkette.",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Nur bei kritischen Lieferanten" },
      { value: 2, label: "Standardisierte Bewertung für alle wesentlichen Lieferanten" },
      { value: 3, label: "Umfassendes Lieferanten-Risikomanagement mit regelmäßiger Überprüfung" },
    ],
  },
  {
    id: "supply_2",
    category: "supply",
    question: "Enthalten Ihre Verträge mit Dienstleistern Cybersicherheitsanforderungen?",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Vereinzelt" },
      { value: 2, label: "Standardmäßig für IT-Dienstleister" },
      { value: 3, label: "Ja, für alle relevanten Verträge mit definierten SLAs" },
    ],
  },
  {
    id: "supply_3",
    category: "supply",
    question: "Haben Sie einen Überblick über alle eingesetzten Software- und Cloud-Dienste?",
    options: [
      { value: 0, label: "Nein, kein vollständiger Überblick" },
      { value: 1, label: "Teilweise bekannt" },
      { value: 2, label: "Asset-Register vorhanden" },
      { value: 3, label: "Vollständiges CMDB/Asset-Management mit regelmäßiger Aktualisierung" },
    ],
  },

  // Category 5: Netzwerk- & Informationssicherheit (4 questions)
  {
    id: "network_1",
    category: "network",
    question: "Setzen Sie Verschlüsselung für sensible Daten ein (at rest und in transit)?",
    options: [
      { value: 0, label: "Nein / nicht systematisch" },
      { value: 1, label: "Nur für bestimmte Bereiche" },
      { value: 2, label: "Für die meisten sensiblen Daten" },
      { value: 3, label: "Umfassende Verschlüsselungsstrategie implementiert" },
    ],
  },
  {
    id: "network_2",
    category: "network",
    question: "Gibt es ein Patch-Management für zeitnahe Sicherheitsupdates?",
    options: [
      { value: 0, label: "Kein systematisches Patching" },
      { value: 1, label: "Gelegentlich, wenn Zeit vorhanden" },
      { value: 2, label: "Regelmäßig, aber ohne feste Fristen" },
      { value: 3, label: "Definierte SLAs für Patches, kritische innerhalb von 48h" },
    ],
  },
  {
    id: "network_3",
    category: "network",
    question: "Ist Ihr Netzwerk segmentiert (z.B. Trennung von OT und IT)?",
    options: [
      { value: 0, label: "Keine Segmentierung" },
      { value: 1, label: "Basis-Firewall vorhanden" },
      { value: 2, label: "Netzwerksegmentierung teilweise umgesetzt" },
      { value: 3, label: "Zero-Trust oder umfassende Mikrosegmentierung" },
    ],
  },
  {
    id: "network_4",
    category: "network",
    question: "Führen Sie regelmäßige Schwachstellenscans oder Penetrationstests durch?",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Ad-hoc / bei Bedarf" },
      { value: 2, label: "Jährliche Penetrationstests" },
      { value: 3, label: "Regelmäßige Scans + mindestens jährliche Pentests" },
    ],
  },

  // Category 6: Zugangsmanagement (3 questions)
  {
    id: "access_1",
    category: "access",
    question: "Setzen Sie Multi-Faktor-Authentifizierung (MFA) ein?",
    helpText: "NIS2 empfiehlt ausdrücklich MFA oder kontinuierliche Authentifizierung.",
    options: [
      { value: 0, label: "Nein, nur Passwörter" },
      { value: 1, label: "Für einige Systeme / Admins" },
      { value: 2, label: "Für die meisten kritischen Systeme" },
      { value: 3, label: "Flächendeckend für alle Zugänge" },
    ],
  },
  {
    id: "access_2",
    category: "access",
    question: "Gibt es ein Berechtigungsmanagement nach dem Least-Privilege-Prinzip?",
    options: [
      { value: 0, label: "Nein, weitgehend offene Berechtigungen" },
      { value: 1, label: "Teilweise, aber nicht systematisch" },
      { value: 2, label: "Rollenbasiertes Berechtigungskonzept vorhanden" },
      { value: 3, label: "Strikt umgesetzt mit regelmäßigen Access Reviews" },
    ],
  },
  {
    id: "access_3",
    category: "access",
    question: "Werden privilegierte Zugänge (Admin-Accounts) besonders geschützt?",
    options: [
      { value: 0, label: "Nein, gleiche Behandlung wie normale Accounts" },
      { value: 1, label: "Separate Admin-Accounts vorhanden" },
      { value: 2, label: "PAM oder ähnliche Lösung teilweise im Einsatz" },
      { value: 3, label: "Vollständiges Privileged Access Management (PAM)" },
    ],
  },

  // Category 7: Governance & Meldepflichten (4 questions)
  {
    id: "governance_1",
    category: "governance",
    question: "Gibt es eine verantwortliche Person / Rolle für Informationssicherheit (CISO)?",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "IT-Leiter übernimmt nebenbei" },
      { value: 2, label: "Definierte Rolle, aber Teilzeit" },
      { value: 3, label: "Dedizierter CISO oder externer ISB mit direktem GL-Reporting" },
    ],
  },
  {
    id: "governance_2",
    category: "governance",
    question: "Werden Mitarbeiter regelmäßig in Cybersicherheit geschult?",
    helpText: "NIS2 verlangt Cyberhygiene-Schulungen für alle Mitarbeiter.",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "Bei Eintritt / einmalig" },
      { value: 2, label: "Jährliche Schulung" },
      { value: 3, label: "Regelmäßige Schulungen + Phishing-Simulationen + Awareness-Programm" },
    ],
  },
  {
    id: "governance_3",
    category: "governance",
    question: "Sind Sie auf eine BSI-Registrierung und die damit verbundenen Meldepflichten vorbereitet?",
    options: [
      { value: 0, label: "Nicht bekannt / nicht vorbereitet" },
      { value: 1, label: "Grundsätzlich informiert" },
      { value: 2, label: "Prozess definiert, noch nicht implementiert" },
      { value: 3, label: "Vollständig vorbereitet, Kontaktstelle benannt, Prozess getestet" },
    ],
  },
  {
    id: "governance_4",
    category: "governance",
    question: "Haben Sie ein ISMS (z.B. ISO 27001) oder vergleichbare Zertifizierung?",
    options: [
      { value: 0, label: "Nein" },
      { value: 1, label: "In Planung" },
      { value: 2, label: "Teilweise implementiert (ohne Zertifizierung)" },
      { value: 3, label: "Zertifiziertes ISMS (ISO 27001, BSI IT-Grundschutz)" },
    ],
  },
];

export function evaluateFullAssessment(answers: Record<string, number>): FullAssessmentResult {
  const categoryResults: CategoryScore[] = assessmentCategories.map((cat) => {
    const catQuestions = assessmentQuestions.filter((q) => q.category === cat.id);
    const maxScore = catQuestions.length * 3;
    const score = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const percentage = Math.round((score / maxScore) * 100);

    const findings: string[] = [];
    const recommendations: string[] = [];

    catQuestions.forEach((q) => {
      const answer = answers[q.id] || 0;
      if (answer <= 1) {
        findings.push(`Kritisch: ${q.question}`);
        const bestOption = q.options[q.options.length - 1];
        recommendations.push(`${q.question} → Ziel: ${bestOption.label}`);
      }
    });

    return {
      category: cat.id,
      label: cat.label,
      score,
      maxScore,
      percentage,
      status: percentage >= 70 ? "good" : percentage >= 40 ? "partial" : "critical",
      findings,
      recommendations,
    };
  });

  const overallScore = categoryResults.reduce((sum, c) => sum + c.score, 0);
  const maxScore = categoryResults.reduce((sum, c) => sum + c.maxScore, 0);
  const percentage = Math.round((overallScore / maxScore) * 100);

  const criticalCategories = categoryResults.filter((c) => c.status === "critical");
  const topPriorities = criticalCategories
    .flatMap((c) => c.recommendations.slice(0, 2))
    .slice(0, 5);

  if (topPriorities.length < 3) {
    const partialCats = categoryResults.filter((c) => c.status === "partial");
    const more = partialCats.flatMap((c) => c.recommendations.slice(0, 1));
    topPriorities.push(...more.slice(0, 5 - topPriorities.length));
  }

  // Cost estimation based on company size and compliance level
  let estimatedCost: string;
  let estimatedTime: string;

  if (percentage >= 70) {
    estimatedCost = "€10.000 – €30.000";
    estimatedTime = "3 – 6 Monate";
  } else if (percentage >= 40) {
    estimatedCost = "€30.000 – €80.000";
    estimatedTime = "6 – 12 Monate";
  } else {
    estimatedCost = "€80.000 – €200.000+";
    estimatedTime = "12 – 18 Monate";
  }

  return {
    overallScore,
    maxScore,
    percentage,
    complianceLevel: percentage >= 70 ? "compliant" : percentage >= 40 ? "partial" : "non_compliant",
    categories: categoryResults,
    topPriorities,
    estimatedCost,
    estimatedTime,
  };
}
