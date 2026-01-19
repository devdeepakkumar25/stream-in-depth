console.log("Before");

getUser(1, function (user) {
  console.log("User: ", user);
});

getRepositories("Deepak", (repos) => {
  console.log("repos: ", repos);
});

getRepositories("bob", function () {
  console.log(arguments[0]); //  because this callback  return // -> [ 'repo1', 'repo2', 'repo3' ]
});
getRepositories("bob", () => {
  console.log(arguments[0]); // {}, because this callback didn't declare a param
});

getUser(1, function (user) {
  getRepositories(user.gitHubUserName, (repos) => {
    console.log("Repos: ", repos);
  });
});

getUser(1, function (user) {
  getRepositories(user.gitHubUserName, (repos) => {
    console.log("Repos: ", repos);
    getCommits(repos[2], (commits) => {
      console.log(commits);
    });
  });
});

getCommits("repo1", (repo) => {
  console.log("get coomit for repo: ", repo);
});

console.log("After");

// Synchronous
// const user = getUser(1);
// const repos = getRepositories(user.getHubUserName);
// const commits = getCommits(repos[0]);
// console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database....");
    callback({ id: id, gitHubUserName: "Deepak" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Gettin repositories for user: ", username);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Geting the commtes for the repo: ", repo);
    callback(["commt1", "commit2", "commit3"]);
  }, 2000);
}
