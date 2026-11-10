import React from 'react';
import { Bell } from 'lucide-react';

export const Header = ({ onNavigateHome }) => {
  return (
    <header style={{
      backgroundColor: '#1757BF',
      height: '64px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      color: '#FFFFFF',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%'
    }}>
      {/* Left side: Brand */}
      <div 
        onClick={onNavigateHome}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        title="Go to AgentCS Home"
      >
        {/* Yellow rounded square logo */}
        <div style={{
          width: '28px',
          height: '28px',
          backgroundColor: '#EEFA26',
          borderRadius: '7px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ width: '9px', height: '9px', backgroundColor: '#1757BF', borderRadius: '2px' }} />
        </div>
        <span style={{
          fontSize: '18px',
          fontWeight: 500,
          letterSpacing: '-0.3px',
          color: '#FFFFFF'
        }}>
          AgentCS
        </span>
      </div>

      {/* Right side: Bell icon + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          type="button"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
          title="Notifications"
        >
          <Bell size={16} />
        </button>

        {/* User Avatar "AK" */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#EEFA26',
          color: '#121316',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-0.3px',
          cursor: 'pointer',
          boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)'
        }} title="User: Arun Kumar (AK)">
          AK
        </div>
      </div>
    </header>
  );
};
