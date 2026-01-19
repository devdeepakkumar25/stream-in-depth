// async function getData() {
//   try {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

//     const postsDiv = document.getElementById("posts");

//     res.data.forEach((post) => {
//       const div = document.createElement("div");
//       div.innerHTML = `
//         <h3>${post.title}</h3>
//         <p>${post.body}</p>
//         <hr />
//       `;
//       postsDiv.appendChild(div);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// getData();

// async function getData() {
// const promise = axios.get("https://jsonplaceholder.typicode.com/posts");
// const response = await promise;
// console.log(response);

// const response = await axios.get(
//   "https://jsonplaceholder.typicode.com/posts"
// );

// console.log(response.data);

//   const { data: posts } = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts"
//   );

//   console.log(posts);

// }

// getData();

async function getData() {
  try {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const postsDiv = document.getElementById("posts");

    posts.forEach((post) => {
      console.log(post);
      const div = document.createElement("div");
      div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body} </p>
      <hr/>
      `;
      postsDiv.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

getData();
