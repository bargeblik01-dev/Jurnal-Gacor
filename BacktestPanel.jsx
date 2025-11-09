import { useState } from 'react';
export default function BacktestPanel(){
  const [out,setOut]=useState(null);
  const runBacktest = async ()=>{
    const res = await fetch('/api/backtest', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({}) });
    const j = await res.json(); setOut(j);
  }
  const genPdf = async ()=>{
    const res = await fetch('/api/generate-pdf', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title:'Gacor FX Report', summary:{ net: 'TBD' }, trades: [] }) });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob); window.open(url);
  }
  const sendEmail = async ()=>{
    const res = await fetch('/api/sendDailySummary', { method:'POST' });
    const j = await res.json(); alert(JSON.stringify(j));
  }
  return (
    <div style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
      <div style={{display:'flex',gap:8}}>
        <button onClick={runBacktest}>Run Backtest</button>
        <button onClick={genPdf}>Export PDF Report</button>
        <button onClick={sendEmail}>Send Daily Summary (test)</button>
      </div>
      <div style={{marginTop:12}}><pre>{JSON.stringify(out,null,2)}</pre></div>
    </div>
  )
}
