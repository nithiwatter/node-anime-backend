const axios = require('axios').default;
const fs = require('fs');
const slugify = require('slugify');

const getTop50 = async () => {
  const top50 = await axios.get('https://api.jikan.moe/v3/top/anime/1');
  const finalData = [];
  for (dex in top50.data.top) {
    console.log(dex);
    const animeId = top50.data.top[dex].mal_id;
    const animeUrl = `https://api.jikan.moe/v3/anime/${animeId}`;
    const res = await createJSONFromAnime(animeUrl);
    console.log(res);
    finalData.push(res);
  }
  console.log(finalData);
  //fs.writeFileSync('importedData.json', JSON.stringify(finalData));
};

const createJSONFromAnime = async (animeUrl) => {
  try {
    let animeInfo = await axios.get(animeUrl);
    animeInfo = animeInfo.data;
    const res = {};
    res.name = animeInfo.title;
    res.episodes = animeInfo.episodes;
    res.rank = animeInfo.rank;
    res.ratingsAverage = animeInfo.score;
    res.mal_id = animeInfo.mal_id;
    res.synopsis = animeInfo.synopsis;
    res.studio = animeInfo.studios[0].name;
    strLength = animeInfo.aired.string.length;
    res.year = parseInt(animeInfo.aired.string.slice(strLength - 4, strLength));
    res.image_url = `./images/${res.mal_id}.jpg`;
    //await downloadImageFromAnime(animeInfo.image_url, res.mal_id, res.name);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(res), 2000);
    });
  } catch (err) {
    console.log(`Error downloading ${animeUrl}`);
  }
};

const downloadImageFromAnime = async (imageUrl, mal_id, name) => {
  const nameSlug = slugify(name, { lower: true });
  const localUrl = `./images/${mal_id}.jpg`;
  const writer = fs.createWriteStream(localUrl);
  writer.on('finish', () => console.log(`Finish downloading ${name}`));
  const animeImage = await axios.get(imageUrl, {
    method: 'GET',
    responseType: 'stream',
  });
  animeImage.data.pipe(writer);
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(localUrl), 1000);
  });
};

getTop50();
