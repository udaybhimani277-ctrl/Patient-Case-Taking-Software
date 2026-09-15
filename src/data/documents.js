// Medical Documents & OCR Extraction Demo Data
export const MOCK_DOCUMENTS = [
  {
    id: "DOC-SAMPLE-1",
    title: "OPD Prescription - Dr. S. Trivedi, MD (Cardiology)",
    category: "Prescription",
    date: "2025-12-05",
    facility: "Civil Hospital & Heart Institute",
    confidence: "98.2%",
    status: "Completed",
    rawSnippet: "Rx: Tab. Atorvastatin 10mg HS, Tab. Amlodipine 5mg OD M/F. Review after 3 months with Lipid profile.",
    extractedData: {
      diagnosis: "Essential Hypertension & Mixed Dyslipidemia",
      physician: "Dr. S. Trivedi (MD, DM Cardiology)",
      regNumber: "GMC-34190",
      medications: [
        {
          name: "Atorvastatin",
          dosage: "10 mg",
          frequency: "Once daily at bedtime (HS)",
          duration: "90 Days",
          instructions: "Take with water after dinner. Monitor liver enzymes if muscle cramps occur."
        },
        {
          name: "Amlodipine Besylate",
          dosage: "5 mg",
          frequency: "Once daily in morning (OD)",
          duration: "90 Days",
          instructions: "Check BP weekly. Maintain low sodium diet."
        },
        {
          name: "Paracetamol",
          dosage: "500 mg",
          frequency: "Twice daily SOS (PRN)",
          duration: "5 Days",
          instructions: "For headache or body ache."
        }
      ]
    }
  },
  {
    id: "DOC-SAMPLE-2",
    title: "Comprehensive Metabolic & Hematology Panel",
    category: "Lab Report",
    date: "2026-09-08",
    facility: "Metro Clinical Reference Laboratory",
    confidence: "99.0%",
    status: "Completed",
    rawSnippet: "Patient: Rajesh Patel. Specimen: Serum & Whole Blood EDTA. Hemoglobin 10.2 g/dL (L), Glucose Fasting 110 mg/dL, Total Cholesterol 218 mg/dL (H).",
    extractedData: {
      diagnosis: "Mild Microcytic Anemia & Borderline Hypercholesterolemia",
      physician: "Dr. V. K. Nair, Pathologist",
      regNumber: "MCL-9921",
      investigations: [
        {
          test: "Hemoglobin (Hb)",
          result: "10.2",
          unit: "g/dL",
          referenceRange: "13.0 – 17.0",
          status: "Abnormal",
          flag: "Low",
          attentionRequired: true,
          clinicalNote: "Suggests mild anemia; peripheral smear & serum ferritin recommended."
        },
        {
          test: "Fasting Blood Glucose",
          result: "110",
          unit: "mg/dL",
          referenceRange: "70 – 100",
          status: "Abnormal",
          flag: "High",
          attentionRequired: true,
          clinicalNote: "Impaired fasting glycaemia (pre-diabetes range). HbA1c correlation advised."
        },
        {
          test: "Total Serum Cholesterol",
          result: "218",
          unit: "mg/dL",
          referenceRange: "< 200",
          status: "Abnormal",
          flag: "High",
          attentionRequired: true,
          clinicalNote: "Elevated atherogenic risk profile in hypertensive patient."
        },
        {
          test: "Platelet Count",
          result: "195,000",
          unit: "/µL",
          referenceRange: "150,000 – 450,000",
          status: "Normal",
          flag: "Normal",
          attentionRequired: false,
          clinicalNote: "Adequate thrombocyte reserve."
        },
        {
          test: "Serum Creatinine",
          result: "0.92",
          unit: "mg/dL",
          referenceRange: "0.70 – 1.30",
          status: "Normal",
          flag: "Normal",
          attentionRequired: false,
          clinicalNote: "Preserved renal filtration function."
        },
        {
          test: "Thyroid Stimulating Hormone (TSH)",
          result: "2.45",
          unit: "µIU/mL",
          referenceRange: "0.45 – 4.50",
          status: "Normal",
          flag: "Normal",
          attentionRequired: false,
          clinicalNote: "Euthyroid pituitary-thyroid axis."
        }
      ]
    }
  },
  {
    id: "DOC-SAMPLE-3",
    title: "12-Lead Electrocardiogram (ECG) Analysis",
    category: "Imaging Report",
    date: "2025-04-12",
    facility: "Apex Heart & Trauma Center",
    confidence: "95.6%",
    status: "Completed",
    rawSnippet: "Sinus rhythm @ 76 bpm. Normal axis. Non-specific ST-T wave flattening in leads V4-V6. No acute pathological Q waves.",
    extractedData: {
      diagnosis: "Borderline Lateral ST-T Wave Changes",
      physician: "Dr. R. Sengupta, DM",
      regNumber: "AHT-1029",
      findings: [
        "Ventricular Rate: 76 bpm",
        "PR Interval: 154 ms (Normal)",
        "QRS Duration: 88 ms (Normal)",
        "QT/QTc: 390/412 ms",
        "Conclusion: Borderline ST depression in lateral leads. Correlate with clinical presentation."
      ]
    }
  }
];

export const OCR_STAGES = [
  { id: 1, label: "Uploading", description: "Securing image data into memory cache", durationMs: 700 },
  { id: 2, label: "OCR Processing", description: "Binarizing text layers & neural text detection", durationMs: 900 },
  { id: 3, label: "Extracting Medical Data", description: "Parsing clinical entities, dosages & lab values", durationMs: 900 },
  { id: 4, label: "Structuring Information", description: "Mapping into FHIR DiagnosticReport / MedicationRequest", durationMs: 700 },
  { id: 5, label: "Completed", description: "Clinical verification ready", durationMs: 300 }
];
