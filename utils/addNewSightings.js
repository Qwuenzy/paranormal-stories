import getData from "./getData.js"
import fs from "node:fs/promises"
import path from "node:path";

export default async function addNewSightings(newsightings) {
  try {
    const sightings = await getData();
    sightings.push(newsightings);

    const PathJSON = path.join("data","data.json")
    await fs.writeFile(PathJSON, JSON.stringify(sightings, null, 2), 'utf8')
  } catch (err) {
    console.log(err);
  }
}
