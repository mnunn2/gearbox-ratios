import { google } from "googleapis";

export const getSheetData = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  //TODO: remove console.logg
  console.log("getSheetData has run");

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client as any });
  const range = "gbdata!A1:Z";

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    return sheetToGearData(response.data.values);
  } catch (err) {
    console.error("Error fetching sheet values", err);
    return [];
  }
};

function sheetToGearData(arr: any[][] | null | undefined) {
  if (!arr) return [];
  let gData = arr.slice(1).map((rows) => {
    let obj: Record<string, number | null | string> = {};
    rows.forEach((r, i) => {
      if (r === "") {
        obj[arr[0][i]] = null; // Explicitly assign null
      } else if (isNaN(Number(r))) {
        obj[arr[0][i]] = r;
      } else {
        const value = isNaN(Number(r)) ? null : Number(r); // Convert to number, or null if not possible
        obj[arr[0][i]] = value;
      }
    });
    return obj;
  });

  return gData;
}
