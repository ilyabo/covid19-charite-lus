const { loadSpreadsheet, findSheetByName } = require('./spreadsheet');

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
          'pleuraverdickung',
          'blines vereinzelnd',
          'blines konfluierend',
          'a-lines',
          'multiple b-lines',
        ],
      });
    }

    const body = JSON.parse(event.body);
    await sheet.addRow({
      ...body
    })
    console.log(JSON.stringify(body))

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
