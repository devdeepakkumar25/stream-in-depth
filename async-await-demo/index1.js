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

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log(err.message);
  }
}

displayCommits();
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
      //   resolve(["repo1", "repo2", "repo3"]);
      reject(new Error("Could not get the repos."));
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
