export const INITIAL_AGENTS = [
  {
    id: 'sbi-kyc-verify',
    title: 'SBI Customer KYC & Document Verification Agent',
    description: 'Inspects and verifies uploaded customer documents (Aadhaar, PAN, Passport, DL) for authenticity, data extraction, and regulatory KYC compliance.',
    status: 'Published',
    lastRun: '12 mins ago',
    humanReviewRequired: true,
    agentType: 'verification',
    department: 'Retail Banking — Compliance & KYC',
    reportType: 'KYC Verification Audit',
    purpose: 'Inspects uploaded identity and address proofs, performs OCR text and photo extraction, validates national ID checksums, checks for digital tampering, and routes audits for compliance approval.',
    responsibility: 'Inspect uploaded identity documents, perform OCR text and photo extraction, validate document number checksums, check for visual tampering or alteration, verify details against KYC guidelines, and flag any discrepancies for human compliance officer approval.',
    instructions: 'Validate document format and cryptographic QR signature. Extract Full Name, Document Number, and DOB. Run fraud detection for digital splicing or font alteration. Present compliance audit report for human reviewer sign-off.',
    instructionNote: 'Pause for human compliance reviewer approval before granting KYC clearance.',
    type: 'Document Verification',
    destination: 'Compliance review',
    supportedDocs: ['Aadhaar Card', 'PAN Card', 'Passport', 'Driving License', 'Voter ID', 'Utility Bill']
  },
  {
    id: 'sbi-home-loan',
    title: 'SBI Home Loan Monthly Report',
    description: 'Prepares monthly home-loan counts and disbursement totals for compliance review. Home loans only; excludes auto and land loans.',
    status: 'Published',
    lastRun: '2 Jun 2025',
    humanReviewRequired: true,
    agentType: 'report',
    department: 'Retail Banking — Home Finance',
    reportType: 'Monthly Compliance Summary',
    purpose: 'Prepares monthly home loan counts, sanctioned amounts and disbursed totals for human review, using the organization-approved template. Restricted to home-loan products; excludes auto, land and personal loans.',
    reviewPurpose: 'Count issued home loans and summarize monthly sanctioned and disbursed amounts for human review.',
    instructions: 'Prepare the monthly report using the organization-approved template. Include only home loans, count each issued loan once and total the sanctioned and disbursed amounts in INR.',
    instructionNote: 'Route each draft to the designated compliance reviewer. Pause for human approval; never submit externally.',
    type: 'Government Submission',
    destination: 'Compliance review'
  },
  {
    id: 'sbi-auto-loan',
    title: 'SBI Auto Loan Monthly Report',
    description: 'Compiles monthly auto-loan issuance totals for compliance review. Vehicle finance only; excludes home and land loans.',
    status: 'Published',
    lastRun: '1 Jun 2025',
    humanReviewRequired: true,
    agentType: 'report',
    department: 'Retail Banking — Vehicle Finance',
    reportType: 'Monthly Compliance Summary',
    purpose: 'Compiles monthly auto-loan issuance totals for compliance review. Vehicle finance only; excludes home and land loans.',
    reviewPurpose: 'Count issued auto loans and summarize monthly sanctioned and disbursed amounts.',
    instructions: 'Prepare the monthly auto-loan report for compliance review. Exclude home and land loans.',
    instructionNote: 'Route each draft to the designated compliance reviewer. Pause for human approval; never submit externally.',
    type: 'Internal Review',
    destination: 'Compliance review'
  },
  {
    id: 'apollo-hospital',
    title: 'Apollo Hospital — Discharge Summary',
    description: 'Prepares weekly inpatient discharge summaries for authorized hospital reviewers. Inpatient episodes only.',
    status: 'Draft',
    lastRun: '1 Jun 2025',
    humanReviewRequired: true,
    agentType: 'report',
    department: 'Healthcare Operations',
    reportType: 'Weekly Discharge Summary',
    purpose: 'Prepares weekly inpatient discharge summaries for authorized hospital reviewers. Inpatient episodes only.',
    reviewPurpose: 'Summarize weekly inpatient discharge counts and clinical reviewer approvals.',
    instructions: 'Prepare weekly summaries of discharged patients with physician sign-off.',
    instructionNote: 'Strictly internal hospital review. Human sign-off required before archiving.',
    type: 'Clinical Audit',
    destination: 'Medical Records Review'
  },
  {
    id: 'sbi-land-loan',
    title: 'SBI Land Loan Quarterly Report',
    description: 'Prepares a quarterly land-loan portfolio summary for compliance review. Agricultural and commercial land loans only.',
    status: 'Draft',
    lastRun: 'Not yet run',
    humanReviewRequired: true,
    agentType: 'report',
    department: 'Agricultural & Commercial Lending',
    reportType: 'Quarterly Portfolio Summary',
    purpose: 'Prepares a quarterly land-loan portfolio summary for compliance review. Agricultural and commercial land loans only.',
    reviewPurpose: 'Aggregate quarterly land loan sanctions and disbursements across commercial and agricultural segments.',
    instructions: 'Prepare quarterly land-loan portfolio summary for compliance review.',
    instructionNote: 'Requires division head sign-off before submission.',
    type: 'Portfolio Review',
    destination: 'Risk Management'
  },
  {
    id: 'aiims-icu',
    title: 'AIIMS ICU Occupancy Report',
    description: 'Prepares daily ICU occupancy and critical-care summaries for authorized hospital reviewers. ICU ward data only.',
    status: 'Published',
    lastRun: 'Today',
    humanReviewRequired: true,
    agentType: 'report',
    department: 'Critical Care Administration',
    reportType: 'Daily Occupancy Report',
    purpose: 'Prepares daily ICU occupancy and critical-care summaries for authorized hospital reviewers. ICU ward data only.',
    reviewPurpose: 'Summarize daily bed capacity, patient admissions, and ventilator usage.',
    instructions: 'Aggregate daily ICU bed metrics. Disregard general outpatient wards.',
    instructionNote: 'Must be verified by ICU Chief Medical Officer daily.',
    type: 'Operational Report',
    destination: 'Chief Medical Officer'
  }
];

