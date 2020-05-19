const { GoogleSpreadsheet } = require('google-spreadsheet')

exports.VIDEOS_SHEET = 'videos';
exports.GRADING_SHEET = 'grading';

exports.findSheetByName = async (doc, name, isRequired) => {
  const sheet = doc.sheetsByIndex.find(s => s.title === name);
  if (isRequired && !sheet) {
    throw new Error(`Target sheet "${name}" not found`)
  }
  return sheet;
}

exports.loadSpreadsheet = async (event, context, callback) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_KEY)
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // Netlify doesn't support multiline env vars
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  })
  await doc.loadInfo()
  return doc;
};
