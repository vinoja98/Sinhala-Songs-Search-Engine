const { Client } = require('@elastic/elasticsearch');
const client = require('./elasticsearch/client');
const express = require('express');
const cors = require('cors');

const app = express();

const data = require('./data_management/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.use(cors());

app.get('/results', (req, res) => {

  const passedArtist = req.query.artist;


  async function sendESRequest() {
    const body = await client.search({
      index: 'songs',
      body: {
        size: 100,
        query: {
          bool: {
            filter: [
              {
                match: 
                    { artist: 
                        { query: passedArtist,
                        operator: "AND"} 
                    },
              },
              
            ],
          },
        },
      },
    });
    res.json(body.hits.hits);
  }
  sendESRequest();
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.group(`Server started on ${PORT}`))

