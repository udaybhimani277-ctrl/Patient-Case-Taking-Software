// Centralized Mock Data & LocalStorage Management for MediKiosk
// Supports two-sided application flow (Patient & Doctor)

export const INITIAL_PATIENTS = [
  {
    id: "P001",
    token: "A103",
    name: "Rajesh Patel",
    age: 54,
    gender: "Male",
    mobile: "+91 98250 44120",
    abhaId: "91-4521-8890-1234",
    department: "Cardiology",
    language: "Gujarati",
    patientType: "Existing Patient",
    queueNumber: "A103",
    priority: "High",
    status: "Ready for Review",
    submissionStatus: "submitted", // 'not_submitted' | 'submitted' | 'called' | 'in_consultation' | 'completed'
    submittedAt: "Today, 10:15 AM",
    completeness: 94,
    verifiedSectionsCount: 7,
    totalSectionsCount: 10,
    chiefComplaint: "Substernal chest tightness radiating to left shoulder with exertional dyspnea (breathing difficulty) for 3 hours",
    duration: "3 hours, acute onset",
    symptoms: ["Chest Discomfort", "Breathing Difficulty", "Cold Sweats", "Fatigue"],
    vitals: {
      bloodPressure: "148/92 mmHg",
      heartRate: "98 bpm",
      spO2: "94%",
      temperature: "98.6 °F",
      respiratoryRate: "22 /min",
      bmi: "26.2"
    },
    redFlagDetected: true,
    redFlagDetails: "Chest discomfort with dyspnea in a 54yo male with history of dyslipidemia. Immediate triage evaluation indicated to rule out Acute Coronary Syndrome (ACS).",
    history: {
      chiefComplaint: {
        title: "Chief Complaint",
        content: "Substernal chest tightness radiating to left shoulder with exertional dyspnea (breathing difficulty) for 3 hours.",
        status: "Verified",
        confidence: "96%",
        source: "Patient Voice Intake"
      },
      hpi: {
        title: "History of Present Illness (HPI)",
        content: "Patient reports sudden onset retrosternal chest heaviness while climbing stairs this morning at 9:30 AM. Rated 7/10 on pain scale. Radiates to left jaw and shoulder. Associated with mild diaphoresis and shortness of breath. No relief with rest. Denies syncope.",
        status: "Verified",
        confidence: "94%",
        source: "Patient Voice Intake"
      },
      pastMedical: {
        title: "Past Medical History",
        content: "Dyslipidemia diagnosed 2021 (non-compliant with Atorvastatin). Mild primary hypertension (diagnosed 2023).",
        status: "Verified",
        confidence: "92%",
        source: "EMR Sync & OCR"
      },
      pastSurgical: {
        title: "Past Surgical History",
        content: "Appendectomy (2008), uncomplicated laparoscopic procedure at Sterling Hospital.",
        status: "Verified",
        confidence: "90%",
        source: "Historical Records"
      },
      medications: {
        title: "Drug & Medication History",
        content: "Amlodipine 5mg OD (Morning). Atorvastatin 10mg HS (Night, irregular compliance). Discrepancy noted with previous prescription.",
        status: "Needs Review",
        confidence: "88%",
        source: "OCR Prescription"
      },
      allergies: {
        title: "Allergy History",
        content: "Penicillin (triggers cutaneous urticarial rash and facial pruritus). No known food or latex allergies.",
        status: "Verified",
        confidence: "98%",
        source: "Patient Statement"
      },
      familyHistory: {
        title: "Family Medical History",
        content: "Father had myocardial infarction at age 58. Mother has Type 2 Diabetes Mellitus on oral hypoglycemics.",
        status: "Verified",
        confidence: "91%",
        source: "Patient Intake"
      },
      personalHistory: {
        title: "Personal & Lifestyle History",
        content: "Non-smoker. Occasional social alcohol. Sedentary desk occupation. Moderate sleep deficit. High dietary salt intake.",
        status: "Verified",
        confidence: "89%",
        source: "Patient Questionnaire"
      },
      reviewOfSystems: {
        title: "Review of Systems (ROS)",
        content: "Cardiovascular: Positive for exertional chest pressure and palpitations. Respiratory: Positive for dyspnea on exertion. GI: Denies nausea or vomiting. Neuro: Denies dizziness or syncope.",
        status: "Needs Review",
        confidence: "86%",
        source: "AI Guided Inquiry"
      },
      priorInvestigations: {
        title: "Prior Investigations",
        content: "Previous ECG (2025): Normal sinus rhythm. Recent lipid profile: Total Cholesterol 218 mg/dL, Triglycerides 210 mg/dL.",
        status: "Needs Review",
        confidence: "95%",
        source: "Digitized Lab Report"
      }
    },
    documentsCount: 4,
    timelineEventsCount: 8
  },
  {
    id: "P002",
    token: "A101",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    mobile: "+91 97123 88450",
    abhaId: "14-8892-3341-9087",
    department: "Medicine",
    language: "Hindi",
    patientType: "New Patient",
    queueNumber: "A101",
    priority: "Normal",
    status: "Ready",
    submissionStatus: "submitted",
    submittedAt: "Today, 09:30 AM",
    completeness: 94,
    verifiedSectionsCount: 9,
    totalSectionsCount: 10,
    chiefComplaint: "Persistent productive cough with low-grade evening fever for 5 days",
    duration: "5 days",
    symptoms: ["Cough", "Mild Fever", "Throat Pain"],
    vitals: {
      bloodPressure: "118/76 mmHg",
      heartRate: "82 bpm",
      spO2: "98%",
      temperature: "99.4 °F",
      respiratoryRate: "18 /min",
      bmi: "22.4"
    },
    redFlagDetected: false,
    documentsCount: 2,
    timelineEventsCount: 4
  },
  {
    id: "P003",
    token: "A102",
    name: "Vikram Malhotra",
    age: 48,
    gender: "Male",
    mobile: "+91 98450 11223",
    abhaId: "22-9011-4432-8812",
    department: "ENT",
    language: "English",
    patientType: "Follow-up",
    queueNumber: "A102",
    priority: "Normal",
    status: "Ready",
    submissionStatus: "submitted",
    submittedAt: "Today, 09:45 AM",
    completeness: 87,
    verifiedSectionsCount: 8,
    totalSectionsCount: 10,
    chiefComplaint: "Bilateral ear fullness and vertigo episodes for 2 weeks",
    duration: "2 weeks",
    symptoms: ["Ear Fullness", "Dizziness", "Mild Tinnitus"],
    vitals: {
      bloodPressure: "126/82 mmHg",
      heartRate: "76 bpm",
      spO2: "99%",
      temperature: "98.4 °F",
      respiratoryRate: "16 /min",
      bmi: "24.1"
    },
    redFlagDetected: false,
    documentsCount: 3,
    timelineEventsCount: 5
  },
  {
    id: "P004",
    token: "A104",
    name: "Sunita Devi",
    age: 62,
    gender: "Female",
    mobile: "+91 94190 22334",
    abhaId: "33-1122-3344-5566",
    department: "Orthopedics",
    language: "Hindi",
    patientType: "Existing Patient",
    queueNumber: "A104",
    priority: "Medium",
    status: "Waiting",
    submissionStatus: "submitted",
    submittedAt: "Today, 10:30 AM",
    completeness: 89,
    verifiedSectionsCount: 6,
    totalSectionsCount: 10,
    chiefComplaint: "Bilateral knee joint pain aggravated on weight bearing",
    duration: "6 months",
    symptoms: ["Knee Pain", "Morning Stiffness", "Crepitus"],
    vitals: {
      bloodPressure: "138/86 mmHg",
      heartRate: "84 bpm",
      spO2: "97%",
      temperature: "98.2 °F",
      respiratoryRate: "18 /min",
      bmi: "28.5"
    },
    redFlagDetected: false,
    documentsCount: 2,
    timelineEventsCount: 6
  }
];

