// Realistic Demo Patients for MediKiosk Clinical Prototype
export const DEMO_PATIENTS = [
  {
    id: "MK-1001",
    name: "Rajesh Patel",
    age: 54,
    gender: "Male",
    mobile: "+91 98250 44120",
    abhaId: "91-4521-8890-1234",
    language: "Gujarati",
    type: "Existing Patient",
    queueNumber: "OPD-042",
    priority: "High", // Red flag
    status: "Review Required",
    chiefComplaint: "Substernal chest tightness radiating to left shoulder with exertional dyspnea (breathing difficulty) for 3 hours",
    symptoms: ["Chest Discomfort", "Breathing Difficulty", "Cold Sweats", "Fatigue"],
    duration: "3 hours, acute onset",
    vitals: {
      bloodPressure: "148/92 mmHg",
      heartRate: "98 bpm",
      spO2: "94%",
      temperature: "98.6 °F",
      respiratoryRate: "22 /min"
    },
    redFlagDetected: true,
    redFlagDetails: "Chest discomfort with dyspnea in a 54yo male with history of dyslipidemia. Immediate triage evaluation indicated to rule out Acute Coronary Syndrome (ACS).",
    history: {
      hpi: "Patient reports sudden onset retrosternal chest heaviness while climbing stairs this morning at 9:30 AM. Rated 7/10 on pain scale. Radiates to left jaw and shoulder. Associated with mild diaphoresis and shortness of breath. No relief with rest. Denies syncope.",
      pastMedical: "Dyslipidemia diagnosed 2021 (non-compliant with Atorvastatin). Mild primary hypertension (diagnosed 2023).",
      pastSurgical: "Appendectomy (2008), uncomplicated.",
      medications: [
        { name: "Amlodipine", dose: "5 mg", frequency: "OD (Morning)", status: "Active" },
        { name: "Atorvastatin", dose: "10 mg", frequency: "HS (Night)", status: "Irregular" }
      ],
      allergies: ["Penicillin (triggers cutaneous rash)", "Sulfa drugs (denies)"],
      familyHistory: "Father had myocardial infarction at age 58. Mother has Type 2 Diabetes Mellitus.",
      personalHistory: "Non-smoker. Occasional social alcohol. Sedentary desk occupation. Moderate sleep deficit."
    },
    ayush: {
      prakriti: "Vata-Pitta",
      vikriti: "Prana Vata Dushti with Pitta Vriddhi",
      sara: "Madhyama (Moderate)",
      samhanana: "Madhyama (Medium body frame)",
      pramana: "Normal BMI 26.2",
      satmya: "Mishra (Mixed adaptation)",
      sattva: "Madhyama Sattva (Moderate mental resilience)",
      aharaShakti: "Abhyavaharana Shakti Madhyama, Jarana Shakti Avara (Sluggish digestion)",
      vyayamaShakti: "Avara (Low exercise tolerance)",
      vaya: "Pravriddha (Madhyama Vaya - 54 yrs)",
      ahara: "Prefers fried snacks (Farsan), irregular meal timings, high salt intake.",
      vihara: "Stressful business schedule, late bedtime (12:30 AM), minimal physical exercise.",
      nidana: "Guru-Snigdha Ahara Sevana, Ati-Chintana (High mental stress), Divasvapna (Day sleeping).",
      samprapti: "Dhamani Pratichaya (Atherosclerotic tendency) aggravating Hridya Spandana."
    },
    documents: [
      { id: "DOC-01", title: "ECG Strip (Previous Year)", type: "Imaging Report", date: "2025-04-12", confidence: "98.4%", status: "Extracted" },
      { id: "DOC-02", title: "Lipid Profile & HbA1c", type: "Lab Report", date: "2025-11-20", confidence: "96.2%", status: "Extracted" },
      { id: "DOC-03", title: "Prescription - Dr. Trivedi", type: "Prescription", date: "2025-12-05", confidence: "95.0%", status: "Extracted" },
      { id: "DOC-04", title: "Discharge Summary (Appendectomy)", type: "Discharge Summary", date: "2008-03-15", confidence: "91.5%", status: "Archived" }
    ],
    timeline: [
      { year: "2008", date: "15 Mar 2008", category: "Hospital Visits", title: "Appendectomy Surgery", details: "Laparoscopic appendectomy at Sterling Hospital, uneventful recovery." },
      { year: "2021", date: "10 Aug 2021", category: "Diagnoses", title: "Dyslipidemia Diagnosed", details: "Serum Cholesterol: 242 mg/dL, LDL: 160 mg/dL. Commenced Atorvastatin 10mg." },
      { year: "2023", date: "04 Sep 2023", category: "Diagnoses", title: "Primary Hypertension", details: "Resting BP 152/94 mmHg confirmed over 3 serial visits. Started Amlodipine 5mg." },
      { year: "2025", date: "20 Nov 2025", category: "Lab Reports", title: "Annual Lipid & Metabolic Panel", details: "Total Chol: 218 mg/dL, Triglycerides: 210 mg/dL, Fasting Blood Sugar: 104 mg/dL." },
      { year: "2026", date: "11 Sep 2026", category: "Hospital Visits", title: "Current OPD Intake (MediKiosk)", details: "Acute chest discomfort with exertional dyspnea flagged for priority physician review." }
    ],
    completeness: 94
  },
  {
    id: "MK-1002",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    mobile: "+91 97123 88450",
    abhaId: "14-8892-3341-9087",
    language: "Hindi",
    type: "New Patient",
    queueNumber: "OPD-043",
    priority: "Medium",
    status: "Ready",
    chiefComplaint: "High-grade fever with chills, body ache, and retro-orbital headache for 4 days",
    symptoms: ["Fever", "Chills", "Myalgia", "Headache"],
    duration: "4 days",
    vitals: {
      bloodPressure: "116/76 mmHg",
      heartRate: "102 bpm",
      spO2: "98%",
      temperature: "102.4 °F",
      respiratoryRate: "18 /min"
    },
    redFlagDetected: false,
    redFlagDetails: "No immediate cardiorespiratory red flags. Febrile illness requiring differential for Dengue / Viral / Malaria.",
    history: {
      hpi: "Patient developed acute high fever 4 days ago with shivering and prominent pain behind eyes. Mild nausea, no vomiting. Taking OTC Paracetamol 650mg SOS with transient fever reduction. No rash or bleeding diathesis reported.",
      pastMedical: "Hypothyroidism diagnosed 2020. Well managed on Thyroxine.",
      pastSurgical: "None reported.",
      medications: [
        { name: "Levothyroxine", dose: "50 mcg", frequency: "OD (Empty stomach)", status: "Active" },
        { name: "Paracetamol", dose: "650 mg", frequency: "SOS", status: "Active" }
      ],
      allergies: ["No known drug allergies (NKDA)"],
      familyHistory: "Mother has Hypothyroidism.",
      personalHistory: "Non-smoker, vegetarian diet, IT software professional working hybrid."
    },
    ayush: {
      prakriti: "Pitta-Kapha",
      vikriti: "Jwara Samprapti (Pitta Pradhana)",
      sara: "Uttama",
      samhanana: "Madhyama",
      pramana: "Normal BMI 22.4",
      satmya: "Satmya to Shita Ahara",
      sattva: "Pravara (Good mental fortitude)",
      aharaShakti: "Manda (Suppressed digestive fire during Jwara)",
      vyayamaShakti: "Madhyama",
      vaya: "Yuva (32 yrs)",
      ahara: "Light khichdi, herbal teas, warm boiled water.",
      vihara: "Complete bed rest due to malaise.",
      nidana: "Vishamashana, seasonal monsoon humidity.",
      samprapti: "Amashaya Samutthana Jwara with Rasa Dhatu Dushti."
    },
    documents: [
      { id: "DOC-11", title: "Complete Blood Count (CBC)", type: "Lab Report", date: "2026-09-10", confidence: "97.5%", status: "Extracted" },
      { id: "DOC-12", title: "Thyroid Profile (TSH)", type: "Lab Report", date: "2026-06-15", confidence: "98.0%", status: "Extracted" }
    ],
    timeline: [
      { year: "2020", date: "14 Jul 2020", category: "Diagnoses", title: "Primary Hypothyroidism", details: "TSH elevated at 8.4 mIU/L. Commenced Levothyroxine 50 mcg." },
      { year: "2026", date: "15 Jun 2026", category: "Lab Reports", title: "Thyroid Follow-up", details: "TSH euthyroid at 2.1 mIU/L on current dose." },
      { year: "2026", date: "10 Sep 2026", category: "Lab Reports", title: "CBC Investigation", details: "Platelets: 135,000 /uL (borderline low), WBC: 3,800 /uL. Dengue NS1 recommended." },
      { year: "2026", date: "11 Sep 2026", category: "Hospital Visits", title: "OPD Consultation", details: "Acute febrile illness evaluation with CBC trends." }
    ],
    completeness: 91
  },
  {
    id: "MK-1003",
    name: "Sunita Devi",
    age: 48,
    gender: "Female",
    mobile: "+91 94230 77124",
    abhaId: "32-1109-7765-4321",
    language: "Marathi",
    type: "Existing Patient",
    queueNumber: "OPD-044",
    priority: "Medium",
    status: "Ready",
    chiefComplaint: "Dry persistent cough for 3 weeks with evening low-grade fever and mild appetite loss",
    symptoms: ["Cough", "Evening Fever", "Weight Loss", "Fatigue"],
    duration: "3 weeks",
    vitals: {
      bloodPressure: "122/80 mmHg",
      heartRate: "82 bpm",
      spO2: "97%",
      temperature: "99.4 °F",
      respiratoryRate: "19 /min"
    },
    redFlagDetected: false,
    redFlagDetails: "Subacute cough > 2 weeks warrants Chest X-Ray and Sputum examination to rule out Pulmonary Tuberculosis.",
    history: {
      hpi: "Cough initiated following upper respiratory episode 3 weeks ago. Non-productive, worse at night and early morning. Associated with low grade fever in evening hours. No hemoptysis. Unintentional weight loss ~2 kg over last month.",
      pastMedical: "Bronchial Asthma in childhood (quiescent since age 16).",
      pastSurgical: "Tubectomy (2012).",
      medications: [
        { name: "Dextromethorphan Syrup", dose: "10 ml", frequency: "TDS", status: "Active" }
      ],
      allergies: ["Dust mite allergy, seasonal pollen"],
      familyHistory: "Paternal uncle had treated pulmonary TB 15 years ago.",
      personalHistory: "Agricultural worker, exposure to harvest dust and biomass fuel cooking historically."
    },
    ayush: {
      prakriti: "Vata-Kapha",
      vikriti: "Kasa Roga with Kaphaja Shushka Prakopa",
      sara: "Madhyama",
      samhanana: "Madhyama",
      pramana: "Normal BMI 21.8",
      satmya: "Ushna Satmya",
      sattva: "Madhyama",
      aharaShakti: "Avara (Reduced hunger)",
      vyayamaShakti: "Madhyama",
      vaya: "Madhyama (48 yrs)",
      ahara: "Prefers warm soupy meals, seasonal pulses, turmeric milk.",
      vihara: "Early riser (5:00 AM), farm routine.",
      nidana: "Dhuma-Raja Sevana (Smoke/dust exposure), Sheeta Vata.",
      samprapti: "Prana Vaha Srotas Dushti leading to Urdhva Gati of Vata."
    },
    documents: [
      { id: "DOC-21", title: "Chest X-Ray PA View", type: "Imaging Report", date: "2026-09-08", confidence: "94.8%", status: "Extracted" },
      { id: "DOC-22", title: "Prescription - PHC Center", type: "Prescription", date: "2026-08-25", confidence: "92.0%", status: "Extracted" }
    ],
    timeline: [
      { year: "2026", date: "25 Aug 2026", category: "Prescriptions", title: "Initial PHC Visit", details: "Prescribed Cough syrup and Azithromycin 500mg x 3 days." },
      { year: "2026", date: "08 Sep 2026", category: "Imaging Reports", title: "Chest Radiography", details: "Bilateral hilar prominence, mild right peribronchial cuffing, no cavitary lesion." },
      { year: "2026", date: "11 Sep 2026", category: "Hospital Visits", title: "Specialist OPD Referral", details: "Evaluation of subacute persistent cough." }
    ],
    completeness: 88
  },
  {
    id: "MK-1004",
    name: "Amit Verma",
    age: 28,
    gender: "Male",
    mobile: "+91 99099 12345",
    abhaId: "55-6677-8899-0012",
    language: "English",
    type: "New Patient",
    queueNumber: "OPD-045",
    priority: "Normal",
    status: "Completed",
    chiefComplaint: "Unilateral throbbing headache on right temple with photophobia and nausea for 24 hours",
    symptoms: ["Headache", "Photophobia", "Nausea", "Visual Aura"],
    duration: "24 hours",
    vitals: {
      bloodPressure: "120/78 mmHg",
      heartRate: "74 bpm",
      spO2: "99%",
      temperature: "98.2 °F",
      respiratoryRate: "16 /min"
    },
    redFlagDetected: false,
    redFlagDetails: "Typical features of migraine with aura. No signs of meningism, sudden thunderclap onset, or neurological deficit.",
    history: {
      hpi: "Patient experienced zigzag shimmering lights in peripheral vision followed 30 minutes later by intense pulsating right-sided headache. Sensitivity to bright screen light and loud sounds. Episode triggered after prolonged screen time and irregular sleep.",
      pastMedical: "History of episodic tension headaches since college.",
      pastSurgical: "None.",
      medications: [
        { name: "Naproxen", dose: "500 mg", frequency: "SOS", status: "Active" }
      ],
      allergies: ["NKDA"],
      familyHistory: "Mother suffers from chronic migraines.",
      personalHistory: "Non-smoker, high caffeine consumer (4 cups coffee/day), software engineer."
    },
    ayush: {
      prakriti: "Pitta-Vata",
      vikriti: "Shiroroga (Ardhavabhedaka - Migraine)",
      sara: "Pravara",
      samhanana: "Uttama",
      pramana: "Normal BMI 23.5",
      satmya: "Satmya",
      sattva: "Pravara",
      aharaShakti: "Tikshnagni (Strong appetite)",
      vyayamaShakti: "Pravara (Regular gym 4x/week)",
      vaya: "Taruna (28 yrs)",
      ahara: "High protein, coffee, occasional processed junk food.",
      vihara: "Screen exposure > 11 hrs/day, irregular sleep cycle.",
      nidana: "Ratri Jagarana (Night waking), Ati-Chintana, Katu Ahara.",
      samprapti: "Pitta-Vata prakopa in Shirah Pradesh causing vascular pulsation."
    },
    documents: [
      { id: "DOC-31", title: "Brain MRI (Normal)", type: "Imaging Report", date: "2024-02-18", confidence: "99.1%", status: "Archived" }
    ],
    timeline: [
      { year: "2024", date: "18 Feb 2024", category: "Imaging Reports", title: "Diagnostic Brain MRI", details: "Normal study without intracranial vascular anomaly or space-occupying lesion." },
      { year: "2026", date: "11 Sep 2026", category: "Hospital Visits", title: "OPD Migraine Review", details: "Evaluation of abortive therapy and lifestyle modification." }
    ],
    completeness: 96
  },
  {
    id: "MK-1005",
    name: "Dr. Anand Rao",
    age: 62,
    gender: "Male",
    mobile: "+91 98450 67123",
    abhaId: "78-3456-1290-7788",
    language: "Telugu",
    type: "Existing Patient",
    queueNumber: "OPD-046",
    priority: "Normal",
    status: "Ready",
    chiefComplaint: "Recurrent upper abdominal fullness, acid regurgitation, and post-prandial bloating for 2 months",
    symptoms: ["Abdominal Pain", "Acid Reflux", "Bloating", "Early Satiety"],
    duration: "2 months",
    vitals: {
      bloodPressure: "134/86 mmHg",
      heartRate: "70 bpm",
      spO2: "98%",
      temperature: "98.4 °F",
      respiratoryRate: "16 /min"
    },
    redFlagDetected: false,
    redFlagDetails: "Dyspepsia symptoms without alarm features (no dysphagia, weight loss, hematemesis, or anemia).",
    history: {
      hpi: "Symptoms prominent after oily or spicy meals. Retrosternal burning sensation relieved partially by over-the-counter Antacids. Mild epigastric tenderness.",
      pastMedical: "Type 2 Diabetes Mellitus x 8 years (HbA1c 6.9% on Metformin).",
      pastSurgical: "None.",
      medications: [
        { name: "Metformin", dose: "500 mg", frequency: "BD with meals", status: "Active" },
        { name: "Pantoprazole", dose: "40 mg", frequency: "OD (Empty stomach)", status: "Active" }
      ],
      allergies: ["NKDA"],
      familyHistory: "Both parents had Type 2 Diabetes.",
      personalHistory: "Retired professor, daily 30 min morning walk, non-smoker."
    },
    ayush: {
      prakriti: "Kapha-Pitta",
      vikriti: "Amlapitta with Mandagni",
      sara: "Madhyama",
      samhanana: "Madhyama",
      pramana: "Overweight BMI 27.1",
      satmya: "Satmya",
      sattva: "Madhyama",
      aharaShakti: "Manda (Sluggish digestion)",
      vyayamaShakti: "Madhyama",
      vaya: "Vriddha (62 yrs)",
      ahara: "Rice based meals, pickles, afternoon snacks.",
      vihara: "Post-lunch recumbency (Vamakukshi), moderate physical exercise.",
      nidana: "Vidahi Ahara Sevana (Fermented/sour foods), Divaswapna.",
      samprapti: "Pitta Prakopa with Kledaka Kapha leading to Udgar & Dahata."
    },
    documents: [
      { id: "DOC-41", title: "Upper GI Endoscopy Report", type: "Imaging Report", date: "2025-07-22", confidence: "96.4%", status: "Extracted" },
      { id: "DOC-42", title: "Glycemic Profile (HbA1c & Fasting)", type: "Lab Report", date: "2026-08-10", confidence: "97.8%", status: "Extracted" }
    ],
    timeline: [
      { year: "2018", date: "10 Oct 2018", category: "Diagnoses", title: "Type 2 Diabetes Mellitus", details: "Commenced Metformin 500mg BD. Well controlled glycemic targets." },
      { year: "2025", date: "22 Jul 2025", category: "Imaging Reports", title: "Upper GI Endoscopy", details: "Grade I reflux esophagitis, mild antral gastritis, negative for H. Pylori." },
      { year: "2026", date: "10 Aug 2026", category: "Lab Reports", title: "HbA1c Follow-up", details: "HbA1c 6.9%, Fasting blood glucose 118 mg/dL." },
      { year: "2026", date: "11 Sep 2026", category: "Hospital Visits", title: "Gastroenterology OPD", details: "Refractory dyspepsia assessment." }
    ],
    completeness: 92
  }
];

export const DEMO_STATS = {
  potentialOpdPerDay: "4,000–10,000",
  typicalConsultationWindow: "2–5 min",
  patientJourneySteps: "5 Steps",
  todayTotalPatients: 128,
  completedAssessments: 96,
  priorityCases: 8,
  pendingReviews: 24
};

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", audioText: "Please answer the following questions clearly." },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", audioText: "कृपया निम्नलिखित प्रश्नों के उत्तर स्पष्ट रूप से दें।" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", audioText: "કૃપા કરીને નીચેના પ્રશ્નોના સ્પષ્ટ જવાબ આપો." },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", audioText: "ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਦਿੱਤੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਸਪੱਸ਼ਟ ਰੂਪ ਵਿੱਚ ਦਿਓ।" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", audioText: "कृपया खालील प्रश्नांची स्पष्ट उत्तरे द्या." },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", audioText: "অনুগ্রহ করে নীচের প্রশ্নগুলির স্পষ্ট উত্তর দিন।" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", audioText: "தயவுசெய்து பின்வரும் கேள்விகளுக்கு தெளிவாக பதிலளிக்கவும்." },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", audioText: "దయచేసి క్రింది ప్రశ్నలకు స్పష్టంగా సమాధానం ఇవ్వండి." }
];
