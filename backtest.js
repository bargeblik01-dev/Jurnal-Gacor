import { read, writeRow } from '@/lib/googleSheets';
export default async function handler(req,res){
  try{
    const trades = req.method==='POST' && req.body.trades ? req.body.trades : [];
    let rows = [];
    if(trades.length) rows = trades;
    else {
      const sheet = await read('Sheet1!A2:Z');
      rows = (sheet||[]).map(r=>({ date:r[0], pair:r[1], side:r[2], entry:r[3], sl:r[4], tp:r[5], exit:r[6], result: r[7] }));
    }
    let acc=0; let wins=0; let losses=0; let grossProfit=0; let grossLoss=0; let equity=[];
    for(const t of rows){
      const r = Number(t.result)||0;
      acc += r; equity.push(acc);
      if(r>0){ wins++; grossProfit+=r; } else if(r<0){ losses++; grossLoss+=Math.abs(r); }
    }
    const net = acc;
    const winrate = (wins/(wins+losses))||0;
    const pf = grossLoss? grossProfit / grossLoss : grossProfit>0? Infinity:0;
    await writeRow('Backtest!A:E', [new Date().toISOString(), net, winrate, pf, 'auto']);
    res.json({ ok:true, net, winrate, profitFactor: pf, equity });
  } catch(e){
    res.status(500).json({ error: e.message });
  }
}
