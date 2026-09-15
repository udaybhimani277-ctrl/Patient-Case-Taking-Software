import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PATIENTS,
  INITIAL_DOCTORS,
  INITIAL_DOCUMENTS,
  INITIAL_TIMELINE,
  INITIAL_ALERTS,
  INITIAL_MED_RECONCILIATION,
  INITIAL_DEPARTMENTS,
  INITIAL_KIOSKS,
  INITIAL_AUDIT_LOGS,
  INITIAL_BOTTLENECKS,
  INITIAL_INTEGRATIONS,
  INITIAL_ADMIN_SETTINGS,
  Storage
} from '../data/mockData';
import { SUPPORTED_LANGUAGES } from '../data/patients';
import { TRANSLATIONS } from '../data/translations';

const DemoContext = createContext(null);

export const DemoProvider = ({ children }) => {
  // Persistent Collections from LocalStorage
  const [patients, setPatients] = useState(() => Storage.get('patients', INITIAL_PATIENTS));
  const [doctors, setDoctors] = useState(() => Storage.get('doctors', INITIAL_DOCTORS));
  const [departments, setDepartments] = useState(() => Storage.get('departments', INITIAL_DEPARTMENTS));
  const [kiosks, setKiosks] = useState(() => Storage.get('kiosks', INITIAL_KIOSKS));
  const [documents, setDocuments] = useState(() => Storage.get('documents', INITIAL_DOCUMENTS));
  const [timelineEvents, setTimelineEvents] = useState(() => Storage.get('timeline', INITIAL_TIMELINE));
  const [alerts, setAlerts] = useState(() => Storage.get('alerts', INITIAL_ALERTS));
  const [medications, setMedications] = useState(() => Storage.get('medications', INITIAL_MED_RECONCILIATION));
  const [auditLogs, setAuditLogs] = useState(() => Storage.get('auditLogs', INITIAL_AUDIT_LOGS));
  const [bottlenecks, setBottlenecks] = useState(() => Storage.get('bottlenecks', INITIAL_BOTTLENECKS));
  const [integrations, setIntegrations] = useState(() => Storage.get('integrations', INITIAL_INTEGRATIONS));
  const [adminSettings, setAdminSettings] = useState(() => Storage.get('adminSettings', INITIAL_ADMIN_SETTINGS));

  const [activePatientId, setActivePatientId] = useState(() => Storage.get('activePatientId', "P001"));
  const [activeDoctorId, setActiveDoctorId] = useState(() => Storage.get('activeDoctorId', "DOC-MEHTA"));

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('medikiosk_isAuthenticated') === 'true' ||
        sessionStorage.getItem('medikiosk_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [userRole, setUserRole] = useState(() => {
    try {
      return localStorage.getItem('medikiosk_userRole') ||
        sessionStorage.getItem('medikiosk_role') || null;
    } catch {
      return null;
    }
  });

  // Patient Intake Workflow Progress
  const [historyCompleteness, setHistoryCompleteness] = useState(() => Storage.get('completeness', 82));
  const [patientSubmissionStatus, setPatientSubmissionStatus] = useState(() => Storage.get('submissionStatus', 'not_submitted'));
  const [tokenNumber, setTokenNumber] = useState(() => Storage.get('token', 'A103'));
  const [selectedLanguage, setSelectedLanguage] = useState(() => Storage.get('language', 'gu'));
  const [activeStep, setActiveStep] = useState(1);

  // Accessibility State
  const [textSize, setTextSize] = useState(() => Storage.get('textSize', 'normal')); // 'normal' | 'large' | 'xlarge'
  const [highContrast, setHighContrast] = useState(() => Storage.get('highContrast', false));
  const [audioNarration, setAudioNarration] = useState(() => Storage.get('audioNarration', true));

  // Modals & UI States
  const [ayushMode, setAyushMode] = useState(false);
  const [triageModalOpen, setTriageModalOpen] = useState(false);
  const [abdmModalOpen, setAbdmModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState("");
  const [consultationRecord, setConsultationRecord] = useState(() => Storage.get('consultation', null));

  // Sync to LocalStorage on updates
  useEffect(() => { Storage.set('patients', patients); }, [patients]);
  useEffect(() => { Storage.set('doctors', doctors); }, [doctors]);
  useEffect(() => { Storage.set('departments', departments); }, [departments]);
  useEffect(() => { Storage.set('kiosks', kiosks); }, [kiosks]);
  useEffect(() => { Storage.set('documents', documents); }, [documents]);
  useEffect(() => { Storage.set('timeline', timelineEvents); }, [timelineEvents]);
  useEffect(() => { Storage.set('alerts', alerts); }, [alerts]);
  useEffect(() => { Storage.set('medications', medications); }, [medications]);
  useEffect(() => { Storage.set('auditLogs', auditLogs); }, [auditLogs]);
  useEffect(() => { Storage.set('adminSettings', adminSettings); }, [adminSettings]);
  useEffect(() => { Storage.set('completeness', historyCompleteness); }, [historyCompleteness]);
  useEffect(() => { Storage.set('submissionStatus', patientSubmissionStatus); }, [patientSubmissionStatus]);
  useEffect(() => { Storage.set('token', tokenNumber); }, [tokenNumber]);
  useEffect(() => { Storage.set('language', selectedLanguage); }, [selectedLanguage]);
  useEffect(() => { Storage.set('activePatientId', activePatientId); }, [activePatientId]);
  useEffect(() => { Storage.set('activeDoctorId', activeDoctorId); }, [activeDoctorId]);
  useEffect(() => { Storage.set('textSize', textSize); }, [textSize]);
  useEffect(() => { Storage.set('highContrast', highContrast); }, [highContrast]);
  useEffect(() => { Storage.set('audioNarration', audioNarration); }, [audioNarration]);

  // Consent settings
  const [consentSettings, setConsentSettings] = useState(() => Storage.get('consent', {
    dataCollection: true,
    voiceRecording: true,
    medicalDocuments: true,
    clinicalHistory: true,
    recordSharing: true,
    grantedAt: "2026-09-11 15:45",
    version: "v2.1-DPDP"
  }));

  // Toast notifications
  const [toasts, setToasts] = useState([
    {
      id: "init-toast",
      title: "MediKiosk Active",
      message: "Ready for Patient Intake, Doctor Consultation, and Admin Command.",
      type: "info"
    }
  ]);

  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];
  const activeDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];
  const adminUser = {
    name: "Admin S. Sharma",
    role: "Hospital Administrator",
    hospital: adminSettings.hospitalName,
    email: "admin@civilhospital.gov.in"
  };

  const addToast = ({ title, message, type = "info", duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addAuditLog = (action, reference = "System", user = null, role = null) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: "Today",
      user: user || (userRole === 'doctor' ? activeDoctor.name : userRole === 'admin' ? adminUser.name : activePatient.name),
      role: role || (userRole === 'doctor' ? "Doctor" : userRole === 'admin' ? "Admin" : "Patient"),
      action,
      reference,
      status: "Success",
      ip: "192.168.1.50"
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateActivePatient = (updates) => {
    setPatients(prev => prev.map(p => {
      if (p.id === activePatientId) {
        return { ...p, ...updates };
      }
      return p;
    }));
  };

  const switchPatient = (id) => {
    setActivePatientId(id);
    const p = patients.find(x => x.id === id);
    if (p) {
      addToast({
        title: "Active Patient Switched",
        message: `Now viewing ${p.name} (${p.token || p.id}) – ${p.priority} Priority.`,
        type: "info"
      });
      addAuditLog(`Switched active patient to ${p.name} (${p.id})`);
    }
  };

  // Auth Handlers
  const loginDoctor = (doctorId = "DOC-MEHTA") => {
    setActiveDoctorId(doctorId);
    setUserRole("doctor");
    setIsAuthenticated(true);
    try {
      localStorage.setItem('medikiosk_isAuthenticated', 'true');
      localStorage.setItem('medikiosk_userRole', 'doctor');
      sessionStorage.setItem('medikiosk_auth', 'true');
      sessionStorage.setItem('medikiosk_role', 'doctor');
    } catch { }
    const doc = doctors.find(d => d.id === doctorId) || doctors[0];
    addToast({
      title: `Welcome, ${doc.name}`,
      message: `Signed in to Doctor Portal (${doc.room} • ${doc.department}).`,
      type: "success"
    });
    addAuditLog("Doctor portal sign-in", doc.department, doc.name, "Doctor");
  };

  const loginPatient = (patientId = "P001") => {
    setActivePatientId(patientId);
    setUserRole("patient");
    setIsAuthenticated(true);
    try {
      localStorage.setItem('medikiosk_isAuthenticated', 'true');
      localStorage.setItem('medikiosk_userRole', 'patient');
      sessionStorage.setItem('medikiosk_auth', 'true');
      sessionStorage.setItem('medikiosk_role', 'patient');
    } catch { }
    const pat = patients.find(p => p.id === patientId) || patients[0];
    addToast({
      title: `Welcome, ${pat.name}`,
      message: `Kiosk session started. Token: ${pat.token || 'A103'}.`,
      type: "success"
    });
    addAuditLog("Kiosk patient check-in", `Token ${pat.token || pat.id}`, pat.name, "Patient");
  };

  const loginAdmin = () => {
    setUserRole("admin");
    setIsAuthenticated(true);
    try {
      localStorage.setItem('medikiosk_isAuthenticated', 'true');
      localStorage.setItem('medikiosk_userRole', 'admin');
      sessionStorage.setItem('medikiosk_auth', 'true');
      sessionStorage.setItem('medikiosk_role', 'admin');
    } catch { }
    addToast({
      title: "Admin Command Authorized",
      message: "Logged into Civil Hospital Central Fleet & Department Console.",
      type: "success"
    });
    addAuditLog("Admin console authorization", "Central Console", "Admin Sharma", "Admin");
  };

  const registerUser = (role, data) => {
    if (role === 'patient') {
      const newId = `P00${patients.length + 1}`;
      const newPat = {
        id: newId,
        token: `A10${patients.length + 1}`,
        name: data.name,
        age: parseInt(data.age) || 35,
        gender: data.gender || "Other",
        mobile: data.mobile || "+91 98000 00000",
        abhaId: data.abhaId || "14-5566-7788-9900",
        department: "General Medicine",
        language: data.preferredLanguage || "English",
        patientType: "New Patient",
        queueNumber: `A10${patients.length + 1}`,
        priority: "Normal",
        status: "Registered",
        submissionStatus: "not_submitted",
        submittedAt: "Just now",
        completeness: 20,
        verifiedSectionsCount: 0,
        totalSectionsCount: 10,
        chiefComplaint: "",
        duration: "",
        symptoms: [],
        vitals: {
          bloodPressure: "120/80 mmHg",
          heartRate: "72 bpm",
          spO2: "99%",
          temperature: "98.6 °F",
          respiratoryRate: "16 /min"
        },
        redFlagDetected: false,
        history: {},
        documentsCount: 0,
        timelineEventsCount: 0
      };
      setPatients(prev => [newPat, ...prev]);
      loginPatient(newId);
      addToast({
        title: "Registration Complete",
        message: `Account created for ${newPat.name}. Token: ${newPat.token}`,
        type: "success"
      });
      return newPat;
    } else if (role === 'doctor') {
      const newDocId = `DOC-${(data.name.split(' ').pop() || 'DR').toUpperCase()}`;
      const newDoc = {
        id: newDocId,
        name: data.name.startsWith('Dr.') ? data.name : `Dr. ${data.name}`,
        qualification: "MBBS, MD",
        designation: "Consultant Physician",
        department: data.department || "General Medicine",
        specialization: data.specialization || "Clinical Care",
        councilReg: data.councilReg || "GMC-99441",
        room: data.room || "OPD Room 03",
        hospital: data.hospital || "Civil Hospital & Medical College",
        email: data.email || "doctor@civilhospital.gov.in",
        phone: data.mobile || "+91 98251 00000",
        avatar: data.name.charAt(0)
      };
      setDoctors(prev => [newDoc, ...prev]);
      loginDoctor(newDocId);
      addToast({
        title: "Doctor Roster Enrolled",
        message: `Profile active for ${newDoc.name} in ${newDoc.department}.`,
        type: "success"
      });
      return newDoc;
    } else {
      loginAdmin();
      return adminUser;
    }
  };

  const resetPassword = (identifier) => {
    addToast({
      title: "Password Updated",
      message: `Password has been reset for ${identifier}. You can now login.`,
      type: "success"
    });
    addAuditLog(`Password reset verified for ${identifier}`);
    return true;
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    Storage.clearAuth();
    try {
      localStorage.removeItem('medikiosk_isAuthenticated');
      localStorage.removeItem('medikiosk_userRole');
      localStorage.removeItem('medikiosk_activePatientId');
      localStorage.removeItem('medikiosk_activeDoctorId');
      sessionStorage.removeItem('medikiosk_auth');
      sessionStorage.removeItem('medikiosk_role');
    } catch { }
    if (typeof window !== 'undefined') {
      window.location.hash = '#/';
    }
    addToast({
      title: "Logged Out",
      message: "You have been safely signed out.",
      type: "info"
    });
  };

  // Workflow Actions
  const submitToDoctor = () => {
    setPatientSubmissionStatus('submitted');
    setHistoryCompleteness(94);

    setPatients(prev => prev.map(p => {
      if (p.id === activePatientId) {
        return {
          ...p,
          token: "A103",
          queueNumber: "A103",
          status: "Ready for Review",
          submissionStatus: "submitted",
          submittedAt: "Just now",
          completeness: 94
        };
      }
      return p;
    }));

    addToast({
      title: "Intake Submitted Successfully",
      message: "Token A103 generated and dispatched to Doctor OPD Queue.",
      type: "success"
    });
    addAuditLog(`Patient submitted clinical intake for physician review`, `Token A103`);
  };

  const verifySection = (sectionKey, newStatus = "Verified") => {
    setPatients(prev => prev.map(p => {
      if (p.id === activePatientId && p.history && p.history[sectionKey]) {
        const updatedHistory = {
          ...p.history,
          [sectionKey]: {
            ...p.history[sectionKey],
            status: newStatus
          }
        };
        const verifiedCount = Object.values(updatedHistory).filter(s => s.status === 'Verified').length;
        return {
          ...p,
          history: updatedHistory,
          verifiedSectionsCount: verifiedCount
        };
      }
      return p;
    }));

    addToast({
      title: `Section ${newStatus}`,
      message: `Updated verification status for ${sectionKey}.`,
      type: newStatus === 'Verified' ? "success" : "info"
    });
    addAuditLog(`Doctor marked section ${sectionKey} as ${newStatus}`, activePatient.name);
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, status: 'Resolved' };
      }
      return a;
    }));

    addToast({
      title: "Alert Resolved",
      message: "Priority clinical flag marked as resolved.",
      type: "success"
    });
    addAuditLog(`Resolved priority triage alert ${alertId}`, activePatient.name);
  };

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, status: 'Under Review' };
      }
      return a;
    }));
    addToast({
      title: "Alert Acknowledged",
      message: "Triage case flagged as Under Review by clinical team.",
      type: "info"
    });
    addAuditLog(`Acknowledged clinical alert ${alertId}`);
  };

  const assignAlert = (alertId, staffName = "Staff Nurse S. Patel") => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, assignedTo: staffName, status: 'Under Review' };
      }
      return a;
    }));
    addToast({
      title: "Alert Assigned",
      message: `Dispatched to ${staffName} for immediate bedside triage.`,
      type: "success"
    });
    addAuditLog(`Assigned alert ${alertId} to ${staffName}`);
  };

  const reconcileMedication = (medId) => {
    setMedications(prev => prev.map(m => {
      if (m.id === medId) {
        return { ...m, hasDiscrepancy: false, status: 'Consistent' };
      }
      return m;
    }));

    addToast({
      title: "Medication Reconciled",
      message: "Discrepancy resolved in clinical record.",
      type: "success"
    });
    addAuditLog(`Reconciled medication discrepancy for ${medId}`, activePatient.name);
  };

  const completeConsultation = (consultData = {}) => {
    const record = {
      patientId: activePatient.id,
      patientName: activePatient.name,
      doctorName: activeDoctor.name,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: consultData.notes || "Comprehensive evaluation completed. Prescriptions renewed.",
      assessment: consultData.assessment || "Mild exertional angina. Continue secondary prevention.",
      plan: consultData.plan || "Follow up in 4 weeks with serial lipid profile and exercise tolerance testing."
    };
    setConsultationRecord(record);
    Storage.set('consultation', record);

    setPatients(prev => prev.map(p => {
      if (p.id === activePatientId) {
        return { ...p, status: "Consultation Completed", submissionStatus: "completed" };
      }
      return p;
    }));

    addToast({
      title: "Consultation Completed",
      message: `Physician consultation finalized for ${activePatient.name}.`,
      type: "success"
    });
    addAuditLog(`Completed doctor consultation & generated final prescription`, activePatient.name);
  };

  // Kiosk & Fleet Management Handlers
  const toggleKioskStatus = (kioskId) => {
    setKiosks(prev => prev.map(k => {
      if (k.id === kioskId) {
        const nextStatus = k.status === 'Online' ? 'Maintenance' : 'Online';
        addToast({
          title: "Kiosk Mode Toggled",
          message: `${k.name} is now ${nextStatus}.`,
          type: "info"
        });
        addAuditLog(`Updated Kiosk ${k.id} state to ${nextStatus}`, k.name);
        return { ...k, status: nextStatus };
      }
      return k;
    }));
  };

  const rebootKiosk = (kioskId) => {
    addToast({
      title: "Remote Reboot Initiated",
      message: `Sent software reset command to ${kioskId}. Uptime timer cleared.`,
      type: "success"
    });
    addAuditLog(`Initiated remote soft restart for Kiosk ${kioskId}`);
  };

  const toggleDoctorStatus = (doctorId) => {
    setDoctors(prev => prev.map(d => {
      if (d.id === doctorId) {
        const nextStatus = d.status === 'Inactive' ? 'Active' : 'Inactive';
        addToast({
          title: "Doctor Status Changed",
          message: `${d.name} marked as ${nextStatus}.`,
          type: "info"
        });
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const addDoctor = (docData) => {
    const newDoc = {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      name: docData.name.startsWith('Dr.') ? docData.name : `Dr. ${docData.name}`,
      qualification: docData.qualification || "MD, MBBS",
      designation: docData.designation || "OPD Consultant",
      department: docData.department || "General Medicine",
      specialization: docData.specialization || "Clinical Practice",
      councilReg: docData.councilReg || "GMC-77881",
      room: docData.room || "OPD Room 07",
      hospital: adminSettings.hospitalName,
      email: docData.email || "doctor@civilhospital.gov.in",
      phone: docData.phone || "+91 98251 00000",
      avatar: docData.name.charAt(0),
      status: "Active"
    };
    setDoctors(prev => [...prev, newDoc]);
    addToast({
      title: "Doctor Added",
      message: `${newDoc.name} registered into ${newDoc.department}.`,
      type: "success"
    });
    addAuditLog(`Added new doctor ${newDoc.name}`, newDoc.department);
  };

  const addDepartment = (deptData) => {
    const newDept = {
      id: `DEP-${Date.now().toString().slice(-4)}`,
      name: deptData.name,
      code: deptData.code || deptData.name.slice(0, 4).toUpperCase(),
      headDoctor: deptData.headDoctor || "TBD",
      room: deptData.room || "OPD Room",
      floor: deptData.floor || "1st Floor",
      activeDoctors: 2,
      waitingPatients: 0,
      completedToday: 0,
      activeKiosks: 1,
      status: "Active",
      description: deptData.description || "Outpatient clinic."
    };
    setDepartments(prev => [...prev, newDept]);
    addToast({
      title: "Department Created",
      message: `${newDept.name} added to OPD roster.`,
      type: "success"
    });
    addAuditLog(`Created department ${newDept.name}`);
  };

  const triggerIntegrationSync = (intId) => {
    setIntegrations(prev => prev.map(i => {
      if (i.id === intId) {
        return { ...i, lastSync: "Just now", status: "Live & Validated" };
      }
      return i;
    }));
    addToast({
      title: "FHIR / ABDM Synchronized",
      message: `Health data pipeline refreshed for ${intId}.`,
      type: "success"
    });
    addAuditLog(`Manual sync triggered for integration ${intId}`);
  };

  const updateDocumentVerification = (docId, status, notes = "") => {
    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        return { ...d, status, verificationNotes: notes };
      }
      return d;
    }));
    addToast({
      title: "Document Verified",
      message: `Document ${docId} marked as ${status}.`,
      type: "success"
    });
    addAuditLog(`Document ${docId} marked as ${status}`, activePatient.name);
  };

  const uploadDocument = (docData) => {
    const newDoc = {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      patientId: activePatientId,
      title: docData.title || "Uploaded Medical Record",
      category: docData.category || "Prescription",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      facility: docData.facility || adminSettings.hospitalName,
      confidence: "94%",
      status: "Verified",
      snippet: docData.snippet || "Digitized clinical text extracted via OCR.",
      extractedInfo: docData.extractedInfo || [
        { key: "Extraction", value: "Verified by patient intake", confidence: "94%" }
      ]
    };
    setDocuments(prev => [newDoc, ...prev]);
    addToast({
      title: "Document Uploaded & OCR Processed",
      message: `${newDoc.title} extracted with 94% confidence.`,
      type: "success"
    });
    addAuditLog(`Uploaded medical document ${newDoc.title}`, activePatient.name);
    return newDoc;
  };

  // Language switcher & translation engine
  const changeLanguage = (newLang) => {
    setSelectedLanguage(newLang);
    Storage.set('language', newLang);
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === newLang);
    addToast({
      title: newLang === 'gu' ? "ભાષા બદલાઈ ગઈ" : newLang === 'hi' ? "भाषा बदली गई" : newLang === 'pa' ? "ਭਾਸ਼ਾ ਬਦਲੀ ਗਈ" : "Language Changed",
      message: `Interface set to ${langObj?.name || newLang}.`,
      type: "info"
    });
  };

  const t = (path, fallback = "") => {
    if (!path) return fallback;
    const lang = selectedLanguage || 'gu';
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'] || {};

    const parts = path.split('.');
    let current = dict;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }

    if (current !== undefined && typeof current === 'string') {
      return current;
    }

    if (lang !== 'en' && TRANSLATIONS['en']) {
      let enCurrent = TRANSLATIONS['en'];
      for (const part of parts) {
        if (enCurrent && typeof enCurrent === 'object' && part in enCurrent) {
          enCurrent = enCurrent[part];
        } else {
          enCurrent = undefined;
          break;
        }
      }
      if (enCurrent !== undefined && typeof enCurrent === 'string') {
        return enCurrent;
      }
    }

    return fallback || path;
  };

  // Audio instruction simulator
  const playAudio = (customText = null) => {
    if (!audioNarration) return;
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
    const textToSpeak = customText || langObj.audioText;
    setIsAudioPlaying(true);
    setAudioTranscript(textToSpeak);

    addToast({
      title: `Voice Guidance (${langObj.name})`,
      message: `"${textToSpeak}"`,
      type: "info",
      duration: 3500
    });

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.92;
        if (selectedLanguage === 'gu') utterance.lang = 'gu-IN';
        else if (selectedLanguage === 'hi') utterance.lang = 'hi-IN';
        else if (selectedLanguage === 'pa') utterance.lang = 'pa-IN';
        else utterance.lang = 'en-IN';
        utterance.onend = () => setIsAudioPlaying(false);
        utterance.onerror = () => setIsAudioPlaying(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        setTimeout(() => setIsAudioPlaying(false), 3000);
      }
    } else {
      setTimeout(() => setIsAudioPlaying(false), 3000);
    }
  };

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAudioPlaying(false);
  };

  const notifyTriage = (patient = activePatient) => {
    setTriageModalOpen(true);
    const newAlert = {
      id: `ALT-RED-${Date.now().toString().slice(-4)}`,
      patientId: patient.id,
      token: patient.token || "A103",
      patientName: patient.name,
      type: "Potential Red Flag",
      severity: "High",
      title: "Acute Triage Escalation Dispatched",
      description: "Severe clinical symptoms flagged at kiosk. Urgent bedside assessment requested.",
      date: "Just now",
      status: "New"
    };
    setAlerts(prev => [newAlert, ...prev]);
    addToast({
      title: "🚨 Emergency Triage Escalation Dispatched",
      message: `Priority alert dispatched to Nurse Station for ${patient.name} (${patient.token || 'A103'}).`,
      type: "error",
      duration: 6000
    });
    addAuditLog(`Emergency Triage Alert dispatched to nurse station`, patient.name);
  };

  return (
    <DemoContext.Provider
      value={{
        patients,
        setPatients,
        doctors,
        setDoctors,
        departments,
        setDepartments,
        kiosks,
        setKiosks,
        documents,
        setDocuments,
        timelineEvents,
        setTimelineEvents,
        alerts,
        setAlerts,
        medications,
        setMedications,
        auditLogs,
        bottlenecks,
        integrations,
        adminSettings,
        setAdminSettings,
        adminUser,
        activePatientId,
        setActivePatientId,
        activePatient,
        activeDoctorId,
        setActiveDoctorId,
        activeDoctor,
        userRole,
        setUserRole,
        isAuthenticated,
        setIsAuthenticated,
        historyCompleteness,
        setHistoryCompleteness,
        patientSubmissionStatus,
        setPatientSubmissionStatus,
        tokenNumber,
        setTokenNumber,
        selectedLanguage,
        setSelectedLanguage,
        changeLanguage,
        t,
        TRANSLATIONS,
        activeStep,
        setActiveStep,
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        audioNarration,
        setAudioNarration,
        ayushMode,
        setAyushMode,
        triageModalOpen,
        setTriageModalOpen,
        abdmModalOpen,
        setAbdmModalOpen,
        consultationRecord,
        setConsultationRecord,
        consentSettings,
        setConsentSettings,
        toasts,
        addToast,
        removeToast,
        addAuditLog,
        playAudio,
        stopAudio,
        isAudioPlaying,
        audioTranscript,
        notifyTriage,
        loginDoctor,
        loginPatient,
        loginAdmin,
        registerUser,
        resetPassword,
        logout,
        updateActivePatient,
        switchPatient,
        submitToDoctor,
        verifySection,
        resolveAlert,
        acknowledgeAlert,
        assignAlert,
        reconcileMedication,
        completeConsultation,
        toggleKioskStatus,
        rebootKiosk,
        toggleDoctorStatus,
        addDoctor,
        addDepartment,
        triggerIntegrationSync,
        updateDocumentVerification,
        uploadDocument
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
