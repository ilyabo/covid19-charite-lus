const { getNowFormatted, loadSpreadsheet, findSheetByName } = require('./common');

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
          'pat_none',
          'pat_pleuraverdickung',
          'pat_blines1',
          'pat_blines2',
          'pat_subpkons',
          'pat_aerobronch',
        ],
      });
    }


    const body = JSON.parse(event.body);
    await sheet.addRow({
      ...body.values,
      video: body.video,
      time: getNowFormatted(),
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
