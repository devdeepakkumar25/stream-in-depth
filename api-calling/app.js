const BASE_URL = "https://jsonplaceholder.typicode.com";

// fetch(`${BASE_URL}/posts`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("All posts: ", data);
//   })
//   .catch((error) => {
//     console.error("Error: ", error);
//   });

// fetch(`${BASE_URL}/posts/1`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Post 1:", data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// fetch(`${BASE_URL}/posts/1/comments`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Comments for Post 1: ", data);
//   })
//   .catch((error) => {
//     console.error("Error :", error);
//   });

// fetch(`${BASE_URL}/comments?postId=1`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Comments using Query Param: ", data);
//   })
//   .catch((error) => {
//     console.log("Error: ", error);
//   });

// fetch(`${BASE_URL}/posts`, {
//   method: "POST",
//   headers: {
//     "Content-type": "application/json",
//   },
//   body: JSON.stringify({
//     title: "My Post",
//     body: "This is a test post",
//     userId: 1,
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Created post: ", data);
//   })
//   .catch((error) => {
//     console.error("Error :", error);
//   });

// fetch(`${BASE_URL}/posts/1`, {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     id: 1,
//     title: "Updated Title",
//     body: "Updated Body",
//     userId: 1,
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Updated Post (PUT): ", data);
//   })
//   .catch((error) => {
//     console.error("Error : ", error);
//   });

// fetch(`${BASE_URL}/posts/1`, {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     title: "Partially update title",
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Updated Post (PATCH): ", data);
//   })
//   .catch((error) => {
//     console.error("Error : ", error);
//   });

// fetch(`${BASE_URL}/posts/1`, {
//   method: "DELETE",
// })
//   .then((response) => {
//     if (response.ok) {
//       console.log("Post deleted successfully");
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  return response.json();
}

async function getAllPosts() {
  try {
    const data = await fetchData(`${BASE_URL}/posts`);
    console.log("All posts", data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

// getAllPosts();

async function getPostById() {
  try {
    const data = await fetchData(`${BASE_URL}/posts/1`);
    console.log("Post 1:", data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

// getPostById();

async function getPostComments() {
  try {
    const data = await fetchData(`${BASE_URL}/posts/1/comments`);
    console.log("Post Comments: ", data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// getPostComments();

async function getCommentsByQuery() {
  try {
    const data = await fetchData(`${BASE_URL}/comments?postId=1`);
    console.log("Comments via Query: ", data);
  } catch (error) {
    console.log("Error: ", error);
  }
}
// getCommentsByQuery();

async function createPost() {
  try {
    const data = await fetchData(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Async Post",
        body: "Created using async await",
        userId: 1,
      }),
    });
    console.log("Created post: ", data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

// createPost();

async function updatePostPut() {
  try {
    const data = await fetchData(`${BASE_URL}/posts/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        title: "PUT Updated",
        body: "Full Update",
        userId: 1,
      }),
    });
    console.log("Put Updated Post : ", data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

// updatePostPut();

async function updatePostPatch() {
  try {
    const data = await fetchData(`${BASE_URL}/posts/1`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: "Only body updated",
      }),
    });
    console.log("Patch Updated Post: ", data);
  } catch (error) {
    console.log("Error");
  }
}

// updatePostPatch();

async function deletePost() {
  try {
    const response = await fetch(`${BASE_URL}/posts/1`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Post deleted successfully");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
deletePost();


