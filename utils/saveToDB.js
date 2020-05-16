const fs = require('fs');
require('dotenv').config();
const mongoose = require('mongoose');
const Anime = require('../models/animeModel');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

let data = fs.readFileSync('./importedData.json');
data = JSON.parse(data);

const deleteAllAnimes = async () => {
  try {
    await Anime.deleteMany({ rank: { $gt: 50 } });
  } catch (err) {
    console.log(err);
  }
};

const importAllAnimes = async () => {
  try {
    for (i = 0; i < data.length; i++) {
      console.log(i);
      if (data[i].synopsis === null) {
        console.log(data[i].name);
        data[i].synopsis = 'No synopsis.';
      }
      if (data[i].episodes === null) {
        data[i].episodes = 13;
      }
      data[i].rank = i + 51;
      const newAnime = new Anime(data[i]);
      await newAnime.save();
    }
  } catch (err) {
    console.log(err);
  }
};

importAllAnimes();
//deleteAllAnimes();
