import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, Search, BookOpen, AlertTriangle, Cpu, Users, Award, 
  CheckCircle, ChevronRight, ArrowLeft, RefreshCw, HelpCircle, 
  FileText, Activity, AlertCircle, Info, Stethoscope, Pill, 
  HeartPulse, ExternalLink, CheckSquare, Square, Send, Sparkles,
  BarChart2, Book, Check, X, Filter, Bookmark
} from 'lucide-react';

// ==========================================
// TYPES
// ==========================================
interface Medication {
  id: string;
  genericName: string;
  brandNames: string;
  classification: string;
  category: string;
  formulations: string[];
  routes: string[];
  mechanismOfAction: string;
  therapeuticUses: {
    treats: string[];
    whyPrescribed: string;
    expectedBenefits: string[];
  };
  sideEffects: {
    common: string[];
    lessCommon: string[];
    serious: string[];
  };
  contraindications: {
    absolute: string[];
    precautions: string[];
    interactions: string[];
    pregnancy: string;
  };
  complications: Array<{
    title: string;
    whatItIs: string;
    whyOccurs: string;
    signsSymptoms: string[];
    nurseObservation: string;
    urgentEscalation: string;
  }>;
  dosage: {
    adult: string;
    paediatric: string;
    administrationPrecautions: string[];
  };
  nursingGuide: {
    before: string[];
    during: string[];
    after: string[];
    whatNotToForget: string[];
    withholdAndEscalate: {
      routineEscalation: string[];
      emergencyIntervention: string[];
    };
  };
  references: Array<{
    organisation: string;
    title: string;
    url: string;
    reviewDate: string;
  }>;
}

