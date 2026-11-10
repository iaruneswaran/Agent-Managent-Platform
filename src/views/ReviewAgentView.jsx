import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Pencil } from 'lucide-react';

export const ReviewAgentView = ({ agentData, onBack, onSaveDraft, onPublish, onEditSection }) => {
  const [hasReviewed, setHasReviewed] = useState(true);

  return (
    <div className="animate-fade-in" style={{ width: '100%', minHeight: 'calc(100vh - 60px)' }}>
      {/* Subnav Breadcrumb and Step Indicator Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#6B7280' }}>
          <span
            onClick={onBack}
            style={{ cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={(e) => e.target.style.color = '#111827'}
            onMouseLeave={(e) => e.target.style.color = '#6B7280'}
          >
            Agents
          </span>
          <span>/</span>
          <span style={{ color: '#111827', fontWeight: 400 }}>{agentData.title}</span>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Completed Step 1 */}
          <div
            onClick={onBack}
            style={{
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Check size={14} strokeWidth={2} />
            <span>Name & purpose</span>
          </div>

          <div style={{ width: '24px', height: '1px', backgroundColor: '#E5E7EB' }} />

          {/* Active Step 3 */}
          <div style={{
            backgroundColor: '#EEFA26',
            color: '#111827',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>3 Review & publish</span>
          </div>
        </div>
      </div>

      {/* Main Review Content */}
      <div style={{
        width: '100%',
        padding: '32px 24px 80px'
      }}>
        {/* Header Title Line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '15px', fontWeight: 400, color: '#374151' }}>
            {agentData.title}
          </span>
          <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 400 }}>
            {agentData.department}
          </span>
        </div>

        <h1 style={{
          fontSize: '26px',
          fontWeight: 400,
          color: '#111827',
          letterSpacing: '-0.4px',
          marginBottom: '8px'
        }}>
          Review your agent before publishing
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#6B7280',
          marginBottom: '32px',
          fontWeight: 400
        }}>
          Check the configuration and review the setup before making the agent available.
        </p>

        {/* Section 1: Name & Purpose */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          padding: '28px 32px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '4px', height: '18px', backgroundColor: '#EEFA26', borderRadius: '2px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#111827' }}>
                Name & purpose
              </h3>
            </div>

            <button
              onClick={onEditSection}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #E5E7EB',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '14px',
                color: '#4B5563',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 400
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>Edit</span>
              <Pencil size={13} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: '16px', fontSize: '15px' }}>
            <span style={{ color: '#6B7280', fontSize: '14px', fontWeight: 400 }}>Agent name</span>
            <span style={{ color: '#111827', fontWeight: 400 }}>{agentData.title}</span>

            <span style={{ color: '#6B7280', fontSize: '14px', fontWeight: 400 }}>Department</span>
            <span style={{ color: '#111827', fontWeight: 400 }}>{agentData.department}</span>

            <span style={{ color: '#6B7280', fontSize: '14px', fontWeight: 400 }}>Purpose</span>
            <span style={{ color: '#111827', lineHeight: 1.55, fontWeight: 400 }}>
              {agentData.reviewPurpose || agentData.purpose}
            </span>
          </div>
        </div>

        {/* Section 2: Instructions */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          padding: '28px 32px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '4px', height: '18px', backgroundColor: '#EEFA26', borderRadius: '2px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 400, color: '#111827' }}>
                Instructions
              </h3>
            </div>

            <button
              onClick={onEditSection}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #E5E7EB',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontSize: '14px',
                color: '#4B5563',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 400
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>Edit</span>
              <Pencil size={13} />
            </button>
          </div>

          <p style={{
            fontSize: '15px',
            color: '#374151',
            lineHeight: 1.6,
            marginBottom: '18px',
            fontWeight: 400
          }}>
            {agentData.instructions}
          </p>

          {/* Inner Callout Box */}
          <div style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Check size={14} color="#059669" strokeWidth={2} />
            </div>
            <span style={{ fontSize: '14px', color: '#374151', fontWeight: 400 }}>
              {agentData.instructionNote}
            </span>
          </div>
        </div>

        {/* Section 3: Human approval required banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          padding: '24px 28px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#FEF9C3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={15} color="#CA8A04" strokeWidth={2} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 400, color: '#111827' }}>
              Human approval required
            </span>
          </div>

          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: 1.6,
            paddingLeft: '30px',
            fontWeight: 400
          }}>
            Every report generated by this agent must be reviewed and approved by a designated officer before it is submitted to any government authority. The agent never submits automatically.
          </p>
        </div>

        {/* Confirmation check item */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 4px',
          marginBottom: '28px'
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}>
            <div
              onClick={() => setHasReviewed(!hasReviewed)}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: hasReviewed ? '#111827' : '#FFFFFF',
                border: hasReviewed ? '1px solid #111827' : '1.5px solid #D1D5DB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s'
              }}
            >
              {hasReviewed && <Check size={12} color="#FFFFFF" strokeWidth={2.5} />}
            </div>
            <span style={{ fontSize: '15px', fontWeight: 400, color: '#111827' }}>
              I have reviewed the configuration and setup.
            </span>
          </label>

          <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 400 }}>
            Ready to publish
          </span>
        </div>

        {/* Bottom Actions Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '24px',
          borderTop: '1px solid #E5E7EB'
        }}>
          <button
            onClick={onBack}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#374151',
              border: '1px solid #D1D5DB',
              borderRadius: '9999px',
              padding: '10px 24px',
              fontSize: '15px',
              fontWeight: 400,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onSaveDraft}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#374151',
                border: '1px solid #D1D5DB',
                borderRadius: '9999px',
                padding: '10px 24px',
                fontSize: '15px',
                fontWeight: 400,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
            >
              Save draft
            </button>

            <button
              onClick={onPublish}
              disabled={!hasReviewed}
              style={{
                backgroundColor: hasReviewed ? '#EEFA26' : '#E5E7EB',
                color: hasReviewed ? '#111827' : '#9CA3AF',
                border: 'none',
                borderRadius: '9999px',
                padding: '11px 28px',
                fontSize: '15px',
                fontWeight: 400,
                cursor: hasReviewed ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: hasReviewed ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                if (hasReviewed) e.currentTarget.style.backgroundColor = '#E4F01E';
              }}
              onMouseLeave={(e) => {
                if (hasReviewed) e.currentTarget.style.backgroundColor = '#EEFA26';
              }}
            >
              <span>Publish agent</span>
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
