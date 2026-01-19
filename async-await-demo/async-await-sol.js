console.log("Before");

// getUser(1)
//   .then((user) => getRepositories(user.gitHubUserName))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log(commits))
//   .catch((err) => console.log("Error", err.message));

async function displayCommits() {
  try {
    const user = await getUser(1);

    const repos = await getRepositories(user.gitHubUserName);

    const commits = await getCommits(repos[0]);

    console.log(commits);
  } catch (err) {
    console.log(err);
  }
}

displayCommits();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database....");
      resolve({ id: id, gitHubUserName: "Deepak" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Gettin repositories for user:", username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Geting the commtes for the repo:", repo);
      resolve(["commt1", "commit2", "commit3"]);
    }, 2000);
  });
}
