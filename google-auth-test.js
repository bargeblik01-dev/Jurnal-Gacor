import { getAuth } from '@/lib/googleSheets';
export default async function handler(req,res){
  try{
    const auth = getAuth();
    await auth.authorize();
    res.json({ ok: true, email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || null });
  } catch(e){
    res.status(500).json({ error: e.message });
  }
}