export const INITIAL_DOCTORS = [
  {
    id: "DOC-TRIVEDI",
    name: "Dr. S. Trivedi",
    qualification: "MD, DM (Cardiology)",
    designation: "Chief OPD Consultant",
    department: "Cardiology",
    specialization: "Interventional Cardiology & Preventive Health",
    councilReg: "GMC-34190",
    room: "OPD Room 04",
    hospital: "Civil Hospital & Medical College",
    email: "dr.trivedi@civilhospital.gov.in",
    phone: "+91 98251 00104",
    avatar: "ST"
  },
  {
    id: "DOC-MEHTA",
    name: "Dr. A. Mehta",
    qualification: "MBBS, MD (Medicine)",
    designation: "Senior Consultant Physician",
    department: "General Medicine",
    specialization: "Internal Medicine & Diabetes Care",
    councilReg: "GMC-28450",
    room: "OPD Room 02",
    hospital: "Civil Hospital & Medical College",
    email: "dr.mehta@civilhospital.gov.in",
    phone: "+91 98251 00102",
    avatar: "AM"
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "DOC-01",
    patientId: "P001",
    title: "OPD Prescription - Dr. S. Trivedi",
    category: "Prescription",
    date: "12 Aug 2026",
    facility: "Civil Hospital Heart Institute",
    confidence: "94%",
    status: "Verified",
    snippet: "Rx: Tab. Atorvastatin 10mg HS, Tab. Amlodipine 5mg OD. Review after 3 months.",
    extractedInfo: [
      { key: "Medicine", value: "Atorvastatin 10 mg", frequency: "1/day (Bedtime)", confidence: "94%" },
      { key: "Medicine", value: "Amlodipine 5 mg", frequency: "1/day (Morning)", confidence: "96%" },
      { key: "Diagnosis", value: "Essential Hypertension & Dyslipidemia", confidence: "92%" }
    ]
  },
  {
    id: "DOC-02",
    patientId: "P001",
    title: "Comprehensive Metabolic & Lipid Panel",
    category: "Lab Report",
    date: "20 Nov 2025",
    facility: "Metro Clinical Reference Laboratory",
    confidence: "98%",
    status: "Verified",
    snippet: "Total Cholesterol 218 mg/dL (High), Triglycerides 210 mg/dL (High), Fasting Glucose 110 mg/dL.",
    extractedInfo: [
      { key: "Total Cholesterol", value: "218 mg/dL", status: "High", confidence: "98%" },
      { key: "Triglycerides", value: "210 mg/dL", status: "High", confidence: "97%" },
      { key: "HbA1c", value: "5.9%", status: "Normal", confidence: "99%" }
    ]
  },
  {
    id: "DOC-03",
    patientId: "P001",
    title: "12-Lead Resting ECG Strip",
    category: "Imaging Report",
    date: "12 Apr 2025",
    facility: "Sterling Hospital Cardiology Wing",
    confidence: "95%",
    status: "Verified",
    snippet: "Normal sinus rhythm at 74 bpm. No acute ST-T wave abnormalities. PR interval normal.",
    extractedInfo: [
      { key: "Heart Rate", value: "74 bpm", confidence: "98%" },
      { key: "Rhythm", value: "Normal Sinus Rhythm", confidence: "96%" },
      { key: "ST Segment", value: "No acute ischemic changes", confidence: "94%" }
    ]
  },
  {
    id: "DOC-04",
    patientId: "P001",
    title: "Discharge Summary - Appendectomy",
    category: "Discharge Summary",
    date: "15 Mar 2008",
    facility: "Sterling Hospital Surgical Dept",
    confidence: "91%",
    status: "Verified",
    snippet: "Laparoscopic appendectomy performed under general anesthesia. Uneventful post-op course.",
    extractedInfo: [
      { key: "Procedure", value: "Laparoscopic Appendectomy", confidence: "95%" },
      { key: "Outcome", value: "Successful, uncomplicated recovery", confidence: "92%" }
    ]
  }
];

