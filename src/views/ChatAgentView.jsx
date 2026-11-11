import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, MessageSquare, ArrowUp, ArrowLeft, 
  Copy, Check, RotateCcw, ThumbsUp, ThumbsDown, Trash2, 
  Bot, Sparkles, User, Share2
} from 'lucide-react';
import { AriaAvatar } from '../components/AriaAvatar';
import { LoanReportChatWidget } from '../components/LoanReportChatWidget';

const DEFAULT_CONVERSATIONS = [
  {
    id: 'conv-1',
    title: 'Generate loan report',
    updatedAt: 'Today',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Generate loan report'
      },
      {
        id: 'm2',
        sender: 'assistant',
        text: `I analyzed your request. To generate and compile this loan report with disbursement analytics and compliance checks, the platform matches your requirement to the pre-built SBI Home Loan Monthly Report agent.

This agent is already created and published under the Retail Banking — Home Finance department. It automates monthly portfolio summaries, calculates sanctioned versus disbursed amounts, and prepares structured reports for human sign-off.

You can enable this agent below to set parameters and generate your custom report directly in the chat:`,
        hasLoanAgentWidget: true
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'How does the KYC agent work?',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 'm3',
        sender: 'user',
        text: 'Hi! I am new here. Can you explain what the SBI Customer KYC and Document Verification Agent does and how it handles uploaded IDs?'
      },
      {
        id: 'm4',
        sender: 'assistant',
        text: `Welcome! The SBI Customer KYC and Document Verification Agent is an automated compliance assistant designed to streamline identity verification and audit customer proofs.

When a customer uploads an ID like Aadhaar, PAN, Passport, or Driving License, the agent immediately performs OCR data extraction to read the full legal name, ID number, date of birth, father name, and permanent address.

Next, it verifies official checksum algorithms including the Verhoeff algorithm for Aadhaar and NSDL entity format for PAN, and checks cryptographic QR signatures.

It also inspects pixel integrity to detect font splicing, digital manipulation, and photo alterations before cross-checking the extracted details against the applicant existing SBI core banking records.

Finally, it prepares a clean audit summary and flags any discrepancies for mandatory human compliance reviewer sign-off before granting clearance.

Would you like to test a sample document or see how reports are reviewed?`
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'How to create a custom agent?',
    updatedAt: '3 days ago',
    messages: [
      {
        id: 'm5',
        sender: 'user',
        text: 'How do I create a new custom agent for my division?'
      },
      {
        id: 'm6',
        sender: 'assistant',
        text: `Creating a new agent takes just a few simple steps.

First, click Create agent on the top right of your agent dashboard.

Next, choose the operational task from the dropdown, such as Document and KYC Verification, Report Generation, Clinical Audit, AI Chat, or Custom Blank Agent.

Then enter the title, operational description, and specific guidelines for the agent.

Finally, click Publish agent to make it immediately active for your authorized workspace.`
      }
    ]
  }
];

const STARTER_PROMPTS = [
  {
    icon: '📊',
    title: 'Generate loan report',
    prompt: 'Generate loan report'
  },
  {
    icon: '🤖',
    title: 'What does the KYC agent do?',
    prompt: 'Can you explain what the SBI Customer KYC and Document Verification Agent does and how it verifies documents?'
  },
  {
    icon: '🛠️',
    title: 'How do I create a new agent?',
    prompt: 'How do I create and publish a new specialized agent for my department?'
  },
  {
    icon: '🛡️',
    title: 'What is human review sign-off?',
    prompt: 'Why does the platform require mandatory human compliance review before final approval?'
  }
];

