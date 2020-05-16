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
    await Anime.deleteMany({});
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
      data[i].rank = i + 1;
      const newAnime = new Anime(data[i]);
      await newAnime.save();
    }
  } catch (err) {
    console.log(err);
  }
};

importAllAnimes();
//deleteAllAnimes();
