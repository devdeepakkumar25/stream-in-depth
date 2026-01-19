const http = require("http");
const URL = "https://randomuser.me/api/";
const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";
const USERLIMIT = 10;

async function getUsersFromApi(limit, url) {
  //   const requests = Array.from({ length: limit }, () => url);
  const requests = new Array(limit).fill(url);
  const results = await Promise.allSettled(
    requests.map(async (endpoint) => {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      return response.json();
    })
  );
  return results;
}

function getUserDetail(response) {
  if (!response?.results?.[0]) return undefined;

  const user = response.results[0];
  const title = user.name?.title ?? "";
  const first = user.name?.first ?? "";
  const last = user.name?.last ?? "";
  const dobDate = user.dob?.date ?? "";
  const email = user.email ?? "";

  return {
    name: `${title} ${first} ${last}`,
    dob: dobDate ? new Date(dobDate).toISOString().slice(0, 10) : "",
    email,
  };
}

async function getRandomUsers(limit) {
  const users = [];
  while (users.length < limit) {
    const remaining = limit - users.length;
    const settledRes = await getUsersFromApi(remaining, URL);
    const validUsers = settledRes
      .filter((result) => result.status === "fulfilled")
      .map((res) => getUserDetail(res.value))
      .filter(Boolean);
    users.push(...validUsers);
  }
  return users;
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "To see the users, go to the given URL",
          url: `http://${HOST}:${PORT}/users`,
        })
      );
    }

    if (req.url === "/users" && req.method === "GET") {
      const users = await getRandomUsers(USERLIMIT);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(users, null, 2));
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Route not found" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server is listening at http://${HOST}:${PORT}`);
});