export const ChatAgentView = ({ agentData, onBackToList }) => {
  const [conversations, setConversations] = useState(DEFAULT_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, isTyping]);

  // Adjust textarea height dynamically
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const handleStartNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = {
      id: newId,
      title: 'New conversation',
      updatedAt: 'Just now',
      messages: []
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const handleDeleteConv = (e, convId) => {
    e.stopPropagation();
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== convId);
      if (filtered.length === 0) {
        const fresh = {
          id: `conv-${Date.now()}`,
          title: 'New conversation',
          updatedAt: 'Just now',
          messages: []
        };
        setActiveConvId(fresh.id);
        return [fresh];
      }
      if (activeConvId === convId) {
        setActiveConvId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query
    };

    // Update conversation title if first message
    const isFirstMessage = !activeConv.messages || activeConv.messages.length === 0;
    const updatedTitle = isFirstMessage 
      ? (query.length > 34 ? `${query.slice(0, 34)}...` : query)
      : activeConv.title;

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            title: updatedTitle,
            updatedAt: 'Just now',
            messages: [...(c.messages || []), userMsg]
          };
        }
        return c;
      })
    );

    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsTyping(true);

    // Simulate conversational intelligent response
    setTimeout(() => {
      let replyData = generateBotReply(query);
      const botMsg = typeof replyData === 'string'
        ? {
            id: `b-${Date.now()}`,
            sender: 'assistant',
            text: replyData
          }
        : {
            id: `b-${Date.now()}`,
            sender: 'assistant',
            ...replyData
          };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvId) {
            return {
              ...c,
              messages: [...(c.messages || []), botMsg]
            };
          }
          return c;
        })
      );
      setIsTyping(false);
    }, 850);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const cleanText = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^[\s]*-\s+/gm, '')
      .replace(/^[\s]*\d+\.\s+/gm, '');
  };

  const generateBotReply = (query) => {
    const q = query.toLowerCase();

    if (q.includes('loan') || q.includes('disbursement') || q.includes('analys') || (q.includes('report') && (q.includes('generate') || q.includes('what agent') || q.includes('home') || q.includes('auto')))) {
      return {
        text: `I analyzed your request. To generate and compile this loan report with disbursement analytics and compliance checks, the platform matches your requirement to the pre-built SBI Home Loan Monthly Report agent.

This agent is already created and published under the Retail Banking — Home Finance department. It automates monthly portfolio summaries, calculates sanctioned versus disbursed amounts, and prepares structured reports for human sign-off.

You can enable this agent below to set parameters and generate your custom report directly in the chat:`,
        hasLoanAgentWidget: true
      };
    }

    if (q.includes('kyc') || q.includes('document') || q.includes('verification') || q.includes('pan') || q.includes('aadhaar')) {
      return `The SBI Customer KYC and Document Verification Agent is an automated compliance assistant that helps branch and digital operations teams.

It immediately scans uploaded customer identity proofs like Aadhaar, PAN, Passport, and Driving License, extracting key demographic fields such as full name, document number, date of birth, and address.

It validates statutory checksum algorithms, including the Verhoeff algorithm for Aadhaar and NSDL syntax for PAN, and checks for font inconsistencies or photo alteration.

All details are automatically cross-referenced with existing SBI core banking records to ensure an exact match. Once checked, it compiles an audit report and routes it to an authorized compliance reviewer for final sign-off.`;
    }

    if (q.includes('create') || q.includes('new agent') || q.includes('custom') || q.includes('how to')) {
      return `To create a new agent on this platform, click the Create agent button on your dashboard.

Under the Select Agent dropdown, pick what the agent should do, such as Document and KYC Verification, Report Generation, Loan Disbursement Audit, or AI Chat Assistant.

Add the agent title, description, and instructions for how it should perform its duties.

Click Publish agent to deploy it directly to your workspace.`;
    }

    return `Agents on this platform are specialized assistants configured for specific business responsibilities, such as verifying identity documents, compiling loan reports, or answering banking inquiries.

All agents follow a human-in-the-loop workflow where automated checks and draft reports pause for mandatory reviewer sign-off before final clearance or submission.

Let me know if you would like more details about any specific agent on the platform.`;
  };

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: 'calc(100vh - 64px)',
      backgroundColor: '#FFFFFF',
      color: '#0F172A',
      overflow: 'hidden',
      fontFamily: 'inherit'
    }}>
      {/* ======================================================== */}
      {/* LEFT SIDEBAR (Clean White Style)                         */}
      {/* ======================================================== */}
      <div style={{
        width: sidebarOpen ? '260px' : '0px',
        backgroundColor: '#FFFFFF',
        color: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        flexShrink: 0,
        borderRight: '1px solid #E2E8F0'
      }}>
        {/* Sidebar Top: Back to Agents & New Chat */}
        <div style={{ padding: '14px 12px 10px', width: '260px' }}>
          {/* Back button */}
          <button
            type="button"
            onClick={onBackToList}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 12px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#475569',
              border: 'none',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              marginBottom: '10px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.color = '#0F172A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#475569';
            }}
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>

          {/* New Chat Button */}
          <button
            type="button"
            onClick={handleStartNewChat}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              color: '#0F172A',
              border: '1px solid #E2E8F0',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#EFF6FF';
              e.currentTarget.style.borderColor = '#1757BF';
              e.currentTarget.style.color = '#1757BF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.color = '#0F172A';
            }}
          >
            <Plus size={16} />
            <span>New chat</span>
          </button>
        </div>

        {/* Sidebar Middle: Conversation History List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 10px',
          width: '260px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#64748B', padding: '8px 8px 6px' }}>
            Recent conversations
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {conversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 10px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                    border: isActive ? '1px solid #DBEAFE' : '1px solid transparent',
                    color: isActive ? '#1757BF' : '#334155',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.color = '#0F172A';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#334155';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                    <MessageSquare size={14} color={isActive ? '#1757BF' : '#94A3B8'} style={{ flexShrink: 0 }} />
                    <span style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: isActive ? 600 : 400
                    }}>
                      {conv.title}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleDeleteConv(e, conv.id)}
                    title="Delete chat"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '3px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isActive ? 1 : 0.4,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#EF4444';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#94A3B8';
                      e.currentTarget.style.opacity = isActive ? '1' : '0.4';
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Bottom: User Profile */}
        <div style={{
          padding: '14px 14px',
          borderTop: '1px solid #E2E8F0',
          width: '260px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#EEFA26',
            color: '#0F172A',
            fontWeight: 600,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0'
          }}>
            W
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
            Ask Wellio
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN CHAT AREA                                           */}
      {/* ======================================================== */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        minWidth: 0
      }}>
        {/* Top Header Bar */}
        <div style={{
          height: '56px',
          borderBottom: '1px solid #E5E7EB',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexShrink: 0,
          backgroundColor: '#FFFFFF',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleShare}
              style={{
                backgroundColor: shared ? '#F0FDF4' : '#FFFFFF',
                border: shared ? '1px solid #BBF7D0' : '1px solid #E5E7EB',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 500,
                color: shared ? '#166534' : '#374151',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!shared) e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                if (!shared) e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              {shared ? <Check size={14} color="#166534" /> : <Share2 size={14} />}
              <span>{shared ? 'Link copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Message Stream Area */}
        <div style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '24px 20px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: '1000px' }}>
            {/* If Conversation is Empty: Show ChatGPT Welcome Hero */}
            {(!activeConv?.messages || activeConv.messages.length === 0) ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: '60px'
              }}>
                {/* Large Logo */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  backgroundColor: '#1757BF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  marginBottom: '20px'
                }}>
                  <Sparkles size={32} />
                </div>

                <h1 style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#0F172A',
                  letterSpacing: '-0.5px',
                  margin: '0 0 8px 0'
                }}>
                  What can I help with today?
                </h1>

                <p style={{
                  fontSize: '15px',
                  color: '#64748B',
                  maxWidth: '520px',
                  lineHeight: 1.6,
                  marginBottom: '36px'
                }}>
                  Ask anything about banking policies, loan formulas, KYC guidelines, draft communications, or general questions.
                </p>

                {/* 4 Starter Prompts Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  width: '100%'
                }}>
                  {STARTER_PROMPTS.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSendMessage(item.prompt)}
                      style={{
                        padding: '16px 18px',
                        borderRadius: '14px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#F8FAFC',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#1757BF';
                        e.currentTarget.style.backgroundColor = '#EFF6FF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                      }}
                    >
                      <div style={{ fontSize: '18px', marginBottom: '6px' }}>{item.icon}</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.4 }}>
                        {item.prompt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Conversation Messages List */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeConv.messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                        width: '100%'
                      }}
                    >
                      {/* Message Content Bubble */}
                      <div style={{
                        maxWidth: isUser ? '75%' : '100%',
                        width: isUser ? 'auto' : '100%',
                        backgroundColor: isUser ? '#F1F5F9' : 'transparent',
                        color: '#0F172A',
                        padding: isUser ? '12px 18px' : '4px 0',
                        borderRadius: isUser ? '20px 20px 4px 20px' : '0',
                        fontSize: '15px',
                        lineHeight: 1.65,
                        wordBreak: 'break-word'
                      }}>
                        {/* Text */}
                        <div style={{ whiteSpace: 'pre-line' }}>
                          {cleanText(msg.text)}
                        </div>

                        {/* Interactive Loan Report Agent Widget */}
                        {msg.hasLoanAgentWidget && (
                          <LoanReportChatWidget initialEnabled={false} />
                        )}

                        {/* Action Bar for Assistant Messages (Copy, Retry, etc.) */}
                        {!isUser && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '12px'
                          }}>
                            <button
                              type="button"
                              onClick={() => handleCopyText(msg.id, cleanText(msg.text))}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: copiedId === msg.id ? '#16A34A' : '#94A3B8',
                                cursor: 'pointer',
                                padding: '4px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                transition: 'color 0.15s ease'
                              }}
                              title="Copy response"
                              onMouseEnter={(e) => {
                                if (copiedId !== msg.id) e.currentTarget.style.color = '#0F172A';
                              }}
                              onMouseLeave={(e) => {
                                if (copiedId !== msg.id) e.currentTarget.style.color = '#94A3B8';
                              }}
                            >
                              {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                              <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSendMessage(activeConv.messages[activeConv.messages.indexOf(msg) - 1]?.text || 'Tell me more about this agent')}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#94A3B8',
                                cursor: 'pointer',
                                padding: '4px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                transition: 'color 0.15s ease'
                              }}
                              title="Regenerate"
                              onMouseEnter={(e) => e.currentTarget.style.color = '#0F172A'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                            >
                              <RotateCcw size={14} />
                              <span>Retry</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* AI Thinking / Typing Indicator */}
                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '8px 14px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B', animation: 'pulse 1.4s infinite' }} />
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B', animation: 'pulse 1.4s 0.2s infinite' }} />
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B', animation: 'pulse 1.4s 0.4s infinite' }} />
                      <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '6px' }}>Thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Docked Bottom Input Container (Seamless, No Divider Line) */}
        <div style={{
          flexShrink: 0,
          backgroundColor: '#FFFFFF',
          padding: '14px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1000px'
          }}>
            {/* Input Box */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '24px',
              padding: '10px 14px 10px 20px',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '10px',
              transition: 'border-color 0.15s ease'
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor = '#1757BF';
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor = '#CBD5E1';
            }}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  fontSize: '15px',
                  lineHeight: '24px',
                  maxHeight: '180px',
                  backgroundColor: 'transparent',
                  color: '#0F172A',
                  fontFamily: 'inherit',
                  padding: '4px 0'
                }}
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: inputText.trim() && !isTyping ? '#1757BF' : '#E2E8F0',
                  color: inputText.trim() && !isTyping ? '#FFFFFF' : '#94A3B8',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputText.trim() && !isTyping ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <ArrowUp size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#94A3B8',
              marginTop: '8px'
            }}>
              Ask anything about banking, loans, compliance, and calculations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

