export async function postData(data) {
  console.log(JSON.stringify(data));
  var url = "http://localhost:4000";
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
    const response = await res.json();
    console.log(response);
    return response;
  } catch (error) {
    return console.error("MegaError:" + error);
  }
}
