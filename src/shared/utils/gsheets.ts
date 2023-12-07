import { google } from 'googleapis';
import config from '../../config';

export const updateSheet = async (data) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: client as any });
  const spreadsheetId = config.eventSet.gsheetId;
  const valueInputOption = 'USER_ENTERED';
  const resource = {
    values: [[data._id, data.name, data.email, data.mobile, data.branch, data.registrationNumber]],
  };
  const lastRow = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A:A',
  });
  const emptyRowNumber = lastRow.data.values.length + 1;
  const range = `A${emptyRowNumber}`;

  await googleSheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption,
    resource,
  } as any);
  return;
};
