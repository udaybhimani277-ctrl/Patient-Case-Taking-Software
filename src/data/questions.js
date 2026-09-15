// SOCRATES-style Clinical Questioning Engine Mock
export const COMPLAINT_CATEGORIES = [
  { id: "chest_pain", label: "Chest Pain / Discomfort", icon: "Activity", color: "rose", redFlagRisk: true },
  { id: "fever", label: "Fever & Chills", icon: "Thermometer", color: "amber", redFlagRisk: false },
  { id: "cough", label: "Cough & Breathlessness", icon: "Wind", color: "cyan", redFlagRisk: false },
  { id: "headache", label: "Headache / Migraine", icon: "Zap", color: "purple", redFlagRisk: false },
  { id: "abdominal_pain", label: "Abdominal Pain", icon: "ShieldAlert", color: "emerald", redFlagRisk: false },
  { id: "other", label: "Other Symptoms", icon: "HelpCircle", color: "slate", redFlagRisk: false }
];

export const ADAPTIVE_FLOWS = {
  chest_pain: {
    initialAiMessage: "I understand you are experiencing chest discomfort. I will ask a few important questions to understand your symptoms clearly for the doctor.",
    questions: [
      {
        id: "onset",
        category: "Onset (SOCRATES: O)",
        text: "When did this chest discomfort begin, and did it start suddenly or build up gradually?",
        options: ["Less than 2 hours ago (Sudden)", "This morning (~4-6 hours)", "Yesterday", "Ongoing for several days"],
        voicePrompt: "Did the discomfort start suddenly or slowly?",
        isRedFlagTrigger: (ans) => ans.includes("Sudden")
      },
      {
        id: "site_character",
        category: "Site & Character (SOCRATES: S & C)",
        text: "Where exactly is the discomfort located and how does it feel?",
        options: [
          "Center of chest (Heavy pressure/tightness)",
          "Left side (Sharp stabbing pain)",
          "Burning sensation behind breastbone",
          "Dull ache across the whole chest"
        ],
        voicePrompt: "Where is the pain and does it feel heavy, sharp, or burning?",
        isRedFlagTrigger: (ans) => ans.includes("Heavy pressure")
      },
      {
        id: "radiation",
        category: "Radiation (SOCRATES: R)",
        text: "Does the discomfort spread or radiate to any other part of your body?",
        options: [
          "Yes, spreads to left arm & shoulder",
          "Yes, spreads to jaw and neck",
          "Yes, spreads to upper back",
          "No, stays strictly in the chest"
        ],
        voicePrompt: "Does it travel to your arm, neck, or back?",
        isRedFlagTrigger: (ans) => ans.includes("left arm") || ans.includes("jaw")
      },
      {
        id: "associated",
        category: "Associated Symptoms (SOCRATES: A)",
        text: "Do you have any of the following symptoms accompanying the discomfort?",
        options: [
          "Breathing difficulty & cold sweats",
          "Dizziness or lightheadedness",
          "Nausea or stomach upset",
          "None of these"
        ],
        voicePrompt: "Are you having breathing difficulty or sweating?",
        isRedFlagTrigger: (ans) => ans.includes("Breathing difficulty") || ans.includes("sweats")
      },
      {
        id: "exacerbating",
        category: "Exacerbating & Relieving (SOCRATES: E)",
        text: "What makes the discomfort worse or better?",
        options: [
          "Worse with walking or stairs; rest helps slightly",
          "Worse when taking a deep breath or coughing",
          "Worse when pressing on the chest wall",
          "Nothing seems to change it"
        ],
        voicePrompt: "Does moving, breathing, or resting change the pain?",
        isRedFlagTrigger: (ans) => ans.includes("walking") || ans.includes("stairs")
      },
      {
        id: "severity",
        category: "Severity (SOCRATES: S)",
        text: "On a scale of 1 to 10, how intense is the discomfort right now?",
        options: ["Mild (1–3/10)", "Moderate (4–6/10)", "Severe (7–8/10)", "Extremely Severe (9–10/10)"],
        voicePrompt: "Please rate severity from 1 to 10.",
        isRedFlagTrigger: (ans) => ans.includes("Severe")
      }
    ]
  },
  fever: {
    initialAiMessage: "Let's review your fever symptoms so the physician can determine the appropriate investigations.",
    questions: [
      {
        id: "duration",
        category: "Duration",
        text: "How many days have you had this fever?",
        options: ["1 to 2 days", "3 to 5 days", "1 to 2 weeks", "More than 2 weeks"],
        voicePrompt: "How many days has the fever lasted?",
        isRedFlagTrigger: () => false
      },
      {
        id: "pattern",
        category: "Pattern & Temperature",
        text: "Does the fever come with shivering (chills) or sweating, and what was the highest reading?",
        options: [
          "High fever (>102°F) with intense chills & shivering",
          "Continuous moderate fever throughout the day",
          "Low-grade fever rising only in the evening",
          "Haven't measured temperature"
        ],
        voicePrompt: "Is there shivering or high temperature?",
        isRedFlagTrigger: (ans) => ans.includes(">102°F")
      },
      {
        id: "associated",
        category: "Associated Signs",
        text: "Are you experiencing any other complaints along with the fever?",
        options: [
          "Severe body ache & pain behind the eyes",
          "Cough, sore throat & runny nose",
          "Burning sensation while urinating",
          "Rash on skin or spontaneous bleeding"
        ],
        voicePrompt: "Do you have body ache, eye pain, or rash?",
        isRedFlagTrigger: (ans) => ans.includes("Rash") || ans.includes("bleeding")
      },
      {
        id: "medication",
        category: "Medication Response",
        text: "Have you taken any medicines like Paracetamol, and did it bring the fever down?",
        options: [
          "Yes, Paracetamol brings it down temporarily",
          "Yes, took antibiotics without relief",
          "No medication taken so far"
        ],
        voicePrompt: "Did paracetamol help reduce the fever?",
        isRedFlagTrigger: () => false
      }
    ]
  },
  cough: {
    initialAiMessage: "I will help record the details of your respiratory symptoms for the medical team.",
    questions: [
      {
        id: "duration",
        category: "Duration",
        text: "How long has this cough been troubling you?",
        options: ["Less than 1 week (Acute)", "1 to 3 weeks (Subacute)", "More than 3 weeks (Chronic)"],
        voicePrompt: "How long have you had this cough?",
        isRedFlagTrigger: (ans) => ans.includes("More than 3 weeks")
      },
      {
        id: "type",
        category: "Type & Sputum",
        text: "Is the cough dry, or do you bring up phlegm (sputum)?",
        options: [
          "Dry, tickling cough without phlegm",
          "Cough with clear/white phlegm",
          "Cough with thick yellow or green phlegm",
          "Cough with blood streaks (Hemoptysis)"
        ],
        voicePrompt: "Is it dry or does it have phlegm or blood?",
        isRedFlagTrigger: (ans) => ans.includes("blood streaks")
      },
      {
        id: "associated",
        category: "Associated Factors",
        text: "Do you feel wheezing, shortness of breath, or noticeable chest tightness?",
        options: [
          "Yes, breathlessness even while resting",
          "Yes, breathlessness only on exertion",
          "Wheezing or whistling sound in chest",
          "No breathing difficulty"
        ],
        voicePrompt: "Are you breathless or wheezing?",
        isRedFlagTrigger: (ans) => ans.includes("resting")
      }
    ]
  },
  headache: {
    initialAiMessage: "Let's capture the key characteristics of your headache.",
    questions: [
      {
        id: "onset",
        category: "Onset & Quality",
        text: "How did the headache begin and what does it feel like?",
        options: [
          "Sudden thunderclap pain (Worst headache of life)",
          "Throbbing / pulsating on one side of head",
          "Tight band-like pressure across forehead",
          "Dull constant ache"
        ],
        voicePrompt: "Did it hit suddenly like thunder or is it throbbing?",
        isRedFlagTrigger: (ans) => ans.includes("thunderclap")
      },
      {
        id: "sensitivities",
        category: "Sensory & Vision",
        text: "Are your eyes sensitive to bright light, or do you see zigzag lines/blind spots?",
        options: [
          "Yes, sensitive to light (photophobia) and noise",
          "Yes, had shimmering visual aura before pain started",
          "Stiff neck and high fever with headache",
          "None of these"
        ],
        voicePrompt: "Are you sensitive to light or have a stiff neck?",
        isRedFlagTrigger: (ans) => ans.includes("Stiff neck")
      }
    ]
  },
  abdominal_pain: {
    initialAiMessage: "Let's gather structured information about your abdominal symptoms.",
    questions: [
      {
        id: "location",
        category: "Location",
        text: "Where is the pain located primarily?",
        options: [
          "Upper abdomen (Epigastric / burning)",
          "Right lower abdomen (near hip bone)",
          "Right upper abdomen (under ribs)",
          "Lower abdomen / pelvic region",
          "Generalized across whole belly"
        ],
        voicePrompt: "Where does your stomach hurt?",
        isRedFlagTrigger: (ans) => ans.includes("Right lower")
      },
      {
        id: "associated",
        category: "Associated Digestion",
        text: "Are you experiencing any associated digestive issues?",
        options: [
          "Acid reflux, sour belching & bloating",
          "Nausea and repeated vomiting",
          "Loose stools or diarrhea",
          "Constipation and inability to pass gas"
        ],
        voicePrompt: "Do you have vomiting, reflux, or diarrhea?",
        isRedFlagTrigger: (ans) => ans.includes("inability to pass gas")
      }
    ]
  },
  other: {
    initialAiMessage: "Please describe your primary health concerns so we can guide your clinical intake.",
    questions: [
      {
        id: "general_desc",
        category: "General Assessment",
        text: "What is the primary complaint or issue that brought you to the hospital today?",
        options: [
          "Joint pain or back stiffness",
          "Dizziness, general weakness or fatigue",
          "Skin rash, itching or allergy",
          "Routine follow-up or health checkup"
        ],
        voicePrompt: "Please describe your primary concern.",
        isRedFlagTrigger: () => false
      }
    ]
  }
};
