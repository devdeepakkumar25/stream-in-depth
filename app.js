const callUserApi = async (count) => {
  const url = "https://randomuser.me/api/";
  const requests = Array.from({ length: count }, () =>
    fetch(url).then((res) => res.json()),
  );

  const results = await Promise.allSettled(requests);

  const finalResult = results.map((eachRes) => {
    if (eachRes.status === "fulfilled") {
      const { results: users = [] } = eachRes.value;
      const user = users[0] || {};

      const { name = {}, dob = {}, email = "" } = user;

      const { title = "", first = "", last = "" } = name;

      return {
        name: `${title} ${first} ${last}`.trim(),
        DOB: dob.date || "",
        email,
      };
    }
    return { error: "Failed to fetch user", reason: eachRes.reason };
  });
  //   console.table(finalResult);

  return finalResult;
};

(async () => {
  const arr = [];

  while (arr.length < 10) {
    const data = await callUserApi(10 - arr.length);

    arr.push(
      ...data
        .filter(
          (ele) =>
            ele.name !== "" && ele.DOB !== "" && ele.email !== "" && !ele.error,
        )
        .filter(Boolean),
    );
  }

  console.log(arr);
})();

// callUserApi(10)
//   .then((res) => console.log(res))
//   .catch((err) => err.message);
