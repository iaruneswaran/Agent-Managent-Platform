import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Plus, 
  MoreHorizontal, 
  Pen,
  ChevronRight
} from 'lucide-react';

export const AgentListView = ({ agents, onSelectAgent, onCreateAgent, onEditAgent }) => {
  const [filter, setFilter] = useState('all'); // 'all' or 'draft'
  const [searchQuery, setSearchQuery] = useState('');

  const totalAgents = agents.length;
  const draftAgents = agents.filter(a => a.status.toLowerCase() === 'draft').length;
  const publishedAgents = agents.filter(a => a.status.toLowerCase() === 'published').length;
  const agentLimit = 10;
  const tokensUsed = '1.42M';
  const tokenLimit = '2.50M';

  const filteredAgents = agents.filter((agent) => {
    const matchesFilter = filter === 'all' || agent.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 64px)', backgroundColor: '#EDF2F7' }} className="animate-fade-in">
      {/* Solid Blue Hero Section */}
      <div style={{
        backgroundColor: '#1757BF',
        padding: '30px 24px',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          {/* Left: Heading & Subtitle */}
          <div>
            <h1 style={{
              fontSize: '34px',
              fontWeight: 500,
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              margin: 0
            }}>
              Your agents
            </h1>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.82)',
              fontWeight: 400,
              margin: '4px 0 0 0',
              letterSpacing: '-0.1px'
            }}>
              Prepare and route reports for human approval.
            </p>
          </div>

          {/* Right side: Action Buttons + Metrics on the right side of the buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
            flexWrap: 'wrap'
          }}>
            {/* Metrics on the Left with generous horizontal breathing space */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '2px' }}>
                  Agent creation limit
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#EEFA26', letterSpacing: '-0.2px' }}>
                  {totalAgents} <span style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.75)' }}>/ {agentLimit} created</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '2px' }}>
                  Tokens used
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#EEFA26', letterSpacing: '-0.2px' }}>
                  {tokensUsed} <span style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.75)' }}>/ {tokenLimit}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '2px' }}>
                  Active in production
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#EEFA26', letterSpacing: '-0.2px' }}>
                  {publishedAgents} <span style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.75)' }}>active</span>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div style={{
              width: '1px',
              height: '38px',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              flexShrink: 0
            }} />

            {/* Action & Filter Buttons on the Right */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={onCreateAgent}
                style={{
                  backgroundColor: '#EEFA26',
                  color: '#111827',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '9999px',
                  padding: '12px 22px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'none',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E4F01E';
                  e.currentTarget.style.outline = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#EEFA26';
                  e.currentTarget.style.outline = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Create agent</span>
              </button>

              <button
                onClick={() => setFilter('all')}
                style={{
                  backgroundColor: filter === 'all' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.18)',
                  color: filter === 'all' ? '#0F172A' : '#FFFFFF',
                  border: filter === 'all' ? '1px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.28)',
                  borderRadius: '9999px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                All agents ({totalAgents})
              </button>

              <button
                onClick={() => setFilter('draft')}
                style={{
                  backgroundColor: filter === 'draft' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.18)',
                  color: filter === 'draft' ? '#0F172A' : '#FFFFFF',
                  border: filter === 'draft' ? '1px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.28)',
                  borderRadius: '9999px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                Draft ({draftAgents})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '32px 24px 64px' }}>
        {/* Search Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '24px'
        }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search
              size={16}
              color="#94A3B8"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px 12px 42px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '9999px',
                fontSize: '14px',
                color: '#0F172A',
                outline: 'none',
                fontWeight: 400,
                transition: 'border-color 0.15s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1757BF'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>
        </div>

        {/* Grid of Agent Cards: 4 IN A LINE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '16px'
        }}>
          {filteredAgents.map((agent) => {
            const isChatAgent = agent.agentType === 'chat' || 
                                agent.id === 'ask-anything-chat' || 
                                agent.title?.toLowerCase().includes('ask anything');

            if (isChatAgent) {
              return (
                <div
                  key={agent.id}
                  onClick={() => onSelectAgent(agent)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    border: '1px solid #E2E8F0',
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '220px',
                    cursor: 'pointer',
                    backgroundColor: '#FFFFFF',
                    transition: 'border-color 0.15s ease',
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1757BF';
                    const link = e.currentTarget.querySelector('.chat-card-link');
                    if (link) link.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    const link = e.currentTarget.querySelector('.chat-card-link');
                    if (link) link.style.transform = 'translateX(0px)';
                  }}
                >
                  {/* Organic Flowing Curves SVG Background — Brand Blue Palette */}
                  <svg
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none',
                      zIndex: 0
                    }}
                    viewBox="0 0 380 260"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chatBgBase" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#F8FAFC" />
                        <stop offset="100%" stopColor="#EFF6FF" />
                      </linearGradient>

                      <linearGradient id="chatBlueSweep" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.55" />
                      </linearGradient>

                      <linearGradient id="chatFrontWave" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0F387A" />
                        <stop offset="35%" stopColor="#1757BF" />
                        <stop offset="70%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#38BDF8" />
                      </linearGradient>
                    </defs>

                    <rect width="380" height="260" fill="url(#chatBgBase)" />

                    <path
                      d="M 230 0 C 275 45 345 105 380 185 L 380 0 Z"
                      fill="url(#chatBlueSweep)"
                    />

                    <path
                      d="M 0 168 C 105 158 240 195 310 260 L 0 260 Z"
                      fill="url(#chatFrontWave)"
                    />
                  </svg>

                  {/* Top Content: Title */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Title */}
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#1757BF',
                      letterSpacing: '-0.3px',
                      margin: 0,
                      lineHeight: 1.3
                    }}>
                      Ask Anything
                    </h3>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#64748B',
                      marginTop: '4px'
                    }}>
                      AI Chat Assistant
                    </div>
                  </div>

                  {/* Bottom Action Link */}
                  <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto', paddingTop: '28px' }}>
                    <div
                      className="chat-card-link"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      <span>Start chat</span>
                      <ChevronRight size={16} strokeWidth={2.5} color="#FFFFFF" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={agent.id}
                onClick={() => onSelectAgent(agent)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  transition: 'border-color 0.15s ease',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1757BF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div>
                  {/* Top Row: Actions on Right (Edit Pen + More) */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginBottom: '10px'
                  }}>
                    {/* Actions on Right */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                      {/* Edit button: Bare Pen icon (no circle) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditAgent(agent);
                        }}
                        title="Edit agent"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748B',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                          transition: 'color 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#0F172A'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
                      >
                        <Pen size={16} />
                      </button>

                      {/* Three dots button */}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        title="Options"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                          transition: 'color 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#0F172A'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                  </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0F172A',
                  letterSpacing: '-0.2px',
                  marginBottom: '8px',
                  lineHeight: 1.35
                }}>
                  {agent.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '13px',
                  color: '#475569',
                  lineHeight: 1.5,
                  fontWeight: 400,
                  marginBottom: '14px'
                }}>
                  {agent.description}
                </p>
              </div>

              {/* Bottom Info Row: Clock + Last run */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                color: '#64748B',
                fontWeight: 400,
                borderTop: '1px solid #F1F5F9',
                paddingTop: '14px',
                marginTop: 'auto'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} color="#94A3B8" />
                  <span>{agent.lastRun === 'Not yet run' ? 'Not yet run' : `Last run: ${agent.lastRun}`}</span>
                </div>
              </div>
            </div>
          );
        })}

          {/* 6th Card: Create a new agent card */}
          {filter === 'all' && (
            <div
              onClick={onCreateAgent}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px dashed #CBD5E1',
                padding: '24px 18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '220px',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1757BF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#CBD5E1';
              }}
            >
              {/* Plus circle */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                color: '#1757BF'
              }}>
                <Plus size={20} />
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#0F172A',
                marginBottom: '4px'
              }}>
                Create a new agent
              </h3>

              <p style={{
                fontSize: '14px',
                color: '#64748B',
                fontWeight: 400,
                marginBottom: '18px',
                maxWidth: '280px'
              }}>
                Name it, write instructions, review and publish.
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCreateAgent();
                }}
                style={{
                  backgroundColor: '#EEFA26',
                  color: '#111827',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '9999px',
                  padding: '14px 22px',
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
                  e.currentTarget.style.outline = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#EEFA26';
                  e.currentTarget.style.outline = 'none';
                }}
              >
                <Plus size={15} strokeWidth={2.5} />
                <span>Create agent</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
