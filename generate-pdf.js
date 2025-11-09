import PDFDocument from 'pdfkit';
export default async function handler(req,res){
  try{
    const { title='Gacor FX Report', summary={}, trades=[] } = req.body || {};
    const doc = new PDFDocument({ margin: 40 });
    let chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
      res.send(result);
    });
    doc.fontSize(18).text(title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text('Summary:');
    for(const k of Object.keys(summary)){
      doc.text(`${k}: ${summary[k]}`);
    }
    doc.moveDown();
    doc.text('Trades:');
    trades.slice(0,50).forEach((t,i)=>{
      doc.text(`${i+1}. ${t.date||''} ${t.pair||''} ${t.side||''} result:${t.result||''} notes:${t.notes||''}`);
    });
    doc.end();
  } catch(e){ res.status(500).json({ error: e.message }); }
}
