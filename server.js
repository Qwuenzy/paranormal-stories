//23:49

import http from "node:http";
import serveStatic from "./utils/serveStatic.js"
import handleGet from "./handlers/routeHandlers.js";

const PORT = 8000;

const __dirname = import.meta.dirname;
const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith('/api')){
      if (req.method === "GET"){
      return await handleGet(res)
    }} else if (!req.url.startsWith('/api')){
      await serveStatic(__dirname,req,res)
    }
  } catch (err) {
    console.log("The Error is: " + err);
  }
});

server.listen(PORT, () => console.log(`connecting at ${PORT}`));
