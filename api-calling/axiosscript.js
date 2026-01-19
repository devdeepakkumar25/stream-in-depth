const BASE_URL = "https://jsonplaceholder.typicode.com";

// axios
//   .get(`${BASE_URL}/posts`)
//   .then((response) => {
//     console.log("All posts: ", response.data);
//   })
//   .catch((error) => {
//     console.error("Error: ", error);
//   });

// axios
//   .get(`${BASE_URL}/posts/1`)
//   .then((response) => {
//     console.log("Post 1: ", response.data);
//   })
//   .catch((error) => {
//     console.log("Error : ", error);
//   });

// axios
//   .get(`${BASE_URL}/posts/1/comments`)
//   .then((response) => {
//     console.log("Comments of post 1: ", response.data);
//   })
//   .catch((error) => {
//     console.error("Error : ", error);
//   });

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function getAllPosts() {
  try {
    const response = await api.get("/posts");
    console.log("ALl Posts: ", response.data);
  } catch {
    console.error("Error: ", error);
  }
}

// getAllPosts();

async function getPostById() {
  try {
    const response = await api.get("/posts/1");
    console.log("Post 1: ", response.data);
  } catch (error) {
    console.log("Error: ", error);
  }
}
// getPostById();

async function getCommentsByQuery() {
  try {
    const response = await api.get("/comments", {
      params: { postId: 1 },
    });
    console.log(response.data);
  } catch {
    console.error("Erorr: ", error);
  }
}

getCommentsByQuery();


async function createPost() {
  try {
    const response = await api.post("/posts", {
      title: "Async Axios Post",
      body: "Created using async/await",
      userId: 1
    });
    console.log("Created Post:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
createPost();
async function updatePostPut() {
  try {
    const response = await api.put("/posts/1", {
      id: 1,
      title: "PUT Updated",
      body: "Full update via PUT",
      userId: 1
    });
    console.log("PUT Updated Post:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
updatePostPut();
async function updatePostPatch() {
  try {
    const response = await api.patch("/posts/1", {
      body: "Only body updated via PATCH"
    });
    console.log("PATCH Updated Post:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
updatePostPatch();
async function deletePost() {
  try {
    await api.delete("/posts/1");
    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}
deletePost();
