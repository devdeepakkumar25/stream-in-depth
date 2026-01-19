console.log("Before");

// setTimeout(() => {
//   console.log("Reading a user from a Database.");
// }, 2000);

// const user = getUser(1, function (user) {
//   console.log("User: ", user);

//   getRepositories(user.gitHubUsername, function (repo) {
//     console.log(`Getting repositories ....`);
//     console.log(`Repo:  ${repo}`);
//     getCommites(repo[0], function (commits) {
//       console.log("Getting commits .....");
//       console.log(`Commits: ${commits}`);
//     });
//   });
// });
// const user = getUser(1, handleUser);

// function handleUser(user) {
//   getRepositories(user.gitHubUsername, handleRepositories);
// }

// console.log("After");

// function handleRepositories(repo) {
//   console.log("Repo: ", repo);
//   getCommites(repo[0], handleCommits);
// }
// function handleCommits(commits) {
//   console.log(commits);
// }
const user = getUser(1);
// getUser(1)
user
  .then((user) => getRepositories(user.gitHubUsername))
  .then((repo) => getCommites(repo[0]))
  .then((commits) => console.log("Commits: ", commits))
  .catch((err) => console.log("Error: ", err.message));

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database.....");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Getting Repositories for User ${username}`);
      resolve(["repo1", "rep2", "repo3"]);
    }, 2000);
  });
}

function getCommites(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Getting commits for the repo: ${repo}`);
      resolve(["commit1", "commit2", "commit3"]);
    }, 2000);
  });
}

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //   resolve(1);
//     reject(new Error("Something went wrong"));
//   });
// });

// p.then((res) => console.log(res)).catch((err) =>
//   console.log("Error: ", err.message)
// );

const p1 = Promise.resolve({ id: 1 });

// p1.then((res) => console.log(res));

// const p2 = Promise.reject(new Error("Rejected.."));
// p2.catch((err) => console.erro r(err.message));
const p4 = Promise.any([Promise.reject(new Error("Rejected..")), p1]);
p4.then((res) => console.log(res)).catch((err) => console.log(err.message));

// const p3 = Promise.race([p2, p1]);

const p5 = Promise.allSettled([p1, Promise.reject(new Error("Rejected"))]);

p5.then((res) => {
  //   console.log("p5: ", p5);
  res.filter((res) => {
    // if (res) console.log(res);
    if (res.status === "fulfilled") console.log("Fulfilled Value :", res.value);
    if (res.status === "rejected") console.log("Rejected ", res.reason.message);
  });
}).catch((err) => console.log(err.message));

// console.log("P5: ", p5);

(async () => {
  const user = await getUser(1);

  const repo = await getRepositories(user.gitHubUsername);

  const commits = await getCommites(repo[0]);

  console.log(commits);
})();
