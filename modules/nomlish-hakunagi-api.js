const fetch = require("node-fetch")
const url = "https://hakunagi-api.vercel.app/nomlish"

module.exports = async (text, option = {}) => {
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      text,
      lv: option.lv || 2,
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
