const axios = require("axios");
async function getData() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
  }
}

getData();