export const INITIAL_TIMELINE = [
  {
    id: "TL-01",
    year: "2008",
    date: "15 Mar 2008",
    title: "Laparoscopic Appendectomy",
    category: "Hospital Visit",
    department: "General Surgery",
    facility: "Sterling Hospital",
    document: "Discharge Summary (Appendectomy)",
    medicine: "Post-op analgesics completed",
    investigation: "Abdominal Ultrasound, CBC",
    details: "Uncomplicated surgical removal of inflamed appendix. Discharged on post-op day 3 with full recovery."
  },
  {
    id: "TL-02",
    year: "2021",
    date: "10 Aug 2021",
    title: "Dyslipidemia Diagnosed",
    category: "Prescription",
    department: "Internal Medicine",
    facility: "Civil Hospital OPD",
    document: "Lipid Profile Panel",
    medicine: "Atorvastatin 10mg started",
    investigation: "Serum Cholesterol: 242 mg/dL, LDL: 160 mg/dL",
    details: "Elevated lipid parameters identified during routine executive health screening. Lifestyle counseling provided."
  },
  {
    id: "TL-03",
    year: "2023",
    date: "04 Sep 2023",
    title: "Primary Hypertension Confirmed",
    category: "Prescription",
    department: "Internal Medicine",
    facility: "Civil Hospital OPD",
    document: "Prescription #88210",
    medicine: "Amlodipine 5mg OD initiated",
    investigation: "Serial resting BP: 152/94 mmHg",
    details: "Essential hypertension diagnosed following 3 consecutive elevated ambulatory blood pressure measurements."
  },
  {
    id: "TL-04",
    year: "2025",
    date: "12 Apr 2025",
    title: "Resting 12-Lead ECG Evaluation",
    category: "Investigation",
    department: "Cardiology",
    facility: "Sterling Heart Institute",
    document: "12-Lead ECG Strip",
    medicine: "Continued Amlodipine 5mg & Atorvastatin 10mg",
    investigation: "ECG: Normal sinus rhythm at 74 bpm",
    details: "Elective cardiovascular checkup. No acute ischemic repolarization changes detected."
  },
  {
    id: "TL-05",
    year: "2025",
    date: "20 Nov 2025",
    title: "Annual Metabolic & Lipid Follow-up",
    category: "Lab Report",
    department: "Pathology",
    facility: "Metro Reference Lab",
    document: "Metabolic Profile 2025",
    medicine: "Atorvastatin dose reaffirmed",
    investigation: "Total Chol: 218 mg/dL, Triglycerides: 210 mg/dL",
    details: "Mild improvement in lipid parameters. Reminded patient to maintain regular medication compliance."
  },
  {
    id: "TL-06",
    year: "2026",
    date: "12 Aug 2026",
    title: "OPD Prescription Refill",
    category: "Current Prescription",
    department: "Cardiology",
    facility: "Civil Hospital OPD",
    document: "Prescription - Dr. S. Trivedi",
    medicine: "Amlodipine 5mg + Atorvastatin 10mg",
    investigation: "Routine clinic vitals check",
    details: "Quarterly prescription renewal. Advised patient to schedule follow-up if chest tightness occurs."
  },
  {
    id: "TL-07",
    year: "2026",
    date: "08 Sep 2026",
    title: "Pre-OPD Fasting Lab Panel",
    category: "Current Lab Report",
    department: "Laboratory",
    facility: "Metro Reference Lab",
    document: "CBC & Metabolic Panel",
    medicine: "N/A",
    investigation: "Fasting Blood Sugar: 110 mg/dL, Hemoglobin: 13.8 g/dL",
    details: "Routine screening prior to scheduled cardiology visit."
  },
  {
    id: "TL-08",
    year: "2026",
    date: "11 Sep 2026",
    title: "MediKiosk AI Clinical Intake",
    category: "Hospital Visit",
    department: "Cardiology / Emergency Triage",
    facility: "Civil Hospital MediKiosk Terminal #01",
    document: "MediKiosk Intake Dossier (Token A103)",
    medicine: "Flagged for immediate physician verification",
    investigation: "Point-of-care vitals: BP 148/92 mmHg, SpO2 94%",
    details: "Acute retrosternal chest discomfort with dyspnea recorded via interactive Gujarati voice kiosk. Forwarded to Dr. Mehta."
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-01",
    patientId: "P001",
    token: "A103",
    patientName: "Rajesh Patel",
    type: "Potential Red Flag",
    severity: "High",
    title: "Acute Chest Discomfort with Exertional Dyspnea",
    description: "54yo male with known dyslipidemia reporting 3 hours of retrosternal heaviness radiating to left shoulder. Immediate physician triage review required.",
    date: "Today, 10:15 AM",
    status: "New" // 'New' | 'Under Review' | 'Resolved'
  },
  {
    id: "ALT-02",
    patientId: "P001",
    token: "A103",
    patientName: "Rajesh Patel",
    type: "Medication Discrepancy",
    severity: "Medium",
    title: "Inconsistent Atorvastatin Compliance Reported",
    description: "Patient states taking Atorvastatin 10mg irregularly ('2-3 times/week') despite active daily prescription for hypercholesterolemia.",
    date: "Today, 10:18 AM",
    status: "Under Review"
  },
  {
    id: "ALT-03",
    patientId: "P001",
    token: "A103",
    patientName: "Rajesh Patel",
    type: "Previous Allergy",
    severity: "Medium",
    title: "Documented Penicillin Allergy",
    description: "Documented history of cutaneous urticaria and facial pruritus to Penicillin class antibiotics. Avoid Beta-lactams.",
    date: "Today, 10:20 AM",
    status: "New"
  }
];

