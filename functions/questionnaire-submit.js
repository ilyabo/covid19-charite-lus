const { QUESTIONNAIRE_SHEET, getNowFormatted, loadSpreadsheet, findSheetByName } = require('./common');

const fieldNames = [
  'Gruppe',
  // 'ErfahrungJahre',
  // 'ErfahrungArzt',
  // 'Fachrichtung',
  'ErfahrungSonoJahre',
  'Sonographien',
  // 'LUS_insgesamt',
  // 'LUS_COVID19',
  // 'LUS_COVID19_Anzahl'
];

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
      Gruppe: Math.round(Math.random()) + 1,
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
