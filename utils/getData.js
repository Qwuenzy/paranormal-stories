import path from "node:path";
import fs from "node:fs/promises";

export default async function getData() {
  try {
    const pathjson = path.join("data", "data.json");
    const data = await fs.readFile(pathjson, "utf8");
    const parseddata = JSON.parse(data);
    return parseddata;
  } catch (err) {
    console.log(err);
    return [];
  }
}
