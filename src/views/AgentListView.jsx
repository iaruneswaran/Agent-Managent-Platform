import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  Plus, 
  MoreHorizontal, 
  MoreVertical,
  Pen, 
  ChevronRight,
  FolderPlus,
  Layers,
  X,
  Play,
  Copy,
  Trash2
} from 'lucide-react';
import { INITIAL_PROJECTS } from '../data/mockData';

export const AgentListView = ({ 
  agents, 
  onSelectAgent, 
  onCreateAgent, 
  onEditAgent,
  onDeleteAgent,
  onDuplicateAgent 
}) => {
  const [filter, setFilter] = useState('all'); // 'all' or 'draft'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuAgentId, setActiveMenuAgentId] = useState(null);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tag: 'GTM Strategy'
  });

  // Close card 3-dot menus on outside click or Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.agent-card-menu-container')) {
        setActiveMenuAgentId(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenuAgentId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCreateProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const created = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      description: newProject.description.trim() || 'Custom strategic project pipeline.',
      category: 'Strategic Initiative',
      tag: newProject.tag.trim() || 'Strategy',
      status: 'Active',
      updatedAt: 'Just now',
      activeAgentsCount: 1,
      lead: 'Strategic Initiative Team'
    };
    setProjects([created, ...projects]);
    setNewProject({ title: '', description: '', tag: 'GTM Strategy' });
    setShowCreateProjectModal(false);
  };

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

          {/* Right side: Action & Filter Buttons */}
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
                onClick={() => setShowCreateProjectModal(true)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
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
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.28)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                }}
              >
                <FolderPlus size={16} />
                <span>Create project</span>
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
                All agents
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
                Draft
              </button>
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
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'visible',
                  zIndex: activeMenuAgentId === agent.id ? 50 : 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1757BF';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  {/* Top Row: Actions on Right (Edit Pen + Better 3-dot Menu) */}
                  <div 
                    className="agent-card-menu-container"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginBottom: '10px',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {/* Edit button: Same Pen icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditAgent(agent);
                        }}
                        title="Edit agent"
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#64748B',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F1F5F9';
                          e.currentTarget.style.color = '#1757BF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#64748B';
                        }}
                      >
                        <Pen size={15} />
                      </button>

                      {/* Three dots button (Better 3-dot Menu) */}
                      <div style={{ position: 'relative' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuAgentId(activeMenuAgentId === agent.id ? null : agent.id);
                          }}
                          title="More options"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '8px',
                            border: activeMenuAgentId === agent.id ? '1px solid #CBD5E1' : 'none',
                            backgroundColor: activeMenuAgentId === agent.id ? '#F1F5F9' : 'transparent',
                            color: activeMenuAgentId === agent.id ? '#0F172A' : '#64748B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (activeMenuAgentId !== agent.id) {
                              e.currentTarget.style.backgroundColor = '#F1F5F9';
                              e.currentTarget.style.color = '#0F172A';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeMenuAgentId !== agent.id) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#64748B';
                            }
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenuAgentId === agent.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: 'absolute',
                              top: 'calc(100% + 4px)',
                              right: 0,
                              width: '170px',
                              backgroundColor: '#FFFFFF',
                              borderRadius: '12px',
                              border: '1px solid #E2E8F0',
                              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
                              padding: '5px',
                              zIndex: 1000,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px'
                            }}
                            className="animate-fade-in"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuAgentId(null);
                                onEditAgent(agent);
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: '#0F172A',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.12s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <Pen size={14} color="#1757BF" />
                              <span>{agent.status?.toLowerCase() === 'draft' ? 'Edit draft' : 'Edit agent'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuAgentId(null);
                                onSelectAgent(agent);
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: '#0F172A',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.12s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <Play size={14} color="#16A34A" />
                              <span>{agent.status?.toLowerCase() === 'draft' ? 'Open draft' : 'Run agent'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuAgentId(null);
                                if (onDuplicateAgent) {
                                  onDuplicateAgent(agent);
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: '#0F172A',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.12s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <Copy size={14} color="#64748B" />
                              <span>Duplicate</span>
                            </button>

                            <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '3px 0' }} />

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuAgentId(null);
                                if (onDeleteAgent) {
                                  onDeleteAgent(agent.id);
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: '#DC2626',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.12s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <Trash2 size={14} color="#DC2626" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
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

        {/* ======================================================== */}
        {/* PROJECTS SECTION                                         */}
        {/* ======================================================== */}
        <div style={{ marginTop: '56px' }}>
          {/* Projects Section Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#0F172A',
                letterSpacing: '-0.3px',
                margin: 0
              }}>
                Projects
              </h2>
            </div>

            {/* Create Project Button */}
            <button
              onClick={() => setShowCreateProjectModal(true)}
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EEFA26';
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Create project</span>
            </button>
          </div>

          {/* Grid of Project Cards (4 in a line) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '16px'
          }}>
            {projects.filter((p) => {
              if (!searchQuery) return true;
              return p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     p.tag.toLowerCase().includes(searchQuery.toLowerCase());
            }).map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                  position: 'relative',
                  cursor: 'pointer',
                  boxShadow: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1757BF';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  {/* Project Title */}
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#0F172A',
                    letterSpacing: '-0.2px',
                    marginBottom: '8px',
                    lineHeight: 1.35
                  }}>
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p style={{
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: 1.5,
                    fontWeight: 400,
                    margin: 0
                  }}>
                    {project.description}
                  </p>
                </div>

                {/* Bottom Row: Active Agents & Last Updated */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#64748B',
                  fontWeight: 400,
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '14px',
                  marginTop: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Layers size={14} color="#1757BF" />
                    <span>{project.activeAgentsCount} agents active</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94A3B8' }}>
                    <Clock size={13} />
                    <span>{project.updatedAt}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Create Project Dashed Card */}
            <div
              onClick={() => setShowCreateProjectModal(true)}
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
                <FolderPlus size={20} />
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#0F172A',
                marginBottom: '4px'
              }}>
                Create a new project
              </h3>

              <p style={{
                fontSize: '13px',
                color: '#64748B',
                fontWeight: 400,
                marginBottom: '16px',
                maxWidth: '260px'
              }}>
                Set strategic goals, link agents, and track deliverables.
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCreateProjectModal(true);
                }}
                style={{
                  backgroundColor: '#EEFA26',
                  color: '#111827',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '9999px',
                  padding: '12px 20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4F01E'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EEFA26'}
              >
                <Plus size={15} strokeWidth={2.5} />
                <span>Create project</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CREATE PROJECT MODAL                                     */}
        {/* ======================================================== */}
        {showCreateProjectModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }} className="animate-fade-in">
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '540px',
              padding: '28px',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)',
              position: 'relative'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', margin: 0 }}>
                    Create new project
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                    Define the strategic initiative, scope, and objectives.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateProjectModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#334155', marginBottom: '6px' }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Personal care brand enters South Asia’s smaller cities"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '14px',
                      color: '#0F172A',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1757BF'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#334155', marginBottom: '6px' }}>
                    Strategic Category / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GTM Strategy, Consumer Research, Benchmarking"
                    value={newProject.tag}
                    onChange={(e) => setNewProject({ ...newProject, tag: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '14px',
                      color: '#0F172A',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1757BF'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#334155', marginBottom: '6px' }}>
                    Project Description & Objectives
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe market challenges, targets, and data requirements..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '14px',
                      color: '#0F172A',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1757BF'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setShowCreateProjectModal(false)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '9999px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 22px',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: '#EEFA26',
                      color: '#111827',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>Create project</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PROJECT DETAILS MODAL                                    */}
        {/* ======================================================== */}
        {selectedProject && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }} className="animate-fade-in">
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '560px',
              padding: '28px',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{
                  backgroundColor: '#EFF6FF',
                  color: '#1757BF',
                  border: '1px solid #DBEAFE',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '9999px'
                }}>
                  {selectedProject.tag}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', marginBottom: '12px', lineHeight: 1.35 }}>
                {selectedProject.title}
              </h2>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                {selectedProject.description}
              </p>

              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div>
                  <span style={{ display: 'block', fontSize: '12px', color: '#64748B' }}>Status</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#16A34A' }}>{selectedProject.status}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '12px', color: '#64748B' }}>Lead Division</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{selectedProject.lead}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '12px', color: '#64748B' }}>Agents Linked</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1757BF' }}>{selectedProject.activeAgentsCount} Agents</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '12px', color: '#64748B' }}>Last Activity</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{selectedProject.updatedAt}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#475569',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
