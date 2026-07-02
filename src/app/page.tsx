
'use client';

import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap">
      <div className="page1">
        <h1 className="welcome-heading">
          Welcome to Cofomo<span style={{ color: '#ff4d3a' }}>Tech</span>
        </h1>

        <div className="flip-scene">
          <div className="flip-card">
            <div className="flip-front logo-card">
              <div className="logo-display">
                <span className="logo-cofomo">Cofomo</span>
                <span className="logo-tech">Tech</span>
              </div>
            </div>
            <div className="flip-back logo-card">
              <div className="logo-display">
                <span className="logo-cofomo">Cofomo</span>
                <span className="logo-tech">Tech</span>
              </div>
            </div>
          </div>
        </div>

        <Link href="/login" className="enter-btn">
          Sign in &rarr;
        </Link>
      </div>

      <style>{`
        * , *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body {
          font-family: 'Inter', sans-serif;
          background: #f5f5f5;
          overflow: hidden;
        }

        .wrap {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .page1 {
          background: #f5f5f5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          padding: 0 24px;
          text-align: center;
        }

        .welcome-heading {
          margin-top: 90px;
          font-size: clamp(22px, 4vw, 38px);
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.5px;
          text-align: center;
        }
        .welcome-heading span { color: #ff4d3a; }

        .flip-scene {
          width: min(520px, 88vw);
          height: min(300px, 50vw);
          perspective: 1200px;
          margin-top: 40px;
        }
        .flip-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: flipLoop 3.2s ease-in-out infinite;
          border-radius: 18px;
        }
        @keyframes flipLoop {
          0%   { transform: rotateY(0deg); }
          45%  { transform: rotateY(180deg); }
          55%  { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }
        .flip-front, .flip-back {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.13);
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .flip-back { transform: rotateY(180deg); }
        .logo-display {
          display: inline-flex;
          align-items: center;
          gap: 0.15em;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          font-family: 'Inter', sans-serif;
          color: #111;
        }
        .logo-tech {
          color: #ff4d3a;
        }

        .enter-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 40px;
          background: #ff4d3a;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.3px;
        }
        .enter-btn:hover { background: #e03a28; transform: translateY(-2px); }
      `}</style>
    </main>
  );
}

