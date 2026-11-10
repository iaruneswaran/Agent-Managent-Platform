import React, { useState, useRef } from 'react';
import { 
  FileText, Download, Copy, Send, Check, X, 
  UploadCloud, CheckCircle2, RotateCw, Calendar, 
  ArrowRight, Clock
} from 'lucide-react';
import { REPORT_DATA_BY_MONTH, MOCK_VERIFICATION_DOCUMENTS } from '../data/mockData';
import { AriaAvatar } from '../components/AriaAvatar';
import { AppDropdown } from '../components/AppDropdown';
import { AppDatePicker } from '../components/AppDatePicker';

export const UseAgentView = ({ agentData, onBackToList }) => {
  // Determine if this is a Document Verification agent or a Report agent
  const isVerification = agentData?.agentType === 'verification' || 
    agentData?.type?.toLowerCase().includes('verification') ||
    agentData?.title?.toLowerCase().includes('kyc') ||
    agentData?.title?.toLowerCase().includes('verify') ||
    agentData?.title?.toLowerCase().includes('document');

  // ==========================================
  // DOCUMENT VERIFICATION STATE
  // ==========================================
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [documentsList, setDocumentsList] = useState(MOCK_VERIFICATION_DOCUMENTS);
  const [humanDecision, setHumanDecision] = useState('pending'); // 'pending' | 'approved' | 'rejected'
  const [reviewerNotes, setReviewerNotes] = useState('Customer demographic details match SBI core banking account #40291948123. Security seals and cryptographic signature verified.');
  const [verifNotes, setVerifNotes] = useState('');
  const [customFilePreview, setCustomFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Verification Initiation & Loading State
  const [hasVerifiedDoc, setHasVerifiedDoc] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const currentDoc = documentsList[activeDocIndex] || documentsList[0];

  // Document Assistant Chat
  const [verifChatMessages, setVerifChatMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Welcome! Please select a customer document from the queue or upload a new identity document on the left, then click "Verify Document" to initiate compliance verification.'
    }
  ]);
  const [verifInputText, setVerifInputText] = useState('');

  // Switch Document
  const handleSelectSampleDoc = (index) => {
    setActiveDocIndex(index);
    setHumanDecision('pending');
    setCustomFilePreview(null);
    const doc = documentsList[index];

    setReviewerNotes(
      doc.status === 'Verified'
        ? `Document ${doc.docType} verified against statutory guidelines. Zero alteration flags detected.`
        : `Document ${doc.docType} under review. Details verified against core banking records.`
    );
    setVerifChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'assistant',
        text: `Selected ${doc.fileName} (${doc.docType}). Ready to verify against SBI core banking.`
      }
    ]);
  };

  // Upload Custom Document
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    if (isImage) {
      const url = URL.createObjectURL(file);
      setCustomFilePreview(url);
    } else {
      setCustomFilePreview(null);
    }

    const newDoc = {
      id: `custom-doc-${Date.now()}`,
      fileName: file.name,
      docType: file.name.toLowerCase().includes('pan') ? 'PAN Card' : 
               file.name.toLowerCase().includes('aadhaar') ? 'Aadhaar Card' : 
               file.name.toLowerCase().includes('passport') ? 'Passport' : 
               file.name.toLowerCase().includes('driving') || file.name.toLowerCase().includes('license') ? 'Driving License' : 'Identity Document',
      category: 'Identity Proof',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      status: 'Verified',
      confidence: '98.5%',
      uploadedAt: 'Just now',
      applicantName: 'Arun Kumar Eswaran',
      accountNumber: 'SBI Acc #90481239841',
      extractedData: {
        fullName: 'Arun Kumar Eswaran',
        documentNumber: 'Abcde8921K',
        dateOfBirth: '29/10/1992',
        fatherName: 'Eswaran K',
        issuingAuthority: 'Authorized Issuing Authority',
        validity: 'Valid & Active',
        formatValid: true
      },
      securityChecks: [
        { name: 'Format validation', status: 'Passed', detail: 'Valid government document layout and font standards detected' },
        { name: 'QR cryptographic signature', status: 'Passed', detail: 'Signed by authorized issuing certificate' },
        { name: 'Tamper detection', status: 'Passed', detail: 'Zero pixel splicing or clone artifacts detected' },
        { name: 'Core banking record match', status: 'Passed', detail: 'Name and date of birth match SBI account record' }
      ]
    };

    setDocumentsList((prev) => [newDoc, ...prev]);
    setActiveDocIndex(0);
    setHumanDecision('pending');
    setReviewerNotes(`Uploaded document ${file.name} ready for verification.`);
    setVerifChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'assistant',
        text: `Uploaded "${file.name}" has been loaded as ${newDoc.docType}. Click "Verify Document" to initiate inspection.`
      }
    ]);
  };

  // Run Verification Action with Loading Animation
  const handleRunVerification = () => {
    setIsVerifying(true);
    if (verifNotes.trim()) {
      setReviewerNotes(verifNotes.trim());
    }
    setVerifChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: `Verify document: ${currentDoc.fileName} (${currentDoc.docType})${verifNotes.trim() ? ` — Notes: ${verifNotes.trim()}` : ''}`
      },
      {
        id: Date.now() + 1,
        sender: 'assistant',
        text: `Verifying ${currentDoc.fileName}... Scanning cryptographic signature, running OCR demographic extraction, and matching SBI core banking record.`
      }
    ]);

    setTimeout(() => {
      setIsVerifying(false);
      setHasVerifiedDoc(true);
      setVerifChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'assistant',
          text: `Verification complete for ${currentDoc.fileName}. Status: ${currentDoc.status}. Confidence: ${currentDoc.confidence}. Extracted details match SBI account #${currentDoc.accountNumber}. Ready for compliance review.`
        }
      ]);
    }, 1600);
  };

  // Chat message send for verification
  const handleSendVerifMessage = (e, customText) => {
    if (e) e.preventDefault();
    const query = (customText || verifInputText).trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setVerifChatMessages((prev) => [...prev, userMsg]);
    if (!customText) setVerifInputText('');

    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('checksum') || q.includes('algorithm')) {
        reply = `Document number "${currentDoc.extractedData.documentNumber}" validated. Structural checksum algorithm check returned: Valid.`;
      } else if (q.includes('tamper') || q.includes('alter')) {
        reply = `Tamper Analysis: Passed. No font mismatch or splice boundaries detected.`;
      } else if (q.includes('name') || q.includes('match') || q.includes('account')) {
        reply = `Extracted name "${currentDoc.extractedData.fullName}" fuzzy matches core banking account "${currentDoc.applicantName}" with 99.2% confidence.`;
      } else if (q.includes('dob') || q.includes('birth')) {
        reply = `Extracted Date of Birth: ${currentDoc.extractedData.dateOfBirth}. Authority: ${currentDoc.extractedData.issuingAuthority}.`;
      } else {
        reply = `Document status for ${currentDoc.fileName}: ${currentDoc.status}. Extracted ID: ${currentDoc.extractedData.documentNumber}.`;
      }

      setVerifChatMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'assistant', text: reply }]);
    }, 350);
  };

  const handleApprove = () => {
    setHumanDecision('approved');
    setVerifChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'assistant',
        text: `Compliance approval recorded: ${currentDoc.docType} (${currentDoc.extractedData.documentNumber}) approved by Meera Shah.`
      }
    ]);
  };

  const handleReject = () => {
    setHumanDecision('rejected');
    setVerifChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'assistant',
        text: `Document rejected: ${currentDoc.fileName} marked as rejected. Discrepancy logged.`
      }
    ]);
  };

  // ==========================================
  // REPORT STATE & PARAMETERS
  // ==========================================
  const [hasGeneratedReport, setHasGeneratedReport] = useState(false);
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [rangeType, setRangeType] = useState('month'); // 'month' | 'custom'
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [customStartDate, setCustomStartDate] = useState('2026-09-01');
  const [customEndDate, setCustomEndDate] = useState('2026-09-30');
  const [selectedScope, setSelectedScope] = useState('all');
  const [reportNotes, setReportNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Welcome! Select your reporting period or custom date range on the left, then click "Generate Report" to compile the portfolio report.'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const report = REPORT_DATA_BY_MONTH[selectedMonth] || REPORT_DATA_BY_MONTH['September 2026'];

  // Run Report Generation with Loading Animation
  const handleRunReportGeneration = () => {
    setIsReportLoading(true);
    const periodLabel = rangeType === 'month' ? selectedMonth : `${customStartDate} to ${customEndDate}`;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: `Generate portfolio report for ${periodLabel}${reportNotes.trim() ? ` — Notes: ${reportNotes.trim()}` : ''}`
      },
      {
        id: Date.now() + 1,
        sender: 'assistant',
        text: `Compiling loan portfolio data for ${periodLabel}... Querying loan ledger for sanctioned volumes and disbursement totals.`
      }
    ]);

    setTimeout(() => {
      setIsReportLoading(false);
      setHasGeneratedReport(true);
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'assistant',
          text: `Draft compiled for ${periodLabel}. ${report.issuedLoans} home loans processed totaling ${report.totalSanctionedWords} sanctioned and ${report.totalDisbursedWords} disbursed.`
        }
      ]);
    }, 1600);
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim();
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let reply = `Based on the ${rangeType === 'month' ? selectedMonth : 'selected period'} report:`;
      const q = query.toLowerCase();
      if (q.includes('disburse') || q.includes('ratio')) {
        reply = `The disbursement ratio stands at 75.0% (₹5.40 Cr disbursed out of ₹7.20 Cr sanctioned). Construction loans are progressing on schedule.`;
      } else if (q.includes('construction')) {
        reply = `Home construction represents 5 loans totaling ₹2,00,00,000 sanctioned and ₹1,50,00,000 disbursed.`;
      } else if (q.includes('compare')) {
        reply = `Compared to the previous period, sanctioned volume is up 18% with zero compliance exceptions.`;
      } else {
        reply = `Verified: 18 issued home loans totaling ₹7.20 crore sanctioned. Reviewer: Meera Shah.`;
      }
      setChatMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'assistant', text: reply }]);
    }, 350);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Report: ${agentData?.title}\nPeriod: ${rangeType === 'month' ? selectedMonth : `${customStartDate} to ${customEndDate}`}\nTotal Sanctioned: ₹7.20 Cr\nTotal Disbursed: ₹5.40 Cr`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Loan Purpose,Loans,Sanctioned (INR),Disbursed (INR)\n"
      + report.tableRows.map(r => `"${r.purpose}",${r.loans},"${r.sanctioned}","${r.disbursed}"`).join("\n")
      + `\n"${report.totalRow.purpose}",${report.totalRow.loans},"${report.totalRow.sanctioned}","${report.totalRow.disbursed}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SBI_Home_Loan_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in" style={{ width: '100%', minHeight: 'calc(100vh - 64px)', backgroundColor: '#F8FAFC' }}>
      {/* Top Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        width: '100%',
        padding: '18px 24px',
        position: 'relative'
      }}>
        {/* Breadcrumb Bar with Right Close Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          fontSize: '14px',
          color: '#64748B',
          marginBottom: '10px'
        }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              onClick={onBackToList}
              style={{ cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.target.style.color = '#0F172A'}
              onMouseLeave={(e) => e.target.style.color = '#64748B'}
            >
              Agents
            </span>
            <span>/</span>
            <span
              onClick={onBackToList}
              style={{ cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.target.style.color = '#0F172A'}
              onMouseLeave={(e) => e.target.style.color = '#64748B'}
            >
              {agentData?.title || (isVerification ? 'SBI Customer KYC & Document Verification Agent' : 'SBI Home Loan Monthly Report')}
            </span>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 500 }}>Use agent</span>
          </div>

          {/* Close button */}
          <button
            onClick={onBackToList}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#475569',
              border: '1px solid #CBD5E1',
              outline: 'none',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.borderColor = '#94A3B8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#CBD5E1';
            }}
          >
            <X size={14} strokeWidth={2} />
            <span>Close</span>
          </button>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 500,
              color: '#0F172A',
              letterSpacing: '-0.3px',
              margin: 0
            }}>
              {agentData?.title || (isVerification ? 'SBI Customer KYC & Document Verification Agent' : 'SBI Home Loan Monthly Report')}
            </h1>
          </div>
        </div>

        {/* Full-width Line Loading Animation right below header bottom */}
        {(isVerifying || isReportLoading) && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '3.5px',
            backgroundColor: 'rgba(23, 87, 191, 0.08)',
            overflow: 'hidden',
            zIndex: 30
          }}>
            <div className="report-line-loader" />
          </div>
        )}
      </div>

      {/* Main Workspace Area (24px horizontal padding) */}
      <div style={{ width: '100%', padding: '28px 24px 64px' }}>

        {/* ======================================================== */}
        {/* DOCUMENT VERIFICATION WORKSPACE                         */}
        {/* ======================================================== */}
        {isVerification ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 450px',
            gap: '24px',
            alignItems: 'stretch'
          }}>
            {/* Left Column: Pre-Verification Initiation OR Verified Report Canvas */}
            {!hasVerifiedDoc ? (
              /* STEP 1: UPLOAD & SELECT DOCUMENT FOR KYC VERIFICATION */
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                minHeight: '672px'
              }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#0F172A', margin: 0 }}>
                    Upload Document for KYC Verification
                  </h2>
                </div>

                {/* File Upload Box */}
                <div>
                  <span style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '12px' }}>
                    Upload customer document:
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '1px dashed #CBD5E1',
                      borderRadius: '12px',
                      padding: '24px 20px',
                      textAlign: 'center',
                      backgroundColor: customFilePreview ? '#EFF6FF' : '#F8FAFC',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1757BF'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
                  >
                    <UploadCloud size={32} color="#1757BF" style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A', marginBottom: '4px' }}>
                      {customFilePreview ? 'Custom document loaded (click to replace)' : 'Click to browse or drop customer document here'}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748B' }}>
                      Supports PAN, Aadhaar, Passport, or DL in JPG, PNG, or PDF formats
                    </div>
                  </div>
                </div>

                {/* Selected File Card */}
                <div style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileText size={22} color="#1757BF" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>
                        Selected for verification: {currentDoc.fileName}
                      </div>
                      <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px' }}>
                        Type: {currentDoc.docType} · Size: {currentDoc.size} · Linked: {currentDoc.accountNumber}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes before verification */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px' }}>
                    Notes (optional):
                  </label>
                  <textarea
                    rows={3}
                    value={verifNotes}
                    onChange={(e) => setVerifNotes(e.target.value)}
                    placeholder="Enter compliance notes, inspection remarks, or applicant context..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '14px',
                      color: '#0F172A',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1757BF'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>

                {/* Action Button to Verify Document */}
                <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleRunVerification}
                    disabled={isVerifying}
                    style={{
                      backgroundColor: '#EEFA26',
                      color: '#111827',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '13px 32px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: isVerifying ? 'wait' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isVerifying) e.currentTarget.style.backgroundColor = '#E4F01E';
                    }}
                    onMouseLeave={(e) => {
                      if (!isVerifying) e.currentTarget.style.backgroundColor = '#EEFA26';
                    }}
                  >
                    <CheckCircle2 size={16} color="#111827" />
                    <span>{isVerifying ? 'Verifying Document...' : 'Verify Document'}</span>
                  </button>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>
                    Runs OCR extraction, QR cryptographic signature check, and core banking record matching.
                  </span>
                </div>
              </div>
            ) : (
              /* STEP 2: VERIFIED REPORT CANVAS */
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: '672px'
              }}>
                {/* Document Tabs Bar */}
                <div style={{
                  padding: '14px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {documentsList.slice(0, 3).map((doc, idx) => {
                      const isSelected = activeDocIndex === idx;
                      return (
                        <button
                          key={doc.id}
                          type="button"
                          onClick={() => {
                            handleSelectSampleDoc(idx);
                            setIsVerifying(true);
                            setTimeout(() => setIsVerifying(false), 1200);
                          }}
                          style={{
                            padding: '7px 16px',
                            borderRadius: '9999px',
                            fontSize: '14px',
                            fontWeight: isSelected ? 600 : 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            border: isSelected ? 'none' : '1px solid #E2E8F0',
                            backgroundColor: isSelected ? '#EEFA26' : '#FFFFFF',
                            color: isSelected ? '#111827' : '#475569',
                            outline: 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            backgroundColor: '#16A34A'
                          }} />
                          <span>{doc.docType.split('(')[0].trim()}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Switch / Upload Document Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setHasVerifiedDoc(false)}
                      style={{
                        backgroundColor: '#F1F5F9',
                        color: '#334155',
                        border: '1px solid #E2E8F0',
                        borderRadius: '9999px',
                        padding: '7px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>Upload / Switch document</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        backgroundColor: '#EEFA26',
                        color: '#111827',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '9999px',
                        padding: '7px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4F01E'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EEFA26'}
                    >
                      <UploadCloud size={15} />
                      <span>Upload</span>
                    </button>
                  </div>
                </div>

                {/* Main Document Inspection Content */}
                <div style={{ padding: '28px 24px', flex: 1, overflowY: 'auto' }} className="animate-fade-in">
                  
                  {/* Report Header */}
                  <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '18px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#0F172A', margin: '0 0 4px 0' }}>
                          State Bank of India — Customer KYC Verification Report
                        </h2>
                        <div style={{ fontSize: '14px', color: '#64748B' }}>
                          Applicant: <strong style={{ color: '#0F172A' }}>{currentDoc.applicantName}</strong> · Account: <strong style={{ color: '#1757BF' }}>{currentDoc.accountNumber}</strong> · Document: {currentDoc.docType} ({currentDoc.fileName})
                        </div>
                      </div>

                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        backgroundColor: '#DCFCE7',
                        color: '#166534',
                        fontSize: '14px',
                        fontWeight: 600
                      }}>
                        <CheckCircle2 size={15} color="#16A34A" />
                        <span>KYC Verified ({currentDoc.confidence})</span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Metric Summary Cards with Yellow Accent */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
                    <div style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #E2E8F0',
                      borderTop: '3px solid #EEFA26'
                    }}>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', fontWeight: 500, marginBottom: '6px' }}>
                        Mismatches detected
                      </span>
                      <div style={{ fontSize: '28px', fontWeight: 600, color: '#16A34A' }}>
                        0 Discrepancies
                      </div>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                        All fields match SBI core banking records
                      </span>
                    </div>

                    <div style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #E2E8F0',
                      borderTop: '3px solid #EEFA26'
                    }}>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', fontWeight: 500, marginBottom: '6px' }}>
                        Document security & integrity
                      </span>
                      <div style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A' }}>
                        Authentic (Passed)
                      </div>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                        Tamper-free · Authorized digital signature
                      </span>
                    </div>

                    <div style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #E2E8F0',
                      borderTop: '3px solid #EEFA26'
                    }}>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', fontWeight: 500, marginBottom: '6px' }}>
                        Regulatory KYC recommendation
                      </span>
                      <div style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A' }}>
                        Compliant
                      </div>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                        {currentDoc.reviewerRecommendation || 'Eligible for instant KYC clearance'}
                      </span>
                    </div>
                  </div>

                  {/* Demographic Cross-Verification & Mismatch Matrix */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    marginBottom: '28px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A', margin: 0 }}>
                        Demographic Cross-Verification & Mismatch Analysis
                      </h3>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#16A34A', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={15} />
                        Zero Mismatches Flagged
                      </span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                      <thead style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
                        <tr>
                          <th style={{ padding: '12px 18px', color: '#475569', fontWeight: 500 }}>Demographic Field</th>
                          <th style={{ padding: '12px 18px', color: '#475569', fontWeight: 500 }}>Extracted from Document</th>
                          <th style={{ padding: '12px 18px', color: '#475569', fontWeight: 500 }}>SBI Core Banking Record</th>
                          <th style={{ padding: '12px 18px', color: '#475569', fontWeight: 500 }}>Verification Finding</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { field: 'Full Legal Name', docValue: currentDoc.extractedData.fullName, bankValue: currentDoc.applicantName, match: 'Exact Match (100%)' },
                          { field: 'Document ID Number', docValue: currentDoc.extractedData.documentNumber, bankValue: currentDoc.extractedData.documentNumber, match: 'Verified Format' },
                          { field: 'Date of Birth', docValue: currentDoc.extractedData.dateOfBirth, bankValue: currentDoc.extractedData.dateOfBirth, match: 'Exact Match' },
                          ...(currentDoc.extractedData.fatherName ? [{ field: "Father's Name", docValue: currentDoc.extractedData.fatherName, bankValue: currentDoc.extractedData.fatherName, match: 'Exact Match' }] : []),
                          ...(currentDoc.extractedData.gender ? [{ field: 'Gender', docValue: currentDoc.extractedData.gender, bankValue: currentDoc.extractedData.gender, match: 'Exact Match' }] : []),
                          ...(currentDoc.extractedData.address ? [{ field: 'Permanent Address', docValue: currentDoc.extractedData.address, bankValue: 'Verified Branch Record (Pin 400058)', match: 'Address Match' }] : []),
                          { field: 'Issuing Authority', docValue: currentDoc.extractedData.issuingAuthority, bankValue: 'Statutory Authority Confirmed', match: 'Authenticated' }
                        ].map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '12px 18px', color: '#0F172A', fontWeight: 500 }}>{row.field}</td>
                            <td style={{ padding: '12px 18px', color: '#334155', fontFamily: row.field.includes('ID') ? 'monospace' : 'inherit' }}>{row.docValue}</td>
                            <td style={{ padding: '12px 18px', color: '#334155' }}>{row.bankValue}</td>
                            <td style={{ padding: '12px 18px' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#166534',
                                backgroundColor: '#F0FDF4',
                                padding: '3px 10px',
                                borderRadius: '9999px',
                                border: '1px solid #DCFCE7'
                              }}>
                                <CheckCircle2 size={14} color="#16A34A" />
                                {row.match}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Regulatory & Security Authenticity Checks */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    padding: '20px',
                    marginBottom: verifNotes.trim() ? '20px' : 0
                  }}>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A', marginBottom: '14px' }}>
                      Regulatory & Authenticity Inspection Checks
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      {currentDoc.securityChecks.map((check, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle2 size={16} color="#16A34A" />
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{check.name}</div>
                              <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px' }}>{check.detail}</div>
                            </div>
                          </div>

                          <span style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            padding: '2px 10px',
                            borderRadius: '9999px',
                            backgroundColor: '#DCFCE7',
                            color: '#166534'
                          }}>
                            {check.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optional Notes Box if user entered notes */}
                  {verifNotes.trim() && (
                    <div style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <FileText size={18} color="#1757BF" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>
                          Auditor & Submission Notes
                        </div>
                        <div style={{ fontSize: '14px', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
                          {verifNotes.trim()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right Column: Wellio AI Assistant (450px width, 672px height) */}
            <div style={{
              width: '450px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              height: '672px'
            }}>
              {/* Wellio Chatbot Header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#FFFFFF'
              }}>
                <AriaAvatar size={50} />

                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.2px' }}>
                    Wellio
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px' }}>
                    Your intelligent banking assistant
                  </div>
                </div>
              </div>

              {/* Chat Stream */}
              <div style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                backgroundColor: '#FAFAFA'
              }}>
                {verifChatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: msg.sender === 'user' ? '82%' : '94%',
                      backgroundColor: msg.sender === 'user' ? '#0F172A' : '#FFFFFF',
                      color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                      padding: '14px 18px',
                      borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                      boxShadow: msg.sender === 'user' ? '0 2px 4px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    {msg.sender === 'assistant' && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px'
                      }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
                          Wellio
                        </span>
                        <span style={{ fontSize: '14px', color: '#94A3B8' }}>
                          Just now
                        </span>
                      </div>
                    )}
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div style={{
                padding: '14px 18px 16px',
                borderTop: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF'
              }}>
                <form
                  onSubmit={(e) => handleSendVerifMessage(e, null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '14px',
                    padding: '6px 8px 6px 14px',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocusCapture={(e) => e.currentTarget.style.borderColor = '#0F172A'}
                  onBlurCapture={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
                >
                  <input
                    type="text"
                    placeholder="Ask a question about this document..."
                    value={verifInputText}
                    onChange={(e) => setVerifInputText(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      color: '#0F172A'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#EEFA26',
                      color: '#111827',
                      border: 'none',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4F01E'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EEFA26'}
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* REPORT GENERATION WORKSPACE                             */
          /* ======================================================== */
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 450px',
            gap: '24px',
            alignItems: 'stretch'
          }}>
            {/* Left Column: Pre-Generation Parameters Setup OR Generated Report Canvas */}
            {!hasGeneratedReport ? (
              /* STEP 1: CONFIGURE PERIOD & PARAMETERS BEFORE GENERATING REPORT */
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                minHeight: '672px'
              }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#0F172A', margin: 0 }}>
                    Configure Period & Parameters for Report
                  </h2>
                </div>

                {/* Month & Year Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px' }}>
                    Select reporting month & year:
                  </label>
                  <AppDropdown
                    value={selectedMonth}
                    onChange={(m) => setSelectedMonth(m)}
                    options={['September 2026', 'August 2026', 'July 2026']}
                    icon={<Calendar size={15} color="#64748B" />}
                    width="240px"
                  />
                </div>

                {/* Notes before generating report */}
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: '8px' }}>
                    Notes (optional):
                  </label>
                  <textarea
                    rows={3}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="Enter reporting notes, auditor remarks, or scope justifications..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '14px',
                      color: '#0F172A',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1757BF'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>

                {/* Action Button to Generate Report */}
                <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleRunReportGeneration}
                    disabled={isReportLoading}
                    style={{
                      backgroundColor: '#EEFA26',
                      color: '#111827',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '13px 32px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: isReportLoading ? 'wait' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isReportLoading) e.currentTarget.style.backgroundColor = '#E4F01E';
                    }}
                    onMouseLeave={(e) => {
                      if (!isReportLoading) e.currentTarget.style.backgroundColor = '#EEFA26';
                    }}
                  >
                    <FileText size={16} color="#111827" />
                    <span>{isReportLoading ? 'Compiling Report...' : 'Generate Report'}</span>
                  </button>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>
                    Compiles sanctioned loans, disbursement amounts, and breakdown tables from core banking.
                  </span>
                </div>
              </div>
            ) : (
              /* STEP 2: COMPILED REPORT CANVAS */
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: '672px'
              }}>
                {/* Top Parameters & Toolbar Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 24px',
                  borderBottom: '1px solid #E2E8F0',
                  flexWrap: 'wrap',
                  gap: '12px',
                  backgroundColor: '#FFFFFF'
                }}>
                  {/* Left: Active Period and Re-configure Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>
                      <Calendar size={15} color="#1757BF" />
                      <span>{rangeType === 'month' ? selectedMonth : `${customStartDate} to ${customEndDate}`}</span>
                    </div>

                    <AppDropdown
                      value={selectedMonth}
                      size="sm"
                      width="160px"
                      icon={<Calendar size={13} color="#1757BF" />}
                      options={['September 2026', 'August 2026', 'July 2026']}
                      onChange={(m) => {
                        setSelectedMonth(m);
                        setRangeType('month');
                        setIsReportLoading(true);
                        setTimeout(() => setIsReportLoading(false), 1200);
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setHasGeneratedReport(false)}
                      style={{
                        backgroundColor: '#F1F5F9',
                        color: '#334155',
                        border: '1px solid #E2E8F0',
                        borderRadius: '9999px',
                        padding: '6px 14px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      Change parameters
                    </button>
                  </div>

                  {/* Right: Export & Copy Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={handleExportPDF}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        outline: 'none',
                        borderRadius: '9999px',
                        padding: '7px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#475569',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#94A3B8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }}
                    >
                      <Download size={13} />
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={handleExportCSV}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        outline: 'none',
                        borderRadius: '9999px',
                        padding: '7px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#475569',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#94A3B8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }}
                    >
                      <Download size={13} />
                      <span>CSV</span>
                    </button>

                    <button
                      onClick={handleRunReportGeneration}
                      title="Re-compile report"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        outline: 'none',
                        borderRadius: '9999px',
                        padding: '7px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#475569',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#94A3B8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                      }}
                    >
                      <RotateCw size={14} className={isReportLoading ? 'animate-spin-once' : ''} />
                      <span>Re-compile</span>
                    </button>

                    <button
                      onClick={handleCopy}
                      style={{
                        backgroundColor: '#EEFA26',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '9999px',
                        padding: '7px 16px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#111827',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E4F01E';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#EEFA26';
                      }}
                    >
                      {copied ? <Check size={13} color="#111827" /> : <Copy size={13} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Report Content */}
                <div style={{ padding: '28px 24px', flex: 1, backgroundColor: '#FFFFFF', overflowY: 'auto' }} className="animate-fade-in">
                  <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '18px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#0F172A', margin: 0 }}>
                        {agentData?.title ? `${agentData.title} — ${rangeType === 'month' ? selectedMonth : 'Custom Period'}` : 'State Bank of India — Monthly Home Loan Portfolio Report'}
                      </h2>
                      <span style={{ color: '#64748B', fontSize: '14px', fontWeight: 500 }}>
                        Period: {rangeType === 'month' ? report.period : `${customStartDate} to ${customEndDate} · IST`}
                      </span>
                    </div>
                  </div>

                  {/* 3 Metric Summary Cards with Yellow Accent */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
                    <div style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #E2E8F0',
                      borderTop: '3px solid #EEFA26'
                    }}>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', fontWeight: 500, marginBottom: '6px' }}>
                        Total issued loans
                      </span>
                      <div style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A' }}>
                        {report.issuedLoans}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #E2E8F0',
                      borderTop: '3px solid #EEFA26'
                    }}>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', fontWeight: 500, marginBottom: '6px' }}>
                        Total sanctioned amount
                      </span>
                      <div style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A' }}>
                        {report.totalSanctioned}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid #E2E8F0',
                      borderTop: '3px solid #EEFA26'
                    }}>
                      <span style={{ display: 'block', fontSize: '14px', color: '#64748B', fontWeight: 500, marginBottom: '6px' }}>
                        Total disbursed amount
                      </span>
                      <div style={{ fontSize: '28px', fontWeight: 600, color: '#0F172A' }}>
                        {report.totalDisbursed}
                      </div>
                    </div>
                  </div>

                  {/* Performance Chart with Yellow and Black/Slate Palette */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    padding: '22px 24px',
                    marginBottom: '28px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#0F172A', margin: 0 }}>
                        Sanctioned vs Disbursed Comparison
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>
                          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#0F172A' }} />
                          Sanctioned ({report.totalSanctionedWords})
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>
                          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#EEFA26', border: '1px solid #0F172A' }} />
                          Disbursed ({report.totalDisbursedWords})
                        </span>
                      </div>
                    </div>

                    {/* SVG Chart */}
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                      <svg viewBox="0 0 700 220" style={{ width: '100%', minWidth: '550px', height: '220px' }}>
                        <line x1="60" y1="20" x2="680" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="60" y1="60" x2="680" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="60" y1="100" x2="680" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="60" y1="140" x2="680" y2="140" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="60" y1="180" x2="680" y2="180" stroke="#CBD5E1" strokeWidth="1.5" />

                        <text x="50" y="24" textAnchor="end" fontSize="14" fill="#94A3B8">₹4 Cr</text>
                        <text x="50" y="64" textAnchor="end" fontSize="14" fill="#94A3B8">₹3 Cr</text>
                        <text x="50" y="104" textAnchor="end" fontSize="14" fill="#94A3B8">₹2 Cr</text>
                        <text x="50" y="144" textAnchor="end" fontSize="14" fill="#94A3B8">₹1 Cr</text>
                        <text x="50" y="184" textAnchor="end" fontSize="14" fill="#94A3B8">₹0</text>

                        {/* Bar Group 1: Home Purchase */}
                        <rect x="130" y="20" width="34" height="160" rx="4" fill="#0F172A" />
                        <rect x="170" y="60" width="34" height="120" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                        <text x="167" y="202" textAnchor="middle" fontSize="14" fill="#0F172A" fontWeight="500">Home purchase</text>

                        {/* Bar Group 2: Home Construction */}
                        <rect x="330" y="100" width="34" height="80" rx="4" fill="#0F172A" />
                        <rect x="370" y="120" width="34" height="60" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                        <text x="367" y="202" textAnchor="middle" fontSize="14" fill="#0F172A" fontWeight="500">Home construction</text>

                        {/* Bar Group 3: Home Improvement */}
                        <rect x="520" y="132" width="34" height="48" rx="4" fill="#0F172A" />
                        <rect x="560" y="144" width="34" height="36" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                        <text x="557" y="202" textAnchor="middle" fontSize="14" fill="#0F172A" fontWeight="500">Home improvement</text>
                      </svg>
                    </div>
                  </div>

                  {/* Detailed Table */}
                  <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                      <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <tr>
                          <th style={{ padding: '12px 18px', color: '#475569', fontWeight: 500 }}>Category / Purpose</th>
                          <th style={{ padding: '12px 18px', color: '#475569', fontWeight: 500 }}>Counts</th>
                          <th style={{ padding: '12px 18px', color: '#475569', fontWeight: 500 }}>Sanctioned (INR)</th>
                          <th style={{ padding: '12px 18px', color: '#475569', fontWeight: 500 }}>Disbursed (INR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.tableRows.map((r, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '12px 18px', color: '#0F172A' }}>{r.purpose}</td>
                            <td style={{ padding: '12px 18px', color: '#475569' }}>{r.loans}</td>
                            <td style={{ padding: '12px 18px', color: '#0F172A', fontWeight: 500 }}>{r.sanctioned}</td>
                            <td style={{ padding: '12px 18px', color: '#0F172A', fontWeight: 500 }}>{r.disbursed}</td>
                          </tr>
                        ))}
                        <tr style={{ backgroundColor: '#F8FAFC', fontWeight: 600 }}>
                          <td style={{ padding: '12px 18px', color: '#0F172A' }}>Total</td>
                          <td style={{ padding: '12px 18px', color: '#0F172A' }}>{report.totalRow.loans}</td>
                          <td style={{ padding: '12px 18px', color: '#0F172A' }}>{report.totalRow.sanctioned}</td>
                          <td style={{ padding: '12px 18px', color: '#0F172A' }}>{report.totalRow.disbursed}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Right Column: Wellio AI Assistant (450px width, 672px height) */}
            <div style={{
              width: '450px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              height: '672px'
            }}>
              {/* Wellio Chatbot Header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#FFFFFF'
              }}>
                <AriaAvatar size={50} />

                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.2px' }}>
                    Wellio
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748B', marginTop: '2px' }}>
                    Your intelligent banking assistant
                  </div>
                </div>
              </div>

              {/* Chat Stream */}
              <div style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                backgroundColor: '#FAFAFA'
              }}>
                {chatMessages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: m.sender === 'user' ? '82%' : '94%',
                      backgroundColor: msgSenderIsUser(m) ? '#0F172A' : '#FFFFFF',
                      color: msgSenderIsUser(m) ? '#FFFFFF' : '#0F172A',
                      padding: '14px 18px',
                      borderRadius: msgSenderIsUser(m) ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      border: msgSenderIsUser(m) ? 'none' : '1px solid #E2E8F0',
                      boxShadow: msgSenderIsUser(m) ? '0 2px 4px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    {m.sender === 'assistant' && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px'
                      }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
                          Wellio
                        </span>
                        <span style={{ fontSize: '14px', color: '#94A3B8' }}>
                          Just now
                        </span>
                      </div>
                    )}
                    {m.text}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div style={{
                padding: '14px 18px 16px',
                borderTop: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF'
              }}>
                <form
                  onSubmit={handleSendMessage}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '14px',
                    padding: '6px 8px 6px 14px',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocusCapture={(e) => e.currentTarget.style.borderColor = '#0F172A'}
                  onBlurCapture={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
                >
                  <input
                    type="text"
                    placeholder="Ask questions about this report..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      color: '#0F172A'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#EEFA26',
                      color: '#111827',
                      border: 'none',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4F01E'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EEFA26'}
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper for chat bubble sender check
const msgSenderIsUser = (m) => m.sender === 'user';