// // console.log("Before");

// // setTimeout(() => {
// //   console.log("Reading a user from a database....");
// // }, 2000);

// // console.log("After");

// // console.log("Before");

// // const user = getUser(1);

// // console.log(user);
// // console.log("After");

// // function getUser(id) {
// //   setTimeout(() => {
// //     console.log("Reading a user from a database");
// //     return { id: id, gitHubUsername: "mosh" };
// //   }, 2000);
// // }
// //callback
// // Promises
// // Async await

// // console.log("Before");

// // const user = getUser(1, function (user) {
// //   console.log("User", user);
// // });

// // // console.log(user);
// // console.log("After");

// // function getUser(id, callback) {
// //   setTimeout(() => {
// //     console.log("Reading a user from a database");
// //     callback({ id: id, gitHubUsername: "Deepak" });
// //   }, 2000);
// // }

// //callback
// // Promises
// // Async await

// console.log("Before");

// const user = getUser(1, (user) => {
//   console.log("User", user);

//   getRepositories(user.gitHubUsername, (repos) => {
//     console.log("Repos", repos);
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });
// console.log("After");

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("Reading a user from a database");
//     callback({ id: id, gitHubUsername: "Deepak" });
//   }, 2000);
// }

// function getRepositories(id, callback) {
//   setTimeout(() => {
//     console.log("Geeting the user Repositories:");
//     callback(["repo1", "repo2", "repo3"]);
//   }, 2000);
// }

// function getCommits(repo, callback) {
//   setTimeout(() => {
//     console.log("Getting the commits for the repo", repo);
//     callback(["commit1", "commit2", "commit3"]);
//   }, 2000);
// }

// // callback
// // Promises
// // Async await

// console.log("Before");

// // FIRST callback
// const user = getUser(1, (user) => {
//   console.log("User", user);

//   // SECOND callback (inside first)
//   getRepositories(user.gitHubUsername, (repos) => {
//     console.log("Repos", repos);

//     // THIRD callback (inside second)
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

// console.log("After");

// // --------------------
// //   Callback Functions
// // --------------------

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("Reading a user from a database");
//     callback({ id: id, gitHubUsername: "Deepak" });
//   }, 2000);
// }

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log("Getting the user repositories for:", username);
//     callback(["repo1", "repo2", "repo3"]);
//   }, 2000);
// }

// function getCommits(repo, callback) {
//   setTimeout(() => {
//     console.log("Getting the commits for the repo:", repo);
//     callback(["commit1", "commit2", "commit3"]);
//   }, 2000);
// }

// console.log("Before");

// // Start the process
// getUser(1, handleUser);

// console.log("After");

// // -----------------------------
// //   Named Callback Functions
// // -----------------------------

// function handleUser(user) {
//   console.log("User:", user);
//   getRepositories(user.gitHubUsername, handleRepositories);
// }

// function handleRepositories(repos) {
//   console.log("Repositories:", repos);
//   getCommits(repos[0], displayCommits);
// }

// function displayCommits(commits) {
//   console.log("Commits:", commits);
// }

// // -----------------------------
// //   Async Simulation Functions
// // -----------------------------

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("Reading a user from a database...");
//     callback({ id: id, gitHubUsername: "Deepak" });
//   }, 2000);
// }

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log("Getting repositories for:", username);
//     callback(["repo1", "repo2", "repo3"]);
//   }, 2000);
// }

// function getCommits(repo, callback) {
//   setTimeout(() => {
//     console.log("Getting commits for:", repo);
//     callback(["commit1", "commit2", "commit3"]);
//   }, 2000);
// }

console.log("Before");

getUser(1)
  .then((user) => {
    console.log("User:", user);
    return getRepositories(user.gitHubUsername);
  })
  .then((repos) => {
    console.log("Repositories:", repos);
    return getCommits(repos[0]);
  })
  .then((commits) => {
    console.log("Commits:", commits);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

console.log("After");

// ----------------------------
//   Promise-Based Functions
// ----------------------------

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
      console.log("Getting repositories for:", username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting commits for:", repo);
      resolve(["commit1", "commit2", "commit3"]);
    }, 2000);
  });
}



console.log("Before");

getUser(1)
  .then((user) => {
    console.log("User:", user);
    return getRepositories(user.gitHubUsername);
  })
  .then((repos) => {
    console.log("Repositories:", repos);
    return getCommits(repos[0]);
  })
  .then((commits) => {
    console.log("Commits:", commits);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

console.log("After");

// ----------------------------
//   Promise-Based Functions
// ----------------------------

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
      console.log("Getting repositories for:", username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting commits for:", repo);
      resolve(["commit1", "commit2", "commit3"]);
    }, 2000);
  });
}
