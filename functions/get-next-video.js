const { VIDEOS_SHEET, loadSpreadsheet, findSheetByName } = require('./spreadsheet');

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
    const sheet = await findSheetByName(doc, VIDEOS_SHEET, true);
    const rows = await sheet.getRows();
    const nextVideo = rows && rows[0];
    return {
      statusCode: 200,
      body: JSON.stringify(nextVideo
      ? {
        id: nextVideo.id,
        url: nextVideo.video_url,
      }
      : {}
      ),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.toString()),
    }
  }
};
