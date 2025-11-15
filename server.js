//23:21
import http from "node:http"
import path from "node:path"
import fs from "node:fs/promises"

const PORT = 8000

const __dirname = import.meta.dirname
const server = http.createServer( async (req,res) => {
    const filepath = path.join(__dirname,"public","index.html")

   const content = await fs.readFile(filepath, "utf8")
        res.statusCode = 200
        res.setHeader('Content-Type','text/html')
        res.end(content)
})

server.listen(PORT, () => console.log(`connecting at ${PORT}`))