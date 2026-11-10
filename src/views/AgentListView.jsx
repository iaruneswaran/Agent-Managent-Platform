import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Plus, 
  MoreHorizontal, 
  Pen 
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
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <span style={{ fontSize: '15px', fontWeight: 500, color: '#475569' }}>
            Agents ({filteredAgents.length})
          </span>

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

        {/* Grid of Agent Cards: EXACTLY 3 IN A LINE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '20px'
        }}>
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
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
                {/* Top Row: Status Badge on Left, Bare Pen Icon + More on Right */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  {/* Status Indicator on Left: Clean text and indicator, NO badge or tags */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: agent.status.toLowerCase() === 'published' ? '#1757BF' : '#64748B'
                  }}>
                    <span style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: agent.status.toLowerCase() === 'published' ? '#1757BF' : '#94A3B8'
                    }} />
                    <span>{agent.status}</span>
                  </div>

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
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#0F172A',
                  letterSpacing: '-0.2px',
                  marginBottom: '10px',
                  lineHeight: 1.4
                }}>
                  {agent.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#475569',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  marginBottom: '18px'
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
          ))}

          {/* 6th Card: Create a new agent card */}
          {filter === 'all' && (
            <div
              onClick={onCreateAgent}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px dashed #CBD5E1',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '230px',
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
