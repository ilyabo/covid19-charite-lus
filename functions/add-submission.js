const { loadSpreadsheet, findSheetByName } = require('./spreadsheet');
const { DateTime } = require('luxon');

const DATE_OUTPUT_TIME_ZONE = 'Europe/Berlin';

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
    let sheet = await findSheetByName(doc, user.email, false);
    if (!sheet) {
      sheet = await doc.addSheet({
        title: user.email,
        headerValues: [
          'video',
          'time',
          'lusscore',
          'pleuraverdickung',
          'blines1',
          'blines2',
          'subpkons',
          'aerobronch',
          'alines',
        ],
      });
    }

    const body = JSON.parse(event.body);
    await sheet.addRow({
      ...body.values,
      video: body.video,
      time: DateTime.local()
        .setZone(DATE_OUTPUT_TIME_ZONE)
        .toSQL(),
    })

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
