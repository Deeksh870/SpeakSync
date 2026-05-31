import { Mic, Upload, History, LayoutDashboard, LogOut, Radio, Eraser, FileAudio, ArrowRight, Mic2, CircleDot } from "lucide-react";
import { UserButton, useUser, SignOutButton } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { pipeline } from "@xenova/transformers";
import axios from "axios";

/* ── inject global styles once ───────────────────────────────── */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0b0d12;--sb:#0e1018;--s1:#141820;--s2:#1c2133;--s3:#232a3d;
  --c:#00d4ff;--cd:#0099bb;--g:#00e5a0;--r:#ff4d6a;--p:#a064ff;
  --t:#e2e5f0;--m:#4e566e;--m2:#2a3048;
  --fd:'Syne',sans-serif;--fb:'DM Sans',sans-serif;
}
html,body,#root{height:100%;background:var(--bg);color:var(--t);font-family:var(--fb);-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#1a2030;border-radius:2px}
@keyframes ss-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
@keyframes wv{0%,100%{height:5px;opacity:.25}50%{height:28px;opacity:1}}
.wbar{width:4px;border-radius:3px;background:var(--cd);animation:wv 1.2s ease-in-out infinite;display:inline-block}
`;
if (!document.getElementById("ss-styles")) {
  const el = document.createElement("style");
  el.id = "ss-styles";
  el.textContent = STYLE;
  document.head.appendChild(el);
}

/* ── style objects ────────────────────────────────────────────── */
const css = {
  shell:   { display:"flex", minHeight:"100vh", background:"var(--bg)" },
  sb:      { width:220, flexShrink:0, background:"var(--sb)", borderRight:"1px solid #1a2030", padding:"24px 16px", display:"flex", flexDirection:"column", justifyContent:"space-between" },
  logo:    { fontFamily:"var(--fd)", fontSize:20, fontWeight:700, color:"var(--t)", marginBottom:32, paddingLeft:6 },
  main:    { flex:1, overflowY:"auto", padding:"28px 26px" },
  divider: { height:1, background:"#1a2030", margin:"14px 0" },
  navItem: (on) => ({ display:"flex", alignItems:"center", gap:9, padding:"9px 10px", borderRadius:9, fontSize:13.5, cursor:"pointer", marginBottom:2, transition:"all .15s", background: on?"var(--s2)":"transparent", color: on?"var(--c)":"var(--m)" }),
  usr:     { display:"flex", alignItems:"center", gap:9, background:"var(--s1)", border:"1px solid #1a2030", borderRadius:10, padding:10 },
  av:      { width:30, height:30, borderRadius:"50%", background:"#1c3a4a", border:"1px solid var(--cd)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"var(--c)", flexShrink:0 },
  /* dashboard */
  hrow:    { display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:22 },
  htitle:  { fontFamily:"var(--fd)", fontSize:24, fontWeight:700, letterSpacing:"-.4px" },
  hsub:    { fontSize:13, color:"var(--m)", marginTop:3 },
  badge:   { fontSize:11, padding:"4px 10px", borderRadius:20, background:"rgba(0,212,255,.1)", color:"var(--c)", border:"1px solid rgba(0,212,255,.2)", whiteSpace:"nowrap" },
  stats:   { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 },
  sc:      { background:"var(--s1)", border:"1px solid #1a2030", borderRadius:12, padding:"14px 16px" },
  scLabel: { fontSize:11, color:"var(--m)", marginBottom:6, letterSpacing:".04em" },
  scVal:   { fontFamily:"var(--fd)", fontSize:22, fontWeight:700, color:"var(--t)", lineHeight:1 },
  scSub:   (red) => ({ fontSize:11, color: red?"var(--r)":"var(--g)", marginTop:4 }),
  featGrid:{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 },
  fc:      (hov) => ({ background: hov?"var(--s2)":"var(--s1)", border:`1px solid ${hov?"var(--cd)":"#1a2030"}`, borderRadius:13, padding:"18px 16px", cursor:"pointer", transition:"all .2s", position:"relative", overflow:"hidden", transform: hov?"translateY(-2px)":"none" }),
  fcIcon:  (color) => { const map={c:["#0d2030","rgba(0,212,255,.2)","var(--c)"],g:["#0d2018","rgba(0,229,160,.2)","var(--g)"],p:["#1a1030","rgba(160,100,255,.2)","var(--p)"]}; const [bg,br,cl]=map[color]||map.c; return { width:40, height:40, borderRadius:9, background:bg, border:`1px solid ${br}`, display:"flex", alignItems:"center", justifyContent:"center", color:cl, marginBottom:13 }; },
  fcTitle: { fontFamily:"var(--fd)", fontSize:14, fontWeight:700, marginBottom:5 },
  fcDesc:  { fontSize:11.5, color:"var(--m)", lineHeight:1.6 },
  grid2:   { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 },
  panel:   { background:"var(--s1)", border:"1px solid #1a2030", borderRadius:13, padding:18 },
  ptitle:  { fontSize:11, color:"var(--m)", letterSpacing:".06em", textTransform:"uppercase", fontWeight:700, marginBottom:14 },
  /* transcript pages */
  pageTitle: { fontFamily:"var(--fd)", fontSize:26, fontWeight:700, letterSpacing:"-.4px", marginBottom:5 },
  pageSub:   { fontSize:13, color:"var(--m)", marginBottom:22 },
  tbox:      (active) => ({ minHeight:240, background:"var(--bg)", border:`1px solid ${active?"rgba(0,212,255,.35)":"#1a2030"}`, borderRadius:10, padding:18, fontSize:14.5, lineHeight:1.85, color: active?"var(--t)":"var(--m)", marginBottom:18, transition:"border-color .2s" }),
  btnRow:    { display:"flex", gap:10, flexWrap:"wrap" },
  btn:       (type) => { const map={start:{bg:"rgba(0,229,160,.1)",cl:"var(--g)",br:"rgba(0,229,160,.25)"},stop:{bg:"rgba(255,77,106,.1)",cl:"var(--r)",br:"rgba(255,77,106,.25)"},clear:{bg:"rgba(0,212,255,.08)",cl:"var(--c)",br:"rgba(0,212,255,.2)"},primary:{bg:"var(--c)",cl:"#000",br:"var(--c)"},danger:{bg:"rgba(255,77,106,.1)",cl:"var(--r)",br:"rgba(255,77,106,.3)"}}; const t=map[type]||map.clear; return { padding:"10px 20px", borderRadius:9, fontSize:13, fontWeight:500, cursor:"pointer", border:`1px solid ${t.br}`, background:t.bg, color:t.cl, display:"flex", alignItems:"center", gap:7, transition:"all .15s", fontFamily:"var(--fb)" }; },
  pulse:     { display:"inline-block", width:8, height:8, borderRadius:"50%", background:"var(--r)", marginRight:4, animation:"ss-pulse 1s ease-in-out infinite" },
  /* upload */
  dropZone:  { border:"1.5px dashed #1e2535", borderRadius:10, padding:"28px 20px", textAlign:"center", cursor:"pointer", marginBottom:18 },
  fileChip:  { display:"inline-flex", alignItems:"center", gap:8, background:"var(--s2)", border:"1px solid #1a2030", borderRadius:8, padding:"8px 14px", marginBottom:18, fontSize:13 },
  /* history */
  hitem:     { background:"var(--s1)", border:"1px solid #1a2030", borderRadius:13, padding:"16px 18px", marginBottom:10 },
  htag:      { fontSize:11, fontWeight:500, padding:"3px 10px", borderRadius:20, background:"rgba(0,212,255,.1)", color:"var(--c)", border:"1px solid rgba(0,212,255,.2)" },
  hdate:     { fontSize:11, color:"var(--m)" },
  hfile:     { fontSize:12, color:"var(--m)", marginBottom:7 },
  htext:     { fontSize:13, color:"var(--t)", lineHeight:1.75 },
};

/* ── Nav item with hover ──────────────────────────────────────── */
function NavItem({ active, onClick, icon, label, danger }) {
  const [hov, setHov] = useState(false);
  const base = danger
    ? { ...css.navItem(false), color:"var(--r)", ...(hov?{background:"rgba(255,77,106,.08)"}:{}) }
    : { ...css.navItem(active), ...(hov&&!active?{background:"var(--s1)",color:"var(--t)"}:{}) };
  return <div style={base} onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>{icon}<span>{label}</span></div>;
}

/* ── Feature card with hover ─────────────────────────────────── */
function FeatCard({ onClick, iconColor, icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={css.fc(hov)} onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={css.fcIcon(iconColor)}>{icon}</div>
      <div style={css.fcTitle}>{title}</div>
      <div style={css.fcDesc}>{desc}</div>
      <ArrowRight size={15} style={{ position:"absolute", bottom:14, right:14, color: hov?"var(--c)":"var(--m2)", transition:"color .2s" }} />
    </div>
  );
}

/* ── Animated waveform ───────────────────────────────────────── */
function Waveform() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:3, height:36, marginBottom:12 }}>
      {Array.from({length:22}).map((_,i) => (
        <span key={i} className="wbar" style={{ animationDelay:`${i*0.06}s`, height:`${6+Math.random()*22}px` }} />
      ))}
    </div>
  );
}

/* ── Main App ────────────────────────────────────────────────── */
function App() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [listening, setListening] = useState(false);
  const [liveText, setLiveText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadText, setUploadText] = useState("");
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  // SPEECH RECOGNITION
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript + " ";
      setLiveText(transcript);
    };
    recognitionRef.current = recognition;
  }, []);

  // START LISTENING
  const startListening = () => { recognitionRef.current.start(); setListening(true); };

  // STOP LISTENING
  const stopListening = () => {
    recognitionRef.current.stop();
    setListening(false);
    if (activeTab === "record") {
      setFinalText(liveText);
      const history = JSON.parse(localStorage.getItem("speechHistory")) || [];
      history.unshift({ id:Date.now(), type:"Record & Convert", fileName:"Microphone Recording", text:liveText, date:new Date().toLocaleString() });
      localStorage.setItem("speechHistory", JSON.stringify(history));
    }
  };

  const transcribeAudio = async () => {
    if (!uploadedFile) { alert("Please select an audio file"); return; }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("audio", uploadedFile);
      const response = await axios.post("https://speaksync.onrender.com/upload", formData, { headers:{ "Content-Type":"multipart/form-data" } });
      setUploadText(response.data.text);
      const history = JSON.parse(localStorage.getItem("speechHistory")) || [];
      history.unshift({ id:Date.now(), type:"Upload Audio", fileName:uploadedFile.name, text:response.data.text, date:new Date().toLocaleString() });
      localStorage.setItem("speechHistory", JSON.stringify(history));
    } catch (error) {
      console.error(error);
      setUploadText("Transcription failed.");
    } finally {
      setLoading(false);
    }
  };

  const firstName = user?.firstName || "there";
  const historyItems = JSON.parse(localStorage.getItem("speechHistory")) || [];

  return (
    <div style={css.shell}>

      {/* ── SIDEBAR ── */}
      <div style={css.sb}>
        <div>
          <div style={css.logo}>Speak<span style={{color:"var(--c)"}}>Sync</span></div>
          <NavItem active={activeTab==="dashboard"} onClick={()=>setActiveTab("dashboard")} icon={<LayoutDashboard size={17}/>} label="Dashboard"/>
          <NavItem active={activeTab==="speech"}    onClick={()=>setActiveTab("speech")}    icon={<Mic size={17}/>}            label="Live Speech"/>
          <NavItem active={activeTab==="record"}    onClick={()=>setActiveTab("record")}    icon={<Radio size={17}/>}          label="Record"/>
          <NavItem active={activeTab==="upload"}    onClick={()=>setActiveTab("upload")}    icon={<Upload size={17}/>}         label="Upload"/>
          <NavItem active={activeTab==="history"}   onClick={()=>setActiveTab("history")}   icon={<History size={17}/>}        label="History"/>
          <div style={css.divider}/>
          <SignOutButton><NavItem danger icon={<LogOut size={17}/>} label="Logout"/></SignOutButton>
        </div>
        <div style={css.usr}>
          <UserButton/>
          <div>
            <div style={{fontSize:12.5,fontWeight:500,lineHeight:1.2}}>{firstName}</div>
            <div style={{fontSize:10.5,color:"var(--m)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:120}}>{user?.primaryEmailAddress?.emailAddress}</div>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={css.main}>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <div style={css.hrow}>
              <div>
                <div style={css.htitle}>Good evening, {firstName} 👋</div>
                <div style={css.hsub}>Here's what's happening with your transcriptions.</div>
              </div>
              <div style={css.badge}><CircleDot size={10} style={{verticalAlign:1,marginRight:5}}/>Live ready</div>
            </div>

            {/* stat cards */}
            <div style={css.stats}>
              {[
                { label:"Total Transcriptions", val: historyItems.length, sub:"↑ all time" },
                { label:"Audio Uploads", val: historyItems.filter(i=>i.type==="Upload Audio").length, sub:"↑ uploaded" },
                { label:"Live Sessions", val: historyItems.filter(i=>i.type!=="Upload Audio").length, sub:"↑ recorded" },
                { label:"Accuracy Rate", val:"97%", sub:"↓ 1% from avg", red:true },
              ].map((item,i) => (
                <div key={i} style={css.sc}>
                  <div style={css.scLabel}>{item.label}</div>
                  <div style={css.scVal}>{item.val}</div>
                  <div style={css.scSub(item.red)}>{item.sub}</div>
                </div>
              ))}
            </div>

            {/* feature cards */}
            <div style={css.featGrid}>
              <FeatCard onClick={()=>setActiveTab("speech")} iconColor="c" icon={<Mic size={18}/>} title="Live Speech" desc="Real-time transcription as you speak. See every word appear instantly."/>
              <FeatCard onClick={()=>setActiveTab("record")} iconColor="g" icon={<Radio size={18}/>} title="Record & Convert" desc="Record your full speech first, then generate the complete transcript."/>
              <FeatCard onClick={()=>setActiveTab("upload")} iconColor="p" icon={<FileAudio size={18}/>} title="Upload Audio" desc="Drop any audio file — MP3, WAV, M4A — and get a full transcript back."/>
            </div>

            <div style={css.grid2}>
              {/* live monitor panel */}
              <div style={css.panel}>
                <div style={css.ptitle}>Live monitor</div>
                <Waveform/>
                <div style={{fontSize:12,color:"var(--m)",lineHeight:1.7,borderTop:"1px solid #1a2030",paddingTop:12}}>
                  <span style={{color:"var(--t)",fontWeight:500}}>Last recorded: </span>
                  {liveText || "Start Live Speech to see output here…"}
                </div>
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  <div style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"rgba(0,229,160,.1)",color:"var(--g)",border:"1px solid rgba(0,229,160,.2)"}}>
                    <CircleDot size={9} style={{verticalAlign:1,marginRight:3}}/>Ready
                  </div>
                  <div style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"var(--s2)",color:"var(--m)"}}>en-US</div>
                  <div style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"var(--s2)",color:"var(--m)"}}>Continuous</div>
                </div>
              </div>

              {/* recent activity */}
              <div style={css.panel}>
                <div style={css.ptitle}>Recent activity</div>
                {historyItems.length === 0 ? (
                  <div style={{fontSize:13,color:"var(--m)",paddingTop:12}}>No transcriptions yet — get started above.</div>
                ) : (
                  historyItems.slice(0,4).map((item,i) => (
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"9px 0",borderBottom: i<3&&i<historyItems.slice(0,4).length-1?"1px solid #1a2030":"none"}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:item.type==="Upload Audio"?"var(--p)":"var(--c)",marginTop:4,flexShrink:0}}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:500,color:"var(--t)",marginBottom:2}}>{item.type}</div>
                        <div style={{fontSize:11,color:"var(--m)"}}>{item.fileName}</div>
                      </div>
                      <div style={{fontSize:11,color:"var(--m)",flexShrink:0}}>{item.date.split(",")[1]||item.date}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* usage panel */}
            <div style={css.panel}>
              <div style={css.ptitle}>Usage breakdown</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
                <div>
                  {[
                    { label:"Live Speech", pct:64, color:"var(--c)" },
                    { label:"Record & Convert", pct:22, color:"var(--g)" },
                    { label:"Upload Audio", pct:14, color:"var(--p)" },
                  ].map((row,i) => (
                    <div key={i} style={{marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--m)",marginBottom:5}}>
                        <span>{row.label}</span><span>{row.pct}%</span>
                      </div>
                      <div style={{height:5,background:"var(--s3)",borderRadius:3,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${row.pct}%`,background:row.color,borderRadius:3}}/>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{borderLeft:"1px solid #1a2030",paddingLeft:20}}>
                  <div style={{fontSize:11,color:"var(--m)",marginBottom:8}}>Most active day</div>
                  <div style={{fontFamily:"var(--fd)",fontSize:20,fontWeight:700}}>Thursday</div>
                  <div style={{fontSize:12,color:"var(--g)",marginTop:3}}>↑ 34 transcriptions</div>
                </div>
                <div style={{borderLeft:"1px solid #1a2030",paddingLeft:20}}>
                  <div style={{fontSize:11,color:"var(--m)",marginBottom:8}}>Avg session length</div>
                  <div style={{fontFamily:"var(--fd)",fontSize:20,fontWeight:700}}>4m 12s</div>
                  <div style={{fontSize:12,color:"var(--c)",marginTop:3}}>↑ 40s from last week</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LIVE SPEECH */}
        {activeTab === "speech" && (
          <div>
            <div style={css.pageTitle}>Live Speech Recognition</div>
            <div style={css.pageSub}>Speak naturally — transcription appears in real time.</div>
            <div style={css.panel}>
              {listening && <Waveform/>}
              <div style={css.tbox(!!liveText)}>{liveText || "Start speaking to see live transcription…"}</div>
              <div style={css.btnRow}>
                {!listening ? (
                  <button style={css.btn("start")} onClick={startListening}><Mic size={15}/> Start Listening</button>
                ) : (
                  <button style={css.btn("stop")} onClick={stopListening}><span style={css.pulse}/> Stop Listening</button>
                )}
                <button style={css.btn("clear")} onClick={()=>setLiveText("")}><Eraser size={15}/> Clear</button>
              </div>
            </div>
          </div>
        )}

        {/* RECORD & CONVERT */}
        {activeTab === "record" && (
          <div>
            <div style={css.pageTitle}>Record & Convert</div>
            <div style={css.pageSub}>Record your full speech, then generate the complete transcript.</div>
            <div style={css.panel}>
              {listening && <Waveform/>}
              <div style={css.tbox(!!finalText)}>{finalText || "Record your speech and press Stop Recording to generate transcript…"}</div>
              <div style={css.btnRow}>
                {!listening ? (
                  <button style={css.btn("start")} onClick={startListening}><Mic2 size={15}/> Start Recording</button>
                ) : (
                  <button style={css.btn("stop")} onClick={stopListening}><span style={css.pulse}/> Stop Recording</button>
                )}
                <button style={css.btn("clear")} onClick={()=>{setLiveText("");setFinalText("");}}><Eraser size={15}/> Clear</button>
              </div>
            </div>
          </div>
        )}

        {/* UPLOAD AUDIO */}
        {activeTab === "upload" && (
          <div>
            <div style={css.pageTitle}>Upload Audio File</div>
            <div style={css.pageSub}>Transcribe any audio file using the backend model.</div>
            <div style={css.panel}>
              <label style={css.dropZone}>
                <FileAudio size={28} style={{color:"var(--m)",display:"block",margin:"0 auto 10px"}}/>
                <p style={{fontSize:13,color:"var(--m)"}}>{uploadedFile ? "Change file" : "Click to select an audio file (MP3, WAV, M4A…)"}</p>
                <input type="file" accept="audio/*" onChange={(e)=>setUploadedFile(e.target.files[0])} style={{display:"none"}}/>
              </label>
              {uploadedFile && (
                <div style={css.fileChip}><FileAudio size={14} style={{color:"var(--c)"}}/><span style={{color:"var(--t)"}}>{uploadedFile.name}</span></div>
              )}
              <div style={css.btnRow}>
                <button style={css.btn("primary")} onClick={transcribeAudio}><Upload size={15}/>{loading?"Transcribing…":"Upload & Transcribe"}</button>
              </div>
              <div style={{...css.tbox(!!uploadText),marginTop:18,marginBottom:0}}>{uploadText || "Upload an audio file and click Transcribe."}</div>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === "history" && (
          <div>
            <div style={css.pageTitle}>Speech History</div>
            <div style={{...css.pageSub,marginBottom:16}}>All your past transcriptions in one place.</div>
            <button style={{...css.btn("danger"),marginBottom:20}} onClick={()=>{localStorage.removeItem("speechHistory");window.location.reload();}}>
              <Eraser size={15}/> Clear History
            </button>
            {historyItems.length === 0 ? (
              <div style={{fontSize:14,color:"var(--m)",padding:"32px 0"}}>No transcriptions yet.</div>
            ) : (
              historyItems.map((item) => (
                <div key={item.id} style={css.hitem}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <span style={css.htag}>{item.type}</span>
                    <span style={css.hdate}>{item.date}</span>
                  </div>
                  <div style={css.hfile}>{item.fileName}</div>
                  <div style={css.htext}>{item.text}</div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;