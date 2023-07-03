export async function GET(request, response) {
  const axios = require("axios").default;

  console.log("Request: " + request.params);
  console.log("Response: " + response);

  try {
    const responseData = await axios.get(
      "https://weatherapi-com.p.rapidapi.com/current.json",
      {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: "Manchester" },
        headers: {
          "X-RapidAPI-Key":
            "aa43411213mshbb5c253988d5800p1d3caajsn10a77c9f09a0",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      }
    );
    const data = responseData.data;
    return Response.json(data);
  } catch (e) {
    console.error("Error fetching data:", e);
  }
}
