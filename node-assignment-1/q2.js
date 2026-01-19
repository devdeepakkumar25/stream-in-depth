const http = require("http");

const RANDOM_USER_API = "https://randomuser.me/api/?results=10";

async function getRandomUsers() {
  const response = await fetch(RANDOM_USER_API);
  const data = await response.json();
  console.log(data);

  return data.results.map((user) => ({
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    dob: user.dob.date.slice(0, 10),
    email: user.email,
  }));
}

// (async () => {
//   const user = await getRandomUsers();
//   console.log(user);
// })();

const server = http.createServer(async (req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    try {
      const users = await getRandomUsers();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users, null, 2));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to fetch users" }));
      console.error("Error: ", error);
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000/users`);
});
