import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import './style.css';
const games=[
 {id:'NFL',league:'NFL',match:'Kansas City vs Buffalo',home:'KC',away:'BUF',score:'27 – 24',detail:'Fourth quarter • 1:42 remaining',color:'#c63238'},
 {id:'NBA',league:'NBA',match:'New York vs Boston',home:'NYK',away:'BOS',score:'108 – 107',detail:'Fourth quarter • 0:23 remaining',color:'#ef8d38'},
 {id:'SOCCER',league:'SOCCER',match:'Madrid vs Barcelona',home:'RMA',away:'BAR',score:'2 – 2',detail:'90+2 minutes',color:'#397ddd'}];
const events=[
 {at:0,g:0,title:'The game is on the line',note:'Kansas City drives into scoring range.',call:'We are starting in Kansas City. Your pick needs one more touchdown.'},
 {at:16,g:1,title:'A one-point game',note:'New York takes possession with 23 seconds left.',call:'Switching to basketball. New York has one possession to cover your pick.'},
 {at:31,g:2,title:'Stoppage-time drama',note:'Madrid earns a dangerous free kick.',call:'Big moment in soccer. Madrid has a chance to decide this in stoppage time.'},
 {at:46,g:0,title:'Red-zone alert',note:'Kansas City reaches the eight-yard line.',call:'Back to Kansas City. They are inside the ten.'},
 {at:62,g:1,title:'Final shot',note:'New York hits a dramatic jumper.',call:'New York gets the shot away. It is good!'},
 {at:77,g:2,title:'Last-minute winner',note:'Madrid scores from the free kick.',call:'Madrid scores! That changes the outcome of your third pick.'},
 {at:89,g:0,title:'Your personal recap',note:'Two picks hit; one remains in play.',call:'That is your personalized Bet-Cast recap.'}];
function App(){
 const [sec,setSec]=useState(0),[playing,setPlaying]=useState(false),[auto,setAuto]=useState(true),[manual,setManual]=useState(0),[voice,setVoice]=useState(false);
 const active=[...events].reverse().find(e=>sec>=e.at)||events[0];
 const gameIndex=auto?active.g:manual; const game=games[gameIndex];
 useEffect(()=>{if(!playing)return;const id=setInterval(()=>setSec(s=>s>=90?0:s+1),1000);return()=>clearInterval(id)},[playing]);
 useEffect(()=>{if(!voice||!playing||!auto||!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(active.call);u.rate=1.05;window.speechSynthesis.speak(u);return()=>window.speechSynthesis.cancel()},[active.at,voice,playing,auto]);
 const reset=()=>{setSec(0);setPlaying(true);setAuto(true)};
 return <main className="app">
  <header><div className="logo"><span className="pulse">◉</span> BET<span>CAST</span></div><div className="headerRight"><span className="tag">INTERACTIVE CONCEPT DEMO</span><button onClick={()=>document.documentElement.requestFullscreen?.()}>⛶ TV MODE</button></div></header>
  <div className="headline"><div><p className="eyebrow">YOUR PERSONAL REDZONE</p><h1>Every game. <em>Your moments.</em></h1><p>Watch the moments that matter to your picks. Your AI director handles the switching.</p></div><div className="liveTag"><span className="pulse">●</span> SIMULATED LIVE</div></div>
  <div className="layout"><section className="broadcast"><div className="screen" style={{'--team':game.color}}>
   <div className="screenTop"><span className="onAir">● ON AIR</span><span>{game.league} • PERSONALIZED FEED</span><span className="auto">{auto?'✦ AI DIRECTOR':'MANUAL VIEW'}</span></div>
   <div className="arena"><div className="stadium"><div className="lights">✦ ✦ ✦ ✦ ✦</div><div className="field">{game.id==='NBA'?'🏀':game.id==='NFL'?'🏈':'⚽'}</div><div className="crowd">▰ ▰ ▰ ▰ ▰ ▰ ▰ ▰ ▰ ▰ ▰ ▰ ▰</div></div></div>
   <div className="scoreboard"><span>{game.home}</span><strong>{game.score}</strong><span>{game.away}</span></div>
   <div className="ticker">{game.detail}</div>
   <div className="moment"><span className="momentTag">✦ DIRECTOR'S CALL</span><h2>{auto?active.title:'You are in control'}</h2><p>{auto?active.note:game.match+' • Choose AI Director to resume automatic switching.'}</p></div>
  </div><div className="controls"><button className="primary" onClick={()=>setPlaying(p=>!p)}>{playing?'Ⅱ Pause':'▶ Play demo'}</button><button onClick={reset}>↻ Replay</button><button onClick={()=>setVoice(v=>!v)}>{voice?'🔊 Commentary on':'🔇 Commentary off'}</button><span className="clock">{String(Math.floor(sec/60)).padStart(2,'0')}:{String(sec%60).padStart(2,'0')} / 01:30</span></div>
  <input aria-label="Demo timeline" className="timeline" type="range" min="0" max="90" value={sec} onChange={e=>setSec(Number(e.target.value))}/>
  <div className="channels"><button className={auto?'selected':''} onClick={()=>setAuto(true)}>✦ AI Director</button>{games.map((g,i)=><button key={g.id} className={!auto&&manual===i?'selected':''} onClick={()=>{setAuto(false);setManual(i)}}>{g.league}</button>)}</div></section>
  <aside><div className="sideTitle"><span>YOUR BETSLIP</span><span className="tag">DEMO DATA</span></div><p className="asideIntro">Your picks determine what goes on screen.</p>
  {[['🏈','KC touchdown','Chiefs vs Bills',sec>=46?'IN PLAY':'WATCHING'],['🏀','NYK to win','Knicks vs Celtics',sec>=62?'HIT':'IN PLAY'],['⚽','Madrid to score','Madrid vs Barcelona',sec>=77?'HIT':'IN PLAY']].map(([icon,pick,match,status])=><div className="bet" key={pick}><div className="betIcon">{icon}</div><div><strong>{pick}</strong><small>{match}</small></div><span className={'status '+(status==='HIT'?'hit':'')}>{status}</span></div>)}
  <div className="insight"><span>✦ AI DIRECTOR</span><h3>Why this game?</h3><p>{auto?active.note:'Manual mode lets you choose which game to watch.'}</p></div><div className="footnote">Fictional sports and bet data. No real wagers or live video.</div></aside></div>
  <footer>BETCAST PROTOTYPE <span>•</span> BUILT TO SHOW A MORE PERSONAL WAY TO WATCH SPORTS</footer>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);