export const INITIAL_MED_RECONCILIATION = [
  {
    id: "MED-01",
    name: "Amlodipine",
    patientReported: "5 mg once daily in morning",
    previousRecord: "Amlodipine 5 mg OD (Civil Hospital, Sep 2023)",
    currentPrescription: "Amlodipine 5 mg OD (Active)",
    status: "Consistent",
    hasDiscrepancy: false,
    recommendation: "Continue current regimen. Monitor blood pressure."
  },
  {
    id: "MED-02",
    name: "Atorvastatin",
    patientReported: "10 mg taken irregularly (2-3 nights per week)",
    previousRecord: "Atorvastatin 10 mg HS daily (Civil Hospital, Aug 2021)",
    currentPrescription: "Atorvastatin 10 mg HS daily (Active)",
    status: "Discrepancy Detected",
    hasDiscrepancy: true,
    recommendation: "Re-educate on daily compliance. Evaluate lipid panel and liver function before dose titration."
  },
  {
    id: "MED-03",
    name: "Paracetamol",
    patientReported: "500 mg taken occasionally for joint ache",
    previousRecord: "Paracetamol 500 mg SOS (PRN)",
    currentPrescription: "None currently prescribed",
    status: "Over-the-Counter",
    hasDiscrepancy: false,
    recommendation: "Safe for occasional PRN use. Keep under 2g daily."
  }
];

