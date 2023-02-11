"use strict";
//imports
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

const PORT1 = 3001;
const PORT = process.env.PORT || 3001;

app.get("/", homeHandler);
app.get("/alldigimon", allDigimonHandler);
app.get("/ultimatedigimon", ultimateDigimonHandler);
app.get("*", errorHandler);

function homeHandler(req, res) {
  res.send("App is running");
}

async function allDigimonHandler(req, res) {
  try {
    const digimonListRes = await axios.get(
      "https://digimon-api.vercel.app/api/digimon"
    );
    const digimonList = digimonListRes.data.map((data) => new Digimon(data));

    res.status(200).send(digimonList);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
}
async function ultimateDigimonHandler(req, res) {
  try {
    const digimonListRes = await axios.get(
      "https://digimon-api.vercel.app/api/digimon/level/ultimate"
    );
    const digimonList = digimonListRes.data.map((data) => new Digimon(data));

    res.status(200).send(digimonList);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
}

function errorHandler(req, res) {
  res.status(404).send("not found");
}

class Digimon {
  constructor(data) {
    this.name = data.name;
    this.img = data.img;
    this.level = data.level;
  }
}

app.listen(PORT, () => {
  console.log("listening listening :)");
});
