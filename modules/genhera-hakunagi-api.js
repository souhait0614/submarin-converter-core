const fetch = require("node-fetch")
const url = "https://hakunagi-api.vercel.app/genhera"

module.exports = async (text) => {
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      return json.text
    })
  return result
}
