import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import App from "./App";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/* ── inject global styles ────────────────────────────────────── */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0b0d12;--s1:#141820;--s2:#1c2133;--border:#1e2535;
  --c:#00d4ff;--cd:#0099bb;--t:#e2e5f0;--m:#4e566e;
  --fd:'Syne',sans-serif;--fb:'DM Sans',sans-serif;
}
html,body,#root{height:100%;background:var(--bg);font-family:var(--fb);-webkit-font-smoothing:antialiased;}

/* ── shared auth page layout ── */
.ss-auth-bg{
  min-height:100vh;
  background-color:var(--bg);
  background-image:radial-gradient(circle,#1e2535 1px,transparent 1px);
  background-size:28px 28px;
  display:flex;align-items:center;justify-content:center;
  gap:64px;padding:40px 24px;flex-wrap:wrap;
}
.ss-brand{max-width:300px;flex-shrink:0}
.ss-logo{font-family:var(--fd);font-size:32px;font-weight:700;letter-spacing:-1px;color:var(--t);margin-bottom:12px}
.ss-logo span{color:var(--c)}
.ss-tagline{font-size:13.5px;color:var(--m);line-height:1.7;margin-bottom:28px}
.ss-wave{display:flex;align-items:center;gap:3px;height:32px;margin-bottom:26px}
.ss-wave-bar{width:3px;border-radius:2px;background:var(--cd);opacity:.55}
.ss-feats{display:flex;flex-direction:column;gap:14px}
.ss-feat{display:flex;align-items:flex-start;gap:13px}
.ss-feat-icon{width:34px;height:34px;border-radius:9px;background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.18);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--c);font-size:15px}
.ss-feat-title{font-size:13px;font-weight:500;color:var(--t);margin-bottom:2px}
.ss-feat-desc{font-size:11.5px;color:var(--m);line-height:1.55}

/* ── Clerk component overrides (apply to both SignIn & SignUp) ── */
.cl-card{background:var(--s1)!important;border:1px solid var(--border)!important;border-radius:16px!important;box-shadow:none!important;}
.cl-headerTitle{font-family:var(--fd)!important;font-size:20px!important;font-weight:700!important;color:var(--t)!important;}
.cl-headerSubtitle{font-family:var(--fb)!important;color:var(--m)!important;font-size:13px!important;}
.cl-formFieldLabel{color:var(--m)!important;font-size:12.5px!important;font-family:var(--fb)!important;}
.cl-formFieldInput{background:var(--bg)!important;border:1px solid var(--border)!important;border-radius:9px!important;color:var(--t)!important;font-family:var(--fb)!important;font-size:13.5px!important;}
.cl-formFieldInput:focus{border-color:var(--cd)!important;box-shadow:0 0 0 2px rgba(0,212,255,.12)!important;outline:none!important;}
.cl-formButtonPrimary{background:var(--c)!important;color:#000!important;font-family:var(--fd)!important;font-weight:700!important;font-size:13.5px!important;border-radius:9px!important;border:none!important;box-shadow:none!important;transition:background .15s!important;}
.cl-formButtonPrimary:hover{background:#00eaff!important;}
.cl-socialButtonsBlockButton{background:var(--s2)!important;border:1px solid var(--border)!important;border-radius:9px!important;color:var(--t)!important;font-family:var(--fb)!important;}
.cl-socialButtonsBlockButton:hover{background:#232a3d!important;}
.cl-dividerLine{background:var(--border)!important;}
.cl-dividerText{color:var(--m)!important;font-size:12px!important;}
.cl-footerActionLink{color:var(--c)!important;font-family:var(--fb)!important;}
.cl-footerActionText{color:var(--m)!important;font-family:var(--fb)!important;}
.cl-identityPreviewText{color:var(--t)!important;}
.cl-identityPreviewEditButton{color:var(--c)!important;}
.cl-formResendCodeLink{color:var(--c)!important;}
.cl-otpCodeFieldInput{background:var(--bg)!important;border:1px solid var(--border)!important;border-radius:9px!important;color:var(--t)!important;}
.cl-powered-by{display:none!important;}
.cl-logoBox{display:none!important;}
`;

if (!document.getElementById("ss-auth-styles")) {
  const el = document.createElement("style");
  el.id = "ss-auth-styles";
  el.textContent = STYLE;
  document.head.appendChild(el);
}

/* ── stable waveform heights ─────────────────────────────────── */
const WAVE_HEIGHTS = Array.from({ length: 18 }, (_, i) =>
  6 + Math.abs(Math.sin(i * 0.72)) * 20
);

/* ── shared feature list ─────────────────────────────────────── */
const FEATURES = [
  { icon: "ti-microphone",   title: "Live Speech Recognition", desc: "See your words transcribed in real time as you speak." },
  { icon: "ti-player-record",title: "Record & Convert",        desc: "Finish speaking, then generate a clean final transcript." },
  { icon: "ti-file-music",   title: "Audio File Upload",       desc: "Upload MP3, WAV, or M4A files and get full transcriptions." },
];

/* ── shared branding panel ───────────────────────────────────── */
function Brand({ tagline }) {
  return (
    <div className="ss-brand">
      <div className="ss-logo">Speak<span>Sync</span></div>
      <p className="ss-tagline">{tagline}</p>

      <div className="ss-wave">
        {WAVE_HEIGHTS.map((h, i) => (
          <div key={i} className="ss-wave-bar" style={{ height: h }} />
        ))}
      </div>

      <div className="ss-feats">
        {FEATURES.map((f) => (
          <div key={f.title} className="ss-feat">
            <div className="ss-feat-icon">
              <i className={`ti ${f.icon}`} aria-hidden="true" />
            </div>
            <div>
              <div className="ss-feat-title">{f.title}</div>
              <div className="ss-feat-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sign In page ────────────────────────────────────────────── */
function SignInPage() {
  return (
    <div className="ss-auth-bg">
      <Brand tagline="Turn your voice into text — live, recorded, or uploaded. Accurate, instant, and beautifully simple." />
      <SignIn routing="hash" />
    </div>
  );
}

/* ── Sign Up page ────────────────────────────────────────────── */
function SignUpPage() {
  return (
    <div className="ss-auth-bg">
      <Brand tagline="Join thousands turning their voice into text — instantly, accurately, effortlessly." />
      <SignUp routing="hash" />
    </div>
  );
}

/* ── Router: hash-based so Clerk's routing works ─────────────── */
function AuthRouter() {
  const hash = window.location.hash;
  if (hash.startsWith("#/sign-up")) return <SignUpPage />;
  return <SignInPage />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>

      <SignedOut>
        <AuthRouter />
      </SignedOut>

      <SignedIn>
        <App />
      </SignedIn>

    </ClerkProvider>
  </React.StrictMode>
);