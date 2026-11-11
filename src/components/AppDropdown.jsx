import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const AppDropdown = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  icon: Icon,
  width = 'auto',
  height = null,
  size = 'md',
  align = 'left',
  style = {},
  buttonStyle = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Normalize options into { value, label } objects
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return { value: opt.value, label: opt.label || opt.value };
    }
    return { value: opt, label: opt };
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const isSmall = size === 'sm';

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: width,
        userSelect: 'none',
        fontFamily: 'inherit',
        zIndex: isOpen ? 9999 : 1,
        ...style
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: '100%',
          height: height || (isSmall ? '35px' : 'auto'),
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: isSmall ? '0 12px' : '10px 14px',
          borderRadius: '8px',
          border: isOpen ? '1px solid #1757BF' : '1px solid #CBD5E1',
          backgroundColor: '#FFFFFF',
          fontSize: isSmall ? '13px' : '14px',
          fontWeight: 500,
          color: '#0F172A',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 1px #1757BF' : 'none',
          transition: 'all 0.15s ease',
          ...buttonStyle
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#94A3B8';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#CBD5E1';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
          {Icon && (
            <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, color: '#64748B' }}>
              {React.isValidElement(Icon) ? Icon : <Icon size={isSmall ? 14 : 16} />}
            </span>
          )}
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: selectedOption ? '#0F172A' : '#64748B'
          }}>
            {displayLabel}
          </span>
        </div>

        <ChevronDown
          size={14}
          color="#64748B"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s ease'
          }}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            [align === 'right' ? 'right' : 'left']: 0,
            minWidth: '100%',
            width: 'max-content',
            maxWidth: '360px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
            padding: '5px',
            zIndex: 10000,
            maxHeight: '260px',
            overflowY: 'auto'
          }}
          className="animate-fade-in"
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: isSelected ? 500 : 400,
                  color: isSelected ? '#1757BF' : '#334155',
                  backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.12s ease, color 0.12s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.color = '#0F172A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#334155';
                  }
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check size={14} color="#1757BF" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

