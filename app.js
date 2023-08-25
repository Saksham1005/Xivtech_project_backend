const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());

const API_KEY = process.env.API_KEY;

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://tubular-nasturtium-17ad4b.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.post("/getWeather", async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = {};

    for (const city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const temperature = response.data.main.temp;
      weatherData[city] = `${temperature}°C`;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