export const INITIAL_DEPARTMENTS = [
  {
    id: "DEP-CARDIO",
    name: "Cardiology",
    code: "CARD",
    headDoctor: "Dr. S. Trivedi",
    room: "OPD Room 04",
    floor: "2nd Floor, Block B",
    activeDoctors: 4,
    waitingPatients: 14,
    completedToday: 28,
    activeKiosks: 2,
    status: "Active",
    description: "Cardiac care, ECG, Holter, Echo, and preventive coronary evaluation."
  },
  {
    id: "DEP-MED",
    name: "General Medicine",
    code: "MED",
    headDoctor: "Dr. A. Mehta",
    room: "OPD Room 02",
    floor: "1st Floor, Block A",
    activeDoctors: 6,
    waitingPatients: 24,
    completedToday: 52,
    activeKiosks: 3,
    status: "Active",
    description: "Primary adult care, hypertension, metabolic disorders, and infectious illnesses."
  },
  {
    id: "DEP-ENT",
    name: "ENT & Head-Neck",
    code: "ENT",
    headDoctor: "Dr. V. Shah",
    room: "OPD Room 06",
    floor: "1st Floor, Block B",
    activeDoctors: 3,
    waitingPatients: 8,
    completedToday: 19,
    activeKiosks: 1,
    status: "Active",
    description: "Ear, nose, throat, audiology, vertigo, and endoscopic evaluations."
  },
  {
    id: "DEP-ORTHO",
    name: "Orthopedics",
    code: "ORTHO",
    headDoctor: "Dr. K. Patel",
    room: "OPD Room 08",
    floor: "Ground Floor, Block C",
    activeDoctors: 5,
    waitingPatients: 18,
    completedToday: 36,
    activeKiosks: 2,
    status: "Active",
    description: "Joint arthropathy, spine, trauma management, and physiotherapy coordination."
  },
  {
    id: "DEP-PED",
    name: "Pediatrics",
    code: "PED",
    headDoctor: "Dr. R. Joshi",
    room: "OPD Room 01",
    floor: "Ground Floor, Block A",
    activeDoctors: 4,
    waitingPatients: 12,
    completedToday: 31,
    activeKiosks: 2,
    status: "Active",
    description: "Child health, immunization, growth tracking, and adolescent medicine."
  },
  {
    id: "DEP-AYUSH",
    name: "AYUSH / Ayurveda",
    code: "AYUSH",
    headDoctor: "Vaidya M. Acharya",
    room: "OPD Room 10",
    floor: "3rd Floor, Wellness Wing",
    activeDoctors: 3,
    waitingPatients: 9,
    completedToday: 22,
    activeKiosks: 2,
    status: "Active",
    description: "Traditional Ayurvedic medicine, Prakriti profiling, Panchakarma, and diet counseling."
  }
];

