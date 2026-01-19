document.getElementById("send").addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/write", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: "Hello from Fetch API!\nThis data is streamed to the server.",
  });

  const result = await response.text();
  console.log("Server response:", result);
});
