import React, { useState } from 'react';
import { Layers, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const ScreenSwitcher = ({ currentScreen, setScreen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens = [
    { id: 'agents_list', number: 1, label: 'Screen 1: Your Agents' },
    { id: 'create_agent', number: 2, label: 'Screen 2: Create Agent' },
    { id: 'published', number: 3, label: 'Screen 3: Agent Published' },
    { id: 'use_agent', number: 4, label: 'Screen 4: Use Agent' },
  ];

  return (
    <aside
      aria-label="Direct screen navigator"
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '24px',
        zIndex: 9999,
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Expanded Menu */}
      {isOpen && (
        <div style={{
          backgroundColor: '#16171A',
          border: '1px solid #2C2F36',
          borderRadius: '16px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
          padding: '12px',
          marginBottom: '10px',
          minWidth: '300px',
          color: '#FFFFFF'
        }}>
          <div style={{
            padding: '6px 12px 10px',
            fontSize: '14px',
            color: '#9CA3AF',
            fontWeight: 400,
            borderBottom: '1px solid #23262D'
          }}>
            Quick Screen Jump (4 Screens)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
            {screens.map((s) => {
              const isActive = currentScreen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setScreen(s.id);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: isActive ? 'rgba(238, 250, 38, 0.12)' : 'transparent',
                    color: isActive ? '#EEFA26' : '#D1D5DB',
                    fontWeight: 400,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#23262D';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#EEFA26' : '#2A2D34',
                      color: isActive ? '#111827' : '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 400
                    }}>
                      {s.number}
                    </span>
                    <span>{s.label}</span>
                  </div>
                  {isActive && <Check size={16} color="#EEFA26" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#111317',
          color: '#FFFFFF',
          border: '1px solid #2C2F36',
          borderRadius: '9999px',
          padding: '10px 18px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 400,
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#EEFA26';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#2C2F36';
        }}
      >
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          backgroundColor: '#EEFA26',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Layers size={14} color="#111827" />
        </div>
        <span>Screen: {screens.find(s => s.id === currentScreen)?.number || 1} of 4</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>
    </aside>
  );
};
