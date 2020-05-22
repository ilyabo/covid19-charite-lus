const { QUESTIONNAIRE_SHEET, getNowFormatted, loadSpreadsheet, findSheetByName } = require('./common');

const fieldNames = require('../src/questionnaireFields.json');

exports.handler = async (event, context, callback) => {
    console.log(JSON.parse(event.body));
  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return {
      statusCode: 401,
      body: 'Unauthorized',
    }
  }
  try {
    const doc = await loadSpreadsheet();
    let sheet = await findSheetByName(doc, QUESTIONNAIRE_SHEET, false);
    if (!sheet) {
      sheet = await doc.addSheet({
        title: QUESTIONNAIRE_SHEET,
        headerValues: [
          'user', 'time', ...fieldNames
        ],
      });
    }

    const body = JSON.parse(event.body);
    await sheet.addRow({
      ...body.values,
      user: user.email,
      time: getNowFormatted(),
    });


    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'ok',
      }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.toString(),
    }
  }
};
