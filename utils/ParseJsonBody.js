export default async function ParseJsonBody(req) {
    let body = "";
  for await (const chunk of req) {
    body += chunk;
  }
  try {
    return JSON.parse(body)
  }catch(err){
    console.log(err);
  }
}
