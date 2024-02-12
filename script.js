// Define getWeather function
async function getWeather(country) {
    let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=de477a27a22629637903335c60c67c79&units=metric`;
    let weatherObj = await fetch(weatherAPI);
    let response = await weatherObj.json();
    return response;
}

// Define callWeather function
async function callWeather(country) {
    getWeather(country)
        .then((response) => {
            // Get the card element corresponding to the clicked button
            var cardElement = document.querySelector(`[data-country="${country}"]`);
            // Update the card with weather information
            cardElement.innerHTML += `
                <p>Temperature: ${response.main.temp}°C</p>
                <p>Feels Like: ${response.main.feels_like}°C</p>
                <p>Description: ${response.weather[0].description}</p>
            `;
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

// Fetch data and create elements
var res = fetch("https://restcountries.com/v2/all");

res.then((data) => data.json()).then((data1) => {
    console.log(data1);

    var countryCardsContainer = document.getElementById('country-cards');

    for (let i = 0; i < data1.length; i++) {
        // Create a card div for each country
        var card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute('data-country', data1[i].name);

        // Create the card content
        card.innerHTML = `
            <img src="${data1[i].flag}" class="card-img-top" alt="Flag">
            <div class="card-body">
                <h5 class="card-title">${data1[i].name}</h5>
                <p class="card-text">Region: ${data1[i].region}</p>
                <p class="card-text">Subregion: ${data1[i].subregion}</p>
                <button onclick="callWeather('${data1[i].name}')">Click for Weather</button>
            </div>
        `;

        // Append the card to the container
        countryCardsContainer.appendChild(card);
    }
});
