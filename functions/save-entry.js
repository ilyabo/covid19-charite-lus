const { GRADING_SHEET, loadSpreadsheet, findSheetByName } = require('./spreadsheet');

exports.handler = async (event, context, callback) => {
  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return {
      statusCode: 401,
      body: 'Unauthorized',
    }
  }
  try {
    const doc = await loadSpreadsheet();
    const sheet = await findSheetByName(doc, GRADING_SHEET, true);

    const data = {one: 1, two: 2}
    const addedRow = await sheet.addRow(data)


    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `row added`,
      }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.toString(),
    }
  }
};
