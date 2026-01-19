document.getElementById("getText").addEventListener("click", getText);

document.getElementById("getUsers").addEventListener("click", getUsers);

document.getElementById("getPosts").addEventListener("click", getAPIData);

document.getElementById("addPost").addEventListener("submit", addPost);

function getText1() {
  console.log(123);

  fetch("sample.txt")
    .then(function (res) {
      return res.text();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getText2() {
  fetch("sample.txt")
    .then((res) => res.text())
    .then((data) => console.log(data));
}

function getText() {
  fetch("sample.txt")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("output").innerHTML = data;
    })
    .catch((err) => console.log(err));
}

function getUsers() {
  fetch("users.json")
    .then((res) => res.json())

    .then((data) => {
      let output = "<h2>Users</h2>";
      console.log(data);
      data.forEach(function (user) {
        output += `
        <ul>

        <li>ID: ${user.id} </li>
        <li>Name: ${user.name}</li>
        <li>Email: ${user.id}</li>
        </ul>
        `;
      });

      document.getElementById("output").innerHTML = output;
    });
}

function getAPIData() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
      let output = "<h2>Posts</h2>";
      data.forEach(function (user) {
        output += `
        <ul>
        <li> ID: ${user.id}</li>
        <li>Ttitle: ${user.title}</li>

        <li>Body: ${user.body}</li>
        </ul>
        `;
      });

      document.getElementById("postData").innerHTML = output;
    });
}

function addPost(e) {
  e.preventDefault(); // prevent page refresh

  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: id,
      title: title,
      body: body,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post created:", data);
      alert("Post submitted successfully!");
    })
    .catch((error) => console.error("Error:", error));
}

async function addPost(e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id, title, body }),
    });

    const data = await response.json();
    console.log("Post created:", data);
    alert("Post submitted successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
