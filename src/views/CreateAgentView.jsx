import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AppDropdown } from '../components/AppDropdown';

export const CreateAgentView = ({ agentData, onPublish, onCancel }) => {
  const getInitialTask = () => {
    if (agentData?.task) return agentData.task;
    if (
      agentData?.agentType === 'chat' ||
      agentData?.title?.toLowerCase().includes('chat') ||
      agentData?.title?.toLowerCase().includes('ask anything')
    ) {
      return 'AI Chat Assistant (Ask Anything / Conversation)';
    }
    if (
      agentData?.agentType === 'verification' || 
      agentData?.title?.toLowerCase().includes('kyc') || 
      agentData?.title?.toLowerCase().includes('verification')
    ) {
      return 'Document & KYC Verification';
    }
    if (
      agentData?.title?.toLowerCase().includes('discharge') || 
      agentData?.title?.toLowerCase().includes('hospital') ||
      agentData?.title?.toLowerCase().includes('icu')
    ) {
      return 'Hospital Discharge & Clinical Audit';
    }
    if (
      agentData?.title?.toLowerCase().includes('report') || 
      agentData?.title?.toLowerCase().includes('loan')
    ) {
      return 'Report Generation';
    }
    return 'Document & KYC Verification';
  };

  const initialType = agentData?.agentType || 
    (agentData?.title?.toLowerCase().includes('report') ? 'report' : 'verification');

  const [agentType, setAgentType] = useState(initialType);

  const [formData, setFormData] = useState({
    task: getInitialTask(),
    name: agentData?.title || 'SBI Customer KYC & Document Verification Agent',
    department: agentData?.department || 'Retail Banking — Compliance & KYC',
    description: agentData?.description || 'Inspects and verifies uploaded customer documents (PAN, Aadhaar, IDs, Bills) to verify authenticity, OCR data, and compliance.',
    responsibility: agentData?.responsibility || 'Inspect uploaded identity documents, perform OCR text and photo extraction, validate document number checksums, check for visual tampering or alteration, verify details against KYC guidelines, and flag any discrepancies for human compliance officer approval.'
  });

  const [supportedDocs, setSupportedDocs] = useState(
    agentData?.supportedDocs || ['Aadhaar Card', 'PAN Card', 'Passport', 'Driving License', 'Voter ID', 'Utility Bill', 'Bank Statement', 'Salary Slip']
  );

  const [verificationRules, setVerificationRules] = useState([
    { id: 'ocr', label: 'OCR Demographic Extraction (Name, ID, DOB, Address)', checked: true },
    { id: 'checksum', label: 'National ID Algorithm & Checksum Verification (Verhoeff / NSDL)', checked: true },
    { id: 'tamper', label: 'Digital Tamper & Alteration Detection (Pixel & Font Splicing)', checked: true },
    { id: 'qr', label: 'Cryptographic QR Code & Digital Signature Validation', checked: true },
    { id: 'human', label: 'Mandatory Human Compliance Reviewer Sign-Off', checked: true }
  ]);

  const TASK_OPTIONS = [
    'AI Chat Assistant (Ask Anything / Conversation)',
    'Document & KYC Verification',
    'Report Generation',
    'Loan Disbursement & Sanction Audit',
    'Hospital Discharge & Clinical Audit',
    'Custom Blank Agent'
  ];

  const handleTaskChange = (selectedTask) => {
    if (selectedTask === 'AI Chat Assistant (Ask Anything / Conversation)') {
      setAgentType('chat');
      setFormData((prev) => ({
        ...prev,
        task: selectedTask,
        name: 'Ask Anything — AI Chat Assistant',
        department: 'Enterprise AI & Knowledge',
        description: 'Conversational assistant like ChatGPT. Ask anything about banking, loans, KYC compliance, customer queries, and general knowledge.',
        responsibility: 'Provide interactive, conversational responses, explanations, drafting, and calculations without image or video clutter.'
      }));
    } else if (selectedTask === 'Document & KYC Verification') {
      setAgentType('verification');
      setFormData((prev) => ({
        ...prev,
        task: selectedTask,
        name: 'SBI Customer KYC & Document Verification Agent',
        department: 'Retail Banking — Compliance & KYC',
        description: 'Inspects and verifies uploaded customer documents (PAN, Aadhaar, IDs, Bills) to verify authenticity, OCR data, and compliance.',
        responsibility: 'Inspect uploaded identity documents, perform OCR text and photo extraction, validate document number checksums, check for visual tampering or alteration, verify details against KYC guidelines, and flag any discrepancies for human compliance officer approval.'
      }));
    } else if (selectedTask === 'Report Generation') {
      setAgentType('report');
      setFormData((prev) => ({
        ...prev,
        task: selectedTask,
        name: 'SBI Home Loan Monthly Report',
        department: 'Retail Banking — Home Finance',
        description: 'Compiles monthly loan counts, financial disbursement totals, and portfolio reviews.',
        responsibility: 'Summarize the monthly home-loan portfolio, disbursements and repayment performance. Compare results with the previous month and highlight key changes. Use only approved source data, flag missing information and keep recommendations concise. Prepare reports for human review before submission.'
      }));
    } else if (selectedTask === 'Loan Disbursement & Sanction Audit') {
      setAgentType('report');
      setFormData((prev) => ({
        ...prev,
        task: selectedTask,
        name: 'SBI Loan Disbursement & Sanctions Audit Agent',
        department: 'Agricultural & Commercial Lending',
        description: 'Compiles and cross-verifies monthly loan disbursement totals, sanction limits, and interest margins across branches.',
        responsibility: 'Track sanctioned credit facilities, calculate monthly disbursed loan totals, identify high-exposure accounts, compare with previous quarter metrics, and flag compliance audit deviations.'
      }));
    } else if (selectedTask === 'Hospital Discharge & Clinical Audit') {
      setAgentType('report');
      setFormData((prev) => ({
        ...prev,
        task: selectedTask,
        name: 'Apollo Hospital — Inpatient Discharge Summary',
        department: 'Healthcare Operations',
        description: 'Prepares weekly inpatient discharge summaries and bed occupancy reviews for authorized hospital reviewers.',
        responsibility: 'Summarize weekly inpatient discharge counts, clinical reviewer approvals, and physician sign-offs. Validate medical record completeness before final archiving.'
      }));
    } else if (selectedTask === 'Custom Blank Agent') {
      setAgentType('custom');
      setFormData((prev) => ({
        ...prev,
        task: selectedTask,
        name: '',
        department: 'Custom Operations',
        description: '',
        responsibility: ''
      }));
    } else {
      setFormData((prev) => ({ ...prev, task: selectedTask }));
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onPublish({
      ...agentData,
      title: formData.name || (agentType === 'verification' ? 'Document Verification Agent' : 'Custom Agent'),
      task: formData.task,
      department: formData.task,
      description: formData.description,
      responsibility: formData.responsibility,
      purpose: formData.description,
      agentType: agentType,
      type: agentType === 'verification' ? 'Document Verification' : 'Monthly Report',
      supportedDocs: supportedDocs,
      verificationRules: verificationRules.filter(r => r.checked).map(r => r.label),
      status: 'Published'
    });
  };

  return (
    <div className="animate-fade-in" style={{ width: '100%', minHeight: 'calc(100vh - 64px)', backgroundColor: '#EDF2F7' }}>
      {/* Header Container */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        width: '100%',
        padding: '24px 24px'
      }}>
        {/* Breadcrumb Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#6B7280',
          marginBottom: '14px'
        }}>
          <span
            onClick={onCancel}
            style={{ cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={(e) => e.target.style.color = '#111827'}
            onMouseLeave={(e) => e.target.style.color = '#6B7280'}
          >
            Agents
          </span>
          <span>/</span>
          <span style={{ color: '#111827', fontWeight: 500 }}>Create new agent</span>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 500,
            color: '#111827',
            letterSpacing: '-0.4px',
            marginBottom: '4px'
          }}>
            Create Agent
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: 0
          }}>
            Configure a specialized assistant for a specific business responsibility.
          </p>
        </div>
      </div>

      {/* Main Full-Width Content Canvas */}
      <div style={{ padding: '32px 24px 64px', width: '100%' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '36px 24px',
          width: '100%'
        }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {/* Section: Form Fields (Balanced 2-Column Grid) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              alignItems: 'start',
              width: '100%',
              marginBottom: '32px'
            }}>
              {/* Left Column: Name, Select Agent (What to be done), Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Field 1: Agent Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#0F172A',
                    marginBottom: '8px'
                  }}>
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    placeholder="Enter agent title..."
                    onChange={(e) => handleChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '14px',
                      color: '#0F172A',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1757BF'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>

                {/* Field 2: Select Agent (What to be done) */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#0F172A',
                    marginBottom: '8px'
                  }}>
                    Select Agent (What to be done)
                  </label>
                  <AppDropdown
                    value={formData.task}
                    onChange={handleTaskChange}
                    width="100%"
                    options={TASK_OPTIONS}
                  />
                </div>

                {/* Field 3: Description */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#0F172A',
                    marginBottom: '8px'
                  }}>
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    placeholder="Short summary of what this agent performs..."
                    onChange={(e) => handleChange('description', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '14px',
                      color: '#0F172A',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1757BF'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>
              </div>

              {/* Right Column: Responsibility & Instructions */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '249px', maxHeight: '249px', alignSelf: 'start', boxSizing: 'border-box' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#0F172A',
                  marginBottom: '8px'
                }}>
                  Responsibility & Instructions
                </label>
                <textarea
                  value={formData.responsibility}
                  placeholder="Describe the tasks this agent should perform, how it should respond, and any business guidelines it should follow..."
                  onChange={(e) => handleChange('responsibility', e.target.value)}
                  style={{
                    width: '100%',
                    flex: 1,
                    minHeight: 0,
                    boxSizing: 'border-box',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#0F172A',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1757BF'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                />
              </div>
            </div>

            {/* Action Buttons Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              borderTop: '1px solid #F1F5F9',
              paddingTop: '20px'
            }}>
              <button
                type="button"
                onClick={onCancel}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#F8FAFC';
                  e.target.style.borderColor = '#94A3B8';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF';
                  e.target.style.borderColor = '#CBD5E1';
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  backgroundColor: '#EEFA26',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'none',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4F01E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EEFA26'}
              >
                <span>Publish agent</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
