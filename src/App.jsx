import React, { useState } from 'react';
import { Header } from './components/Header';
import { AgentListView } from './views/AgentListView';
import { CreateAgentView } from './views/CreateAgentView';
import { AgentPublishedView } from './views/AgentPublishedView';
import { UseAgentView } from './views/UseAgentView';
import { INITIAL_AGENTS } from './data/mockData';

export default function App() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [currentScreen, setCurrentScreen] = useState('agents_list'); // 'agents_list' | 'create_agent' | 'published' | 'use_agent'
  
  // Active editing/viewing agent
  const [currentAgent, setCurrentAgent] = useState(INITIAL_AGENTS[0]);

  // Current workspace
  const [workspace, setWorkspace] = useState('All authorized workspaces');

  // Navigation handlers
  const handleSelectAgent = (agent) => {
    setCurrentAgent(agent);
    setWorkspace(agent?.department?.includes?.('Retail Banking') ? 'SBI — Retail Banking Division' : (agent?.department || 'SBI — Retail Banking Division'));
    setCurrentScreen('use_agent');
  };

  const handleEditAgent = (agent) => {
    setCurrentAgent(agent);
    setWorkspace('SBI — Retail Banking Division');
    setCurrentScreen('create_agent');
  };

  const handleCreateNew = () => {
    const newDraft = {
      id: `agent-${Date.now()}`,
      title: 'SBI Customer KYC & Document Verification Agent',
      agentType: 'verification',
      department: 'Retail Banking — Compliance & KYC',
      description: 'Inspects and verifies uploaded customer documents (Aadhaar, PAN, Passport, DL) for authenticity, data extraction, and regulatory KYC compliance.',
      responsibility: 'Inspect uploaded identity documents, perform OCR text and photo extraction, validate document number checksums, check for visual tampering or alteration, verify details against KYC guidelines, and flag any discrepancies for human compliance officer approval.',
      status: 'Published',
      lastRun: 'Not yet run',
      humanReviewRequired: true,
      reportType: 'KYC Verification Audit',
      purpose: 'Inspects uploaded identity and address proofs, performs OCR text and photo extraction, validates national ID checksums, checks for digital tampering, and routes audits for compliance approval.',
      instructions: 'Validate document format and cryptographic QR signature. Extract Full Name, Document Number, and DOB. Run fraud detection for digital splicing or font alteration. Present compliance audit report for human reviewer sign-off.',
      instructionNote: 'Pause for human compliance reviewer approval before granting KYC clearance.',
      type: 'Document Verification',
      destination: 'Compliance review',
      supportedDocs: ['Aadhaar Card', 'PAN Card', 'Passport', 'Driving License', 'Voter ID', 'Utility Bill']
    };
    setCurrentAgent(newDraft);
    setWorkspace('SBI — Retail Banking Division');
    setCurrentScreen('create_agent');
  };

  const handleDeleteAgent = (agentId) => {
    setAgents((prev) => prev.filter((a) => a.id !== agentId));
  };

  const handleDuplicateAgent = (agent) => {
    const duplicate = {
      ...agent,
      id: `agent-${Date.now()}`,
      title: `${agent.title} (Copy)`,
      lastRun: 'Not yet run'
    };
    setAgents((prev) => [duplicate, ...prev]);
  };

  const handlePublishFromCreate = (updatedAgent) => {
    const publishedAgent = {
      ...(updatedAgent || currentAgent),
      status: 'Published'
    };
    setCurrentAgent(publishedAgent);
    setAgents((prev) => {
      const exists = prev.some((a) => a.id === publishedAgent.id);
      if (exists) {
        return prev.map((a) => (a.id === publishedAgent.id ? publishedAgent : a));
      }
      return [publishedAgent, ...prev];
    });
    setWorkspace('SBI — Retail Banking Division');
    setCurrentScreen('published');
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#F8F9FA' }}>
      {/* Top Universal Black Header */}
      <Header
        onNavigateHome={() => {
          setCurrentScreen('agents_list');
        }}
      />

      {/* Main Dynamic View based on Screen state */}
      <main style={{ width: '100%' }}>
        {currentScreen === 'agents_list' && (
          <AgentListView
            agents={agents}
            onSelectAgent={handleSelectAgent}
            onCreateAgent={handleCreateNew}
            onEditAgent={handleEditAgent}
            onDeleteAgent={handleDeleteAgent}
            onDuplicateAgent={handleDuplicateAgent}
          />
        )}

        {currentScreen === 'create_agent' && (
          <CreateAgentView
            agentData={currentAgent}
            onPublish={handlePublishFromCreate}
            onCancel={() => {
              setWorkspace('All authorized workspaces');
              setCurrentScreen('agents_list');
            }}
          />
        )}

        {currentScreen === 'published' && (
          <AgentPublishedView
            agentData={currentAgent}
            onOpenAgent={() => {
              setWorkspace('SBI — Retail Banking Division');
              setCurrentScreen('use_agent');
            }}
            onBackToList={() => {
              setWorkspace('All authorized workspaces');
              setCurrentScreen('agents_list');
            }}
          />
        )}

        {currentScreen === 'use_agent' && (
          <UseAgentView
            agentData={currentAgent}
            onBackToList={() => {
              setWorkspace('All authorized workspaces');
              setCurrentScreen('agents_list');
            }}
          />
        )}
      </main>
    </div>
  );
}
