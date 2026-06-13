const https = require("https");

const API_KEY = "45210677d46e43cb8d180646261306";
const CITY = "Hyderabad";

https.get(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`,
    (res) => {
        let data = "";

        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            console.log(data);

            const weather = JSON.parse(data);

            if (weather.error) {
                console.log("API Error:", weather.error.message);
                return;
            }

            console.log(`City: ${weather.location.name}`);
            console.log(`Country: ${weather.location.country}`);
            console.log(`Temperature: ${weather.current.temp_c}°C`);
            console.log(`Condition: ${weather.current.condition.text}`);
        });
    }
).on("error", (err) => {
    console.error(err.message);
});