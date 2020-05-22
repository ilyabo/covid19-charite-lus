const { QUESTIONNAIRE_SHEET, loadSpreadsheet, findSheetByName } = require('./common');


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
    const sheet = await findSheetByName(doc, QUESTIONNAIRE_SHEET, false);
    if (!sheet) {
      return {
        statusCode: 200,
        body: JSON.stringify({ hasSubmitted: false }),
      };
    }

    const rows = await sheet.getRows();
    hasSubmitted = rows.some(row => row.user === user.email);

    return {
      statusCode: 200,
      body: JSON.stringify({ hasSubmitted }),
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e.toString()),
    }
  }
};