export const MOCK_VERIFICATION_DOCUMENTS = [
  {
    id: 'doc-pan-01',
    fileName: 'Sample_PAN_Card_Rajesh_Sharma.jpg',
    docType: 'PAN Card',
    category: 'Identity Proof',
    size: '1.8 MB',
    status: 'Verified',
    confidence: '98.7%',
    uploadedAt: 'Today, 09:42 IST',
    applicantName: 'Rajesh Kumar Sharma',
    accountNumber: 'SBI Acc #40291948123',
    extractedData: {
      fullName: 'Rajesh Kumar Sharma',
      documentNumber: 'Abcde1234F',
      dateOfBirth: '14/08/1988',
      fatherName: 'Ramvilas Sharma',
      issuingAuthority: 'Income Tax Department, Govt of India',
      validity: 'Active',
      formatValid: true
    },
    securityChecks: [
      { name: 'Format validation', status: 'Passed', detail: 'Valid alphanumeric PAN format with entity code' },
      { name: 'QR cryptographic signature', status: 'Passed', detail: 'Signed by authorized NSDL certificate' },
      { name: 'Tamper detection', status: 'Passed', detail: 'Zero splice artifacts or font inconsistencies' },
      { name: 'Core banking record match', status: 'Passed', detail: 'Name and date of birth match SBI account record' }
    ],
    fraudRisk: 'Low (0.01)',
    reviewerRecommendation: 'Eligible for instant KYC tier-1 clearance.'
  },
  {
    id: 'doc-aadhaar-02',
    fileName: 'Sample_Aadhaar_Card_Priya_Patel.pdf',
    docType: 'Aadhaar Card',
    category: 'Identity & Address Proof',
    size: '2.4 MB',
    status: 'Verified',
    confidence: '99.1%',
    uploadedAt: 'Today, 08:15 IST',
    applicantName: 'Priya Sunil Patel',
    accountNumber: 'SBI Acc #51829019284',
    extractedData: {
      fullName: 'Priya Sunil Patel',
      documentNumber: 'XXXX-XXXX-9021',
      dateOfBirth: '22/11/1994',
      gender: 'Female',
      address: 'Flat 402, Lotus Towers, SV Road, Andheri West, Mumbai 400058',
      issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
      validity: 'Active',
      formatValid: true
    },
    securityChecks: [
      { name: 'UIDAI checksum check', status: 'Passed', detail: 'Algorithm verification succeeded' },
      { name: 'Secure QR cryptographic signature', status: 'Passed', detail: 'RSA digital signature verified' },
      { name: 'Address & pincode check', status: 'Passed', detail: 'Pin code 400058 matches Andheri West' },
      { name: 'Masked Aadhaar compliance', status: 'Passed', detail: 'First 8 digits securely masked' }
    ],
    fraudRisk: 'Low (0.00)',
    reviewerRecommendation: 'Eligible for automated address & identity KYC clearance.'
  },
  {
    id: 'doc-dl-03',
    fileName: 'Sample_Driving_License_Vikram_Singh.jpg',
    docType: 'Driving License',
    category: 'Identity Proof',
    size: '2.8 MB',
    status: 'Verified',
    confidence: '98.2%',
    uploadedAt: 'Yesterday, 16:30 IST',
    applicantName: 'Vikram Jeet Singh',
    accountNumber: 'SBI Acc #19283746501',
    extractedData: {
      fullName: 'Vikram Jeet Singh',
      documentNumber: 'DL-0420110059123',
      dateOfBirth: '05/03/1985',
      fatherName: 'Baldev Singh',
      issuingAuthority: 'Delhi Transport Authority (DL-04)',
      validity: 'Valid & Active',
      formatValid: true
    },
    securityChecks: [
      { name: 'Format validation', status: 'Passed', detail: 'Standard transport authority license schema' },
      { name: 'Registry verification', status: 'Passed', detail: 'Transport database returned active license record' },
      { name: 'Physical integrity check', status: 'Passed', detail: 'Document dimensions and security features match' }
    ],
    fraudRisk: 'Low (0.01)',
    reviewerRecommendation: 'Eligible for instant KYC tier-1 clearance.'
  }
];

