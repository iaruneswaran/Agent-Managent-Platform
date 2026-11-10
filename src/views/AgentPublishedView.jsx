import React from 'react';
import { Check, User, Play, Edit2, ShieldCheck, FileCheck, Lock } from 'lucide-react';

export const AgentPublishedView = ({ agentData, onOpenAgent, onBackToList }) => {
  const isVerification = agentData?.agentType === 'verification' || 
    agentData?.type?.toLowerCase().includes('verification') ||
    agentData?.title?.toLowerCase().includes('kyc') ||
    agentData?.title?.toLowerCase().includes('verify');

  return (
    <div className="animate-fade-in" style={{
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      padding: '48px 24px 64px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EDF2F7'
    }}>
      {/* Central Published Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '40px 24px',
        width: '100%',
        maxWidth: '960px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: 'none',
        marginBottom: '20px'
      }}>
        {/* Yellow Success Check Circle */}
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#EEFA26',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '18px'
        }}>
          <Check size={26} color="#0F172A" strokeWidth={2.5} />
        </div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: 500,
          color: '#0F172A',
          letterSpacing: '-0.4px',
          marginBottom: '8px'
        }}>
          Agent published
        </h1>

        <p style={{
          fontSize: '15px',
          color: '#475569',
          lineHeight: 1.6,
          maxWidth: '820px',
          marginBottom: '24px',
          fontWeight: 400
        }}>
          <strong>{agentData?.title || 'SBI Customer KYC & Document Verification Agent'}</strong> is now live and published. {isVerification 
            ? 'Users can now upload customer identity proofs (Aadhaar, PAN, Passport, DL) to run automated authenticity checks, OCR data extraction, and tamper detection before routing for compliance sign-off.'
            : 'It prepares report drafts for the designated reviewer; external submission happens only after approval.'}
        </p>

        {/* Responsibility Card */}
        <div style={{
          width: '100%',
          backgroundColor: '#F8FAFC',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '20px 24px',
          textAlign: 'left',
          marginBottom: '32px'
        }}>
          <span style={{ display: 'block', fontSize: '14px', color: '#64748B', marginBottom: '6px', fontWeight: 500 }}>
            Responsibility & Operational Scope
          </span>
          <span style={{ fontSize: '14px', fontWeight: 400, color: '#0F172A', lineHeight: 1.6, display: 'block' }}>
            {agentData?.responsibility || (isVerification 
              ? 'Inspect uploaded identity documents, perform OCR text and photo extraction, validate document number checksums, check for visual tampering or alteration, verify details against KYC guidelines, and flag any discrepancies for human compliance officer approval.'
              : 'Summarize the monthly home-loan portfolio, disbursements and repayment performance. Compare results with the previous month and highlight key changes. Use only approved source data, flag missing information and keep recommendations concise. Prepare reports for human review before submission.')}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', justifyContent: 'center' }}>
          <button
            onClick={onBackToList}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#475569',
              border: '1px solid #CBD5E1',
              borderRadius: '9999px',
              padding: '14px 24px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: 'none',
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
            Back to agent list
          </button>

          <button
            onClick={onOpenAgent}
            style={{
              backgroundColor: '#EEFA26',
              color: '#111827',
              border: 'none',
              borderRadius: '9999px',
              padding: '14px 24px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'none',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E4F01E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#EEFA26';
            }}
          >
            <span>Open Agent & Use</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* 3 Bottom Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        width: '100%',
        maxWidth: '960px'
      }}>
        {/* Card 1 */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px 26px',
            boxShadow: 'none',
            transition: 'border-color 0.15s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1757BF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            {isVerification ? <ShieldCheck size={22} color="#1757BF" strokeWidth={1.75} /> : <User size={20} color="#1757BF" strokeWidth={1.75} />}
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 500, color: '#0F172A', marginBottom: '6px' }}>
            {isVerification ? 'Verification engine ready' : 'Review is ready'}
          </h4>
          <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
            {isVerification 
              ? 'OCR demographic extraction, QR signature validation, and tamper detection are active for uploaded documents.'
              : 'The agent is configured to route drafts to a designated reviewer for approval before external submission.'}
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px 26px',
            boxShadow: 'none',
            transition: 'border-color 0.15s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1757BF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            {isVerification ? <FileCheck size={22} color="#1757BF" strokeWidth={1.75} /> : <Play size={20} color="#1757BF" strokeWidth={1.75} />}
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 500, color: '#0F172A', marginBottom: '6px' }}>
            {isVerification ? 'Multi-document support' : 'Sample test passed'}
          </h4>
          <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
            {isVerification 
              ? 'Pre-loaded with sample PAN, Aadhaar, and DL proofs to test instant automated verification and fraud detection.'
              : 'Review the saved sample test. Sample results are not evidence of live report accuracy.'}
          </p>
        </div>

        {/* Card 3 */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px 26px',
            boxShadow: 'none',
            transition: 'border-color 0.15s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1757BF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            {isVerification ? <Lock size={22} color="#1757BF" strokeWidth={1.75} /> : <Edit2 size={20} color="#1757BF" strokeWidth={1.75} />}
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 500, color: '#0F172A', marginBottom: '6px' }}>
            {isVerification ? 'Human compliance sign-off' : 'Edit instructions anytime'}
          </h4>
          <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
            {isVerification
              ? 'Compliance reviewers can inspect extracted fields, audit tamper flags, and provide final KYC sign-off.'
              : 'Updated instructions require a new test and review before republication.'}
          </p>
        </div>
      </div>
    </div>
  );
};
