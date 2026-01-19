console.log("Before");

// STEP 1 → get user
getUser(1, handleUser);

//----------------------------------------------
// Named function: receives the user
//----------------------------------------------
function handleUser(user) {
  getRepositories(user.gitHubUserName, handleRepositories);
}

//----------------------------------------------
// STEP 2 → receives repo list
//----------------------------------------------
function handleRepositories(repos) {
  // choose the repo you want
  const firstRepo = repos[0];
  getCommits(firstRepo, handleCommits);
}

//----------------------------------------------
// STEP 3 → receives commits
//----------------------------------------------
function handleCommits(commits) {
  console.log("Final Commits:", commits);
}

console.log("After");

// =======================================================
// =============== ASYNC FUNCTION DEFINITIONS ============
// =======================================================

// Simulates DB user fetch
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database....");
    callback({ id: id, gitHubUserName: "Deepak" });
  }, 2000);
}

// Simulates fetching repos
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Gettin repositories for user:", username);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

// Simulates fetching commit list
function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Geting the commtes for the repo:", repo);
    callback(["commt1", "commit2", "commit3"]);
  }, 2000);
}
