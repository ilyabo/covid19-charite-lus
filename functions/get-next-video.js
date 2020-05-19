const fetch = require('node-fetch');
const { VIDEOS_SHEET, loadSpreadsheet, findSheetByName } = require('./spreadsheet');

const NUM_OF_REPETITIONS = +process.env.VIDEOS_NUM_OF_REPETITIONS || 1;
const GOOGLE_VIDEOS_BUCKET = process.env.GOOGLE_VIDEOS_BUCKET;

async function fetchUserSubmissions(user) {
  const doc = await loadSpreadsheet();
  const sheet = await findSheetByName(doc, user.email, false);
  if (!sheet) {
    return [];
  }
  const rows = sheet.getRows();
  return rows;
}

async function fetchVideosList() {
  const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${GOOGLE_VIDEOS_BUCKET}/o`);
  if (response.status !== 200) {
    const body = await response.json();
    throw new Error(`Couldn't fetch videos list: ${body.error ? body.error.message : body.toString()}`);
  }
  const json = await response.json();
  return json.items;
}

function countSubmissionsByVideoName(userSubmissions) {
  const result = new Map();
  if (userSubmissions) {
    for (const { video } of userSubmissions) {
      result.set(video, (result.get(video) || 0) + 1);
    }
  }
  return result;
}

function pickNextVideo(submissionsByVideo, videos) {
  const toPickFrom = [];
  for (const v of videos) {
    const numSubmissions = submissionsByVideo.get(v.name)
    if (numSubmissions < NUM_OF_REPETITIONS) {
      toPickFrom.push(v);
    }
  }
  if (toPickFrom.length > 0) {
    return toPickFrom[Math.floor(Math.random() * toPickFrom.length)];
  }
  throw new Error('No videos to pick from');
}

exports.handler = async (event, context, callback) => {
  const user = context.clientContext && context.clientContext.user;
  if (!user) {
    return {
      statusCode: 401,
      body: 'Unauthorized',
    }
  }
  try {
    const [userSubmissions, videos] = await Promise.all([
      await fetchUserSubmissions(user),
      await fetchVideosList(),
    ]);

    const submissionsByVideo = countSubmissionsByVideoName(userSubmissions);
    const numDone = Array.from(submissionsByVideo.values()).reduce((m,d) => m+d, 0)
    const numTotal = NUM_OF_REPETITIONS * videos.length
    let body;
    if (numDone < numTotal) {
      const nextVideo = pickNextVideo(submissionsByVideo, videos);
      body = {
        status: 'NEXT',
        id: nextVideo.name,
        url: nextVideo.mediaLink,
        numDone,
        numTotal,
      };
    } else {
      body = {
        status: 'ALL_DONE',
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(body),
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e.toString()),
    }
  }
};
