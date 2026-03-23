"use client";

import { useEffect, useState } from "react";

export default function LoadingPage() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2800);
    const t2 = setTimeout(() => setVisible(false), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;1,400&display=swap');

        .lhg-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: #FDF3E3;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 20px;
          transition: opacity 0.8s ease;
        }
        .lhg-overlay.out { opacity: 0; }

        .lhg-ring {
          width: 80px; height: 80px; border-radius: 50%;
          border: 1.5px solid rgba(211, 115, 20, 0.2);
          border-top-color: #D37314;
          animation: lhg-spin 1.4s linear infinite;
        }
        @keyframes lhg-spin { to { transform: rotate(360deg); } }

        .lhg-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #D37314;
          position: absolute; top: -4px; left: 50%;
          transform: translateX(-50%);
        }

        .lhg-name {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(22px, 4vw, 32px);
          font-weight: 700; letter-spacing: 3px;
          color: #7A3C00;
          animation: lhg-fade 0.8s ease 0.3s forwards;
          opacity: 0;
        }
        .lhg-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 15px;
          letter-spacing: 4px; color: #C47A2A;
          animation: lhg-fade 0.8s ease 0.5s forwards;
          opacity: 0;
        }
        @keyframes lhg-fade { to { opacity: 1; } }

        .lhg-divider {
          display: flex; align-items: center; gap: 10px;
          animation: lhg-fade 0.8s ease 0.4s forwards;
          opacity: 0;
        }
        .lhg-line { width: 48px; height: 1px; background: #D9A96A; }
        .lhg-diamond {
          width: 6px; height: 6px;
          background: #D37314;
          transform: rotate(45deg);
        }
      `}</style>

      <div className={`lhg-overlay${fadeOut ? " out" : ""}`}>

        <div className="lhg-name">LOHAGARH</div>

        <div className="lhg-divider">
          <div className="lhg-line" />
          <div className="lhg-diamond" />
          <div className="lhg-line" />
        </div>

        <div className="lhg-sub">Heritage Hotels &amp; Resorts</div>

        <div style={{ position: "relative", marginTop: 12 }}>
          <div className="lhg-ring" />
          <div className="lhg-dot" />
        </div>

      </div>
    </>
  );
}