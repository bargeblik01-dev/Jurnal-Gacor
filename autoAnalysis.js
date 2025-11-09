import { read } from '@/lib/googleSheets';
export default async function handler(req,res){
  try{
    const trades = req.method==='POST' && req.body.trades ? req.body.trades : [];
    let rows = [];
    if(trades.length) rows = trades;
    else {
      const sheet = await read('Sheet1!A2:Z');
      rows = (sheet||[]).map(r=>({ date:r[0], pair:r[1], side:r[2], entry:r[3], sl:r[4], tp:r[5], exit:r[6], result: r[7], notes: r[9] }));
    }
    const analyses = rows.map(t=>{
      const entry = Number(t.entry)||0; const sl = Number(t.sl)||0; const tp = Number(t.tp)||0;
      let rr = null;
      if(entry && sl && tp) rr = Math.abs(tp - entry) / Math.abs(entry - sl);
      const recs = [];
      if(rr!==null && rr<1) recs.push('RR rendah');
      if(!t.notes) recs.push('Tambah notes');
      return {...t, rr, recommendations: recs};
    });
    res.json({ ok:true, analyses });
  } catch(e){
    res.status(500).json({ error: e.message });
  }
}
