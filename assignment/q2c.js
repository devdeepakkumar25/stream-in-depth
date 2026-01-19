const http = require("http");
const url = "https://randomuser.me/api/";
const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

// async function getNRandomUsersDetails(userNum, api_url) {
//   return Promise.all(
//     Array.from({ length: userNum }, async () => {
//       const response = await fetch(api_url);
//       if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
//       const data = await response.json();
//       return data.results[0];
//     })
//   );
// }

async function getNRandomUsersDetails(userNum, api_url) {
  const requests = Array.from({ length: userNum }, async () => {
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const data = await response.json();
    return data?.results?.[0];
  });

  const results = await Promise.allSettled(requests);

  return results
    .filter((r) => r.status === "fulfilled" && r.value)
    .map((r) => r.value);
}

async function usersDetails(num, url) {
  const users = await getNRandomUsersDetails(num, url);

  return users
    .filter((user) => user && user.name)
    .map((user) => ({
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      dob: user.dob?.date?.slice(0, 10) ?? "N/A",
      email: user.email ?? "N/A",
    }));
}

const getRandomUsers = async () => {
  const arr = [];

  while (arr.length < 10) {
    // Keep calling API until we collect 10 valid users
    const data = await callUsersApi(10 - arr.length);
    arr.push(...data.filter(Boolean));
  }

  return arr;
};

const callUsersApi = async (value) => {
  const url = "https://randomuser.me/api/";

  // Create array of URLs
  const requests = Array.from({ length: value }, () => url);

  try {
    const results = await Promise.allSettled(
      requests.map(async (endpoint) => {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }

        return response.json();
      })
    );

    return results.map((eachRec) => {
      if (eachRec.status === "fulfilled") {
        const data = eachRec.value;
        const { results = [] } = data;

        if (!results[0]) return undefined;

        const { name = {}, dob = {}, email = "" } = results[0];

        const { title = "", first = "", last = "" } = name;
        const { date = "" } = dob;

        // Build user object
        return {
          name: `${title} ${first} ${last}`.trim(),
          DOB: date ? new Date(date).toISOString().slice(0, 10) : "",
          email,
        };
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

async function callUservApi(value) {
  const url = "https://randomuser.me/api";
  const requests = Array.from({ length: value }, () => url);

  try {
    const results = await Promise.allSettled(
      requests.map(async (endpoint) => {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }
        return response.json();
      })
    );

    return results.map((eachRec) => {
      if (eachRec.status === "fulfilled") {
        const data = eachRec.value;
        const { results = [] } = data;

        if (!results[0]) return undefined;

        const {
          name: {},
          dob = {},
          email = "",
        } = results[0];

        const { title = "", first = "", last = "" } = name;
        const { date = "" } = dob;
        return {
          name: `${title} ${first} ${last}`.trim(),
          DOB: data ? new Date(date).toISOString().slice(0, 10) : "",
          email,
        };
      }
    });
  } catch (error) {
    console.log("Error: ", error);
    return [];
  }
}

// (async () => {
//   try {
//     const url = "https://randomuser.me/api/";
//     const users = await usersDetails(10, url);
//     console.log(users);
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// })();

const server = http.createServer(async (req, res) => {
  try {
    // Route: /
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "To see the users, go to the given URL",
          url: `http://${HOST}:${PORT}/users`,
        })
      );
    }

    // Route: /users
    if (req.url === "/users" && req.method === "GET") {
      //   const users = await usersDetails(10, url);
      const users = await getRandomUsers();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(users, null, 2));
    }

    // 404 - Route not found
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
