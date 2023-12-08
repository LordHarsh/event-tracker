import { google } from 'googleapis';
import config from '../../config';

export const updateSheet = async (event, data) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: client as any });
  const spreadsheetId = config.eventSet.gsheetId;
  const valueInputOption = 'USER_ENTERED';
  const resource = {
    values: [Object.values(data)],
  };
  const sheetName = event.name;
  const sheetsResponse = await googleSheets.spreadsheets.get({
    spreadsheetId,
  });

  const sheetExists = sheetsResponse.data.sheets.some(sheet => sheet.properties.title === sheetName);

  if (!sheetExists) {
    await googleSheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    } as any);
    const range = `${sheetName}!A1`;
    await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption,
      resource: {
        values: [Object.keys(data)],
      },
    } as any);
  }
  const lastRow = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:A`,
  });
  const emptyRowNumber = lastRow.data.values.length + 1;
  const range = `${sheetName}!A${emptyRowNumber}`;

  await googleSheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption,
    resource,
  } as any);
  return;
};
