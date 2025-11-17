import path from "node:path";
import fs from "node:fs/promises";
import getContentType from "./getContentType.js";
import sendResponse from "./sendResponse.js";

export default async function serveStatic(dirn,req,res) {
  const pubdir = path.join(dirn, "public")
  const filepath = path.join(pubdir,
     req.url === "/" ? "index.html" : req.url);
  try {
    const content = await fs.readFile(filepath);
    const ext = path.extname(filepath)
    const contentType = getContentType(ext)
    sendResponse(res, 200, contentType, content);
  } catch (err) {
    if (req.url === "/favicon.ico") {
    res.writeHead(204);
    return res.end();
  }
  if (err.code === "ENOENT"){
    const content = await fs.readFile(path.join(pubdir, "404.html"));
    sendResponse(res, 404, "text/html", content)
  }else {
    console.log("Error:", err);
    const message = `<html><h1>Server Error: ${err.code}</h1></html>`
    sendResponse(res, 500, "text/html",message);
  }
  }
}
