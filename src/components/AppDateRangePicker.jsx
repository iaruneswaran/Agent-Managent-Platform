import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028];

const PRESETS = [
  { label: 'September 2026', start: '2026-09-01', end: '2026-09-30', monthName: 'September 2026' },
  { label: 'August 2026', start: '2026-08-01', end: '2026-08-31', monthName: 'August 2026' },
  { label: 'July 2026', start: '2026-07-01', end: '2026-07-31', monthName: 'July 2026' },
  { label: 'Last 30 Days', start: '2026-08-15', end: '2026-09-15', monthName: 'Custom Period' },
  { label: 'Quarter 3 (Jul – Sep 2026)', start: '2026-07-01', end: '2026-09-30', monthName: 'Q3 2026' }
];

const formatDateStr = (year, month, day) => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]?.slice(0, 3)} ${y}`;
};

export const AppDateRangePicker = ({
  startDate = '2026-09-01',
  endDate = '2026-09-30',
  onChange,
  placeholder = 'Select date range',
  width = '320px'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Temporary selection while popover is open
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);
  const [hoverDate, setHoverDate] = useState(null);
  const [selectionStage, setSelectionStage] = useState('complete'); // 'start' | 'end' | 'complete'

  // Two calendars: Left and Right
  const [leftMonth, setLeftMonth] = useState(7); // August (0-indexed)
  const [leftYear, setLeftYear] = useState(2026);
  const [rightMonth, setRightMonth] = useState(8); // September (0-indexed)
  const [rightYear, setRightYear] = useState(2026);

  // Sync state when props change
  useEffect(() => {
    setTempStart(startDate);
    setTempEnd(endDate);
    if (startDate) {
      const [y, m] = startDate.split('-').map(Number);
      if (y && m) {
        if (m === 12) {
          setLeftMonth(10);
          setLeftYear(y);
          setRightMonth(11);
          setRightYear(y);
        } else {
          setLeftMonth(m - 1);
          setLeftYear(y);
          setRightMonth(m % 12);
          setRightYear(m === 12 ? y + 1 : y);
        }
      }
    }
  }, [startDate, endDate]);

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

  // Navigate Left Calendar
  const handlePrevLeftMonth = () => {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear((y) => y - 1);
    } else {
      setLeftMonth((m) => m - 1);
    }
  };

  const handleNextLeftMonth = () => {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear((y) => y + 1);
    } else {
      setLeftMonth((m) => m + 1);
    }
  };

  // Navigate Right Calendar
  const handlePrevRightMonth = () => {
    if (rightMonth === 0) {
      setRightMonth(11);
      setRightYear((y) => y - 1);
    } else {
      setRightMonth((m) => m - 1);
    }
  };

  const handleNextRightMonth = () => {
    if (rightMonth === 11) {
      setRightMonth(0);
      setRightYear((y) => y + 1);
    } else {
      setRightMonth((m) => m + 1);
    }
  };

  // Day click handler for range selection
  const handleDayClick = (dateStr) => {
    if (selectionStage === 'start' || selectionStage === 'complete') {
      setTempStart(dateStr);
      setTempEnd(null);
      setSelectionStage('end');
    } else if (selectionStage === 'end') {
      if (!tempStart) {
        setTempStart(dateStr);
        setTempEnd(null);
      } else if (dateStr < tempStart) {
        setTempStart(dateStr);
        setTempEnd(tempStart);
        setSelectionStage('complete');
      } else {
        setTempEnd(dateStr);
        setSelectionStage('complete');
      }
    }
  };

  // Apply Selection
  const handleApply = () => {
    const finalStart = tempStart || startDate;
    const finalEnd = tempEnd || tempStart || endDate;
    if (onChange) {
      // Find matching preset or generate readable label
      const matchedPreset = PRESETS.find(p => p.start === finalStart && p.end === finalEnd);
      const label = matchedPreset ? matchedPreset.monthName : `${formatDisplayDate(finalStart)} – ${formatDisplayDate(finalEnd)}`;
      onChange({
        startDate: finalStart,
        endDate: finalEnd,
        label
      });
    }
    setIsOpen(false);
  };

  // Apply Preset
  const handleSelectPreset = (preset) => {
    setTempStart(preset.start);
    setTempEnd(preset.end);
    setSelectionStage('complete');
    const [y, m] = preset.start.split('-').map(Number);
    if (y && m) {
      setLeftMonth(m - 1);
      setLeftYear(y);
      setRightMonth(m % 12);
      setRightYear(m === 12 ? y + 1 : y);
    }
  };

  // Calendar days generator
  const getCalendarDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const prevDaysCount = firstDay;
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    // Trailing prev month
    for (let i = prevDaysCount - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const prevM = month === 0 ? 11 : month - 1;
      const prevY = month === 0 ? year - 1 : year;
      days.push({
        day: d,
        dateStr: formatDateStr(prevY, prevM, d),
        isCurrentMonth: false
      });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        day: d,
        dateStr: formatDateStr(year, month, d),
        isCurrentMonth: true
      });
    }

    // Leading next month to fill complete grid of 35 or 42
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextM = month === 11 ? 0 : month + 1;
      const nextY = month === 11 ? year + 1 : year;
      days.push({
        day: d,
        dateStr: formatDateStr(nextY, nextM, d),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const leftDays = getCalendarDays(leftYear, leftMonth);
  const rightDays = getCalendarDays(rightYear, rightMonth);

  // Range helper logic
  const isDateSelected = (dateStr) => {
    return dateStr === tempStart || dateStr === tempEnd;
  };

  const isDateInRange = (dateStr) => {
    if (tempStart && tempEnd) {
      return dateStr > tempStart && dateStr < tempEnd;
    }
    if (tempStart && !tempEnd && hoverDate && selectionStage === 'end') {
      const minD = tempStart < hoverDate ? tempStart : hoverDate;
      const maxD = tempStart < hoverDate ? hoverDate : tempStart;
      return dateStr > minD && dateStr < maxD;
    }
    return false;
  };

  const isRangeEndpoint = (dateStr, type) => {
    if (type === 'start') {
      return dateStr === tempStart;
    }
    if (type === 'end') {
      return dateStr === tempEnd || (!tempEnd && hoverDate === dateStr && hoverDate > tempStart);
    }
    return false;
  };

  // Display trigger string
  const triggerLabel = tempStart && tempEnd
    ? `${formatDisplayDate(tempStart)} – ${formatDisplayDate(tempEnd)}`
    : placeholder;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: width,
        userSelect: 'none',
        fontFamily: 'inherit'
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setTempStart(startDate);
          setTempEnd(endDate);
          setSelectionStage('complete');
        }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '10px 16px',
          borderRadius: '8px',
          border: isOpen ? '1px solid #1757BF' : '1px solid #CBD5E1',
          backgroundColor: '#FFFFFF',
          fontSize: '14px',
          fontWeight: 500,
          color: '#0F172A',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: 'none',
          transition: 'border-color 0.15s ease'
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#94A3B8';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = '#CBD5E1';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calendar size={16} color="#1757BF" />
          <span style={{ color: '#0F172A', fontWeight: 500 }}>{triggerLabel}</span>
        </div>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Change</span>
      </button>

      {/* Dual Calendar Popover */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: '660px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #CBD5E1',
            boxShadow: 'none',
            padding: '20px',
            zIndex: 120
          }}
        >
          {/* Quick Presets Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '16px',
            paddingBottom: '14px',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginRight: '4px' }}>
              Quick Select:
            </span>
            {PRESETS.map((p) => {
              const active = tempStart === p.start && tempEnd === p.end;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  style={{
                    backgroundColor: active ? '#1757BF' : '#F1F5F9',
                    color: active ? '#FFFFFF' : '#334155',
                    border: '1px solid',
                    borderColor: active ? '#1757BF' : '#E2E8F0',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '12px',
                    fontWeight: active ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = '#E2E8F0';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = '#F1F5F9';
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Dual Calendar Grid Side-by-Side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* ===================== LEFT CALENDAR ===================== */}
            <div>
              {/* Header with Month & Year Dropdowns */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                gap: '8px'
              }}>
                <button
                  type="button"
                  onClick={handlePrevLeftMonth}
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
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={15} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {/* Month Dropdown */}
                  <select
                    value={leftMonth}
                    onChange={(e) => setLeftMonth(Number(e.target.value))}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0F172A',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    {MONTHS.map((m, idx) => (
                      <option key={m} value={idx}>{m}</option>
                    ))}
                  </select>

                  {/* Year Dropdown */}
                  <select
                    value={leftYear}
                    onChange={(e) => setLeftYear(Number(e.target.value))}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0F172A',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleNextLeftMonth}
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
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={15} />
                </button>
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
                  <span key={d} style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', padding: '4px 0' }}>
                    {d}
                  </span>
                ))}
              </div>

              {/* Left Days Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                {leftDays.map((item, idx) => {
                  const isStart = isRangeEndpoint(item.dateStr, 'start');
                  const isEnd = isRangeEndpoint(item.dateStr, 'end');
                  const inRange = isDateInRange(item.dateStr);
                  const isSingle = isStart && isEnd;

                  return (
                    <button
                      key={`left-${idx}-${item.dateStr}`}
                      type="button"
                      onClick={() => handleDayClick(item.dateStr)}
                      onMouseEnter={() => setHoverDate(item.dateStr)}
                      style={{
                        height: '32px',
                        border: 'none',
                        backgroundColor: (isStart || isEnd)
                          ? '#1757BF'
                          : inRange
                          ? '#EFF6FF'
                          : 'transparent',
                        color: (isStart || isEnd)
                          ? '#FFFFFF'
                          : inRange
                          ? '#1757BF'
                          : item.isCurrentMonth
                          ? '#0F172A'
                          : '#CBD5E1',
                        borderRadius: isSingle
                          ? '6px'
                          : isStart
                          ? '6px 0 0 6px'
                          : isEnd
                          ? '0 6px 6px 0'
                          : '0',
                        fontWeight: (isStart || isEnd) ? 600 : 400,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.1s ease'
                      }}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ===================== RIGHT CALENDAR ===================== */}
            <div>
              {/* Header with Month & Year Dropdowns */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                gap: '8px'
              }}>
                <button
                  type="button"
                  onClick={handlePrevRightMonth}
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
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={15} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {/* Month Dropdown */}
                  <select
                    value={rightMonth}
                    onChange={(e) => setRightMonth(Number(e.target.value))}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0F172A',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    {MONTHS.map((m, idx) => (
                      <option key={m} value={idx}>{m}</option>
                    ))}
                  </select>

                  {/* Year Dropdown */}
                  <select
                    value={rightYear}
                    onChange={(e) => setRightYear(Number(e.target.value))}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0F172A',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleNextRightMonth}
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
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={15} />
                </button>
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
                  <span key={d} style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', padding: '4px 0' }}>
                    {d}
                  </span>
                ))}
              </div>

              {/* Right Days Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                {rightDays.map((item, idx) => {
                  const isStart = isRangeEndpoint(item.dateStr, 'start');
                  const isEnd = isRangeEndpoint(item.dateStr, 'end');
                  const inRange = isDateInRange(item.dateStr);
                  const isSingle = isStart && isEnd;

                  return (
                    <button
                      key={`right-${idx}-${item.dateStr}`}
                      type="button"
                      onClick={() => handleDayClick(item.dateStr)}
                      onMouseEnter={() => setHoverDate(item.dateStr)}
                      style={{
                        height: '32px',
                        border: 'none',
                        backgroundColor: (isStart || isEnd)
                          ? '#1757BF'
                          : inRange
                          ? '#EFF6FF'
                          : 'transparent',
                        color: (isStart || isEnd)
                          ? '#FFFFFF'
                          : inRange
                          ? '#1757BF'
                          : item.isCurrentMonth
                          ? '#0F172A'
                          : '#CBD5E1',
                        borderRadius: isSingle
                          ? '6px'
                          : isStart
                          ? '6px 0 0 6px'
                          : isEnd
                          ? '0 6px 6px 0'
                          : '0',
                        fontWeight: (isStart || isEnd) ? 600 : 400,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.1s ease'
                      }}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer with Selection Details and Apply Button */}
          <div style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>Selected Range: </span>
              {tempStart && tempEnd ? (
                <span>{formatDisplayDate(tempStart)} – {formatDisplayDate(tempEnd)}</span>
              ) : tempStart ? (
                <span>{formatDisplayDate(tempStart)} (select end date)</span>
              ) : (
                <span>No dates selected</span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApply}
                style={{
                  padding: '7px 18px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#1757BF',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

