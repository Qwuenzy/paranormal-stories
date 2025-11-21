
import getData from "../utils/getData.js";
import sendResponse from "../utils/sendResponse.js";
import ParseJsonBody from "../utils/ParseJsonBody.js";
import addNewSightings from "../utils/addNewSightings.js";
import sanitizeData from "../utils/sanitize.js";
import sightLocation from "../events/sightingEvents.js"
import {stories} from "../data/stories.js"

async function handleGet(res) {
  try {
    const data = await getData();
    const content = JSON.stringify(data);
    sendResponse(res, 200, "application/json", content);
  } catch (err) {
    console.log(err);
  }
}

async function handlePost(req, res) {
  try {
    const parsedbody = await ParseJsonBody(req);
    if (
      !parsedbody.Title ||
      !parsedbody.Location ||
      !parsedbody.Details ||
      !parsedbody.dateTime
    ) {
      sendResponse(
        res,
        400,
        "application/json",
        JSON.stringify({
          error: "Please fill in all fields before submitting.",
        })
      );
      return;
    }
    const sanitizeBody = sanitizeData(parsedbody);
    await addNewSightings(sanitizeBody);
    sendResponse(res, 201, "application/json", JSON.stringify(sanitizeBody));
    await sightLocation(sanitizeBody)
  } catch (err) {
    sendResponse(res, 400, "application/json", JSON.stringify("Error:", err));
  }
}

async function handleNews(req, res) {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length);
    res.write(
      `data: ${JSON.stringify({
        event: 'news-update',
        story: stories[randomIndex]
      })}\n\n`
    );
  }, 5000);
}
export { handleGet, handlePost, handleNews };
