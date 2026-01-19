fetch("http://localhost:1337", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Deepak", age: 30 }),
})
  .then((res) => res.text())
  .then((data) => console.log(data))
  .catch((err) => console.log("Error: ", err.message));