// ==========================================
// 25 MEDICATIONS DATABASE
// ==========================================
const MEDICATIONS_DATABASE: Medication[] = [
  // 1. ANALGESICS & ANTI-INFLAMMATORY
  {
    id: 'paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    brandNames: 'Panadol, Tylenol, Calpol',
    classification: 'Analgesic / Antipyretic',
    category: 'Analgesics & Anti-inflammatory',
    formulations: ['Tablets 500mg', 'Syrup 120mg/5ml', 'IV Infusion 10mg/ml'],
    routes: ['Oral', 'Intravenous', 'Rectal'],
    mechanismOfAction: 'Inhibits prostaglandin synthesis in the CNS and acts on hypothalamic heat-regulating center.',
    therapeuticUses: {
      treats: ['Mild to moderate pain', 'Fever (pyrexia)'],
      whyPrescribed: 'Symptomatic relief of pain and fever with minimal GI irritation.',
      expectedBenefits: ['Reduction in temperature', 'Alleviation of discomfort']
    },
    sideEffects: {
      common: ['Minor GI upset (rare)'],
      lessCommon: ['Rash', 'Hypotension with rapid IV'],
      serious: ['Hepatotoxicity in overdose', 'Severe skin reactions']
    },
    contraindications: {
      absolute: ['Severe hepatic impairment', 'Hypersensitivity'],
      precautions: ['Chronic alcohol use', 'G6PD deficiency', 'Mild renal impairment'],
      interactions: ['Alcohol (hepatotoxicity risk)', 'Warfarin (prolonged high doses)'],
      pregnancy: 'Considered safe for short-term use in pregnancy and breastfeeding.'
    },
    complications: [
      {
        title: 'Paracetamol Hepatotoxicity / Overdose',
        whatItIs: 'Severe hepatic necrosis from toxic metabolite accumulation (NAPQI).',
        whyOccurs: 'Accidental or intentional overdose depleting glutathione.',
        signsSymptoms: ['Right upper quadrant pain', 'Jaundice', 'Elevated AST/ALT'],
        nurseObservation: 'Monitor total daily cumulative dose (max 4g/day for adults).',
        urgentEscalation: 'Notify medical team immediately and prepare for N-acetylcysteine if indicated.'
      }
    ],
    dosage: {
      adult: '500mg - 1000mg every 4-6 hours orally. Maximum 4g in 24 hours.',
      paediatric: '10-15 mg/kg per dose every 4-6 hours.',
      administrationPrecautions: ['Ensure minimum 4-hour interval between doses', 'Infuse IV over 15 minutes']
    },
    nursingGuide: {
      before: ['Confirm prescription and max daily dose', 'Check allergy status and liver function'],
      during: ['Administer oral with or without food', 'Infuse IV slowly'],
      after: ['Reassess pain or temperature in 30-60 mins', 'Educate patient on combined cold/flu remedies'],
      whatNotToForget: ['Total daily dose must not exceed 4g from all combined sources.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify prescriber if pain persists.'],
        emergencyIntervention: ['Withhold and notify team if signs of acute liver injury occur.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Paracetamol Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },
  {
    id: 'ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: 'Advil, Brufen, Nurofen',
    classification: 'Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    category: 'Analgesics & Anti-inflammatory',
    formulations: ['Tablets 200mg/400mg', 'Suspension 100mg/5ml'],
    routes: ['Oral', 'Topical'],
    mechanismOfAction: 'Inhibits COX-1 and COX-2 enzymes, reducing prostaglandin synthesis.',
    therapeuticUses: {
      treats: ['Inflammatory conditions', 'Musculoskeletal pain', 'Fever'],
      whyPrescribed: 'To reduce inflammation, swelling, and associated pain.',
      expectedBenefits: ['Decreased joint swelling and inflammatory pain relief']
    },
    sideEffects: {
      common: ['Dyspepsia', 'Heartburn', 'Nausea'],
      lessCommon: ['Dizziness', 'Fluid retention'],
      serious: ['GI ulceration and bleeding', 'Acute kidney injury', 'Bronchospasm']
    },
    contraindications: {
      absolute: ['Active peptic ulcer disease', 'Severe heart failure', 'Third trimester pregnancy'],
      precautions: ['Renal impairment', 'Hypertension', 'History of CV disease'],
      interactions: ['Anticoagulants (bleeding risk)', 'ACE inhibitors (renal risk)', 'Diuretics'],
      pregnancy: 'Avoid in third trimester; caution in 1st/2nd.'
    },
    complications: [
      {
        title: 'NSAID-Induced Peptic Ulcer & GI Bleeding',
        whatItIs: 'Mucosal damage in stomach/duodenum from prostaglandin inhibition.',
        whyOccurs: 'Prolonged use or risk factors (age >65, history of ulcers).',
        signsSymptoms: ['Epigastric pain', 'Melaena', 'Haematemesis'],
        nurseObservation: 'Monitor stool colour and epigastric discomfort.',
        urgentEscalation: 'Stop drug immediately if melaena or haematemesis occurs.'
      }
    ],
    dosage: {
      adult: '200mg - 400mg every 4-6 hours. Max 1200mg OTC or 2400mg prescribed.',
      paediatric: '10 mg/kg every 6-8 hours (>6 months).',
      administrationPrecautions: ['Administer with food or milk to minimize GI irritation']
    },
    nursingGuide: {
      before: ['Check history of peptic ulcer or renal impairment', 'Assess baseline BP'],
      during: ['Give with food', 'Do not lie down for 15-30 minutes post-dose'],
      after: ['Monitor for GI distress or bleeding', 'Evaluate pain reduction'],
      whatNotToForget: ['Do not combine with other NSAIDs without medical advice.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if dyspepsia persists.'],
        emergencyIntervention: ['Withhold and seek urgent care if GI bleeding occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Ibuprofen Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },
  {
    id: 'aspirin',
    genericName: 'Aspirin (Acetylsalicylic Acid)',
    brandNames: 'Dispirin, Bayer Aspirin',
    classification: 'Antiplatelet / Salicylate',
    category: 'Analgesics & Anti-inflammatory',
    formulations: ['Tablets 75mg/81mg/300mg'],
    routes: ['Oral'],
    mechanismOfAction: 'Irreversibly inhibits platelet COX-1, preventing thromboxane A2 synthesis and platelet aggregation.',
    therapeuticUses: {
      treats: ['Secondary prevention of MI and ischemic stroke', 'Acute myocardial infarction'],
      whyPrescribed: 'To prevent blood clots in cardiovascular disease.',
      expectedBenefits: ['Reduced risk of recurrent stroke or heart attack']
    },
    sideEffects: {
      common: ['Gastric irritation', 'Heartburn'],
      lessCommon: ['Bruising', 'Tinnitus at high doses'],
      serious: ['Major GI haemorrhage', 'Reye syndrome in children <16']
    },
    contraindications: {
      absolute: ['Active bleeding', 'Children <16 with viral illness (Reye syndrome)', 'Active peptic ulcer'],
      precautions: ['Renal/hepatic impairment', 'Pre-surgery'],
      interactions: ['Anticoagulants (major bleeding risk)', 'Corticosteroids (GI ulcer risk)'],
      pregnancy: 'Avoid during third trimester.'
    },
    complications: [
      {
        title: 'Major Bleeding & Salicylism',
        whatItIs: 'Systemic toxicity from excessive doses or severe bleeding.',
        whyOccurs: 'High doses or synergistic antiplatelet combinations.',
        signsSymptoms: ['Tinnitus', 'Hyperventilation', 'Bruising', 'GI bleeding'],
        nurseObservation: 'Monitor for bruising, epistaxis, or melaena.',
        urgentEscalation: 'Report signs of major bleeding immediately; check coagulation profile.'
      }
    ],
    dosage: {
      adult: '75mg - 150mg daily for prophylaxis; 300mg loading for acute MI.',
      paediatric: 'Contraindicated under 16 for fever/pain.',
      administrationPrecautions: ['Take with food', 'Swallow enteric-coated tablets whole']
    },
    nursingGuide: {
      before: ['Verify age (>16)', 'Check bleeding history and surgery schedules'],
      during: ['Ensure taken with water/food', 'Do not crush enteric-coated tabs'],
      after: ['Observe for bruising or GI bleeding', 'Educate on reporting black stools'],
      whatNotToForget: ['Never give to children with viral illnesses.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician of minor bruising.'],
        emergencyIntervention: ['Withhold immediately if active bleeding occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Aspirin Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },
  {
    id: 'tramadol',
    genericName: 'Tramadol Hydrochloride',
    brandNames: 'Ultram, Tramal',
    classification: 'Centrally Acting Opioid Analgesic',
    category: 'Analgesics & Anti-inflammatory',
    formulations: ['Capsules 50mg', 'ER Tablets 100mg/200mg', 'Injection 50mg/ml'],
    routes: ['Oral', 'IV', 'IM'],
    mechanismOfAction: 'Binds to mu-opioid receptors and weakly inhibits reuptake of norepinephrine and serotonin.',
    therapeuticUses: {
      treats: ['Moderate to moderately severe acute and chronic pain'],
      whyPrescribed: 'To manage pain unresponsive to non-opioid analgesics.',
      expectedBenefits: ['Significant pain score reduction']
    },
    sideEffects: {
      common: ['Dizziness', 'Somnolence', 'Constipation', 'Nausea'],
      lessCommon: ['Dry mouth', 'Sweating', 'Headache'],
      serious: ['Respiratory depression', 'Serotonin syndrome', 'Seizures']
    },
    contraindications: {
      absolute: ['Acute intoxication', 'Severe respiratory depression', 'MAO inhibitor use within 14 days'],
      precautions: ['Substance abuse history', 'Head injury', 'Epilepsy'],
      interactions: ['SSRIs/SNRIs (serotonin syndrome)', 'CNS depressants / alcohol'],
      pregnancy: 'Use with caution; chronic use causes neonatal withdrawal.'
    },
    complications: [
      {
        title: 'Serotonin Syndrome & Respiratory Depression',
        whatItIs: 'Life-threatening serotonergic hyperactivity or brainstem respiratory suppression.',
        whyOccurs: 'Combination with SSRIs or opioid overdose.',
        signsSymptoms: ['Agitation, clonus, hyperthermia', 'Slow breathing (<10/min), cyanosis'],
        nurseObservation: 'Monitor respiratory rate, SpO2, and consciousness level.',
        urgentEscalation: 'Administer naloxone if opioid overdose suspected; summon emergency help.'
      }
    ],
    dosage: {
      adult: '50mg - 100mg every 4-6 hours. Max 400mg daily.',
      paediatric: 'Not recommended under 12 years.',
      administrationPrecautions: ['Swallow ER tablets whole', 'Infuse IV slowly over 2-3 mins']
    },
    nursingGuide: {
      before: ['Assess pain score, respiratory rate, and concurrent serotonergic drugs'],
      during: ['Monitor sedation and advise slow position changes'],
      after: ['Assess pain relief efficacy in 30-60 mins', 'Ensure call bell is within reach'],
      whatNotToForget: ['Do not exceed 400mg daily to prevent seizures.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify prescriber if pain control is inadequate.'],
        emergencyIntervention: ['Withhold and summon emergency help if respiratory rate drops below 10/min.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Tramadol Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },

  // 2. ANTIBIOTICS
  {
    id: 'amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    brandNames: 'Amoxil, Trimox',
    classification: 'Aminopenicillin Antibiotic',
    category: 'Antibiotics',
    formulations: ['Capsules 250mg/500mg', 'Suspension 125mg/5ml'],
    routes: ['Oral'],
    mechanismOfAction: 'Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs).',
    therapeuticUses: {
      treats: ['Acute otitis media', 'Streptococcal pharyngitis', 'Lower respiratory infections', 'UTIs'],
      whyPrescribed: 'To treat susceptible bacterial infections.',
      expectedBenefits: ['Resolution of infection symptoms within 48-72 hours']
    },
    sideEffects: {
      common: ['Diarrhoea', 'Nausea', 'Mild rash'],
      lessCommon: ['Vomiting', 'Urticaria'],
      serious: ['Anaphylaxis', 'C. difficile-associated diarrhoea']
    },
    contraindications: {
      absolute: ['Known hypersensitivity to penicillins'],
      precautions: ['Allergic disorders (asthma)', 'Mononucleosis (rash risk)', 'Renal impairment'],
      interactions: ['Allopurinol (skin rash risk)', 'Oral contraceptives (barrier contraception advised)'],
      pregnancy: 'Considered safe in pregnancy (FDA Category B).'
    },
    complications: [
      {
        title: 'Anaphylactic Reaction',
        whatItIs: 'Rapid systemic hypersensitivity reaction.',
        whyOccurs: 'Immune overreaction in penicillin-sensitised individuals.',
        signsSymptoms: ['Bronchospasm, wheezing', 'Angioedema', 'Urticaria', 'Hypotension'],
        nurseObservation: 'Verify allergy status before administration; observe 30 mins after first dose.',
        urgentEscalation: 'Stop drug, call emergency code, administer IM adrenaline, maintain airway.'
      }
    ],
    dosage: {
      adult: '250mg - 500mg every 8 hours or 500mg - 875mg every 12 hours.',
      paediatric: '25 - 45 mg/kg/day in divided doses.',
      administrationPrecautions: ['Can be taken with or without food', 'Shake suspension well']
    },
    nursingGuide: {
      before: ['Verify penicillin allergy history', 'Check baseline renal function'],
      during: ['Ensure full course is taken at evenly spaced intervals'],
      after: ['Monitor for allergic skin reactions or diarrhoea', 'Evaluate infection resolution'],
      whatNotToForget: ['Instruct patient to complete the entire prescribed course.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild diarrhoea develops.'],
        emergencyIntervention: ['Withhold immediately and activate emergency protocols if anaphylaxis occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Amoxicillin Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },
  {
    id: 'amoxicillin-clavulanate',
    genericName: 'Amoxicillin and Potassium Clavulanate',
    brandNames: 'Augmentin, Amoclav',
    classification: 'Aminopenicillin + Beta-Lactamase Inhibitor',
    category: 'Antibiotics',
    formulations: ['Tablets 625mg/1000mg', 'Suspension 457mg/5ml', 'IV 1.2g'],
    routes: ['Oral', 'Intravenous'],
    mechanismOfAction: 'Amoxicillin inhibits cell wall synthesis; clavulanate inhibits beta-lactamase enzymes.',
    therapeuticUses: {
      treats: ['Sinusitis', 'Community-acquired pneumonia', 'Resistant UTIs', 'Skin infections'],
      whyPrescribed: 'To treat infections caused by beta-lactamase-producing resistant bacteria.',
      expectedBenefits: ['Clearance of resistant bacterial infections']
    },
    sideEffects: {
      common: ['Diarrhoea / loose stools', 'Nausea', 'Vaginal thrush'],
      lessCommon: ['Abdominal discomfort', 'Headache'],
      serious: ['Cholestatic jaundice / hepatic dysfunction', 'C. difficile colitis', 'Anaphylaxis']
    },
    contraindications: {
      absolute: ['History of augmentin-associated jaundice', 'Penicillin hypersensitivity'],
      precautions: ['Severe renal impairment', 'History of hepatic impairment'],
      interactions: ['Allopurinol (rash risk)', 'Warfarin (increased INR/bleeding risk)'],
      pregnancy: 'Considered generally safe in pregnancy.'
    },
    complications: [
      {
        title: 'Antibiotic-Associated Colitis & Cholestatic Jaundice',
        whatItIs: 'Severe bowel inflammation or idiosyncratic liver injury.',
        whyOccurs: 'Disruption of gut flora or clavulanate hepatic reaction.',
        signsSymptoms: ['Severe watery diarrhoea, abdominal cramps', 'Jaundice, dark urine'],
        nurseObservation: 'Monitor stool frequency and inspect for jaundice.',
        urgentEscalation: 'Stop antibiotic immediately and notify physician if severe diarrhoea or jaundice develops.'
      }
    ],
    dosage: {
      adult: '625mg to 1g orally every 8-12 hours. IV 1.2g every 8 hours.',
      paediatric: 'Based on amoxicillin component: 25-45 mg/kg/day.',
      administrationPrecautions: ['Take at the start of a meal to reduce GI distress']
    },
    nursingGuide: {
      before: ['Check penicillin and beta-lactamase inhibitor allergy history'],
      during: ['Administer at start of meals for optimal absorption'],
      after: ['Monitor for GI upset or rash', 'Ensure complete adherence'],
      whatNotToForget: ['Diarrhoea is more common with Augmentin due to clavulanate.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild GI distress persists.'],
        emergencyIntervention: ['Withhold immediately if signs of jaundice or severe colitis appear.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Augmentin Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },
  {
    id: 'ceftriaxone',
    genericName: 'Ceftriaxone Sodium',
    brandNames: 'Rocephin',
    classification: 'Third-Generation Cephalosporin',
    category: 'Antibiotics',
    formulations: ['Vials 250mg, 1g, 2g'],
    routes: ['Intramuscular', 'Intravenous'],
    mechanismOfAction: 'Inhibits bacterial cell wall synthesis with broad-spectrum bactericidal activity.',
    therapeuticUses: {
      treats: ['Severe respiratory infections', 'Meningitis', 'Gonorrhoea', 'Sepsis', 'Typhoid fever'],
      whyPrescribed: 'To treat severe bacterial infections requiring broad-spectrum coverage.',
      expectedBenefits: ['Rapid control of systemic infection']
    },
    sideEffects: {
      common: ['Injection site pain', 'Diarrhoea', 'Rash'],
      lessCommon: ['Eosinophilia', 'Transient LFT increases'],
      serious: ['Anaphylaxis', 'C. diff colitis', 'Neonatal calcium precipitation']
    },
    contraindications: {
      absolute: ['Neonates (<28 days) receiving calcium-containing IV solutions', 'Cephalosporin hypersensitivity'],
      precautions: ['Renal and hepatic dysfunction', 'Gallbladder disease'],
      interactions: ['Calcium-containing IV fluids (do not co-administer)', 'Aminoglycosides (nephrotoxicity risk)'],
      pregnancy: 'Considered safe during pregnancy.'
    },
    complications: [
      {
        title: 'Ceftriaxone-Calcium Precipitation & Anaphylaxis',
        whatItIs: 'Fatal crystalline precipitation in neonates when mixed with IV calcium.',
        whyOccurs: 'Chemical incompatibility with calcium solutions.',
        signsSymptoms: ['Respiratory distress, cyanosis in neonates', 'Urticaria, hypotension'],
        nurseObservation: 'Never co-administer ceftriaxone with calcium solutions in neonates.',
        urgentEscalation: 'Stop infusion, flush line, and initiate resuscitation if anaphylaxis occurs.'
      }
    ],
    dosage: {
      adult: '1g to 2g once daily (up to 4g/day for severe infections).',
      paediatric: '50 - 75 mg/kg once daily.',
      administrationPrecautions: ['Reconstitute IM with 1% lidocaine if indicated', 'Infuse IV over 30 mins']
    },
    nursingGuide: {
      before: ['Verify allergy history and rule out neonatal calcium IV incompatibility'],
      during: ['Never mix with calcium IV fluids in the same line'],
      after: ['Monitor injection site for phlebitis', 'Assess for clinical improvement'],
      whatNotToForget: ['Long half-life allows once-daily dosing.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if injection site pain occurs.'],
        emergencyIntervention: ['Withhold immediately if anaphylaxis develops.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Ceftriaxone Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },
  {
    id: 'metronidazole',
    genericName: 'Metronidazole',
    brandNames: 'Flagyl, Metrorogyl',
    classification: 'Nitroimidazole Antibiotic / Antiprotozoal',
    category: 'Antibiotics',
    formulations: ['Tablets 200mg/400mg', 'IV Infusion 500mg/100ml'],
    routes: ['Oral', 'Intravenous', 'Topical'],
    mechanismOfAction: 'Inhibits nucleic acid synthesis by disrupting DNA in anaerobes and protozoa.',
    therapeuticUses: {
      treats: ['Anaerobic bacterial infections', 'Trichomoniasis', 'Amoebiasis', 'Giardiasis', 'C. diff'],
      whyPrescribed: 'To eliminate anaerobic pathogens and protozoa.',
      expectedBenefits: ['Resolution of anaerobic infection or abscesses']
    },
    sideEffects: {
      common: ['Metallic taste', 'Nausea', 'Dark or reddish-brown urine', 'Headache'],
      lessCommon: ['Dry mouth', 'Dizziness'],
      serious: ['Peripheral neuropathy', 'CNS toxicity / seizures', 'Disulfiram-like alcohol reaction']
    },
    contraindications: {
      absolute: ['First trimester of pregnancy', 'Alcohol ingestion'],
      precautions: ['Blood dyscrasias', 'CNS disorders', 'Severe hepatic impairment'],
      interactions: ['Alcohol (severe disulfiram reaction)', 'Warfarin (enhanced bleeding risk)'],
      pregnancy: 'Avoid during first trimester.'
    },
    complications: [
      {
        title: 'Disulfiram-Like Reaction & CNS Toxicity',
        whatItIs: 'Severe toxic reaction when combined with alcohol, or neurological toxicity.',
        whyOccurs: 'Inhibition of aldehyde dehydrogenase or neural accumulation.',
        signsSymptoms: ['Flushing, throbbing headache, vomiting, chest pain with alcohol', 'Peripheral neuropathy, seizures'],
        nurseObservation: 'Warn patient strictly against alcohol during treatment and 48 hours post-completion.',
        urgentEscalation: 'Stop medication and notify physician if neurological symptoms or numbness arise.'
      }
    ],
    dosage: {
      adult: '400mg orally or 500mg IV every 8 hours.',
      paediatric: '7.5 mg/kg every 8 hours.',
      administrationPrecautions: ['Administer oral with/after food', 'Infuse IV over 30-60 mins']
    },
    nursingGuide: {
      before: ['Check alcohol history and pregnancy status (first trimester)'],
      during: ['Warn patient against any alcohol consumption'],
      after: ['Monitor for peripheral neuropathy (tingling in fingers/toes)'],
      whatNotToForget: ['Emphasise absolute alcohol avoidance during and for 48 hours post-treatment.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify prescriber if metallic taste is bothersome.'],
        emergencyIntervention: ['Withhold immediately if numbness, ataxia, or seizures occur.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Metronidazole Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },
  {
    id: 'azithromycin',
    genericName: 'Azithromycin',
    brandNames: 'Zithromax, Azee',
    classification: 'Macrolide Antibiotic',
    category: 'Antibiotics',
    formulations: ['Tablets 250mg/500mg', 'IV Infusion 500mg'],
    routes: ['Oral', 'Intravenous'],
    mechanismOfAction: 'Inhibits bacterial protein synthesis by binding to 50S ribosomal subunit.',
    therapeuticUses: {
      treats: ['Community-acquired pneumonia', 'Chlamydia infections', 'Bronchitis', 'Pharyngitis'],
      whyPrescribed: 'To treat respiratory and STI bacterial infections with short dosing schedules.',
      expectedBenefits: ['Resolution of respiratory or urogenital infection']
    },
    sideEffects: {
      common: ['Diarrhoea', 'Nausea', 'Abdominal pain'],
      lessCommon: ['Headache', 'Dizziness'],
      serious: ['QT interval prolongation / Torsades de Pointes', 'Hepatotoxicity', 'Anaphylaxis']
    },
    contraindications: {
      absolute: ['Macrolide hypersensitivity', 'History of cholestatic jaundice with azithromycin'],
      precautions: ['Prolonged QT interval or arrhythmias', 'Severe hepatic impairment'],
      interactions: ['QT-prolonging drugs', 'Digoxin', 'Warfarin'],
      pregnancy: 'Considered safe in pregnancy (FDA Category B).'
    },
    complications: [
      {
        title: 'QT Interval Prolongation & Arrhythmias',
        whatItIs: 'Dangerous prolongation of cardiac repolarisation leading to ventricular arrhythmias.',
        whyOccurs: 'Electrophysiological effect on cardiac ion channels.',
        signsSymptoms: ['Palpitations, dizziness, syncope'],
        nurseObservation: 'Review ECG and electrolytes (potassium, magnesium) prior to administration.',
        urgentEscalation: 'Stop infusion and notify medical team if syncope or palpitations occur.'
      }
    ],
    dosage: {
      adult: '500mg once daily for 3 days (or 500mg day 1, then 250mg days 2-5).',
      paediatric: '10 mg/kg once daily for 3 days.',
      administrationPrecautions: ['Can take with or without food', 'Infuse IV over at least 60 minutes']
    },
    nursingGuide: {
      before: ['Check macrolide allergy and cardiac history / QT interval'],
      during: ['Ensure full compliance with short course'],
      after: ['Monitor for GI distress or allergic rash'],
      whatNotToForget: ['Tissue concentration persists for several days post-treatment.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild diarrhoea persists.'],
        emergencyIntervention: ['Withhold immediately if anaphylaxis or cardiac arrhythmias occur.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Azithromycin Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },

  // 3. ANTIMALARIALS
  {
    id: 'artemether-lumefantrine',
    genericName: 'Artemether and Lumefantrine',
    brandNames: 'Coartem, Lumartem',
    classification: 'Artemisinin-Based Combination Therapy (ACT)',
    category: 'Antimalarials',
    formulations: ['Tablets 20mg artemether / 120mg lumefantrine'],
    routes: ['Oral'],
    mechanismOfAction: 'Artemether clears parasites via free radicals; lumefantrine eliminates remaining parasites.',
    therapeuticUses: {
      treats: ['Uncomplicated Plasmodium falciparum malaria'],
      whyPrescribed: 'First-line treatment to rapidly clear malarial parasites.',
      expectedBenefits: ['Fever clearance within 24-48 hours and complete cure']
    },
    sideEffects: {
      common: ['Headache', 'Dizziness', 'Loss of appetite', 'Joint/muscle pain'],
      lessCommon: ['Sleep disorders', 'Palpitations', 'Nausea'],
      serious: ['QT interval prolongation', 'Hypersensitivity']
    },
    contraindications: {
      absolute: ['Severe or complicated malaria', 'Hypersensitivity'],
      precautions: ['Cardiac arrhythmias', 'Severe hepatic/renal impairment'],
      interactions: ['QT-prolonging drugs', 'CYP3A4 inhibitors/inducers'],
      pregnancy: 'Recommended in 2nd/3rd trimesters; used in 1st if no alternative.'
    },
    complications: [
      {
        title: 'Progression to Severe Malaria',
        whatItIs: 'Failure to clear parasites leading to cerebral malaria or multi-organ failure.',
        whyOccurs: 'Drug resistance or administration without dietary fat.',
        signsSymptoms: ['Persistent high fever, impaired consciousness, jaundice, severe anaemia'],
        nurseObservation: 'Ensure each dose is taken with fatty food or milk for absorption.',
        urgentEscalation: 'Escalate to inpatient IV artesunate if danger signs develop.'
      }
    ],
    dosage: {
      adult: '4 tablets at 0h, 8h, then twice daily for 2 days (6-dose regimen).',
      paediatric: 'Weight-based dosing (5-14kg: 1 tab; 15-24kg: 2 tabs, etc.).',
      administrationPrecautions: ['Must be taken with food or milk', 'Repeat dose if vomited within 1 hour']
    },
    nursingGuide: {
      before: ['Confirm P. falciparum malaria diagnosis', 'Assess pregnancy and cardiac history'],
      during: ['Ensure administration with fatty food or milk', 'Supervise 6-dose schedule'],
      after: ['Monitor temperature and parasite clearance'],
      whatNotToForget: ['Fat significantly enhances lumefantrine absorption.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if persistent vomiting prevents retention.'],
        emergencyIntervention: ['Escalate immediately to IV artesunate if severe malaria signs appear.']
      }
    },
    references: [
      { organisation: 'WHO', title: 'Malaria Treatment Guidelines', url: 'https://www.who.int', reviewDate: '2025' }
    ]
  },
  {
    id: 'artesunate',
    genericName: 'Artesunate',
    brandNames: 'Artesun, Larinate',
    classification: 'Parenteral Antimalarial Agent',
    category: 'Antimalarials',
    formulations: ['Vials 60mg anhydrous artesunate with sodium bicarbonate'],
    routes: ['Intravenous', 'Intramuscular'],
    mechanismOfAction: 'Produces free radicals that damage malarial parasite proteins, giving rapid parasiticidal action.',
    therapeuticUses: {
      treats: ['Severe and complicated Plasmodium falciparum malaria'],
      whyPrescribed: 'First-line life-saving treatment for severe malaria.',
      expectedBenefits: ['Rapid clearance of parasitaemia and mortality reduction']
    },
    sideEffects: {
      common: ['Transient reticulocytopenia', 'Injection site pain'],
      lessCommon: ['Elevated liver enzymes', 'Dizziness'],
      serious: ['Delayed haemolytic anaemia (weeks post-treatment)', 'Anaphylaxis']
    },
    contraindications: {
      absolute: ['Known hypersensitivity to artemisinins'],
      precautions: ['Severe renal/hepatic impairment', 'Pregnancy (use for severe malaria)'],
      interactions: ['Few major drug interactions due to short half-life'],
      pregnancy: 'Recommended in all trimesters for severe malaria.'
    },
    complications: [
      {
        title: 'Post-Artesunate Delayed Haemolytic Anaemia (PADHA)',
        whatItIs: 'Delayed destruction of newly formed RBCs weeks after malaria recovery.',
        whyOccurs: 'Pitting of infected RBCs by spleen shortens cell lifespan.',
        signsSymptoms: ['Pallor, fatigue, dark urine, jaundice 1-3 weeks post-treatment'],
        nurseObservation: 'Educate patient to return for follow-up Hb checks at 14 and 28 days.',
        urgentEscalation: 'Notify medical team if pallor, fatigue, or dark urine occurs weeks post-recovery.'
      }
    ],
    dosage: {
      adult: '2.4 mg/kg IV or IM at 0, 12, and 24 hours, then daily.',
      paediatric: 'Weight <20kg: 3 mg/kg; ≥20kg: 2.4 mg/kg.',
      administrationPrecautions: ['Reconstitute with 1ml 5% sodium bicarbonate, shake 2 mins, dilute in 5ml normal saline for slow IV push']
    },
    nursingGuide: {
      before: ['Confirm severe malaria parasitaemia', 'Check baseline FBC and organ function', 'Weigh accurately'],
      during: ['Administer slow IV bolus or IM injection', 'Transition to oral ACT as soon as tolerated'],
      after: ['Monitor vital signs every 4 hours', 'Schedule 14- and 28-day Hb follow-up'],
      whatNotToForget: ['Always follow with a full 3-day course of oral ACT.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if venous access fails.'],
        emergencyIntervention: ['Withhold and escalate immediately if anaphylaxis or neurological deterioration occurs.']
      }
    },
    references: [
      { organisation: 'WHO', title: 'Severe Malaria Treatment Guidelines', url: 'https://www.who.int', reviewDate: '2025' }
    ]
  },

  // 4. ANTIHYPERTENSIVES & CARDIOVASCULAR
  {
    id: 'amlodipine',
    genericName: 'Amlodipine Besylate',
    brandNames: 'Norvasc, Amloc',
    classification: 'Calcium Channel Blocker (Dihydropyridine)',
    category: 'Antihypertensives & Cardiovascular',
    formulations: ['Tablets 5mg/10mg'],
    routes: ['Oral'],
    mechanismOfAction: 'Inhibits calcium ion influx into vascular smooth muscle, causing peripheral arterial vasodilation.',
    therapeuticUses: {
      treats: ['Essential hypertension', 'Chronic stable angina'],
      whyPrescribed: 'To lower blood pressure and reduce myocardial oxygen demand.',
      expectedBenefits: ['Sustained reduction in blood pressure and fewer angina episodes']
    },
    sideEffects: {
      common: ['Peripheral oedema (ankle swelling)', 'Flushing', 'Dizziness', 'Fatigue'],
      lessCommon: ['Headache', 'Palpitations', 'Nausea'],
      serious: ['Severe hypotension', 'Worsening angina upon initiation']
    },
    contraindications: {
      absolute: ['Severe hypotension (systolic <90 mmHg)', 'Cardiogenic shock'],
      precautions: ['Severe aortic stenosis', 'Heart failure with reduced ejection fraction'],
      interactions: ['Strong CYP3A4 inhibitors', 'Simvastatin', 'Other antihypertensives'],
      pregnancy: 'Use with caution; alternative agents preferred.'
    },
    complications: [
      {
        title: 'Severe Hypotension & Peripheral Oedema',
        whatItIs: 'Excessive vasodilation leading to low BP or dependent oedema.',
        whyOccurs: 'Pharmacological vasodilation exceeding compensatory mechanisms.',
        signsSymptoms: ['Dizziness upon standing, lightheadedness', 'Bilateral ankle swelling'],
        nurseObservation: 'Monitor BP and HR before administration; inspect lower limbs.',
        urgentEscalation: 'Withhold dose and notify physician if systolic BP <90 mmHg.'
      }
    ],
    dosage: {
      adult: '5mg once daily initially; max 10mg daily.',
      paediatric: '2.5mg to 5mg once daily (6-17 years).',
      administrationPrecautions: ['Can take with or without food']
    },
    nursingGuide: {
      before: ['Measure baseline blood pressure and heart rate'],
      during: ['Advise slow position changes to prevent orthostatic dizziness'],
      after: ['Evaluate BP response against targets', 'Assess for ankle swelling'],
      whatNotToForget: ['Ankle swelling is a common, non-dangerous vasodilation effect.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if ankle oedema is bothersome.'],
        emergencyIntervention: ['Withhold and seek review if severe dizziness or fainting occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Amlodipine Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },
  {
    id: 'nifedipine',
    genericName: 'Nifedipine',
    brandNames: 'Adalat, Procardia',
    classification: 'Calcium Channel Blocker (Dihydropyridine)',
    category: 'Antihypertensives & Cardiovascular',
    formulations: ['ER Tablets 30mg/60mg', 'Capsules 10mg'],
    routes: ['Oral'],
    mechanismOfAction: 'Inhibits calcium influx across cell membranes, dilating coronary and peripheral arteries.',
    therapeuticUses: {
      treats: ['Hypertension', 'Chronic stable angina', 'Raynaud\'s phenomenon'],
      whyPrescribed: 'To control blood pressure and prevent angina attacks.',
      expectedBenefits: ['Lowered blood pressure and reduced angina frequency']
    },
    sideEffects: {
      common: ['Peripheral oedema', 'Flushing', 'Headache', 'Dizziness'],
      lessCommon: ['Tachycardia', 'Constipation'],
      serious: ['Severe hypotension', 'Paradoxical angina', 'Heart failure exacerbation']
    },
    contraindications: {
      absolute: ['Cardiogenic shock', 'Aortic stenosis', 'Acute MI (within 1 week for immediate-release)'],
      precautions: ['Severe hypotension', 'Heart failure', 'GI narrowing (for ER tablets)'],
      interactions: ['Beta-blockers (heart failure/hypotension risk)', 'CYP3A4 inhibitors'],
      pregnancy: 'Used under specialist supervision.'
    },
    complications: [
      {
        title: 'Severe Precipitous Hypotension & Reflex Tachycardia',
        whatItIs: 'Sudden profound drop in blood pressure with rapid heart rate.',
        whyOccurs: 'Rapid absorption or excessive vasodilation.',
        signsSymptoms: ['Dizziness, syncope, pounding heartbeat, headache'],
        nurseObservation: 'Monitor BP closely; avoid sublingual use of immediate-release capsules.',
        urgentEscalation: 'Withhold medication and notify medical team if systolic BP <90 mmHg.'
      }
    ],
    dosage: {
      adult: 'Extended-release: 30mg to 60mg daily; max 120mg daily.',
      paediatric: 'Not commonly recommended for routine paediatric hypertension.',
      administrationPrecautions: ['Swallow extended-release tablets whole; do not chew or crush']
    },
    nursingGuide: {
      before: ['Measure baseline blood pressure and heart rate'],
      during: ['Instruct patient not to crush or chew ER tablets'],
      after: ['Evaluate BP response and check for headache or flushing'],
      whatNotToForget: ['Never use short-acting sublingual nifedipine for rapid BP reduction.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild headache persists.'],
        emergencyIntervention: ['Withhold immediately if severe hypotension or syncope occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Nifedipine Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },
  {
    id: 'lisinopril',
    genericName: 'Lisinopril',
    brandNames: 'Zestril, Prinivil',
    classification: 'Angiotensin-Converting Enzyme (ACE) Inhibitor',
    category: 'Antihypertensives & Cardiovascular',
    formulations: ['Tablets 2.5mg/5mg/10mg/20mg'],
    routes: ['Oral'],
    mechanismOfAction: 'Inhibits ACE, preventing conversion of angiotensin I to angiotensin II.',
    therapeuticUses: {
      treats: ['Essential hypertension', 'Heart failure', 'Acute MI', 'Diabetic nephropathy'],
      whyPrescribed: 'To lower blood pressure and protect kidney function in diabetes.',
      expectedBenefits: ['Sustained BP reduction and renal protection']
    },
    sideEffects: {
      common: ['Persistent dry hacking cough', 'Dizziness', 'Headache', 'Hypotension'],
      lessCommon: ['Hyperkalaemia', 'Rash'],
      serious: ['Angioedema (face, lips, tongue, larynx)', 'Acute kidney injury', 'Severe hyperkalaemia']
    },
    contraindications: {
      absolute: ['History of ACE inhibitor-induced angioedema', 'Pregnancy (2nd and 3rd trimesters)'],
      precautions: ['Bilateral renal artery stenosis', 'Severe renal impairment', 'Volume depletion'],
      interactions: ['Potassium-sparing diuretics / supplements (hyperkalaemia risk)', 'NSAIDs (renal risk)'],
      pregnancy: 'Contraindicated in 2nd and 3rd trimesters (fetotoxic).'
    },
    complications: [
      {
        title: 'Angioedema & Severe Hyperkalaemia',
        whatItIs: 'Potentially fatal swelling of airway tissues or dangerously high serum potassium.',
        whyOccurs: 'Bradykinin accumulation or impaired renal potassium excretion.',
        signsSymptoms: ['Swelling of face/lips/tongue, difficulty breathing (angioedema)', 'Muscle weakness, peaked T waves (hyperkalaemia)'],
        nurseObservation: 'Monitor serum creatinine, potassium, and blood pressure regularly.',
        urgentEscalation: 'Stop lisinopril and summon emergency help immediately if tongue/throat swelling occurs.'
      }
    ],
    dosage: {
      adult: '10mg once daily initially; maintenance 20mg-40mg daily.',
      paediatric: '0.07 mg/kg once daily (max 5mg initial).',
      administrationPrecautions: ['Can take with or without food']
    },
    nursingGuide: {
      before: ['Check baseline BP, serum potassium, and renal function', 'Verify not pregnant'],
      during: ['Advise patient that a dry cough may occur but should not be treated with suppressants without consulting physician'],
      after: ['Evaluate BP and renal labs', 'Assess for swelling'],
      whatNotToForget: ['Stop immediately if pregnancy is detected.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild dizziness or dry cough is bothersome.'],
        emergencyIntervention: ['Withhold and call emergency code immediately if angioedema occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Lisinopril Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },
  {
    id: 'losartan',
    genericName: 'Losartan Potassium',
    brandNames: 'Cozaar',
    classification: 'Angiotensin II Receptor Blocker (ARB)',
    category: 'Antihypertensives & Cardiovascular',
    formulations: ['Tablets 25mg/50mg/100mg'],
    routes: ['Oral'],
    mechanismOfAction: 'Selectively blocks angiotensin II binding to AT1 receptors, inhibiting vasoconstriction.',
    therapeuticUses: {
      treats: ['Essential hypertension', 'Diabetic nephropathy with proteinuria', 'Heart failure'],
      whyPrescribed: 'To lower blood pressure and protect kidneys in diabetes without ACE cough.',
      expectedBenefits: ['Sustained BP control and slowed diabetic kidney disease progression']
    },
    sideEffects: {
      common: ['Dizziness', 'Upper respiratory infections', 'Fatigue'],
      lessCommon: ['Back pain', 'Hyperkalaemia'],
      serious: ['Angioedema', 'Acute kidney injury', 'Fetal toxicity']
    },
    contraindications: {
      absolute: ['Losartan hypersensitivity', 'Pregnancy (2nd and 3rd trimesters)'],
      precautions: ['Bilateral renal artery stenosis', 'Severe renal/hepatic impairment'],
      interactions: ['Potassium supplements (hyperkalaemia risk)', 'Lithium', 'NSAIDs'],
      pregnancy: 'Contraindicated in 2nd and 3rd trimesters.'
    },
    complications: [
      {
        title: 'Severe Hyperkalaemia & Acute Renal Impairment',
        whatItIs: 'Dangerous elevation of serum potassium and filtration impairment.',
        whyOccurs: 'Decreased renal potassium excretion worsened by dehydration.',
        signsSymptoms: ['Muscle weakness, arrhythmias (hyperkalaemia)', 'Decreased urine output, elevated creatinine'],
        nurseObservation: 'Monitor serum potassium and creatinine regularly.',
        urgentEscalation: 'Withhold drug and notify physician if potassium >5.5 mEq/L.'
      }
    ],
    dosage: {
      adult: '50mg once daily initially; maintenance 50mg - 100mg daily.',
      paediatric: '0.7 mg/kg once daily (max 50mg).',
      administrationPrecautions: ['Can take with or without food']
    },
    nursingGuide: {
      before: ['Check baseline BP, potassium, and renal function', 'Verify not pregnant'],
      during: ['Advise slow position changes to prevent dizziness'],
      after: ['Evaluate BP response and potassium levels'],
      whatNotToForget: ['ARBs have lower cough incidence than ACE inhibitors but similar renal warnings.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild dizziness occurs.'],
        emergencyIntervention: ['Withhold immediately if severe allergic swelling or oliguria occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Losartan Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },
  {
    id: 'furosemide',
    genericName: 'Furosemide',
    brandNames: 'Lasix',
    classification: 'Loop Diuretic',
    category: 'Antihypertensives & Cardiovascular',
    formulations: ['Tablets 20mg/40mg', 'Injection 10mg/ml'],
    routes: ['Oral', 'IV', 'IM'],
    mechanismOfAction: 'Inhibits sodium and chloride reabsorption in the ascending loop of Henle, producing profound diuresis.',
    therapeuticUses: {
      treats: ['Edema in heart failure and renal disease', 'Acute pulmonary oedema', 'Hypertension'],
      whyPrescribed: 'To remove excess fluid and reduce cardiac workload and pulmonary congestion.',
      expectedBenefits: ['Rapid reduction in peripheral oedema and breathlessness']
    },
    sideEffects: {
      common: ['Increased urination', 'Hypokalaemia, hyponatraemia', 'Dizziness, orthostatic hypotension'],
      lessCommon: ['Muscle cramps', 'Hyperuricaemia (gout)'],
      serious: ['Severe dehydration and hypovolaemic shock', 'Ototoxicity / hearing loss']
    },
    contraindications: {
      absolute: ['Anuria or severe renal failure unresponsive to loop diuretics', 'Sulphonamide hypersensitivity'],
      precautions: ['Severe hepatic impairment', 'Prostatic hyperplasia', 'Gout'],
      interactions: ['Aminoglycosides / vancomycin (ototoxicity risk)', 'Digoxin (hypokalaemia risk)'],
      pregnancy: 'Use only if clearly needed; risk of placental hypoperfusion.'
    },
    complications: [
      {
        title: 'Severe Electrolyte Depletion & Hypovolaemic Shock',
        whatItIs: 'Dangerous blood volume reduction and critical potassium/sodium depletion.',
        whyOccurs: 'Excessive diuresis from high doses or rapid IV administration.',
        signsSymptoms: ['Severe dizziness, confusion, tachycardia, hypotension', 'Muscle cramps, arrhythmias'],
        nurseObservation: 'Monitor daily weights, strict intake/output (I&O), and serum electrolytes.',
        urgentEscalation: 'Withhold dose and notify physician if profound hypotension or hypokalaemia (<3.5 mEq/L) occurs.'
      }
    ],
    dosage: {
      adult: 'Oral: 20mg - 80mg daily. IV: 20mg - 40mg slowly over 1-2 mins.',
      paediatric: '1 - 2 mg/kg per dose.',
      administrationPrecautions: ['Administer oral doses in the morning to prevent nocturnal diuresis', 'Infuse IV slowly at max 4 mg/min to prevent ototoxicity']
    },
    nursingGuide: {
      before: ['Check baseline BP, daily weight, electrolytes, and renal function'],
      during: ['Ensure access to bathroom as diuresis begins rapidly', 'Infuse IV slowly (max 4mg/min)'],
      after: ['Record strict urine output and weight', 'Monitor for dehydration'],
      whatNotToForget: ['Potassium supplementation is frequently required.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if potassium levels drop below normal.'],
        emergencyIntervention: ['Withhold immediately and notify team if hypovolaemic shock or acute oliguria occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Furosemide Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },

  // 5. ANTIDIABETICS
  {
    id: 'metformin',
    genericName: 'Metformin Hydrochloride',
    brandNames: 'Glucophage, Fortamet',
    classification: 'Biguanide Antidiabetic',
    category: 'Antidiabetics',
    formulations: ['Tablets 500mg/850mg/1000mg', 'ER Tablets 500mg'],
    routes: ['Oral'],
    mechanismOfAction: 'Decreases hepatic glucose production, decreases intestinal glucose absorption, and improves insulin sensitivity.',
    therapeuticUses: {
      treats: ['Type 2 diabetes mellitus (first-line)', 'PCOS (off-label)'],
      whyPrescribed: 'To lower blood glucose and improve insulin sensitivity without causing hypoglycaemia as monotherapy.',
      expectedBenefits: ['Stabilised HbA1c and reduced fasting glucose']
    },
    sideEffects: {
      common: ['Diarrhoea', 'Nausea and vomiting', 'Abdominal bloating', 'Metallic taste'],
      lessCommon: ['Vitamin B12 deficiency with long-term use'],
      serious: ['Lactic acidosis (rare and potentially fatal)']
    },
    contraindications: {
      absolute: ['Severe renal impairment (eGFR <30 mL/min)', 'Metabolic acidosis / DKA'],
      precautions: ['Moderate renal impairment', 'Conditions with hypoxia risk', 'Radiological iodinated contrast procedures'],
      interactions: ['Iodinated contrast media (hold metformin 48h around procedure)', 'Alcohol'],
      pregnancy: 'Often used during pregnancy or PCOS under specialist guidance.'
    },
    complications: [
      {
        title: 'Metformin-Associated Lactic Acidosis (MALA)',
        whatItIs: 'Medical emergency with elevated blood lactate and severe metabolic acidosis.',
        whyOccurs: 'Metformin accumulation due to acute renal failure or tissue hypoperfusion.',
        signsSymptoms: ['Hyperventilation / Kussmaul breathing', 'Severe malaise, myalgia, abdominal pain, cold extremities'],
        nurseObservation: 'Monitor renal function regularly; withhold before radiocontrast imaging.',
        urgentEscalation: 'Stop metformin immediately, draw ABGs and lactate, and summon emergency medical help.'
      }
    ],
    dosage: {
      adult: '500mg once or twice daily with meals; titrate up to max 2000-2550mg daily.',
      paediatric: 'Children ≥10 years: 500mg twice daily initially; max 2000mg daily.',
      administrationPrecautions: ['Always administer with meals to minimize GI side effects', 'Swallow ER tablets whole']
    },
    nursingGuide: {
      before: ['Check baseline HbA1c, fasting glucose, and eGFR', 'Verify no scheduled radiocontrast studies'],
      during: ['Instruct patient to take with meals', 'Advise against excessive alcohol'],
      after: ['Monitor blood glucose trends and HbA1c response'],
      whatNotToForget: ['Metformin does not cause hypoglycaemia when used alone.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild GI upset persists.'],
        emergencyIntervention: ['Withhold immediately and call emergency code if signs of lactic acidosis occur.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Metformin Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },
  {
    id: 'regular-human-insulin',
    genericName: 'Regular Human Insulin (Short-Acting)',
    brandNames: 'Humulin R, Actrapid',
    classification: 'Short-Acting Antidiabetic / Hormone',
    category: 'Antidiabetics',
    formulations: ['Injection 100 IU/ml in vials and pens'],
    routes: ['Subcutaneous', 'Intravenous', 'Intramuscular'],
    mechanismOfAction: 'Binds to insulin receptors, facilitating cellular glucose uptake and inhibiting hepatic glucose output.',
    therapeuticUses: {
      treats: ['Type 1 and Type 2 diabetes mellitus', 'Diabetic ketoacidosis (DKA via IV)', 'Hyperkalaemia'],
      whyPrescribed: 'To control blood glucose levels and manage hyperglycaemic emergencies.',
      expectedBenefits: ['Normalization of blood glucose and ketone elimination']
    },
    sideEffects: {
      common: ['Hypoglycaemia', 'Injection site reactions (lipodystrophy)', 'Weight gain'],
      lessCommon: ['Allergic rash'],
      serious: ['Severe hypoglycaemia (coma, seizures)', 'Hypokalaemia']
    },
    contraindications: {
      absolute: ['Episodes of hypoglycaemia', 'Insulin hypersensitivity'],
      precautions: ['Renal or hepatic impairment', 'Hypokalaemia'],
      interactions: ['Beta-blockers (mask hypoglycaemia symptoms)', 'Corticosteroids (raise blood glucose)'],
      pregnancy: 'Safe and preferred for diabetes management during pregnancy.'
    },
    complications: [
      {
        title: 'Severe Hypoglycaemia (Hypoglycaemic Shock)',
        whatItIs: 'Dangerously low blood glucose (<3.9 mmol/L) causing neurological impairment.',
        whyOccurs: 'Insulin overdose, mismatched timing with meals, or missed meals.',
        signsSymptoms: ['Tremors, sweating, palpitations, confusion, loss of consciousness, seizures'],
        nurseObservation: 'Monitor blood glucose before meals; note peak action time (2-4 hours).',
        urgentEscalation: 'Administer fast oral carbs if conscious, or IV 50% dextrose / IM glucagon if unconscious.'
      }
    ],
    dosage: {
      adult: 'Individualised sliding scale or basal-bolus regimen.',
      paediatric: '0.4 - 1.0 IU/kg/day total daily dose.',
      administrationPrecautions: ['Administer subcutaneously 30 minutes before meals', 'Use U-100 syringes']
    },
    nursingGuide: {
      before: ['Check blood glucose level', 'Confirm meal availability within 30 minutes'],
      during: ['Rotate injection sites to prevent lipodystrophy'],
      after: ['Monitor for hypoglycaemia symptoms, especially during peak action (2-4 hours)', 'Ensure fast-acting carbs are accessible'],
      whatNotToForget: ['Regular insulin peaks in 2-4 hours.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if blood glucose remains out of target range.'],
        emergencyIntervention: ['Withhold and treat immediately with rapid glucose if blood glucose <3.9 mmol/L.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Regular Insulin Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },
  {
    id: 'glibenclamide',
    genericName: 'Glibenclamide (Glyburide)',
    brandNames: 'Daonil, Euglucon',
    classification: 'Second-Generation Sulfonylurea',
    category: 'Antidiabetics',
    formulations: ['Tablets 2.5mg/5mg'],
    routes: ['Oral'],
    mechanismOfAction: 'Stimulates insulin secretion from pancreatic beta cells by closing ATP-sensitive potassium channels.',
    therapeuticUses: {
      treats: ['Type 2 diabetes mellitus'],
      whyPrescribed: 'To stimulate endogenous insulin production and lower blood glucose.',
      expectedBenefits: ['Reduction in blood glucose and HbA1c']
    },
    sideEffects: {
      common: ['Hypoglycaemia', 'Weight gain', 'Nausea', 'Dizziness'],
      lessCommon: ['Skin rash / photosensitivity'],
      serious: ['Severe prolonged hypoglycaemia', 'Cholestatic jaundice', 'Blood dyscrasias']
    },
    contraindications: {
      absolute: ['Type 1 diabetes', 'DKA', 'Severe renal/hepatic impairment', 'G6PD deficiency'],
      precautions: ['Elderly patients (risk of prolonged hypoglycaemia)', 'Malnutrition'],
      interactions: ['Alcohol (disulfiram flush and severe hypoglycaemia)', 'Beta-blockers (mask hypoglycaemia)'],
      pregnancy: 'Contraindicated during pregnancy; insulin preferred.'
    },
    complications: [
      {
        title: 'Severe Prolonged Hypoglycaemia',
        whatItIs: 'Profound and long-lasting drop in blood glucose due to long half-life.',
        whyOccurs: 'Overdose, skipped meals, or renal impairment slowing drug clearance.',
        signsSymptoms: ['Confusion, sweating, tremor, lethargy, coma, seizures'],
        nurseObservation: 'Monitor blood glucose frequently; educate elderly patients on hypoglycaemia signs.',
        urgentEscalation: 'Administer oral glucose if conscious, or IV dextrose if unconscious; hospital observation required.'
      }
    ],
    dosage: {
      adult: '2.5mg to 5mg daily with breakfast or first main meal; max 20mg daily.',
      paediatric: 'Not recommended for children.',
      administrationPrecautions: ['Take with breakfast or first main meal; never skip meals after taking']
    },
    nursingGuide: {
      before: ['Check blood glucose, HbA1c, and renal/liver function', 'Verify no sulfa allergy'],
      during: ['Ensure patient eats breakfast promptly after dosing'],
      after: ['Monitor blood glucose response and watch for hypoglycaemia'],
      whatNotToForget: ['Long half-life carries high risk of prolonged hypoglycaemia, especially in elderly.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if blood glucose is below target.'],
        emergencyIntervention: ['Withhold and administer glucose immediately if blood glucose <3.9 mmol/L.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Glibenclamide Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2025' }
    ]
  },

  // 6. GASTROINTESTINAL DRUGS
  {
    id: 'omeprazole',
    genericName: 'Omeprazole',
    brandNames: 'Prilosec, Losec',
    classification: 'Proton Pump Inhibitor (PPI)',
    category: 'Gastrointestinal',
    formulations: ['Delayed-release capsules 20mg/40mg', 'IV injection 40mg'],
    routes: ['Oral', 'Intravenous'],
    mechanismOfAction: 'Irreversibly inhibits H+/K+-ATPase proton pump on gastric parietal cells, suppressing acid secretion.',
    therapeuticUses: {
      treats: ['GORD', 'Peptic ulcer disease', 'Zollinger-Ellison syndrome', 'H. pylori eradication'],
      whyPrescribed: 'To reduce gastric acid secretion and heal mucosal damage.',
      expectedBenefits: ['Relief from heartburn and healing of ulcers']
    },
    sideEffects: {
      common: ['Headache', 'Abdominal pain, nausea, diarrhoea'],
      lessCommon: ['Constipation', 'Dizziness', 'Rash'],
      serious: ['C. difficile-associated diarrhoea', 'Hypomagnesaemia with long-term use', 'Vitamin B12 deficiency']
    },
    contraindications: {
      absolute: ['Hypersensitivity to PPIs'],
      precautions: ['Severe hepatic impairment', 'Risk of bone fractures with chronic use'],
      interactions: ['Clopidogrel (decreased antiplatelet efficacy)', 'Methotrexate', 'Ketoconazole / iron (decreased absorption)'],
      pregnancy: 'Considered generally safe in pregnancy when indicated.'
    },
    complications: [
      {
        title: 'C. difficile Infection & Hypomagnesaemia',
        whatItIs: 'Gut infection or electrolyte depletion from chronic acid suppression.',
        whyOccurs: 'Loss of gastric acid barrier allows bacterial overgrowth.',
        signsSymptoms: ['Severe watery diarrhoea, abdominal cramps (C. diff)', 'Muscle tremors, tetany, arrhythmias (hypomagnesaemia)'],
        nurseObservation: 'Monitor duration of therapy; evaluate need for magnesium checks during prolonged use.',
        urgentEscalation: 'Notify physician if severe watery diarrhoea or muscle tremors develop.'
      }
    ],
    dosage: {
      adult: '20mg to 40mg once daily orally for 4-8 weeks. IV 40mg daily.',
      paediatric: 'Children ≥1 year: 10-20 mg once daily.',
      administrationPrecautions: ['Take 30-60 minutes before the first meal of the day', 'Swallow capsules whole']
    },
    nursingGuide: {
      before: ['Check history of GI malignancy', 'Review concurrent meds (clopidogrel)'],
      during: ['Administer 30-60 minutes before breakfast', 'Do not crush delayed-release pellets'],
      after: ['Monitor for relief of heartburn or pain'],
      whatNotToForget: ['Omeprazole reduces clopidogrel effectiveness.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild headache persists.'],
        emergencyIntervention: ['Withhold if severe watery diarrhoea or muscle tremors occur.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Omeprazole Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },
  {
    id: 'metoclopramide',
    genericName: 'Metoclopramide Hydrochloride',
    brandNames: 'Reglan',
    classification: 'Dopamine D2 Receptor Antagonist / Prokinetic',
    category: 'Gastrointestinal',
    formulations: ['Tablets 10mg', 'Injection 5mg/ml'],
    routes: ['Oral', 'IV', 'IM'],
    mechanismOfAction: 'Blocks dopamine receptors in CNS trigger zone (antiemetic) and enhances upper GI motility.',
    therapeuticUses: {
      treats: ['Nausea and vomiting', 'Diabetic gastroparesis', 'GORD'],
      whyPrescribed: 'To relieve nausea and speed up gastric emptying.',
      expectedBenefits: ['Cessation of vomiting and improved gastric motility']
    },
    sideEffects: {
      common: ['Drowsiness, fatigue', 'Dizziness', 'Diarrhoea'],
      lessCommon: ['Headache', 'Insomnia'],
      serious: ['Extrapyramidal symptoms (acute dystonia)', 'Tardive dyskinesia with prolonged use']
    },
    contraindications: {
      absolute: ['GI haemorrhage, obstruction, or perforation', 'Phaeochromocytoma', 'History of tardive dyskinesia'],
      precautions: ['Parkinson\'s disease (worsens EPS)', 'Renal impairment'],
      interactions: ['Antipsychotics (increased EPS risk)', 'CNS depressants / alcohol'],
      pregnancy: 'Use only if clearly needed (FDA Category B).'
    },
    complications: [
      {
        title: 'Extrapyramidal Symptoms (EPS) & Tardive Dyskinesia',
        whatItIs: 'Involuntary movement disorders affecting facial muscles, neck, and tongue.',
        whyOccurs: 'Dopamine receptor blockade in basal ganglia.',
        signsSymptoms: ['Facial grimacing, torticollis (neck spasm), tongue protrusion'],
        nurseObservation: 'Monitor for restlessness, involuntary muscle spasms, or abnormal tongue movements.',
        urgentEscalation: 'Stop drug immediately, notify physician, and prepare anticholinergic (benztropine) for acute dystonia.'
      }
    ],
    dosage: {
      adult: '10mg orally or IV up to 3 times daily. Max duration 5 days.',
      paediatric: '0.1 - 0.15 mg/kg up to 3 times daily.',
      administrationPrecautions: ['Administer IV slowly over 1-2 minutes to prevent restlessness', 'Limit use to max 5 days']
    },
    nursingGuide: {
      before: ['Check history of Parkinson\'s disease or GI obstruction'],
      during: ['Administer IV slowly over 1-2 minutes'],
      after: ['Assess relief from nausea', 'Ensure patient safety if drowsy'],
      whatNotToForget: ['Long-term use (>12 weeks) is discouraged due to tardive dyskinesia risk.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild drowsiness occurs.'],
        emergencyIntervention: ['Withhold immediately and administer prescribed anticholinergic if acute dystonia appears.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Metoclopramide Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },

  // 7. RESPIRATORY DRUGS
  {
    id: 'salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    brandNames: 'Ventolin, ProAir',
    classification: 'Short-Acting Beta-2 Adrenergic Agonist (SABA)',
    category: 'Respiratory',
    formulations: ['MDI 100 mcg/puff', 'Nebuliser solution 2.5mg/2.5ml'],
    routes: ['Inhalation', 'Oral', 'IV'],
    mechanismOfAction: 'Stimulates beta-2 adrenergic receptors in bronchial smooth muscle, relaxing airways.',
    therapeuticUses: {
      treats: ['Acute bronchospasm in asthma or COPD', 'Exercise-induced bronchospasm', 'Acute hyperkalaemia'],
      whyPrescribed: 'To rapidly open constricted airways and relieve shortness of breath.',
      expectedBenefits: ['Rapid bronchodilation and relief of dyspnoea within 5 minutes']
    },
    sideEffects: {
      common: ['Fine tremors', 'Tachycardia and palpitations', 'Nervousness', 'Headache'],
      lessCommon: ['Muscle cramps', 'Dry mouth'],
      serious: ['Paradoxical bronchospasm', 'Severe tachycardia / arrhythmias', 'Chest pain']
    },
    contraindications: {
      absolute: ['Hypersensitivity to salbutamol', 'Tachydysrhythmias'],
      precautions: ['Cardiovascular disease, hypertension', 'Diabetes (transient hyperglycaemia)', 'Hypokalaemia'],
      interactions: ['Beta-blockers (antagonise bronchodilation)', 'Diuretics (hypokalaemia risk)'],
      pregnancy: 'Considered safe during pregnancy for acute relief.'
    },
    complications: [
      {
        title: 'Paradoxical Bronchospasm & Severe Tachycardia',
        whatItIs: 'Sudden worsening of bronchospasm right after inhalation, or rapid heart rate.',
        whyOccurs: 'Hypersensitivity to propellants or excessive beta-2 stimulation.',
        signsSymptoms: ['Increased wheezing right after puff', 'Heart rate >120 bpm, palpitations'],
        nurseObservation: 'Assess respiratory rate, breath sounds, SpO2, and heart rate.',
        urgentEscalation: 'Stop administration, give oxygen, and notify medical team if paradoxical bronchospasm occurs.'
      }
    ],
    dosage: {
      adult: 'MDI: 1-2 puffs every 4-6 hours as needed. Nebuliser: 2.5mg in 2-3ml saline.',
      paediatric: 'MDI: 1 puff via spacer every 4-6 hours.',
      administrationPrecautions: ['Shake inhaler well', 'Use spacer device with MDI', 'Rinse mouth after inhalation']
    },
    nursingGuide: {
      before: ['Assess respiratory rate, breath sounds, SpO2, and heart rate'],
      during: ['Demonstrate correct MDI and spacer technique'],
      after: ['Reassess lung sounds and SpO2 in 5-15 mins'],
      whatNotToForget: ['Salbutamol is a rescue medication; frequent use (>2x/week) requires controller review.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if rescue inhaler is needed with increasing frequency.'],
        emergencyIntervention: ['Withhold and summon help if severe tachycardia or paradoxical bronchospasm occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Salbutamol Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },

  // 8. CORTICOSTEROIDS
  {
    id: 'prednisolone',
    genericName: 'Prednisolone',
    brandNames: 'Prelone, Deltasone',
    classification: 'Systemic Corticosteroid / Glucocorticoid',
    category: 'Corticosteroids',
    formulations: ['Tablets 1mg/5mg/20mg', 'Oral solution 15mg/5ml'],
    routes: ['Oral'],
    mechanismOfAction: 'Suppresses transcription of pro-inflammatory cytokines and reduces immune responses.',
    therapeuticUses: {
      treats: ['Severe asthma exacerbations', 'Autoimmune flares', 'Severe allergic reactions', 'IBD flares'],
      whyPrescribed: 'To suppress severe inflammation and immune-mediated tissue damage.',
      expectedBenefits: ['Rapid reduction in inflammation and symptom flares']
    },
    sideEffects: {
      common: ['Increased appetite and weight gain', 'Insomnia, mood changes', 'Indigestion', 'Hyperglycaemia'],
      lessCommon: ['Fluid retention', 'Muscle weakness', 'Skin bruising'],
      serious: ['Adrenal suppression upon abrupt cessation', 'Immunosuppression', 'Osteoporosis', 'Peptic ulcer perforation']
    },
    contraindications: {
      absolute: ['Systemic fungal infections', 'Hypersensitivity'],
      precautions: ['Active infections (TB, viral)', 'Diabetes mellitus', 'Peptic ulcer disease', 'Osteoporosis'],
      interactions: ['NSAIDs (GI ulceration risk)', 'Antidiabetic drugs (antagonise glucose lowering)', 'Live vaccines'],
      pregnancy: 'Use only if benefits outweigh risks.'
    },
    complications: [
      {
        title: 'Acute Adrenal Crisis & Immunosuppression',
        whatItIs: 'Life-threatening adrenal insufficiency from abrupt steroid withdrawal, or masked infection.',
        whyOccurs: 'HPA axis suppression from prolonged exogenous steroid use.',
        signsSymptoms: ['Severe fatigue, hypotension, hypoglycaemia, confusion (adrenal crisis)', 'Masked infection, high fever'],
        nurseObservation: 'Taper steroid doses gradually; monitor blood glucose and infection signs.',
        urgentEscalation: 'Notify medical team immediately if adrenal crisis or severe infection signs appear.'
      }
    ],
    dosage: {
      adult: '5mg to 60mg daily depending on condition and tapering schedule.',
      paediatric: '0.1 - 2 mg/kg/day in divided doses.',
      administrationPrecautions: ['Administer in the morning with food or milk to mimic natural cortisol rhythm']
    },
    nursingGuide: {
      before: ['Check infection history, diabetes, and peptic ulcer disease'],
      during: ['Administer with breakfast in the morning', 'Never stop abruptly'],
      after: ['Monitor mood, appetite, and blood glucose'],
      whatNotToForget: ['Never stop prolonged corticosteroid therapy abruptly; taper gradually.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild indigestion or insomnia occurs.'],
        emergencyIntervention: ['Withhold and notify team immediately if signs of infection, GI bleeding, or adrenal crisis occur.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Prednisolone Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },

  // 9. ANTICOAGULANTS
  {
    id: 'enoxaparin',
    genericName: 'Enoxaparin Sodium',
    brandNames: 'Clexane',
    classification: 'Low Molecular Weight Heparin (LMWH)',
    category: 'Anticoagulants',
    formulations: ['Pre-filled syringes 40mg, 60mg, 80mg'],
    routes: ['Subcutaneous', 'IV'],
    mechanismOfAction: 'Inhibits antithrombin III, preferentially inactivating coagulation factor Xa and thrombin.',
    therapeuticUses: {
      treats: ['DVT prevention in medical/surgical patients', 'Treatment of DVT and pulmonary embolism', 'NSTEMI'],
      whyPrescribed: 'To prevent or treat harmful blood clots.',
      expectedBenefits: ['Prevention of fatal pulmonary embolism or DVT resolution']
    },
    sideEffects: {
      common: ['Injection site bruising, haematoma, pain', 'Mild bleeding (minor nosebleeds)'],
      lessCommon: ['Mild thrombocytopenia', 'Elevated LFTs'],
      serious: ['Major haemorrhage', 'Heparin-Induced Thrombocytopenia (HIT)', 'Spinal haematoma']
    },
    contraindications: {
      absolute: ['Active major bleeding', 'History of HIT', 'Severe bleeding disorders'],
      precautions: ['Severe renal impairment', 'Recent spinal/epidural puncture', 'Uncontrolled hypertension'],
      interactions: ['Antiplatelets and NSAIDs (major bleeding risk)', 'Anticoagulants'],
      pregnancy: 'Safe during pregnancy; does not cross placenta.'
    },
    complications: [
      {
        title: 'Major Haemorrhage & HIT',
        whatItIs: 'Life-threatening internal bleeding or immune-mediated platelet destruction.',
        whyOccurs: 'Excessive anticoagulation or antibody formation against heparin-PF4 complexes.',
        signsSymptoms: ['Drop in Hb, hypotension, melaena, haematuria (bleeding)', 'Drop in platelets by >50%, new thrombosis (HIT)'],
        nurseObservation: 'Monitor platelet counts regularly (every 2-3 days for days 4-14); inspect injection sites.',
        urgentEscalation: 'Stop enoxaparin, notify medical team, check platelets and coagulation, and prepare protamine sulphate.'
      }
    ],
    dosage: {
      adult: 'DVT prophylaxis: 40mg SC daily. DVT treatment: 1 mg/kg every 12 hours.',
      paediatric: 'Specialist haematology protocols apply.',
      administrationPrecautions: ['Administer via deep subcutaneous injection into abdominal wall', 'Do not expel the air bubble from pre-filled syringe']
    },
    nursingGuide: {
      before: ['Check baseline platelets, Hb, and renal function', 'Verify no active bleeding or history of HIT'],
      during: ['Inject SC into abdominal wall at 90-degree angle', 'Do not rub injection site post-injection'],
      after: ['Observe injection site for haematoma', 'Monitor for signs of bleeding'],
      whatNotToForget: ['Do not expel the air bubble in Clexane pre-filled syringes.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if minor bruising is observed.'],
        emergencyIntervention: ['Withhold immediately if major bleeding or severe drop in platelets occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Enoxaparin Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  },

  // 10. ANTICONVULSANTS
  {
    id: 'phenytoin',
    genericName: 'Phenytoin Sodium',
    brandNames: 'Dilantin, Epanutin',
    classification: 'Hydantoin Anticonvulsant',
    category: 'Anticonvulsants',
    formulations: ['Capsules 100mg', 'Suspension 125mg/5ml', 'Injection 50mg/ml'],
    routes: ['Oral', 'IV'],
    mechanismOfAction: 'Stabilizes neuronal membranes by blocking voltage-gated sodium channels.',
    therapeuticUses: {
      treats: ['Generalised tonic-clonic seizures', 'Complex partial seizures', 'Status epilepticus prevention'],
      whyPrescribed: 'To control epileptic seizures and stabilise brain electrical activity.',
      expectedBenefits: ['Seizure freedom or significant reduction in frequency']
    },
    sideEffects: {
      common: ['Gingival hyperplasia (gum overgrowth)', 'Nystagmus', 'Ataxia, dizziness, slurred speech'],
      lessCommon: ['Hirsutism', 'Rash', 'Nausea'],
      serious: ['Stevens-Johnson syndrome', 'Phenytoin toxicity', 'Hepatotoxicity', 'Cardiac arrhythmias with rapid IV']
    },
    contraindications: {
      absolute: ['Sinus bradycardia, AV block', 'Phenytoin hypersensitivity'],
      precautions: ['Hepatic impairment', 'Hypoalbuminaemia', 'Elderly patients'],
      interactions: ['CYP enzyme inducers/inhibitors', 'Warfarin', 'Oral contraceptives'],
      pregnancy: 'Teratogenic (fetal hydantoin syndrome); use only under specialist guidance.'
    },
    complications: [
      {
        title: 'Phenytoin Toxicity & SJS',
        whatItIs: 'CNS toxicity from elevated blood levels, or severe immune skin blistering.',
        whyOccurs: 'Zero-order elimination kinetics where small dose increases cause large blood level spikes.',
        signsSymptoms: ['Ataxia, slurred speech, nystagmus, lethargy, confusion (toxicity)', 'Painful purpuric rash, blistering (SJS)'],
        nurseObservation: 'Monitor therapeutic range (10-20 mcg/mL); check oral hygiene for gingival hyperplasia.',
        urgentEscalation: 'Withhold dose immediately, check serum levels, and summon emergency help if severe rash or toxicity appears.'
      }
    ],
    dosage: {
      adult: '100mg 3 times daily orally, titrated to levels (10-20 mcg/mL). IV loading: 15-20 mg/kg at max 50 mg/min.',
      paediatric: '5 mg/kg/day in 2-3 divided doses.',
      administrationPrecautions: ['IV must be given via dedicated line in normal saline only (dextrose causes precipitation) at max 50 mg/min', 'Continuous ECG and BP monitoring required during IV']
    },
    nursingGuide: {
      before: ['Check baseline serum levels, liver function, and albumin', 'Assess seizure and cardiac history'],
      during: ['If giving IV, infuse strictly at ≤ 50 mg/min in normal saline with ECG monitoring', 'Ensure meticulous oral hygiene'],
      after: ['Monitor for ataxia, nystagmus, or lethargy', 'Evaluate seizure control'],
      whatNotToForget: ['Phenytoin exhibits zero-order elimination kinetics; small dose increases cause massive toxicity spikes.'],
      withholdAndEscalate: {
        routineEscalation: ['Notify physician if mild gum overgrowth or dizziness occurs.'],
        emergencyIntervention: ['Withhold immediately if severe toxicity, hypotension, or rash occurs.']
      }
    },
    references: [
      { organisation: 'DailyMed', title: 'Phenytoin Monograph', url: 'https://dailymed.nlm.nih.gov', reviewDate: '2026' }
    ]
  }
];

// ==========================================
// RED-FLAG WARNINGS DATA
// ==========================================
const RED_FLAGS_DATA = [
  {
    level: 'RED',
    title: 'Anaphylaxis (Severe Allergic Reaction)',
    symptoms: ['Bronchospasm, severe dyspnoea, wheezing', 'Angioedema (swelling of lips, tongue, larynx)', 'Generalised urticaria, flushing', 'Hypotension, cardiovascular collapse'],
    whyDangerous: 'Rapid airway obstruction and shock can lead to fatal asphyxiation within minutes.',
    immediateAssessment: ['Assess airway patency, respiratory rate, SpO2, BP, and consciousness.'],
    immediateResponse: ['Stop medication infusion immediately.', 'Administer IM adrenaline (epinephrine) 1:1000 (0.5mg for adults) into anterolateral thigh.', 'Administer high-flow oxygen and establish IV access.'],
    emergencyActivation: ['Call emergency response team (Code Blue) immediately.'],
    documentation: 'Record exact time of symptom onset, drug administered, adrenaline dose and time, vital signs, and response.'
  },
  {
    level: 'RED',
    title: 'Severe Hypoglycaemia (Antidiabetic Toxicity)',
    symptoms: ['Tremors, diaphoresis, palpitations, anxiety', 'Confusion, blurred vision', 'Loss of consciousness, seizures, coma'],
    whyDangerous: 'Prolonged cerebral glucose deprivation causes irreversible brain damage or death.',
    immediateAssessment: ['Check capillary blood glucose immediately.', 'Assess Glasgow Coma Scale.'],
    immediateResponse: ['If conscious, administer 15-20g fast-acting oral glucose.', 'If unconscious, administer IV 50% Dextrose or IM Glucagon per protocol.'],
    emergencyActivation: ['Call medical team urgently if patient does not regain consciousness within 10 minutes.'],
    documentation: 'Record pre- and post-treatment blood glucose levels, interventions, and neurological recovery time.'
  },
  {
    level: 'RED',
    title: 'Major Bleeding & Haemorrhage (Anticoagulants)',
    symptoms: ['Drop in Hb, hypotension, tachycardia', 'Melaena, haematemesis, haematuria', 'Epistaxis, petechiae, intracranial bleeding'],
    whyDangerous: 'Uncontrolled haemorrhage leads to hypovolaemic shock and death.',
    immediateAssessment: ['Assess vital signs, Hb, and coagulation profile (INR/APTT).'],
    immediateResponse: ['Withhold anticoagulant immediately.', 'Apply direct pressure to external bleeding sites.', 'Establish large-bore IV access and prepare reversal agents (protamine, vitamin K).'],
    emergencyActivation: ['Notify medical team and activate massive transfusion protocol if shock occurs.'],
    documentation: 'Document bleeding site, vital sign trends, labs, medication withheld, and reversal agents.'
  },
  {
    level: 'RED',
    title: 'Respiratory Depression (Opioid Toxicity)',
    symptoms: ['Slow respiratory rate (<10 breaths/min)', 'Cyanosis, oxygen desaturation', 'Profound somnolence, unresponsiveness', 'Pinpoint pupils'],
    whyDangerous: 'Brainstem respiratory centre suppression leads to alveolar hypoventilation and arrest.',
    immediateAssessment: ['Check respiratory rate, depth, SpO2, and consciousness.'],
    immediateResponse: ['Stimulate patient and encourage deep breathing.', 'Apply supplemental oxygen and prepare bag-valve-mask if necessary.', 'Administer naloxone if opioid overdose suspected.'],
    emergencyActivation: ['Call Code Blue immediately if respiratory rate <8-10/min or patient is unresponsive.'],
    documentation: 'Record respiratory rate, SpO2, naloxone times/doses, and ongoing neurological assessments.'
  },
  {
    level: 'AMBER',
    title: 'Antibiotic-Associated Diarrhoea (C. difficile Colitis)',
    symptoms: ['Severe watery diarrhoea (>5 stools/day)', 'Abdominal cramping and tenderness', 'Low-grade fever'],
    whyDangerous: 'Can lead to pseudomembranous colitis, toxic megacolon, and perforation if untreated.',
    immediateAssessment: ['Assess stool frequency, consistency, and hydration status.'],
    immediateResponse: ['Withhold offending antibiotic pending medical review.', 'Send stool specimen for C. diff toxin assay.', 'Initiate contact precautions and hand hygiene with soap and water.'],
    emergencyActivation: ['Notify physician for diagnostic confirmation and targeted anti-infective therapy.'],
    documentation: 'Record stool chart, hydration parameters, and infection control precautions.'
  },
  {
    level: 'GREEN',
    title: 'Common / Expected Side Effects (Monitoring Level)',
    symptoms: ['Mild nausea or dyspepsia', 'Mild dizziness or orthostatic hypotension', 'Expected diuresis or dark urine'],
    whyDangerous: 'Low acute danger, but unmanaged side effects lead to patient non-adherence.',
    immediateAssessment: ['Assess severity and impact on patient daily activities.'],
    immediateResponse: ['Provide reassurance and comfort measures (e.g., taking meds with food).', 'Educate patient that side effect is expected and temporary.'],
    emergencyActivation: 'Not required unless symptoms escalate.',
    documentation: 'Document patient-reported side effect, nursing advice, and patient response.'
  }
];

// ==========================================
// LEARNING CENTRE ARTICLES & QUIZZES
// ==========================================
const ARTICLES_DATA = [
  {
    id: 'rights',
    title: 'The 10 Rights of Medication Administration',
    category: 'Safety Standards',
    readTime: '5 min read',
    summary: 'Master the foundational verification steps every nurse must perform to prevent errors.',
    content: [
      '1. Right Patient: Verify using at least two unique identifiers against prescription and wristband.',
      '2. Right Medication: Check label against prescription order three times.',
      '3. Right Dose: Accurately calculate and verify dosages for high-alert drugs.',
      '4. Right Route: Ensure prescribed route is correct.',
      '5. Right Time: Administer within prescribed time window.',
      '6. Right Documentation: Document immediately after administration.',
      '7. Right Reason: Verify clinical indication.',
      '8. Right Response: Monitor post-administration efficacy.',
      '9. Right Education: Educate patient on purpose and side effects.',
      '10. Right Refusal: Respect competent patient refusal while educating on clinical consequences.'
    ]
  },
  {
    id: 'errors',
    title: 'Preventing Medication Errors in Clinical Practice',
    category: 'Clinical Governance',
    readTime: '6 min read',
    summary: 'Explore systems approaches, human factors, and safety protocols to catch errors.',
    content: [
      'Medication errors occur across prescribing, dispensing, and administration phases.',
      'Contributing factors include look-alike sound-alike (LASA) names, fatigue, and interruptions.',
      'Best practices include independent double-checks for high-alert medications and avoiding verbal orders.'
    ]
  },
  {
    id: 'high-alert',
    title: 'Managing High-Alert Medications Safely',
    category: 'Patient Safety',
    readTime: '4 min read',
    summary: 'Understand which drugs carry heightened risk of causing significant patient harm.',
    content: [
      'High-alert meds include anticoagulants, insulin, opioids, intravenous electrolytes, and chemotherapy.',
      'Mandate independent double-checks by two nurses prior to administration of IV high-alert infusions.'
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the maximum recommended daily cumulative dose of paracetamol for a healthy adult?',
    options: ['2 grams (2000mg)', '4 grams (4000mg)', '6 grams (6000mg)', '8 grams (8000mg)'],
    correct: 1,
    explanation: 'The maximum recommended daily dose of paracetamol for a healthy adult is 4 grams (4000mg) to prevent hepatotoxicity.'
  },
  {
    id: 2,
    question: 'Which nursing action is critical when administering intravenous furosemide?',
    options: ['Administer as rapid IV bolus', 'Infuse slowly at max 4 mg/min to prevent ototoxicity', 'Always mix with dextrose 5%', 'Refrigerate before injection'],
    correct: 1,
    explanation: 'IV furosemide must be infused slowly (max 4 mg/min) to prevent ototoxicity and hearing loss.'
  },
  {
    id: 3,
    question: 'Why must Metformin be temporarily withheld around procedures using iodinated contrast media?',
    options: ['It causes hypoglycaemia', 'It interacts with contrast to cause acute kidney injury and risk of lactic acidosis', 'It inactivates the dye', 'It causes immediate allergy'],
    correct: 1,
    explanation: 'Contrast media can impair renal function, leading to metformin accumulation and fatal lactic acidosis.'
  },
  {
    id: 4,
    question: 'What is the characteristic sign of an acute extrapyramidal dystonic reaction from metoclopramide?',
    options: ['Bradycardia and hypertension', 'Facial grimacing, neck spasms (torticollis), and tongue protrusion', 'Severe diarrhoea', 'Dry cough'],
    correct: 1,
    explanation: 'Extrapyramidal dystonic reactions manifest as involuntary muscle spasms and torticollis, treated with anticholinergics.'
  },
  {
    id: 5,
    question: 'Which medication is contraindicated in children under 16 during viral illnesses due to Reye syndrome risk?',
    options: ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Amoxicillin'],
    correct: 2,
    explanation: 'Aspirin use in children during viral infections is linked to Reye syndrome, causing hepatic encephalopathy.'
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'directory' | 'categories' | 'nursing-guide' | 'red-flags' | 'comparison' | 'learning' | 'about'>('home');
  const [selectedDrug, setSelectedDrug] = useState<Medication | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('All');

  // Interactive Checklist State (saved in localStorage)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mediguard_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // AI Assistant Modal & Chat States
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiMode, setAiMode] = useState<'explain' | 'chat'>('explain');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: 'Hello! I am the MediGuard Nursing Assistant. How can I help you with medication safety or nursing assessments today?'
    }
  ]);

  // Drug Comparison States
  const [compareDrug1, setCompareDrug1] = useState<Medication>(MEDICATIONS_DATABASE[0]);
  const [compareDrug2, setCompareDrug2] = useState<Medication>(MEDICATIONS_DATABASE[1]);

  // Learning Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('mediguard_checklist', JSON.stringify(checkedItems));
    } catch (e) {
      console.error(e);
    }
  }, [checkedItems]);

  const categoriesList = useMemo(() => {
    const cats = new Set(MEDICATIONS_DATABASE.map(m => m.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredMedications = useMemo(() => {
    return MEDICATIONS_DATABASE.filter(med => {
      const matchesSearch = 
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.brandNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.classification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategoryFilter === 'All' || med.category === selectedCategoryFilter;
      const matchesRoute = selectedRouteFilter === 'All' || med.routes.some(r => r.toLowerCase().includes(selectedRouteFilter.toLowerCase()));

      return matchesSearch && matchesCategory && matchesRoute;
    });
  }, [searchQuery, selectedCategoryFilter, selectedRouteFilter]);

  const toggleChecklist = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  const getDrugProgress = (drug: Medication) => {
    const items = [
      ...drug.nursingGuide.before.map((_, i) => `${drug.id}_before_${i}`),
      ...drug.nursingGuide.during.map((_, i) => `${drug.id}_during_${i}`),
      ...drug.nursingGuide.after.map((_, i) => `${drug.id}_after_${i}`)
    ];
    if (items.length === 0) return 0;
    const completed = items.filter(id => checkedItems[id]).length;
    return Math.round((completed / items.length) * 100);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const newMessages = [...chatMessages, { sender: 'user' as const, text: userText }];
    setChatMessages(newMessages);
    setChatInput('');

    setTimeout(() => {
      let replyText = '';
      const query = userText.toLowerCase();

      if (query.includes('assess') || query.includes('before')) {
        replyText = 'Clinical Assessment Protocol: Verify patient identity using 2 identifiers, check exact allergy history, review baseline observations (BP, HR, RR, SpO2, temp), verify renal/hepatic function labs, and confirm the correct prescription against institutional guidelines.';
      } else if (query.includes('monitor') || query.includes('after')) {
        replyText = 'Post-Administration Monitoring: Evaluate expected therapeutic response within 30-60 minutes, observe for adverse drug reactions, monitor vital signs, document administration immediately, and provide patient education.';
      } else if (query.includes('side effect') || query.includes('serious')) {
        replyText = 'Critical Adverse Reactions: Watch vigilantly for signs of anaphylaxis (wheezing, angioedema), severe hypoglycaemia, major bleeding, respiratory depression, or severe cutaneous reactions. Escalate urgently per protocol.';
      } else {
        replyText = `MediGuard Assistant verified query regarding "${userText}". Always ensure professional nursing judgement, verify dosage calculations, and consult institutional protocols before administering any medication.`;
      }

      setChatMessages([...newMessages, { sender: 'assistant', text: replyText }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* HEADER & NAVIGATION */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-teal-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTab('home'); setSelectedDrug(null); }}>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-teal-900/50">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-teal-100 to-emerald-200 bg-clip-text text-transparent">
                  MediGuard
                </span>
                <p className="text-xs text-teal-300 font-medium tracking-wide">
                  Know the Drug. Recognise the Risk. Protect the Patient.
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home', icon: Shield },
                { id: 'directory', label: 'Drug Directory', icon: Pill },
                { id: 'categories', label: 'Categories', icon: Filter },
                { id: 'nursing-guide', label: 'Nursing Guide', icon: Stethoscope },
                { id: 'red-flags', label: 'Red Flags', icon: AlertTriangle },
                { id: 'comparison', label: 'Compare', icon: BarChart2 },
                { id: 'learning', label: 'Learning Centre', icon: BookOpen },
                { id: 'about', label: 'About', icon: Info }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id && !selectedDrug;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as any); setSelectedDrug(null); }}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-900/40' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAiModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-teal-900/30 transition-all transform hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-teal-100" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden bg-slate-800 border-t border-slate-700 px-2 py-2 flex overflow-x-auto space-x-1 scrollbar-none">
          {[
            { id: 'home', label: 'Home' },
            { id: 'directory', label: 'Directory' },
            { id: 'categories', label: 'Categories' },
            { id: 'nursing-guide', label: 'Nursing Guide' },
            { id: 'red-flags', label: 'Red Flags' },
            { id: 'comparison', label: 'Compare' },
            { id: 'learning', label: 'Learning' },
            { id: 'about', label: 'About' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setSelectedDrug(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id && !selectedDrug ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        
        {/* INDIVIDUAL DRUG PROFILE VIEW */}
        {selectedDrug ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                onClick={() => setSelectedDrug(null)}
                className="inline-flex items-center space-x-2 text-teal-700 hover:text-teal-900 font-semibold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Drug Directory</span>
              </button>
              
              <button
                onClick={() => { setAiMode('explain'); setAiModalOpen(true); }}
                className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explain in Simple Language</span>
              </button>
            </div>

            {/* Drug Title Banner */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 mb-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedDrug.category}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {selectedDrug.classification}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                    {selectedDrug.genericName}
                  </h1>
                  <p className="text-slate-600 text-sm sm:text-base font-medium">
                    <strong className="text-slate-700">Brand Names:</strong> {selectedDrug.brandNames}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center space-x-4 min-w-[200px]">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" className="text-slate-200 fill-none" />
                      <circle 
                        cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" 
                        className="text-teal-600 fill-none transition-all duration-500"
                        strokeDasharray={125.6}
                        strokeDashoffset={125.6 - (125.6 * getDrugProgress(selectedDrug)) / 100}
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-slate-700">{getDrugProgress(selectedDrug)}%</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700 uppercase">Nursing Checklist</p>
                    <p className="text-xs text-slate-500">Progress Completed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drug Profile Sections */}
            <div className="space-y-8">
              
              {/* Basic Info */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <Info className="w-5 h-5 text-teal-600" />
                  <span>1. Basic Information & Mechanism</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Formulations</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedDrug.formulations.map((f, i) => (
                        <span key={i} className="bg-white text-slate-700 border border-slate-200 text-xs font-medium px-2.5 py-1 rounded-lg">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Routes</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedDrug.routes.map((r, i) => (
                        <span key={i} className="bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50/60 border border-teal-100 p-5 rounded-xl">
                  <h3 className="text-sm font-bold text-teal-900 uppercase tracking-wide mb-2">Mechanism of Action</h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{selectedDrug.mechanismOfAction}</p>
                </div>
              </div>

              {/* Therapeutic Uses */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-teal-600" />
                  <span>2. Therapeutic Uses & Benefits</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">What It Treats</h3>
                    <ul className="space-y-2">
                      {selectedDrug.therapeuticUses.treats.map((t, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Why Prescribed</h3>
                      <p className="text-slate-700 text-sm">{selectedDrug.therapeuticUses.whyPrescribed}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">Expected Benefits</h3>
                      <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
                        {selectedDrug.therapeuticUses.expectedBenefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Effects */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>3. Side Effects & Adverse Reactions</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-emerald-900 uppercase mb-3">Common Effects</h3>
                    <ul className="space-y-2">
                      {selectedDrug.sideEffects.common.map((s, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-amber-900 uppercase mb-3">Less Common</h3>
                    <ul className="space-y-2">
                      {selectedDrug.sideEffects.lessCommon.map((s, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-rose-900 uppercase mb-3">Serious Reactions</h3>
                    <ul className="space-y-2">
                      {selectedDrug.sideEffects.serious.map((s, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contraindications & Precautions */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-rose-600" />
                  <span>4. Contraindications & Precautions</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-rose-50/60 border border-rose-200 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-rose-900 uppercase mb-3">Absolute Contraindications</h3>
                    <ul className="space-y-2">
                      {selectedDrug.contraindications.absolute.map((c, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2">
                          <X className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50/60 border border-amber-200 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-amber-900 uppercase mb-3">Precautions</h3>
                    <ul className="space-y-2">
                      {selectedDrug.contraindications.precautions.map((p, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Complications */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>5. Potential Serious Complications</span>
                </h2>

                <div className="space-y-6">
                  {selectedDrug.complications.map((comp, idx) => (
                    <div key={idx} className="border border-rose-200 bg-rose-50/30 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-rose-900 mb-3">{comp.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="bg-white p-4 rounded-xl border border-rose-100">
                          <p className="text-xs font-bold text-slate-500 uppercase mb-1">What It Is</p>
                          <p className="text-sm text-slate-700 mb-3">{comp.whatItIs}</p>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Why It Occurs</p>
                          <p className="text-sm text-slate-700">{comp.whyOccurs}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-rose-100">
                          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Signs & Symptoms</p>
                          <ul className="space-y-1">
                            {comp.signsSymptoms.map((sym, i) => (
                              <li key={i} className="text-xs sm:text-sm text-slate-700">• {sym}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl">
                          <p className="text-xs font-bold text-teal-900 uppercase mb-1">Nurse Observation</p>
                          <p className="text-xs sm:text-sm text-teal-800">{comp.nurseObservation}</p>
                        </div>
                        <div className="bg-rose-100 border border-rose-300 p-4 rounded-xl">
                          <p className="text-xs font-bold text-rose-900 uppercase mb-1">Urgent Escalation</p>
                          <p className="text-xs sm:text-sm text-rose-800 font-semibold">{comp.urgentEscalation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Nursing Action Guide & Checklists */}
              <div className="bg-white rounded-2xl shadow-xl border border-teal-200 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2">
                      <Stethoscope className="w-6 h-6 text-teal-600" />
                      <span>6. Nursing Responsibilities & Checklist</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Interactive checklist saved in local storage</p>
                  </div>
                  <button
                    onClick={resetChecklist}
                    className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Checklist</span>
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">Before Administration</h3>
                    <div className="space-y-2">
                      {selectedDrug.nursingGuide.before.map((item, idx) => {
                        const checkId = `${selectedDrug.id}_before_${idx}`;
                        const isChecked = !!checkedItems[checkId];
                        return (
                          <div 
                            key={idx}
                            onClick={() => toggleChecklist(checkId)}
                            className={`flex items-start space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isChecked ? 'bg-teal-50/60 border-teal-300 text-slate-500 line-through' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="mt-0.5">
                              {isChecked ? <CheckSquare className="w-5 h-5 text-teal-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                            </div>
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">During Administration</h3>
                    <div className="space-y-2">
                      {selectedDrug.nursingGuide.during.map((item, idx) => {
                        const checkId = `${selectedDrug.id}_during_${idx}`;
                        const isChecked = !!checkedItems[checkId];
                        return (
                          <div 
                            key={idx}
                            onClick={() => toggleChecklist(checkId)}
                            className={`flex items-start space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isChecked ? 'bg-teal-50/60 border-teal-300 text-slate-500 line-through' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="mt-0.5">
                              {isChecked ? <CheckSquare className="w-5 h-5 text-teal-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                            </div>
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">After Administration</h3>
                    <div className="space-y-2">
                      {selectedDrug.nursingGuide.after.map((item, idx) => {
                        const checkId = `${selectedDrug.id}_after_${idx}`;
                        const isChecked = !!checkedItems[checkId];
                        return (
                          <div 
                            key={idx}
                            onClick={() => toggleChecklist(checkId)}
                            className={`flex items-start space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isChecked ? 'bg-teal-50/60 border-teal-300 text-slate-500 line-through' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="mt-0.5">
                              {isChecked ? <CheckSquare className="w-5 h-5 text-teal-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                            </div>
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl">
                    <h3 className="text-sm font-bold text-amber-900 uppercase mb-2">What the Nurse Should Not Forget</h3>
                    <ul className="space-y-2">
                      {selectedDrug.nursingGuide.whatNotToForget.map((rem, i) => (
                        <li key={i} className="text-xs sm:text-sm text-amber-900 font-medium">• {rem}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                  <Book className="w-5 h-5 text-teal-600" />
                  <span>7. References & Sources</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDrug.references.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/30 transition-all group"
                    >
                      <div>
                        <span className="text-xs font-bold text-teal-700 uppercase">{ref.organisation}</span>
                        <h3 className="text-sm font-bold text-slate-900 mt-1">{ref.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">Reviewed: {ref.reviewDate}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600 flex-shrink-0 mt-1 ml-2" />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          <>
            {/* HOMEPAGE VIEW */}
            {activeTab === 'home' && (
              <div className="space-y-16 pb-16 animate-fadeIn">
                
                <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
                  <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-6">
                      <Shield className="w-4 h-4 text-teal-400" />
                      <span>Clinical Medication Safety Platform</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
                      Make Every Medication Decision <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">More Informed.</span>
                    </h1>

                    <p className="text-base sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                      Access essential drug information, understand adverse effects, and explore nursing responsibilities through one accessible platform.
                    </p>

                    <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex items-center space-x-2 border border-slate-200">
                      <Search className="w-6 h-6 text-slate-400 ml-3" />
                      <input
                        type="text"
                        placeholder="Search 25 medications by generic name, brand, or class..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab('directory'); }}
                        className="w-full py-3 px-2 text-slate-800 placeholder-slate-400 text-base focus:outline-none bg-transparent"
                      />
                      <button
                        onClick={() => setActiveTab('directory')}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md whitespace-nowrap"
                      >
                        Search
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                      <button
                        onClick={() => setActiveTab('directory')}
                        className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105"
                      >
                        Browse All Medications
                      </button>
                      <button
                        onClick={() => setActiveTab('learning')}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-8 py-3.5 rounded-xl font-bold transition-all"
                      >
                        Learn Safety Guidelines
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Access Cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'Search Medications', desc: 'Browse 25 comprehensive drug profiles across 10 classes.', icon: Pill, tab: 'directory', color: 'bg-teal-500' },
                      { title: 'Browse Drug Classes', desc: 'Filter drugs by therapeutic categories and routes.', icon: Filter, tab: 'categories', color: 'bg-emerald-500' },
                      { title: 'Nursing Interventions', desc: 'Interactive pre-, during, and post-administration checklists.', icon: Stethoscope, tab: 'nursing-guide', color: 'bg-cyan-500' },
                      { title: 'Red-Flag Warnings', desc: 'Triage green, amber, and critical red warnings.', icon: AlertTriangle, tab: 'red-flags', color: 'bg-rose-500' },
                      { title: 'Drug Comparison', desc: 'Side-by-side comparison of drug profiles.', icon: BarChart2, tab: 'comparison', color: 'bg-indigo-500' },
                      { title: 'Learning Centre', desc: 'Read safety articles and test knowledge with quizzes.', icon: BookOpen, tab: 'learning', color: 'bg-amber-500' }
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={i}
                          onClick={() => setActiveTab(card.tab as any)}
                          className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:border-teal-500 hover:shadow-2xl transition-all cursor-pointer group transform hover:-translate-y-1"
                        >
                          <div className={`w-12 h-12 rounded-xl ${card.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                            {card.title}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* DRUG DIRECTORY VIEW */}
            {activeTab === 'directory' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Medication Directory</h1>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">Explore all 25 evidence-based drug profiles</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search generic or brand name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      {categoriesList.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      value={selectedRouteFilter}
                      onChange={(e) => setSelectedRouteFilter(e.target.value)}
                      className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option value="All">All Routes</option>
                      <option value="Oral">Oral</option>
                      <option value="Intravenous">Intravenous (IV)</option>
                      <option value="Intramuscular">Intramuscular (IM)</option>
                      <option value="Subcutaneous">Subcutaneous (SC)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMedications.length > 0 ? (
                    filteredMedications.map((med) => (
                      <div
                        key={med.id}
                        onClick={() => setSelectedDrug(med)}
                        className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 hover:border-teal-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-teal-50 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                              {med.category}
                            </span>
                            <span className="text-xs font-semibold text-slate-400">
                              {med.routes.join(', ')}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors mb-1">
                            {med.genericName}
                          </h3>
                          <p className="text-xs font-medium text-slate-500 mb-4">
                            <strong className="text-slate-700">Brands:</strong> {med.brandNames}
                          </p>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                            {med.mechanismOfAction}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-600 group-hover:underline">View Full Profile</span>
                          <ChevronRight className="w-4 h-4 text-teal-600 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
                      <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-slate-800 mb-1">No medications found</h3>
                      <p className="text-sm text-slate-500">Try adjusting your search query or filter criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CATEGORIES VIEW */}
            {activeTab === 'categories' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Drug Categories</h1>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">Browse medications by therapeutic class</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoriesList.filter(c => c !== 'All').map((catName, idx) => {
                    const medsInCat = MEDICATIONS_DATABASE.filter(m => m.category === catName);
                    return (
                      <div key={idx} className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                          <h2 className="text-xl font-bold text-slate-900">{catName}</h2>
                          <span className="bg-teal-100 text-teal-800 text-xs font-extrabold px-3 py-1 rounded-full">
                            {medsInCat.length} Medications
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {medsInCat.map(med => (
                            <div
                              key={med.id}
                              onClick={() => setSelectedDrug(med)}
                              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-300 transition-all cursor-pointer group"
                            >
                              <div>
                                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-900">{med.genericName}</h3>
                                <p className="text-xs text-slate-500">{med.classification}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NURSING GUIDE VIEW */}
            {activeTab === 'nursing-guide' && (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
                <div className="mb-8 text-center">
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Interactive Clinical Support
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3">Nursing Action Guide</h1>
                  <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Core responsibilities, administrative checks, monitoring parameters, and escalation protocols.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      title: 'Before Administration: Pre-Administration Verification',
                      desc: 'Essential checks to ensure patient safety and prescription validation.',
                      items: [
                        'Verify patient identity using two unique identifiers.',
                        'Check medication name, dose, frequency, and route against prescription.',
                        'Confirm patient allergy history.',
                        'Review relevant baseline laboratory results (e.g., eGFR, INR, blood glucose).',
                        'Assess baseline vital signs relevant to the medication class.'
                      ],
                      color: 'border-teal-500 bg-teal-50/40'
                    },
                    {
                      title: 'During Administration: Technique & Safety',
                      desc: 'Ensuring correct delivery route, preparation, and immediate observation.',
                      items: [
                        'Adhere strictly to correct administration route and technique.',
                        'Perform independent double-checks for high-alert medications.',
                        'Inspect parenteral solutions for clarity or incompatibilities.',
                        'Observe patient during administration for immediate adverse reactions.'
                      ],
                      color: 'border-emerald-500 bg-emerald-50/40'
                    },
                    {
                      title: 'After Administration: Post-Administration Monitoring',
                      desc: 'Evaluating therapeutic efficacy and monitoring for adverse effects.',
                      items: [
                        'Monitor expected therapeutic response within 30 to 60 minutes.',
                        'Observe for common and serious adverse drug reactions.',
                        'Document administration immediately on the medication chart.',
                        'Provide comprehensive patient education regarding side effects.'
                      ],
                      color: 'border-cyan-500 bg-cyan-50/40'
                    }
                  ].map((guide, i) => (
                    <div key={i} className={`rounded-2xl border-l-4 ${guide.color} bg-white p-6 sm:p-8 shadow-md border border-slate-200/80`}>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{guide.title}</h3>
                      <p className="text-sm text-slate-600 mb-6">{guide.desc}</p>
                      
                      <ul className="space-y-3">
                        {guide.items.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700">
                            <Check className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RED FLAGS VIEW */}
            {activeTab === 'red-flags' && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
                <div className="mb-8 text-center">
                  <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Emergency Triage System
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3">Medication Red-Flag Warnings</h1>
                  <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Immediate recognition and emergency response protocols for critical adverse drug reactions.
                  </p>
                </div>

                <div className="space-y-8">
                  {RED_FLAGS_DATA.map((rf, idx) => {
                    const badgeColor = 
                      rf.level === 'RED' ? 'bg-rose-600 text-white' :
                      rf.level === 'AMBER' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white';

                    const cardBorder =
                      rf.level === 'RED' ? 'border-rose-300 bg-rose-50/30' :
                      rf.level === 'AMBER' ? 'border-amber-300 bg-amber-50/30' : 'border-emerald-300 bg-emerald-50/30';

                    return (
                      <div key={idx} className={`rounded-2xl border ${cardBorder} p-6 sm:p-8 shadow-lg bg-white`}>
                        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
                          <span className={`text-xs font-black px-3 py-1.5 rounded-lg shadow-sm ${badgeColor}`}>
                            LEVEL: {rf.level}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{rf.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Symptoms & Signs</h3>
                            <ul className="space-y-1.5">
                              {rf.symptoms.map((s, i) => (
                                <li key={i} className="text-xs sm:text-sm text-slate-800">• {s}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Why It Is Dangerous</h3>
                            <p className="text-xs sm:text-sm text-slate-800 font-medium">{rf.whyDangerous}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <h3 className="text-xs font-bold text-teal-800 uppercase mb-2">Immediate Assessment</h3>
                            <ul className="space-y-1">
                              {rf.immediateAssessment.map((ia, i) => (
                                <li key={i} className="text-xs text-slate-700">• {ia}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <h3 className="text-xs font-bold text-teal-800 uppercase mb-2">Immediate Response</h3>
                            <ul className="space-y-1">
                              {rf.immediateResponse.map((ir, i) => (
                                <li key={i} className="text-xs text-slate-700">• {ir}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
                            <h3 className="text-xs font-bold text-rose-900 uppercase mb-2">Emergency Activation</h3>
                            <p className="text-xs text-rose-800 font-semibold">{rf.emergencyActivation}</p>
                          </div>
                        </div>

                        <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-700 font-medium">
                          <strong>Documentation:</strong> {rf.documentation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DRUG COMPARISON VIEW */}
            {activeTab === 'comparison' && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
                <div className="mb-8 text-center">
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Comparative Analysis
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3">Medication Comparison Tool</h1>
                  <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Select two medications to compare classifications, uses, and side effects side-by-side.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select Medication 1</label>
                    <select
                      value={compareDrug1.id}
                      onChange={(e) => {
                        const found = MEDICATIONS_DATABASE.find(m => m.id === e.target.value);
                        if (found) setCompareDrug1(found);
                      }}
                      className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500"
                    >
                      {MEDICATIONS_DATABASE.map(m => (
                        <option key={m.id} value={m.id}>{m.genericName} ({m.category})</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select Medication 2</label>
                    <select
                      value={compareDrug2.id}
                      onChange={(e) => {
                        const found = MEDICATIONS_DATABASE.find(m => m.id === e.target.value);
                        if (found) setCompareDrug2(found);
                      }}
                      className="w-full py-3 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-500"
                    >
                      {MEDICATIONS_DATABASE.map(m => (
                        <option key={m.id} value={m.id}>{m.genericName} ({m.category})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="grid grid-cols-3 bg-slate-900 text-white p-4 font-bold text-sm sm:text-base">
                    <div>Parameter</div>
                    <div className="text-teal-300">{compareDrug1.genericName}</div>
                    <div className="text-teal-300">{compareDrug2.genericName}</div>
                  </div>

                  {[
                    { label: 'Therapeutic Category', val1: compareDrug1.category, val2: compareDrug2.category },
                    { label: 'Classification', val1: compareDrug1.classification, val2: compareDrug2.classification },
                    { label: 'Brand Names', val1: compareDrug1.brandNames, val2: compareDrug2.brandNames },
                    { label: 'Routes', val1: compareDrug1.routes.join(', '), val2: compareDrug2.routes.join(', ') },
                    { label: 'Mechanism of Action', val1: compareDrug1.mechanismOfAction, val2: compareDrug2.mechanismOfAction },
                    { label: 'Primary Uses', val1: compareDrug1.therapeuticUses.treats.join(', '), val2: compareDrug2.therapeuticUses.treats.join(', ') },
                    { label: 'Common Side Effects', val1: compareDrug1.sideEffects.common.join(', '), val2: compareDrug2.sideEffects.common.join(', ') },
                    { label: 'Serious Reactions', val1: compareDrug1.sideEffects.serious.join(', '), val2: compareDrug2.sideEffects.serious.join(', ') }
                  ].map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 p-4 text-xs sm:text-sm border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}>
                      <div className="font-bold text-slate-700">{row.label}</div>
                      <div className="text-slate-800 pr-2">{row.val1}</div>
                      <div className="text-slate-800 pl-2 border-l border-slate-200">{row.val2}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LEARNING CENTRE VIEW */}
            {activeTab === 'learning' && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-12">
                <div className="text-center">
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Educational Hub
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3">Medication Safety Learning Centre</h1>
                  <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                    Short educational articles and interactive quizzes for nursing students and professionals.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Core Educational Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ARTICLES_DATA.map((art) => (
                      <div key={art.id} className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-teal-50 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                              {art.category}
                            </span>
                            <span className="text-xs text-slate-400 font-semibold">{art.readTime}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{art.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-600 mb-4">{art.summary}</p>
                          <div className="space-y-2 pt-4 border-t border-slate-100">
                            {art.content.map((para, i) => (
                              <p key={i} className="text-xs text-slate-700 leading-relaxed">{para}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quiz */}
                <div className="bg-white rounded-2xl shadow-xl border border-teal-200 p-6 sm:p-10">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Interactive Knowledge-Check Quiz</h2>
                    <p className="text-slate-600 text-sm mb-8">Test your understanding of clinical pharmacology and nursing safety.</p>

                    <div className="space-y-8">
                      {QUIZ_QUESTIONS.map((q, qIndex) => (
                        <div key={q.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                          <h3 className="text-base font-bold text-slate-900 mb-4">
                            {qIndex + 1}. {q.question}
                          </h3>
                          <div className="space-y-2">
                            {q.options.map((opt, optIndex) => {
                              const isSelected = quizAnswers[q.id] === optIndex;
                              const isCorrect = q.correct === optIndex;
                              let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                              if (quizSubmitted) {
                                if (isCorrect) {
                                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                                } else if (isSelected && !isCorrect) {
                                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-900';
                                }
                              } else if (isSelected) {
                                btnStyle = 'bg-teal-600 text-white border-teal-600 font-bold';
                              }

                              return (
                                <button
                                  key={optIndex}
                                  onClick={() => {
                                    if (!quizSubmitted) {
                                      setQuizAnswers({ ...quizAnswers, [q.id]: optIndex });
                                    }
                                  }}
                                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                                  {quizSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-600" />}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className="mt-4 p-4 rounded-xl bg-teal-50/80 border border-teal-200 text-xs sm:text-sm text-teal-900">
                              <strong>Explanation:</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      {!quizSubmitted ? (
                        <button
                          onClick={() => setQuizSubmitted(true)}
                          className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
                        >
                          Submit Quiz Answers
                        </button>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-lg font-bold text-slate-900">
                            Your Score: {Object.entries(quizAnswers).filter(([qId, ans]) => QUIZ_QUESTIONS.find(q => q.id === Number(qId))?.correct === ans).length} / {QUIZ_QUESTIONS.length}
                          </p>
                          <button
                            onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
                          >
                            Retake Quiz
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT VIEW */}
            {activeTab === 'about' && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn space-y-8">
                <div className="text-center">
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Platform Overview
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3">About MediGuard</h1>
                  <p className="text-slate-600 text-sm sm:text-base">
                    An educational medication safety and nursing support technology prototype.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Our Purpose</h2>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      MediGuard is an educational medication safety platform designed for nursing students and healthcare professionals. It makes reliable medication information easily accessible and helps professionals understand drug actions, identify adverse effects, and apply nursing responsibilities.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Ethical & Clinical Safeguards</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Patient Privacy', desc: 'No patient names or identifiable health records are collected or stored.' },
                        { title: 'Clinical Accountability', desc: 'Nurses retain sole professional responsibility for clinical judgement.' },
                        { title: 'Source Transparency', desc: 'All drug information cites verified international references such as DailyMed and WHO.' },
                        { title: 'Cultural Sensitivity', desc: 'Emphasises respectful, non-discriminatory patient education.' }
                      ].map((s, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h3 className="text-sm font-bold text-slate-900 mb-1">{s.title}</h3>
                          <p className="text-xs text-slate-600">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* AI ASSISTANT MODAL */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">MediGuard Clinical Assistant</h2>
                  <p className="text-xs text-teal-300">AI-assisted nursing support</p>
                </div>
              </div>
              <button
                onClick={() => setAiModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow space-y-4 bg-slate-50">
              {selectedDrug && aiMode === 'explain' ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="text-xl font-extrabold text-slate-900">Simple Explanation: {selectedDrug.genericName}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>What it does:</strong> {selectedDrug.mechanismOfAction}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>Why it is prescribed:</strong> {selectedDrug.therapeuticUses.whyPrescribed}
                  </p>
                  <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <h4 className="text-xs font-bold text-teal-900 uppercase mb-1">Key Nursing Takeaway</h4>
                    <p className="text-xs text-teal-800 font-medium">
                      Always confirm allergies, check baseline observations, monitor for common side effects ({selectedDrug.sideEffects.common.join(', ')}), and watch for serious adverse reactions ({selectedDrug.sideEffects.serious.join(', ')}).
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      'What should I assess before administration?',
                      'What observations require urgent escalation?',
                      'What are the key contraindications?'
                    ].map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setChatInput(prompt)}
                        className="bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-teal-200 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask a nursing or medication safety question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white p-2.5 rounded-xl transition-colors shadow-md"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* FOOTER & DISCLAIMER */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-200">Educational Disclaimer:</strong> MediGuard is an educational medication information and nursing support platform. It does not replace clinical assessment, professional nursing judgement, a valid prescription, institutional policies, or established clinical guidelines. Always verify medication information using authoritative references. In emergencies, follow institutional emergency procedures.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} MediGuard Platform. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Designed for Nursing Education & Clinical Safety</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
