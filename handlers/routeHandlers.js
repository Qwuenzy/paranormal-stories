import getData from "../utils/getData.js"
import sendResponse from "../utils/sendResponse.js"
import ParseJsonBody from "../utils/ParseJsonBody.js"
import addNewSightings from "../utils/addNewSightings.js"

async function handleGet(res){
    try {
        const data = await getData()
        const content = JSON.stringify(data)
        sendResponse(res, 200,"application/json", content)
    } catch(err) {
        console.log(err);
    }
}

async function handlePost(req,res) {
    try{
        const parsedbody = await ParseJsonBody(req)
        await addNewSightings(parsedbody)
        sendResponse(res, 201, "application/json", JSON.stringify(parsedbody))
    } catch(err) {
        sendResponse(res, 400, "application/json", JSON.stringify("Error:", err))
    }
}
export { handleGet, handlePost }
