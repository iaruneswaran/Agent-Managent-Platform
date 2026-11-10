import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const AppDatePicker = ({
  value, // 'YYYY-MM-DD'
  onChange,
  placeholder = 'Select date',
  width = '100%',
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse initial date
  const parseDate = (str) => {
    if (!str) return new Date();
    const [y, m, d] = str.split('-').map(Number);
    if (!y || !m || !d) return new Date();
    return new Date(y, m - 1, d);
  };

  const initialDate = parseDate(value);
  const [viewYear, setViewYear] = useState(initialDate.getFullYear() || 2026);
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth() ?? 8); // 0-indexed

  // Sync view when value changes from outside
  useEffect(() => {
    if (value) {
      const parsed = parseDate(value);
      if (!isNaN(parsed.getTime())) {
        setViewYear(parsed.getFullYear());
        setViewMonth(parsed.getMonth());
      }
    }
  }, [value]);

  // Close on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
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

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day, isCurrentMonth = true, targetMonth = viewMonth, targetYear = viewYear) => {
    const formatted = `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const formatted = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    onChange(formatted);
    setViewYear(y);
    setViewMonth(m);
    setIsOpen(false);
  };

  // Calendar math
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  // Trailing previous month days
  const prevDays = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    prevDays.push(prevMonthDays - i);
  }

  // Current month days
  const currentDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentDays.push(i);
  }

  // Next month leading days to complete the week rows
  const totalCells = prevDays.length + currentDays.length;
  const nextDaysCount = (7 - (totalCells % 7)) % 7;
  const nextDays = [];
  for (let i = 1; i <= nextDaysCount; i++) {
    nextDays.push(i);
  }

  // Format display string
  const formatDisplay = (val) => {
    if (!val) return placeholder;
    const [y, m, d] = val.split('-');
    if (!y || !m || !d) return val;
    const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
    if (isNaN(dateObj.getTime())) return val;
    // e.g. "01 Sep 2026"
    return `${String(d).padStart(2, '0')} ${MONTH_NAMES[Number(m) - 1]?.slice(0, 3)} ${y}`;
  };

  // Check if cell is the selected date
  const isSelectedDate = (day, m = viewMonth, y = viewYear) => {
    if (!value) return false;
    const formatted = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return value === formatted;
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: width,
        userSelect: 'none',
        fontFamily: 'inherit',
        ...style
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '10px 14px',
          borderRadius: '8px',
          border: isOpen ? '1px solid #1757BF' : '1px solid #CBD5E1',
          backgroundColor: '#FFFFFF',
          fontSize: '14px',
          fontWeight: 500,
          color: value ? '#0F172A' : '#64748B',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 1px #1757BF' : 'none',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#94A3B8';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#CBD5E1';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={15} color="#64748B" />
          <span>{formatDisplay(value)}</span>
        </div>
      </button>

      {/* Floating Calendar Popover */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: '280px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.1), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
            padding: '16px',
            zIndex: 110
          }}
          className="animate-fade-in"
        >
          {/* Calendar Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.12s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                <ChevronLeft size={15} />
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next month"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.12s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Day of Week Labels */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '2px',
            textAlign: 'center',
            marginBottom: '6px'
          }}>
            {DAYS_OF_WEEK.map((d) => (
              <span
                key={d}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#94A3B8',
                  padding: '4px 0'
                }}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '3px'
          }}>
            {/* Trailing Days of Previous Month */}
            {prevDays.map((d) => {
              const targetMonth = viewMonth === 0 ? 11 : viewMonth - 1;
              const targetYear = viewMonth === 0 ? viewYear - 1 : viewYear;
              return (
                <button
                  key={`prev-${d}`}
                  type="button"
                  onClick={() => handleSelectDay(d, false, targetMonth, targetYear)}
                  style={{
                    height: '32px',
                    borderRadius: '7px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#CBD5E1',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.12s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {d}
                </button>
              );
            })}

            {/* Days of Current Month */}
            {currentDays.map((d) => {
              const selected = isSelectedDate(d);
              return (
                <button
                  key={`curr-${d}`}
                  type="button"
                  onClick={() => handleSelectDay(d, true, viewMonth, viewYear)}
                  style={{
                    height: '32px',
                    borderRadius: '7px',
                    border: 'none',
                    backgroundColor: selected ? '#1757BF' : 'transparent',
                    color: selected ? '#FFFFFF' : '#0F172A',
                    fontWeight: selected ? 600 : 400,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.12s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.backgroundColor = '#F1F5F9';
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {d}
                </button>
              );
            })}

            {/* Leading Days of Next Month */}
            {nextDays.map((d) => {
              const targetMonth = viewMonth === 11 ? 0 : viewMonth + 1;
              const targetYear = viewMonth === 11 ? viewYear + 1 : viewYear;
              return (
                <button
                  key={`next-${d}`}
                  type="button"
                  onClick={() => handleSelectDay(d, false, targetMonth, targetYear)}
                  style={{
                    height: '32px',
                    borderRadius: '7px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#CBD5E1',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.12s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Quick Footer */}
          <div style={{
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <button
              type="button"
              onClick={handleSelectToday}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1757BF',
                cursor: 'pointer',
                padding: '2px 4px',
                borderRadius: '4px'
              }}
            >
              Today
            </button>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '4px'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { AppDateRangePicker } from './AppDateRangePicker';

