import getData from "../utils/getData.js";
import sendResponse from "../utils/sendResponse.js";
import ParseJsonBody from "../utils/ParseJsonBody.js";
import addNewSightings from "../utils/addNewSightings.js";
import sanitizeData from "../utils/sanitize.js";

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
  } catch (err) {
    sendResponse(res, 400, "application/json", JSON.stringify("Error:", err));
  }
}
export { handleGet, handlePost };