export const INITIAL_KIOSKS = [
  {
    id: "MK-01",
    name: "Kiosk 01 — Main Foyer",
    location: "Main OPD Registration Hall",
    department: "Triage & Registration",
    ipAddress: "192.168.1.101",
    status: "Online", // 'Online' | 'Offline' | 'Maintenance' | 'Busy'
    patientsServed: 68,
    uptime: "99.8%",
    lastActive: "Just now",
    firmware: "v3.2.1-Prod",
    audioEnabled: true,
    cameraEnabled: true
  },
  {
    id: "MK-02",
    name: "Kiosk 02 — Cardiology Wing",
    location: "2nd Floor Waiting Lobby",
    department: "Cardiology",
    ipAddress: "192.168.1.102",
    status: "Online",
    patientsServed: 49,
    uptime: "99.4%",
    lastActive: "2 min ago",
    firmware: "v3.2.1-Prod",
    audioEnabled: true,
    cameraEnabled: true
  },
  {
    id: "MK-03",
    name: "Kiosk 03 — Emergency Triage",
    location: "Emergency Entrance Foyer",
    department: "Emergency Triage",
    ipAddress: "192.168.1.103",
    status: "Busy",
    patientsServed: 84,
    uptime: "100%",
    lastActive: "Active Session",
    firmware: "v3.2.1-Prod",
    audioEnabled: true,
    cameraEnabled: true
  },
  {
    id: "MK-04",
    name: "Kiosk 04 — AYUSH Center",
    location: "3rd Floor Wellness Lounge",
    department: "AYUSH / Ayurveda",
    ipAddress: "192.168.1.104",
    status: "Online",
    patientsServed: 31,
    uptime: "98.9%",
    lastActive: "6 min ago",
    firmware: "v3.2.1-Prod",
    audioEnabled: true,
    cameraEnabled: true
  },
  {
    id: "MK-05",
    name: "Kiosk 05 — Orthopedics",
    location: "Ground Floor Block C",
    department: "Orthopedics",
    ipAddress: "192.168.1.105",
    status: "Maintenance",
    patientsServed: 14,
    uptime: "86.2%",
    lastActive: "1 hr ago",
    firmware: "v3.1.9-Service",
    audioEnabled: false,
    cameraEnabled: true
  },
  {
    id: "MK-06",
    name: "Kiosk 06 — Pediatrics Hall",
    location: "Ground Floor Block A",
    department: "Pediatrics",
    ipAddress: "192.168.1.106",
    status: "Online",
    patientsServed: 42,
    uptime: "99.2%",
    lastActive: "4 min ago",
    firmware: "v3.2.1-Prod",
    audioEnabled: true,
    cameraEnabled: true
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "LOG-1001",
    time: "10:33 AM",
    date: "Today",
    user: "Dr. A. Mehta",
    role: "Doctor",
    action: "Confirmed clinical summary & authorized draft",
    reference: "Rajesh Patel (P001)",
    status: "Success",
    ip: "192.168.1.202"
  },
  {
    id: "LOG-1002",
    time: "10:32 AM",
    date: "Today",
    user: "Dr. A. Mehta",
    role: "Doctor",
    action: "Reconciled Atorvastatin medication discrepancy",
    reference: "Rajesh Patel (P001)",
    status: "Success",
    ip: "192.168.1.202"
  },
  {
    id: "LOG-1003",
    time: "10:31 AM",
    date: "Today",
    user: "Dr. A. Mehta",
    role: "Doctor",
    action: "Viewed patient clinical history & timeline",
    reference: "Rajesh Patel (P001)",
    status: "Success",
    ip: "192.168.1.202"
  },
  {
    id: "LOG-1004",
    time: "10:20 AM",
    date: "Today",
    user: "System AI Monitor",
    role: "AI Engine",
    action: "Generated red-flag triage alert: Chest discomfort",
    reference: "Rajesh Patel (P001)",
    status: "Flagged",
    ip: "127.0.0.1"
  },
  {
    id: "LOG-1005",
    time: "10:15 AM",
    date: "Today",
    user: "Rajesh Patel",
    role: "Patient",
    action: "Completed Gujarati voice-guided clinical intake",
    reference: "Kiosk MK-01",
    status: "Success",
    ip: "192.168.1.101"
  },
  {
    id: "LOG-1006",
    time: "10:05 AM",
    date: "Today",
    user: "Rajesh Patel",
    role: "Patient",
    action: "Uploaded prior prescription with OCR extraction",
    reference: "DOC-01",
    status: "Success",
    ip: "192.168.1.101"
  },
  {
    id: "LOG-1007",
    time: "09:50 AM",
    date: "Today",
    user: "Admin Sharma",
    role: "Admin",
    action: "Placed Kiosk MK-05 into Maintenance Mode",
    reference: "Kiosk MK-05",
    status: "Config",
    ip: "192.168.1.10"
  },
  {
    id: "LOG-1008",
    time: "09:30 AM",
    date: "Today",
    user: "Admin Sharma",
    role: "Admin",
    action: "Triggered ABDM Gateway FHIR R4 synchronization",
    reference: "State Health Gateway",
    status: "Success",
    ip: "192.168.1.10"
  }
];

