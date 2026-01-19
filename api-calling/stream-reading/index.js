console.log("Fetch app");

let textDecoder = new TextDecoder("utf-8");

// let fetchData = fetch(url)
//   .then((response) => {
//     return response.body.getReader().read();
//   })
//   .then(({ value, done }) => {
//     // console.log(value);
//     console.log(done);
//     console.log(textDecoder.decode(value));
//   });

const url = "https://icanhazdadjoke.com/";
async function fetchData() {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    }

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      console.log("Chunk recevied: ", value);
    }
    console.log("Chunk receiving completed");
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

// fetchData();

let buttonElement = document.getElementById("show-image");

let imageElement = document.querySelector("img");

let fileElement = document.querySelector("input[type=file]");

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error("error occurred"));
  }
}

buttonElement.addEventListener("click", () => {
  let imageUrl = "./image.jpeg";
  // let imageUrl = "https://picsum.photos/seed/picsum/200/300";

  // imageElement.src = imageUrl;
  fetch(imageUrl)
    .then((response) => {
      // return response.json();
      if (!response.ok) {
        throw new Error("Error occurred");
      }
      console.log(response);
      return response.blob();
    })
    .then((data) => {
      // console.log(data);
      let url = URL.createObjectURL(data);
      imageElement.src = url;
    })
    .catch((error) => [console.log("some  error occured")]);
});

fileElement.addEventListener("change", (e) => {
  // console.log(e.target.files[0]);
  const fileBlob = e.target.files[0];
  const url = URL.createObjectURL(fileBlob);
  imageElement.src = url;
});
