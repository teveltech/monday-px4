const fetch = require("node-fetch");
const core = require('@actions/core');

const url = core.getInput('url');
const tag = core.getInput('tag');
const token = core.getInput('token');

const board_id = 1735243687;
const group = "new_group51785";

const current = new Date();
const cDate = [String(current.getUTCFullYear()), String(current.getUTCMonth() + 1).padStart(2, '0'), String(current.getUTCDate()).padStart(2, '0')].join('-');
const cTime = [String(current.getUTCHours()).padStart(2, '0'), String(current.getUTCMinutes()).padStart(2, '0'), String(current.getUTCSeconds()).padStart(2, '0')].join(':');

let query = 'mutation ($board_id: Int!, $group: String!, $tag: String!, $columnValues:JSON!) { create_item (board_id:$board_id, group_id: $group, item_name:$tag, column_values: $columnValues) { id } }';
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
  .then(() => core.setOutput('item-id', item_id));
