import nodemailer from 'nodemailer';
import { read } from '@/lib/googleSheets';
export default async function handler(req,res){
  try{
    const adminEmail = process.env.ADMIN_EMAIL;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if(!smtpUser||!smtpPass) return res.status(500).json({ error:'SMTP not configured' });
    const rows = await read('Sheet1!A2:Z');
    const today = new Date().toISOString().slice(0,10);
    const todays = (rows||[]).filter(r=> (r[0]||'').startsWith(today));
    let net=0,wins=0,losses=0;
    todays.forEach(r=>{ const v=Number(r[7]||0); net+=v; if(v>0) wins++; if(v<0) losses++; });
    const html = `<p>Daily Summary ${today}</p><p>Trades today: ${todays.length}</p><p>Net: ${net}</p><p>Wins: ${wins} Losses: ${losses}</p>`;
    const transporter = nodemailer.createTransport({ service:'gmail', auth:{ user: smtpUser, pass: smtpPass }});
    await transporter.sendMail({ from: smtpUser, to: adminEmail, subject:`Daily Summary ${today}`, html });
    res.json({ ok:true });
  } catch(e){ res.status(500).json({ error: e.message }); }
}
