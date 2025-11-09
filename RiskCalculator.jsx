import { useState } from 'react';
export default function RiskCalculator(){
  const [balance,setBalance]=useState(1000);
  const [riskPct,setRiskPct]=useState(1);
  const [entry,setEntry]=useState('');
  const [sl,setSl]=useState('');
  const [tp,setTp]=useState('');
  const [leverage,setLeverage]=useState(1);
  const calc = ()=>{
    const b=Number(balance); const rp=Number(riskPct)/100; const e=Number(entry); const s=Number(sl); const t=Number(tp);
    const riskAmount = b*rp;
    const riskPerUnit = Math.abs(e - s);
    const positionSize = riskPerUnit? (riskAmount / riskPerUnit) : 0;
    const rr = (t && e)? Math.abs(t - e) / Math.abs(e - s) : 0;
    return { riskAmount, positionSize, rr };
  }
  const out = calc();
  return (
    <div style={{border:'1px solid #ddd',padding:12,borderRadius:8}}>
      <h4>Risk Calculator</h4>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <input value={balance} onChange={e=>setBalance(e.target.value)} placeholder='Account balance' />
        <input value={riskPct} onChange={e=>setRiskPct(e.target.value)} placeholder='Risk %' />
        <input value={entry} onChange={e=>setEntry(e.target.value)} placeholder='Entry price' />
        <input value={sl} onChange={e=>setSl(e.target.value)} placeholder='Stop loss price' />
        <input value={tp} onChange={e=>setTp(e.target.value)} placeholder='Take profit price' />
        <input value={leverage} onChange={e=>setLeverage(e.target.value)} placeholder='Leverage (if forex)' />
      </div>
      <div style={{marginTop:8}}>
        <div>Risk amount: {out.riskAmount.toFixed(2)}</div>
        <div>Position size (units): {out.positionSize.toFixed(4)}</div>
        <div>RR: {out.rr.toFixed(2)}</div>
      </div>
    </div>
  )
}