export const REPORT_DATA_BY_MONTH = {
  'September 2026': {
    period: '01–30 Sep 2026 · IST',
    issuedLoans: 18,
    issuedLoansNote: 'Each issued loan counted once',
    totalSanctioned: '₹7,20,00,000',
    totalSanctionedWords: '₹7.20 crore',
    totalDisbursed: '₹5,40,00,000',
    totalDisbursedWords: '₹5.40 crore',
    tableRows: [
      { purpose: 'Home purchase', loans: 10, sanctioned: '₹4,00,00,000', disbursed: '₹3,00,00,000' },
      { purpose: 'Home construction', loans: 5, sanctioned: '₹2,00,00,000', disbursed: '₹1,50,00,000' },
      { purpose: 'Home improvement', loans: 3, sanctioned: '₹1,20,00,000', disbursed: '₹90,00,000' },
    ],
    totalRow: { purpose: 'Total', loans: 18, sanctioned: '₹7,20,00,000', disbursed: '₹5,40,00,000' },
    reviewer: 'Meera Shah',
    templateVersion: 'v2.3',
    currency: 'INR'
  },
  'August 2026': {
    period: '01–31 Aug 2026 · IST',
    issuedLoans: 15,
    issuedLoansNote: 'Each issued loan counted once',
    totalSanctioned: '₹6,10,00,000',
    totalSanctionedWords: '₹6.10 crore',
    totalDisbursed: '₹4,80,00,000',
    totalDisbursedWords: '₹4.80 crore',
    tableRows: [
      { purpose: 'Home purchase', loans: 8, sanctioned: '₹3,50,00,000', disbursed: '₹2,80,00,000' },
      { purpose: 'Home construction', loans: 4, sanctioned: '₹1,60,00,000', disbursed: '₹1,20,00,000' },
      { purpose: 'Home improvement', loans: 3, sanctioned: '₹1,00,00,000', disbursed: '₹80,00,000' },
    ],
    totalRow: { purpose: 'Total', loans: 15, sanctioned: '₹6,10,00,000', disbursed: '₹4,80,00,000' },
    reviewer: 'Meera Shah',
    templateVersion: 'v2.3',
    currency: 'INR'
  },
  'July 2026': {
    period: '01–31 Jul 2026 · IST',
    issuedLoans: 21,
    issuedLoansNote: 'Each issued loan counted once',
    totalSanctioned: '₹8,45,00,000',
    totalSanctionedWords: '₹8.45 crore',
    totalDisbursed: '₹6,70,00,000',
    totalDisbursedWords: '₹6.70 crore',
    tableRows: [
      { purpose: 'Home purchase', loans: 12, sanctioned: '₹5,10,00,000', disbursed: '₹4,10,00,000' },
      { purpose: 'Home construction', loans: 6, sanctioned: '₹2,35,00,000', disbursed: '₹1,80,00,000' },
      { purpose: 'Home improvement', loans: 3, sanctioned: '₹1,00,00,000', disbursed: '₹80,00,000' },
    ],
    totalRow: { purpose: 'Total', loans: 21, sanctioned: '₹8,45,00,000', disbursed: '₹6,70,00,000' },
    reviewer: 'Meera Shah',
    templateVersion: 'v2.3',
    currency: 'INR'
  }
};
