const http = require("http");

const url = "https://randomuser.me/api/";

const port = 3000;

const host = "127.0.0.1";

const userlimit = 10;

async function getUserFromApi(limit, url) {
  const requests = Array.from({ length: limit }, () => url);

  const results = await Promise.allSettled(
    requests.map(async (endPoint) => {
      const response = await fetch(endPoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} : ${response.statusText}`);
      }
      return response.json();
    }),
  );
  return results;
}

function getUserDetail(response) {
  if (!response?.results?.[0]) return undefined;
  const user = response.results[0];
  const last = user.name?.last ?? "";
  const title = user.name?.title ?? "";
  const first = user.name?.first ?? "";
  const dobdate = user.dob?.date ?? "";
  const email = user.email;

  return {
    name: `${title} ${first} ${last}`,
    dob: dobdate ? new Date(dobdate).toISOString().slice(0, 10) : "",
    email,
  };
}

async function getRandomUser(limit, url) {
  const users = [];

  while (users.length < limit) {
    const remaining = limit - users.length;

    const settleRes = await getUserFromApi(remaining, url);

    const validUser = settleRes
      .filter((res) => res.status === "fulfilled")
      .map((res) => getUserDetail(res.value))
      .filter(Boolean);

    users.push(...validUser);
  }
  return users;
}

(async () => {
  const users = await getRandomUser(userlimit, url);
  console.table(users);
})();
