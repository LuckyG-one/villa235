// Shared minimal line-icon set. 22x22, stroke-based, matching the brand's
// understated editorial feel. Used by Details and Practical.

const icon = (path) => (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {path}
  </svg>
);

export const BedIcon = icon(
  <>
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
    <path d="M3 18h18" />
    <path d="M3 13V7a1 1 0 0 1 1-1h6v5" />
  </>
);

export const BathIcon = icon(
  <>
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
    <path d="M4 12V6a2 2 0 0 1 2-2c1 0 1.5.6 1.8 1.3" />
    <path d="M7 19v2M17 19v2" />
  </>
);

export const RulerIcon = icon(
  <>
    <rect x="3" y="8" width="18" height="8" rx="1.5" />
    <path d="M7 8v3M11 8v3M15 8v3" />
  </>
);

export const SnowflakeIcon = icon(<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" />);

export const CalendarIcon = icon(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </>
);

export const FileIcon = icon(
  <>
    <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4" />
    <path d="M9 13h6M9 17h6" />
  </>
);

export const ClockIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </>
);

export const ClockOutIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l-3.5 3" />
  </>
);

export const WaveIcon = icon(
  <>
    <path d="M3 16c1.5 1.4 3 1.4 4.5 0s3-1.4 4.5 0 3 1.4 4.5 0 3-1.4 4.5 0" />
    <path d="M3 10c1.5 1.4 3 1.4 4.5 0s3-1.4 4.5 0 3 1.4 4.5 0 3-1.4 4.5 0" />
  </>
);

export const WifiIcon = icon(
  <>
    <path d="M4 9.5a13 13 0 0 1 16 0" />
    <path d="M7.2 13a8.4 8.4 0 0 1 9.6 0" />
    <path d="M10.4 16.5a3.8 3.8 0 0 1 3.2 0" />
    <circle cx="12" cy="19" r="0.8" fill="currentColor" stroke="none" />
  </>
);

export const BoltIcon = icon(<path d="M12.5 2 4 14h6l-1 8L20 10h-7l-0.5-8Z" strokeLinejoin="round" />);

export const ShieldIcon = icon(
  <>
    <path d="M12 3 5 6v5c0 4.5 3 7.7 7 10 4-2.3 7-5.5 7-10V6l-7-3Z" />
    <path d="M9 12l2 2 4-4.5" />
  </>
);

export const PawIcon = icon(
  <>
    <ellipse cx="12" cy="16" rx="5" ry="4" />
    <ellipse cx="5.5" cy="9" rx="1.8" ry="2.2" />
    <ellipse cx="10" cy="6.5" rx="1.8" ry="2.2" />
    <ellipse cx="14" cy="6.5" rx="1.8" ry="2.2" />
    <ellipse cx="18.5" cy="9" rx="1.8" ry="2.2" />
  </>
);