export const INITIAL_BOTTLENECKS = {
  registrationTime: {
    beforeMin: 12,
    afterMin: 2.2,
    unit: "mins",
    reductionPct: 81.6,
    label: "OPD Patient Registration"
  },
  historyCollectionTime: {
    beforeMin: 15,
    afterMin: 3.5,
    unit: "mins",
    reductionPct: 76.7,
    label: "Comprehensive Case History Taking"
  },
  documentReviewTime: {
    beforeMin: 8,
    afterMin: 1.2,
    unit: "mins",
    reductionPct: 85.0,
    label: "Past Records / OCR Digitization"
  },
  consultationPrepTime: {
    beforeMin: 7,
    afterMin: 1.5,
    unit: "mins",
    reductionPct: 78.5,
    label: "Doctor Consultation Prep Window"
  },
  totalTimeSavedPerPatient: {
    value: 23.6,
    unit: "minutes saved",
    capacityBoost: "+45% Daily OPD Capacity"
  }
};

export const INITIAL_INTEGRATIONS = [
  {
    id: "INT-HIS",
    name: "Hospital Information System (HIS)",
    standard: "HL7 v2.5 / REST API",
    status: "Connected",
    latency: "24 ms",
    lastSync: "2 min ago",
    activeRecords: 4820,
    description: "Bed management, OPD counter tokens, and central billing sync."
  },
  {
    id: "INT-EMR",
    name: "Electronic Medical Records (EMR)",
    standard: "OpenMRS / Fast Health Data",
    status: "Connected",
    latency: "38 ms",
    lastSync: "Just now",
    activeRecords: 12450,
    description: "Doctor consultation records, discharge summaries, and historical diagnoses."
  },
  {
    id: "INT-FHIR",
    name: "FHIR R4 Interoperability Engine",
    standard: "HL7 FHIR Release 4",
    status: "Connected",
    latency: "16 ms",
    lastSync: "1 min ago",
    activeRecords: 3890,
    description: "Standardized bundles for Condition, MedicationStatement, and Encounter."
  },
  {
    id: "INT-ABDM",
    name: "Ayushman Bharat Digital Mission (ABDM)",
    standard: "ABHA v2 Gateway / M1, M2, M3",
    status: "Live & Validated",
    latency: "62 ms",
    lastSync: "5 min ago",
    activeRecords: 8910,
    description: "ABHA creation, verification, link tokens, and national health record exchange."
  }
];

export const INITIAL_ADMIN_SETTINGS = {
  hospitalName: "Civil Hospital & Medical College",
  hospitalCode: "CHMC-GUJ-01",
  district: "Ahmedabad",
  state: "Gujarat",
  aiConfidenceThreshold: 85,
  autoTriageThreshold: "Critical",
  kioskInactivityTimeoutSec: 120,
  dpdpConsentVersion: "v2.1-DPDP-2023",
  abdmBridgeActive: true,
  smsNotifications: true,
  audioNarrationDefault: true
};

// LocalStorage Helper Utility
export const Storage = {
  get: (key, defaultValue) => {
    try {
      const item = localStorage.getItem(`medikiosk_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(`medikiosk_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to localStorage`, e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(`medikiosk_${key}`);
    } catch (e) {}
  },
  clearAuth: () => {
    try {
      localStorage.removeItem('medikiosk_userRole');
      localStorage.removeItem('medikiosk_isAuthenticated');
      localStorage.removeItem('medikiosk_activeDoctorId');
      localStorage.removeItem('medikiosk_activePatientId');
      sessionStorage.removeItem('medikiosk_auth');
      sessionStorage.removeItem('medikiosk_role');
    } catch (e) {}
  }
};
