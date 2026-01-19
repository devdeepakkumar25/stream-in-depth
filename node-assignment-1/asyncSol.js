console.log("Before");

// getUser(1, handleUser);

// function handleUser(user) {
//   console.log("User: ", user);
//   getRepositories(user, handleRepositories);
// }

// function handleRepositories(repos) {
//   console.log("Repos: ", repos);
//   const repo = repos[1];
//   getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//   console.log("Commits: ", commits);
//   console.log(commits);
// }

// const user = getUser(1);
// user.then((user) => console.log(user));
// // console.log(user);

// getUser(1)
//   .then((user) => {
//     console.log(user);
//     return getRepositories(user);
//   })
//   .then((repo) => getCommits(repo[0]))
//   .then((commits) => console.log(commits));
//   .then((repo) => console.log(repo));

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "Deepak" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting repositories for", username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 200);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    console.log("Getting the commits for the repo", repo);
    setTimeout(() => {
      resolve(["commit1", "commit2", "commit3"]);
    }, 2000);
  });
}

// const p = Promise.resolve(1);
// p.then((result) => console.log(result));

// const p = Promise.reject(new Error("reason for rejection..."));

// p.catch(error => console.error(error.message));

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(1);
  }, 2000);
});

const p3 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 3...");
    resolve(1);
  }, 2000);
});

const p4 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 4...");
    resolve(1);
  }, 2000);
});

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 5...");
    resolve(1);
    // reject(new Error("Aysnc operation 5 rrejected..."));
  }, 2000);
});

const p6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 6...");
    resolve(1);
  }, 2000);
});

// const reuslt = Promise.all([p1, p2, p3, p4, p5, p6])
//   .then((values) => console.log(values))
//   .catch(console.error);

// const reuslt = Promise.race([p1, p2, p3, p4, p5, p6])
//   .then((values) => console.log("values: ", values))
//   .catch(console.error);

// const reuslt = Promise.any([p1, p2, p3, p4, p5, p6])
//   .then((values) => console.log("values: ", values))
//   .catch(console.error);

// const reuslt = Promise.allSettled([p1, p2, p3, p4, p5, p6])
//   .then((values) => console.log("values: ", values))
//   .catch(console.error);

(async () => {
  const user = await getUser(1);
  console.log("User: ", user);
  const repos = await getRepositories(user.gitHubUsername);
  console.log("Repos: ", repos);
  const commits = await getCommits(repos[0]);
  console.log(commits);
})();
