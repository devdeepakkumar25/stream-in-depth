const apiKey = "c7680a3b7bf64828b85101938251612";

const cityNameEl = document.getElementById("city-name");
const cityTimeEl = document.getElementById("city-time");
const cityTempEl = document.getElementById("city-temp");

const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

/* =========================
   FETCH WEATHER DATA
========================= */
async function getData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}

/* =========================
   BUTTON CLICK HANDLER
========================= */
button.addEventListener("click", async () => {
  try {
    const city = input.value.trim();
    if (!city) return;

    const result = await getData(city);

    cityNameEl.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
    cityTimeEl.innerText = `Local Time: ${result.location.localtime}`;
    cityTempEl.innerText = `Temperature: ${result.current.temp_c} °C`;

    console.log(result);
  } catch (err) {
    alert(err.message);
  }
});
