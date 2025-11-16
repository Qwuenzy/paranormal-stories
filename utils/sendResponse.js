export default function sendResponse(res,stat,header,data){
    res.statusCode = stat;
    res.setHeader("Content-Type", header);
    res.end(data);
}