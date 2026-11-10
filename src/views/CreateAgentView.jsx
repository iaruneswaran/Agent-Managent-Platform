import React, { useState } from 'react';
import { ChevronDown, ArrowRight, FileCheck, BarChart3, Sliders } from 'lucide-react';
import { AppDropdown } from '../components/AppDropdown';

export const CreateAgentView = ({ agentData, onPublish, onCancel }) => {
  const initialType = agentData?.agentType || 
    (agentData?.title?.toLowerCase().includes('report') ? 'report' : 'verification');

  const [agentType, setAgentType] = useState(initialType);

  const [formData, setFormData] = useState({
    name: agentData?.title || 'SBI Customer KYC & Document Verification Agent',
    department: agentData?.department || 'Retail Banking — Compliance & KYC',
    description: agentData?.description || 'Inspects and verifies uploaded customer documents (Aadhaar, PAN, Passport, DL) for authenticity, data extraction, and regulatory KYC compliance.',
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

  const handleSelectTemplate = (type) => {
    setAgentType(type);
    if (type === 'verification') {
      setFormData({
        name: 'SBI Customer KYC & Document Verification Agent',
        department: 'Retail Banking — Compliance & KYC',
        description: 'Inspects and verifies uploaded customer documents (Aadhaar, PAN, Passport, DL) for authenticity, data extraction, and regulatory KYC compliance.',
        responsibility: 'Inspect uploaded identity documents, perform OCR text and photo extraction, validate document number checksums, check for visual tampering or alteration, verify details against KYC guidelines, and flag any discrepancies for human compliance officer approval.'
      });
    } else if (type === 'report') {
      setFormData({
        name: 'SBI Home Loan Monthly Report',
        department: 'Retail Banking — Home Finance',
        description: 'Prepares monthly home-loan counts and disbursement totals for compliance review. Home loans only; excludes auto and land loans.',
        responsibility: 'Summarize the monthly home-loan portfolio, disbursements and repayment performance. Compare results with the previous month and highlight key changes. Use only approved source data, flag missing information and keep recommendations concise. Prepare reports for human review before submission.'
      });
    } else {
      setFormData({
        name: '',
        department: 'Retail Banking',
        description: '',
        responsibility: ''
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDoc = (doc) => {
    setSupportedDocs((prev) => 
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const toggleRule = (id) => {
    setVerificationRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onPublish({
      ...agentData,
      title: formData.name || (agentType === 'verification' ? 'Document Verification Agent' : 'Custom Agent'),
      department: formData.department,
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

  const allAvailableDocs = [
    'Aadhaar Card',
    'PAN Card',
    'Passport',
    'Driving License',
    'Voter ID',
    'Utility Bill',
    'Bank Statement',
    'Salary Slip'
  ];

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

          {/* Section 1: Purpose & Role Selection Cards (Full Width) */}
          <div style={{ marginBottom: '32px', width: '100%' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#0F172A',
              marginBottom: '12px'
            }}>
              Choose Agent Purpose & Role
            </label>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              width: '100%'
            }}>
              {/* Card 1: Document & KYC Verification */}
              <div
                onClick={() => handleSelectTemplate('verification')}
                style={{
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: agentType === 'verification' ? '1.5px solid #1757BF' : '1px solid #E2E8F0',
                  backgroundColor: agentType === 'verification' ? '#F8FAFC' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '110px'
                }}
                onMouseEnter={(e) => {
                  if (agentType !== 'verification') e.currentTarget.style.borderColor = '#CBD5E1';
                }}
                onMouseLeave={(e) => {
                  if (agentType !== 'verification') e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: agentType === 'verification' ? '#1757BF' : '#F1F5F9',
                      color: agentType === 'verification' ? '#FFFFFF' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FileCheck size={17} />
                    </div>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: agentType === 'verification' ? '#1757BF' : '#0F172A'
                    }}>
                      Document & KYC Verification
                    </span>
                  </div>

                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: agentType === 'verification' ? '5px solid #1757BF' : '1.5px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    flexShrink: 0
                  }} />
                </div>

                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Upload documents (PAN, Aadhaar, IDs, Bills) to verify authenticity, OCR data, and compliance.
                </p>
              </div>

              {/* Card 2: Report Generation */}
              <div
                onClick={() => handleSelectTemplate('report')}
                style={{
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: agentType === 'report' ? '1.5px solid #1757BF' : '1px solid #E2E8F0',
                  backgroundColor: agentType === 'report' ? '#F8FAFC' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '110px'
                }}
                onMouseEnter={(e) => {
                  if (agentType !== 'report') e.currentTarget.style.borderColor = '#CBD5E1';
                }}
                onMouseLeave={(e) => {
                  if (agentType !== 'report') e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: agentType === 'report' ? '#1757BF' : '#F1F5F9',
                      color: agentType === 'report' ? '#FFFFFF' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <BarChart3 size={17} />
                    </div>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: agentType === 'report' ? '#1757BF' : '#0F172A'
                    }}>
                      Report Generation
                    </span>
                  </div>

                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: agentType === 'report' ? '5px solid #1757BF' : '1.5px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    flexShrink: 0
                  }} />
                </div>

                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Compiles monthly loan counts, financial disbursement totals, and portfolio reviews.
                </p>
              </div>

              {/* Card 3: Custom Blank Agent */}
              <div
                onClick={() => handleSelectTemplate('custom')}
                style={{
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: agentType === 'custom' ? '1.5px solid #1757BF' : '1px solid #E2E8F0',
                  backgroundColor: agentType === 'custom' ? '#F8FAFC' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '110px'
                }}
                onMouseEnter={(e) => {
                  if (agentType !== 'custom') e.currentTarget.style.borderColor = '#CBD5E1';
                }}
                onMouseLeave={(e) => {
                  if (agentType !== 'custom') e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: agentType === 'custom' ? '#1757BF' : '#F1F5F9',
                      color: agentType === 'custom' ? '#FFFFFF' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Sliders size={17} />
                    </div>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: agentType === 'custom' ? '#1757BF' : '#0F172A'
                    }}>
                      Custom Blank Agent
                    </span>
                  </div>

                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: agentType === 'custom' ? '5px solid #1757BF' : '1.5px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    flexShrink: 0
                  }} />
                </div>

                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Define your own agent title, custom instructions, and custom operational tasks.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {/* Section 2: Form Fields (Balanced 2-Column Grid) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              alignItems: 'start',
              width: '100%',
              marginBottom: '32px'
            }}>
              {/* Left Column: Name, Department, Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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

                {/* Field 2: Department */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#0F172A',
                    marginBottom: '8px'
                  }}>
                    Department
                  </label>
                  <AppDropdown
                    value={formData.department}
                    onChange={(val) => handleChange('department', val)}
                    width="100%"
                    options={[
                      'Retail Banking — Compliance & KYC',
                      'Retail Banking',
                      'Customer Onboarding & Verification',
                      'Retail Banking — Home Finance',
                      'Retail Banking — Vehicle Finance',
                      'Agricultural & Commercial Lending',
                      'Healthcare Operations',
                      'Critical Care Administration'
                    ]}
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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                    height: '216px',
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

            {/* Section 3: Action Buttons Bar */}
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
