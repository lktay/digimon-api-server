"use strict";
//imports
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();

const PORT1 = 3001;
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("App is running");
});

app.get("/alldigimon", async (req, res) => {
  try {
    const digimonListRes = await axios.get(
      "https://digimon-api.vercel.app/api/digimon"
    );
    const digimonList = digimonListRes.data.map((data) => new Digimon(data));

    res.status(200).send(digimonList);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

app.get("/ultimatedigimon", async (req, res) => {
  try {
    const digimonListRes = await axios.get(
      "https://digimon-api.vercel.app/api/digimon/level/ultimate"
    );
    const digimonList = digimonListRes.data.map((data) => new Digimon(data));

    res.status(200).send(digimonList);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

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
