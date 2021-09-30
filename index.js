const fetch = require("node-fetch");

const url = core.getInput('url');
const tag = core.getInput('tag');
const token = core.getInput('token');

const board_id = 1735243687
const group = "new_group51785"

const cDate = [String(current.getUTCFullYear()), String(current.getUTCMonth() + 1).padStart(2, '0'), String(current.getUTCDate()).padStart>
const cTime = [String(current.getUTCHours()).padStart(2, '0'), String(current.getUTCMinutes()).padStart(2, '0'), String(current.getUTCSeco>

let query = 'mutation ($board_id: Int!, $group: String!, $tag: String!, $columnValues:JSON!) { create_item (board_id:$board_id, group_id: >
let vars = {
  board_id: board_id,
  group: group,
  tag : tag,
  columnValues: `{
    \"link3\" : {\"url\" : \"` + url + `\", \"text\": \"go to GitHub\"},
    \"date\" : {\"date\" : \"` + cDate + `\", \"time\": \"` + cTime + `\"}
  }`
  };
  
fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : token
  },
  body: JSON.stringify({
    'query' : query,
    'variables' : JSON.stringify(vars),
  })
})
  .then(res => res.json())
  .then(res => item_id = res["data"]["create_item"]["id"])
  .then(() => console.log(item_id));
