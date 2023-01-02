const express = require('express');
const router = express.Router();
const client = require('../elasticsearch/client');
require('log-timestamp');
const fs = require('fs');

router.get('/songs', async function (req, res) {
  console.log('Loading Application...');
  res.json('Running Application...');

  indexData = async () => {
    try {
      console.log('Retrieving data');

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