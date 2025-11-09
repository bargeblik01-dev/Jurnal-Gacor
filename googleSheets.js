import { google } from 'googleapis';
export const getAuth = ()=> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY||'').replace(/\\n/g, '\n');
  return new google.auth.JWT(clientEmail, null, privateKey, ['https://www.googleapis.com/auth/spreadsheets']);
};
export async function writeRow(range, values){
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  return sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] }
  });
}
export async function read(range){
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: process.env.SHEET_ID, range });
  return res.data.values || [];
}
