import React, { useState, useRef } from 'react';
import { 
  Download, Copy, Check, RotateCw, Calendar, 
  CheckCircle2, Sparkles, ChevronDown, ChevronUp, Sliders,
  ArrowRight
} from 'lucide-react';
import { AppDropdown } from './AppDropdown';
import { AppDateRangePicker } from './AppDateRangePicker';

export const LoanReportChatWidget = ({ initialEnabled = false }) => {
  const [isAgentEnabled, setIsAgentEnabled] = useState(initialEnabled);
  const [isLoadingParams, setIsLoadingParams] = useState(false);
  const [showParams, setShowParams] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [startDate, setStartDate] = useState('2026-10-11');
  const [endDate, setEndDate] = useState('2026-10-30');
  const [loanType, setLoanType] = useState('home'); // 'home' | 'auto' | 'personal'
  const [amountRange, setAmountRange] = useState('5lakh'); // '5lakh' | '10lakh' | 'all'
  const [isRecompiling, setIsRecompiling] = useState(false);
  const [reportCopied, setReportCopied] = useState(false);
  const [recompiledToast, setRecompiledToast] = useState(false);

  const paramsCardRef = useRef(null);

  // Handle toggling the agent on/off
  const handleToggleAgent = () => {
    if (!isAgentEnabled) {
      // Enabling the agent: show line loader first, then reveal parameters
      setIsAgentEnabled(true);
      setIsLoadingParams(true);
      setShowParams(false);
      setShowReport(false);
      setIsLoadingReport(false);

      setTimeout(() => {
        setIsLoadingParams(false);
        setShowParams(true);
      }, 700);
    } else {
      // Disabling the agent: hide all bottom content
      setIsAgentEnabled(false);
      setIsLoadingParams(false);
      setShowParams(false);
      setIsLoadingReport(false);
      setShowReport(false);
    }
  };

  // Handle clicking Continue in Parameters card
  const handleContinue = () => {
    setIsLoadingReport(true);
    setShowReport(false);

    setTimeout(() => {
      setIsLoadingReport(false);
      setShowReport(true);
    }, 800);
  };

  // Dynamic report data based on parameters
  const getReportData = () => {
    if (loanType === 'auto') {
      if (amountRange === '10lakh') {
        return {
          title: 'SBI Auto Loan Monthly Report — Custom Period',
          period: `${startDate} to ${endDate} · IST`,
          issuedLoans: 14,
          totalSanctioned: '₹1,90,00,000',
          totalSanctionedWords: '₹1.90 crore',
          totalDisbursed: '₹1,60,00,000',
          totalDisbursedWords: '₹1.60 crore',
          tableRows: [
            { purpose: 'Sedan & Hatchback loans', loans: 7, sanctioned: '₹85,00,000', disbursed: '₹70,00,000' },
            { purpose: 'SUV & Utility vehicle loans', loans: 4, sanctioned: '₹65,00,000', disbursed: '₹58,00,000' },
            { purpose: 'Electric Vehicle (EV) loans', loans: 3, sanctioned: '₹40,00,000', disbursed: '₹32,00,000' }
          ],
          totalRow: { purpose: 'Total', loans: 14, sanctioned: '₹1,90,00,000', disbursed: '₹1,60,00,000' }
        };
      }
      return {
        title: 'SBI Auto Loan Monthly Report — Custom Period',
        period: `${startDate} to ${endDate} · IST`,
        issuedLoans: 22,
        totalSanctioned: '₹2,60,00,000',
        totalSanctionedWords: '₹2.60 crore',
        totalDisbursed: '₹2,20,00,000',
        totalDisbursedWords: '₹2.20 crore',
        tableRows: [
          { purpose: 'Sedan & Hatchback loans', loans: 12, sanctioned: '₹1,20,00,000', disbursed: '₹1,00,00,000' },
          { purpose: 'SUV & Utility vehicle loans', loans: 6, sanctioned: '₹90,00,000', disbursed: '₹80,00,000' },
          { purpose: 'Electric Vehicle (EV) loans', loans: 4, sanctioned: '₹50,00,000', disbursed: '₹40,00,000' }
        ],
        totalRow: { purpose: 'Total', loans: 22, sanctioned: '₹2,60,00,000', disbursed: '₹2,20,00,000' }
      };
    }
    
    // Default Home Loan as specified by user
    if (amountRange === '10lakh') {
      return {
        title: 'SBI Home Loan Monthly Report — Custom Period',
        period: `${startDate} to ${endDate} · IST`,
        issuedLoans: 14,
        totalSanctioned: '₹6,40,00,000',
        totalSanctionedWords: '₹6.40 crore',
        totalDisbursed: '₹4,80,00,000',
        totalDisbursedWords: '₹4.80 crore',
        tableRows: [
          { purpose: 'Home purchase', loans: 8, sanctioned: '₹3,60,00,000', disbursed: '₹2,70,00,000' },
          { purpose: 'Home construction', loans: 4, sanctioned: '₹1,80,00,000', disbursed: '₹1,35,00,000' },
          { purpose: 'Home improvement', loans: 2, sanctioned: '₹1,00,00,000', disbursed: '₹75,00,000' }
        ],
        totalRow: { purpose: 'Total', loans: 14, sanctioned: '₹6,40,00,000', disbursed: '₹4,80,00,000' }
      };
    }

    return {
      title: 'SBI Home Loan Monthly Report — Custom Period',
      period: `${startDate} to ${endDate} · IST`,
      issuedLoans: 18,
      totalSanctioned: '₹7,20,00,000',
      totalSanctionedWords: '₹7.20 crore',
      totalDisbursed: '₹5,40,00,000',
      totalDisbursedWords: '₹5.40 crore',
      tableRows: [
        { purpose: 'Home purchase', loans: 10, sanctioned: '₹4,00,00,000', disbursed: '₹3,00,00,000' },
        { purpose: 'Home construction', loans: 5, sanctioned: '₹2,00,00,000', disbursed: '₹1,50,00,000' },
        { purpose: 'Home improvement', loans: 3, sanctioned: '₹1,20,00,000', disbursed: '₹90,00,000' }
      ],
      totalRow: { purpose: 'Total', loans: 18, sanctioned: '₹7,20,00,000', disbursed: '₹5,40,00,000' }
    };
  };

  const report = getReportData();

  const handleRecompile = () => {
    setIsRecompiling(true);
    setRecompiledToast(false);
    setTimeout(() => {
      setIsRecompiling(false);
      setRecompiledToast(true);
      setTimeout(() => setRecompiledToast(false), 2400);
    }, 700);
  };

  const handleCopyReport = () => {
    const textToCopy = `SBI Home Loan Monthly Report — Custom Period
Period: ${startDate} to ${endDate} · IST
Total issued loans: ${report.issuedLoans}
Total sanctioned amount: ${report.totalSanctioned}
Total disbursed amount: ${report.totalDisbursed}

Category / Purpose | Counts | Sanctioned (INR) | Disbursed (INR)
${report.tableRows.map(r => `${r.purpose} | ${r.loans} | ${r.sanctioned} | ${r.disbursed}`).join('\n')}
Total | ${report.totalRow.loans} | ${report.totalRow.sanctioned} | ${report.totalRow.disbursed}`;

    navigator.clipboard.writeText(textToCopy);
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 1800);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Category / Purpose,Counts,Sanctioned (INR),Disbursed (INR)\n"
      + report.tableRows.map(r => `"${r.purpose}",${r.loans},"${r.sanctioned}","${r.disbursed}"`).join("\n")
      + `\n"${report.totalRow.purpose}",${report.totalRow.loans},"${report.totalRow.sanctioned}","${report.totalRow.disbursed}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SBI_Loan_Report_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div style={{
      width: '100%',
      marginTop: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      position: 'relative',
      zIndex: 20
    }}>
      {/* Inject Keyframe animation for Line Loading */}
      <style>{`
        @keyframes chatLineLoadingAnim {
          0% { left: -35%; width: 35%; }
          50% { left: 25%; width: 50%; }
          100% { left: 100%; width: 35%; }
        }
      `}</style>

      {/* ======================================================== */}
      {/* 1. AGENT RECOMMENDATION CARD WITH TOGGLE BUTTON          */}
      {/* ======================================================== */}
      <div>
        {/* Section Heading above the box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          padding: '0 2px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={15} color="#1757BF" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.1px' }}>
              Required Agent for this Task
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Matched from created agents
          </span>
        </div>

        <div style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '18px 20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            {/* Agent Information */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
                SBI Home Loan Monthly Report
              </div>

              <p style={{
                fontSize: '13px',
                color: '#64748B',
                margin: '3px 0 0',
                lineHeight: 1.45
              }}>
                Prepares monthly home loan counts, sanctioned amounts, and disbursed totals for compliance review using standardized bank formulas.
              </p>
            </div>

            {/* TOGGLE SWITCH FOR ENABLING THE AGENT */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              padding: '8px 14px',
              borderRadius: '9999px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: isAgentEnabled ? '#0F172A' : '#64748B'
              }}>
                Agent enabled
              </span>

              <button
                type="button"
                onClick={handleToggleAgent}
                title={isAgentEnabled ? 'Click to disable agent' : 'Click to enable agent'}
                style={{
                  width: '44px',
                  height: '24px',
                  backgroundColor: isAgentEnabled ? '#1757BF' : '#CBD5E1',
                  borderRadius: '9999px',
                  position: 'relative',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  padding: 0,
                  outline: 'none',
                  flexShrink: 0
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: isAgentEnabled ? '23px' : '3px',
                  transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>
          </div>

          {!isAgentEnabled && (
            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #E2E8F0',
              fontSize: '13px',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>Agent is currently inactive. Toggle the switch to enable this agent and configure report parameters.</span>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. LINE LOADING INDICATOR FOR PARAMETERS                 */}
      {/* ======================================================== */}
      {isLoadingParams && (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }} className="animate-fade-in">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500,
              color: '#1757BF'
            }}>
              <Sparkles size={14} />
              Configuring Report Parameters & Criteria...
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>
              Please wait...
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '3px',
            backgroundColor: '#EFF6FF',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              backgroundColor: '#1757BF',
              borderRadius: '9999px',
              animation: 'chatLineLoadingAnim 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite'
            }} />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. PARAMETERS CONFIGURATION (Visible after line loading) */}
      {/* ======================================================== */}
      {isAgentEnabled && showParams && (
        <div 
          ref={paramsCardRef}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            position: 'relative',
            zIndex: 50,
            overflow: 'visible'
          }} 
          className="animate-fade-in"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={16} color="#1757BF" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>
                Report Parameters & Criteria
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Live query filters applied to portfolio
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '14px',
            position: 'relative',
            zIndex: 60,
            overflow: 'visible'
          }}>
            {/* Date Selection Range */}
            <div style={{ position: 'relative', zIndex: 30 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#475569', marginBottom: '6px' }}>
                Date Selection Range
              </label>
              <AppDateRangePicker
                startDate={startDate}
                endDate={endDate}
                width="100%"
                height="35px"
                size="sm"
                onChange={({ startDate: s, endDate: e }) => {
                  setStartDate(s);
                  setEndDate(e);
                }}
              />
            </div>

            {/* Which Loan Report is Generated */}
            <div style={{ position: 'relative', zIndex: 25 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#475569', marginBottom: '6px' }}>
                Loan Report Type
              </label>
              <AppDropdown
                value={loanType}
                onChange={(val) => setLoanType(val)}
                options={[
                  { value: 'home', label: 'Home loan' },
                  { value: 'auto', label: 'Auto loan' }
                ]}
                width="100%"
                height="35px"
                size="sm"
              />
            </div>

            {/* Loan Amount Range */}
            <div style={{ position: 'relative', zIndex: 20 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#475569', marginBottom: '6px' }}>
                Loan Amount Range
              </label>
              <AppDropdown
                value={amountRange}
                onChange={(val) => setAmountRange(val)}
                options={[
                  { value: '5lakh', label: '₹5L and above' },
                  { value: '10lakh', label: '₹10L and above' },
                  { value: 'all', label: 'All amounts' }
                ]}
                width="100%"
                height="35px"
                size="sm"
              />
            </div>
          </div>

          {/* Continue Button Row */}
          <div style={{
            marginTop: '16px',
            paddingTop: '14px',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            position: 'relative',
            zIndex: 10
          }}>
            <button
              type="button"
              onClick={handleContinue}
              style={{
                backgroundColor: '#1757BF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 1px 3px rgba(23, 87, 191, 0.25)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#134699'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1757BF'}
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. LINE LOADING INDICATOR FOR REPORT GENERATION          */}
      {/* ======================================================== */}
      {isLoadingReport && (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }} className="animate-fade-in">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500,
              color: '#1757BF'
            }}>
              <Sparkles size={14} />
              Compiling SBI loan portfolio analytics & audit data...
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>
              Please wait...
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '3px',
            backgroundColor: '#EFF6FF',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              backgroundColor: '#1757BF',
              borderRadius: '9999px',
              animation: 'chatLineLoadingAnim 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite'
            }} />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. REPORT PREVIEW (Shown ONLY after Continue is clicked) */}
      {/* ======================================================== */}
      {isAgentEnabled && showReport && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          position: 'relative',
          zIndex: 10
        }} className="animate-fade-in">
          {/* Top Bar with Period & Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {/* Left: Date Display & Change Parameters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: '#F1F5F9',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#334155'
              }}>
                <Calendar size={13} color="#64748B" />
                <span>{startDate} to {endDate}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  paramsCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                style={{
                  backgroundColor: '#F1F5F9',
                  color: '#334155',
                  border: '1px solid #E2E8F0',
                  borderRadius: '9999px',
                  padding: '6px 13px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E2E8F0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
              >
                Change parameters
              </button>
            </div>

            {/* Right: PDF, CSV, Re-compile, Copy */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleExportPDF}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9999px',
                  padding: '6px 13px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
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
                type="button"
                onClick={handleExportCSV}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9999px',
                  padding: '6px 13px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
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
                type="button"
                onClick={handleRecompile}
                title="Re-compile report"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9999px',
                  padding: '6px 13px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
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
                <RotateCw size={13} className={isRecompiling ? 'animate-spin' : ''} />
                <span>Re-compile</span>
              </button>

              <button
                type="button"
                onClick={handleCopyReport}
                style={{
                  backgroundColor: '#EEFA26',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#111827',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4F01E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EEFA26'}
              >
                {reportCopied ? <Check size={13} color="#111827" /> : <Copy size={13} />}
                <span>{reportCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Report Recompiled Notification */}
          {recompiledToast && (
            <div style={{
              backgroundColor: '#F0FDF4',
              borderBottom: '1px solid #BBF7D0',
              padding: '8px 18px',
              fontSize: '13px',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle2 size={14} />
              <span>Report parameters re-compiled successfully for {startDate} to {endDate}.</span>
            </div>
          )}

          {/* Report Body */}
          <div style={{ padding: '22px 20px', backgroundColor: '#FFFFFF' }}>
            {/* Report Header Title */}
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', margin: 0 }}>
                  {report.title}
                </h2>
                <span style={{ color: '#64748B', fontSize: '13px', fontWeight: 500 }}>
                  Period: {report.period}
                </span>
              </div>
            </div>

            {/* 3 Metric Summary Cards with Yellow Accent */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '14px',
              marginBottom: '22px'
            }}>
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                padding: '16px 18px',
                border: '1px solid #E2E8F0',
                borderTop: '3px solid #EEFA26'
              }}>
                <span style={{ display: 'block', fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '4px' }}>
                  Total issued loans
                </span>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#0F172A' }}>
                  {report.issuedLoans}
                </div>
              </div>

              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                padding: '16px 18px',
                border: '1px solid #E2E8F0',
                borderTop: '3px solid #EEFA26'
              }}>
                <span style={{ display: 'block', fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '4px' }}>
                  Total sanctioned amount
                </span>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#0F172A' }}>
                  {report.totalSanctioned}
                </div>
              </div>

              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                padding: '16px 18px',
                border: '1px solid #E2E8F0',
                borderTop: '3px solid #EEFA26'
              }}>
                <span style={{ display: 'block', fontSize: '13px', color: '#64748B', fontWeight: 500, marginBottom: '4px' }}>
                  Total disbursed amount
                </span>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#0F172A' }}>
                  {report.totalDisbursed}
                </div>
              </div>
            </div>

            {/* Performance Chart with Yellow and Slate Palette */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '18px 20px',
              marginBottom: '22px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', margin: 0 }}>
                  Sanctioned vs Disbursed Comparison
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#0F172A' }} />
                    Sanctioned ({report.totalSanctionedWords})
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>
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

                  <text x="50" y="24" textAnchor="end" fontSize="13" fill="#94A3B8">₹4 Cr</text>
                  <text x="50" y="64" textAnchor="end" fontSize="13" fill="#94A3B8">₹3 Cr</text>
                  <text x="50" y="104" textAnchor="end" fontSize="13" fill="#94A3B8">₹2 Cr</text>
                  <text x="50" y="144" textAnchor="end" fontSize="13" fill="#94A3B8">₹1 Cr</text>
                  <text x="50" y="184" textAnchor="end" fontSize="13" fill="#94A3B8">₹0</text>

                  {loanType === 'auto' ? (
                    <>
                      {/* Sedan / Hatchback */}
                      <rect x="130" y="80" width="34" height="100" rx="4" fill="#0F172A" />
                      <rect x="170" y="100" width="34" height="80" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                      <text x="167" y="202" textAnchor="middle" fontSize="13" fill="#0F172A" fontWeight="500">Sedan / Hatchback</text>

                      {/* SUV / Utility */}
                      <rect x="330" y="110" width="34" height="70" rx="4" fill="#0F172A" />
                      <rect x="370" y="120" width="34" height="60" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                      <text x="367" y="202" textAnchor="middle" fontSize="13" fill="#0F172A" fontWeight="500">SUV & Utility</text>

                      {/* EV Loans */}
                      <rect x="520" y="140" width="34" height="40" rx="4" fill="#0F172A" />
                      <rect x="560" y="148" width="34" height="32" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                      <text x="557" y="202" textAnchor="middle" fontSize="13" fill="#0F172A" fontWeight="500">EV Vehicles</text>
                    </>
                  ) : (
                    <>
                      {/* Bar Group 1: Home Purchase */}
                      <rect x="130" y="20" width="34" height="160" rx="4" fill="#0F172A" />
                      <rect x="170" y="60" width="34" height="120" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                      <text x="167" y="202" textAnchor="middle" fontSize="13" fill="#0F172A" fontWeight="500">Home purchase</text>

                      {/* Bar Group 2: Home Construction */}
                      <rect x="330" y="100" width="34" height="80" rx="4" fill="#0F172A" />
                      <rect x="370" y="120" width="34" height="60" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                      <text x="367" y="202" textAnchor="middle" fontSize="13" fill="#0F172A" fontWeight="500">Home construction</text>

                      {/* Bar Group 3: Home Improvement */}
                      <rect x="520" y="132" width="34" height="48" rx="4" fill="#0F172A" />
                      <rect x="560" y="144" width="34" height="36" rx="4" fill="#EEFA26" stroke="#0F172A" strokeWidth="1" />
                      <text x="557" y="202" textAnchor="middle" fontSize="13" fill="#0F172A" fontWeight="500">Home improvement</text>
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Detailed Table */}
            <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
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
    </div>
  );
};

