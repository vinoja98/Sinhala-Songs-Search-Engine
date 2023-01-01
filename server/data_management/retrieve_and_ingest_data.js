const express = require('express');
const router = express.Router();
const axios = require('axios');
const client = require('../elasticsearch/client');
require('log-timestamp');
const fs = require('fs');
const app = express();

// const URL = "../../corpus/song.json";
const URL = "https://raw.githubusercontent.com/vinoja98/Sinhala-Songs-Search-Engine/main/corpus/song.json";

router.get('/songs', async function (req, res) {
  console.log('Loading Application...');
  res.json('Running Application...');

  indexData = async () => {
    try {
      console.log('Retrieving data');

    //   const SONGS = await axios.get(`${URL}`, {
    //     headers: {
    //       'Content-Type': ['application/json', 'charset=utf-8'],
    //     },
    //   });
    //   const SONGS = require("../../corpus/song.json")
      const data = fs.readFileSync(__dirname + '/../../corpus/song.json', 'utf8');
      const SONGS = JSON.parse(data);

      console.log('Data retrieved!');

      results = SONGS;

      console.log('Indexing data...');
      results.map(
        async (results) => (
          (songObject = {
            title: results.title,
            genre: results.genre,
            artist: results.artist,
            lyricist: results.lyricist,
            musicComposer: results.musicComposer,
            views: results.views,
            metaphor: results.metaphor,
            interpretation: results.interpretation,
            lyrics: results.lyrics,
          }),
          await client.index({
            index: 'songs',
            body: songObject,
          })
        )
      );

      if (SONGS.length) {
        indexData();
      } else {
        console.log('Data has been indexed successfully!');
      }
    } catch (err) {
      console.log(err);
    }

    console.log('Preparing for the next round of indexing...');
  };
  indexData();
});

module.exports = router;