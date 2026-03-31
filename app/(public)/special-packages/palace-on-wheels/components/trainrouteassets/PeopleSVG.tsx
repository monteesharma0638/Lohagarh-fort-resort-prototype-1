// ─── INLINE PEOPLE SVG ────────────────────────────────────────────────────────
const PeopleSVG = ({ flipped = false }) => (
  <svg
    width="140"
    height="72"
    viewBox="0 0 140 72"
    style={{
      transform: flipped ? "scaleX(-1)" : "none",
      overflow: "visible",
      display: "block",
    }}
  >
    {/* PERSON 1: PRINCESS */}
    <g transform="translate(22,2)">
      {/* head */}
      <circle cx="14" cy="10" r="6.5" fill="#f1c7a6" />
      {/* hair */}
      <path
        d="M8 10c0-6 4-10 10-10s10 4 10 10c0 3-1 5-2 7-2-2-4-3-8-3s-6 1-8 3c-1-2-2-4-2-7z"
        fill="#3a2416"
      />
      {/* face details */}
      <circle cx="11.5" cy="10.5" r="0.8" fill="#1f130c" />
      <circle cx="16.5" cy="10.5" r="0.8" fill="#1f130c" />
      <path d="M12 13.5c1.5 1 2.5 1 4 0" stroke="#b35c5c" strokeWidth="1.1" strokeLinecap="round" fill="none" />

      {/* neck */}
      <rect x="12.7" y="16" width="2.6" height="2.8" rx="1" fill="#f1c7a6" />

      {/* body / dress top */}
      <path
        d="M8.5 19.5h11l2 8.5c-2.4 2.2-5.3 3.2-7.5 3.2s-5.1-1-7.5-3.2l2-8.5z"
        fill="#d84f8b"
      />
      <path
        d="M10.5 20.8h7"
        stroke="#ffd7e7"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M12 21.8h4"
        stroke="#ffd7e7"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* skirt */}
      <path
        d="M6 28c3 1.5 6.1 2.4 8 2.4s5-0.9 8-2.4l5.8 16.5c-3.7 2-8.2 3.1-13.8 3.1S9.9 47 6.2 44.5L12 28z"
        fill="#f06aa5"
      />
      <path
        d="M8 32c2.8 1 5.6 1.5 6 1.5s3.2-0.5 6-1.5"
        stroke="#ffd7e7"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M7 37c3 1.2 6 1.8 7 1.8s4-0.6 7-1.8"
        stroke="#ffd7e7"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* arms */}
      <line x1="8" y1="22" x2="0" y2="29" stroke="#f1c7a6" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="20" y1="22" x2="28" y2="29" stroke="#f1c7a6" strokeWidth="2.4" strokeLinecap="round" />

      {/* hands */}
      <circle cx="0" cy="29.5" r="1.8" fill="#f1c7a6" />
      <circle cx="28" cy="29.5" r="1.8" fill="#f1c7a6" />

      {/* legs */}
      <rect x="10" y="46" width="3.4" height="11" rx="1.4" fill="#53311f" />
      <rect x="15.2" y="46" width="3.4" height="11" rx="1.4" fill="#53311f" />
      {/* shoes */}
      <ellipse cx="11.2" cy="59" rx="3.2" ry="1.2" fill="#2a1f0e" />
      <ellipse cx="16.8" cy="59" rx="3.2" ry="1.2" fill="#2a1f0e" />
      {/* crown */}
      <path
        d="M10 4.8l2 2.2 2-3 2 3 2-2.2 1 4H9l1-4z"
        fill="#d9b94b"
        stroke="#b38b1f"
        strokeWidth="0.8"
      />
    </g>

    {/* PERSON 2: KING */}
    <g transform="translate(59,1)">
      <circle cx="14" cy="10.5" r="6.7" fill="#e9bf9d" />
      {/* hair + beard */}
      <path
        d="M8 11c0-6 4-10 10-10s10 4 10 10c0 2.3-.6 4.1-1.5 5.7-1.6-1.4-3.4-2.2-8.5-2.2s-6.9.8-8.5 2.2C8.6 15.1 8 13.3 8 11z"
        fill="#2a1a12"
      />
      <path
        d="M9 14.5c1.7 4.5 4.6 7 5 7s3.3-2.5 5-7"
        fill="none"
        stroke="#2a1a12"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="11.5" cy="10.8" r="0.8" fill="#1f130c" />
      <circle cx="16.5" cy="10.8" r="0.8" fill="#1f130c" />
      <path d="M12 14c1.3.8 2.7.8 4 0" stroke="#8a4c4c" strokeWidth="1.1" strokeLinecap="round" fill="none" />

      <rect x="12.7" y="16.6" width="2.6" height="2.8" rx="1" fill="#e9bf9d" />

      {/* royal coat */}
      <path
        d="M8.8 20h10.4c2.8 1.8 4.8 4.8 5.5 8.5l-2 17H5.3l-2-17c.7-3.7 2.7-6.7 5.5-8.5z"
        fill="#24487d"
      />
      {/* coat trim */}
      <path d="M14 20v25" stroke="#d9b94b" strokeWidth="2" />
      <path d="M9.5 23h9" stroke="#d9b94b" strokeWidth="1" strokeLinecap="round" />
      <path d="M9.5 27h9" stroke="#d9b94b" strokeWidth="1" strokeLinecap="round" />
      <path d="M10 31h8.9" stroke="#d9b94b" strokeWidth="1" strokeLinecap="round" />

      {/* arms */}
      <line x1="8.5" y1="24" x2="0.5" y2="30" stroke="#e9bf9d" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="19.5" y1="24" x2="27.5" y2="30" stroke="#e9bf9d" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="0.5" cy="30.5" r="1.8" fill="#e9bf9d" />
      <circle cx="27.5" cy="30.5" r="1.8" fill="#e9bf9d" />

      {/* legs */}
      <rect x="10" y="47" width="3.4" height="11" rx="1.4" fill="#53311f" />
      <rect x="15.2" y="47" width="3.4" height="11" rx="1.4" fill="#53311f" />
      <ellipse cx="11.2" cy="60" rx="3.2" ry="1.2" fill="#1a120d" />
      <ellipse cx="16.8" cy="60" rx="3.2" ry="1.2" fill="#1a120d" />

      {/* crown */}
      <path
        d="M9 4.8l2.2 3 2-3.8 2 3.8 2.2-3 1 4.2H8l1-4.2z"
        fill="#d9b94b"
        stroke="#b38b1f"
        strokeWidth="0.8"
      />
      <circle cx="14" cy="4.7" r="1" fill="#ff6b6b" />
      <circle cx="10.8" cy="6.1" r="0.8" fill="#ffdd57" />
      <circle cx="17.2" cy="6.1" r="0.8" fill="#ffdd57" />
    </g>

    {/* PERSON 3: ROYAL / GENTLEMAN */}
    <g transform="translate(100,4)">
      <circle cx="14" cy="9.5" r="6.2" fill="#dcb28e" />
      <path
        d="M8 10c0-5.5 4-9 10-9s10 3.5 10 9c0 2-.6 3.7-1.4 5-1.7-1.7-4.1-2.5-8.6-2.5s-6.9.8-8.6 2.5C8.6 13.7 8 12 8 10z"
        fill="#5a3a23"
      />
      <circle cx="11.5" cy="10" r="0.75" fill="#1f130c" />
      <circle cx="16.5" cy="10" r="0.75" fill="#1f130c" />
      <path d="M12 13.2c1.2.8 2.7.8 4 0" stroke="#8a4c4c" strokeWidth="1.1" strokeLinecap="round" fill="none" />

      <rect x="12.7" y="15.4" width="2.6" height="2.8" rx="1" fill="#dcb28e" />

      {/* outfit */}
      <path
        d="M8.8 19h10.4c2.4 1.5 4.3 4.4 4.8 7.5v16H4v-16c.5-3.1 2.4-6 4.8-7.5z"
        fill="#7a4d9b"
      />
      <path d="M14 19v23.5" stroke="#f1d58a" strokeWidth="1.8" />
      <path
        d="M11.3 20.5h5.4l-1.2 4h-3z"
        fill="#f1d58a"
      />

      {/* jacket lapels */}
      <path d="M8.4 20.5l5.6 8 5.6-8" stroke="#f8e8c2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* arms */}
      <line x1="8.4" y1="23" x2="1" y2="29" stroke="#dcb28e" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="19.6" y1="23" x2="27" y2="29" stroke="#dcb28e" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="1" cy="29.5" r="1.8" fill="#dcb28e" />
      <circle cx="27" cy="29.5" r="1.8" fill="#dcb28e" />

      {/* legs */}
      <rect x="10.1" y="45.5" width="3.2" height="11" rx="1.4" fill="#3a2a14" />
      <rect x="15.1" y="45.5" width="3.2" height="11" rx="1.4" fill="#3a2a14" />
      <ellipse cx="11.7" cy="58.8" rx="3" ry="1.1" fill="#1f130c" />
      <ellipse cx="16.7" cy="58.8" rx="3" ry="1.1" fill="#1f130c" />
    </g>
  </svg>
);

export default PeopleSVG;