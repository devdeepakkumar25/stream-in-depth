//----------------------------------------------
// Starting the program
//----------------------------------------------
console.log("Before");

//----------------------------------------------
// 1. Call getUser with a callback
// callback parameter "user" receives the returned object
//----------------------------------------------
getUser(1, function (user) {
  console.log("User: ", user);
});

//----------------------------------------------
// 2. Calling getRepositories with an arrow function
// Arrow function has a parameter "repos" → receives the array
//----------------------------------------------
getRepositories("Deepak", (repos) => {
  console.log("repos: ", repos);
});

//----------------------------------------------
// 3. Calling getRepositories with a normal function
// Normal function has access to "arguments"
// arguments[0] → ["repo1","repo2","repo3"]
//----------------------------------------------
getRepositories("bob", function () {
  console.log(arguments[0]);
  // Because callback(["repo1","repo2","repo3"]) was called
  // → arguments[0] contains the array of repos
});

//----------------------------------------------
// 4. Arrow function DOES NOT have its own "arguments"
// So arguments refers to the OUTER SCOPE (or {} in browsers)
// This is why arguments[0] is NOT the repo array here
//----------------------------------------------
getRepositories("bob", () => {
  console.log(arguments[0]);
  // Not the repo list → arrow functions do NOT have arguments object
});

//----------------------------------------------
// 5. Callback Hell Example: Nested callbacks
// First getUser, then getRepositories based on user.gitHubUserName
//----------------------------------------------
getUser(1, function (user) {
  getRepositories(user.gitHubUserName, (repos) => {
    console.log("Repos: ", repos);
  });
});

//----------------------------------------------
// 6. Even deeper callback hell: getUser → getRepos → getCommits
//----------------------------------------------
getUser(1, function (user) {
  console.log("User: ", user);
  getRepositories(user.gitHubUserName, (repos) => {
    console.log("Repos: ", repos);

    // Getting commits of the third repository
    getCommits(repos[2], (commits) => {
      console.log(commits);
    });
  });
});

//----------------------------------------------
// 7. Direct call to getCommits
//----------------------------------------------
getCommits("repo1", (repo) => {
  console.log("get commit for repo: ", repo);
});

//----------------------------------------------
console.log("After");
//----------------------------------------------

// =======================================================
// =============== ASYNC FUNCTION DEFINITIONS ============
// =======================================================

//----------------------------------------------
// getUser simulates reading a user from a database
// After 2 seconds it returns a user object to callback
//----------------------------------------------
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database....");
    callback({ id: id, gitHubUserName: "Deepak" });
  }, 2000);
}

//----------------------------------------------
// getRepositories simulates fetching GitHub repos
// After 2 seconds returns an array to callback
//----------------------------------------------
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Gettin repositories for user: ", username);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

//----------------------------------------------
// getCommits simulates fetching commit history
// After 2 seconds it returns commit list to callback
//----------------------------------------------
function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Geting the commtes for the repo: ", repo);
    callback(["commt1", "commit2", "commit3"]);
  }, 2000);
}
