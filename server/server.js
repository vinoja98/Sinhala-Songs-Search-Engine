const { Client } = require('@elastic/elasticsearch');
const client = require('./elasticsearch/client');
const express = require('express');
const cors = require('cors');

const app = express();

const data = require('./data_management/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.use(cors());

app.get('/results', (req, res) => {

  const passed = req.query.para;


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
                        { query: passed,
                            operator: "AND"
                        } 
                    },
              },
              
            ],
          },
        },
        sort: [
          {
            views: {
              order: "desc"
            }
          }
        ],
        aggs: {
          music_composers: {
            terms: {
              field: "musicComposer.keyword"
            }
          },
          lyricists: {
            terms: {
              field: "lyricist.keyword"
            }
          }
        }
      },
    });
    res.json({
      hits: body.hits.hits,
      aggregations: body.aggregations
    });
  }
  sendESRequest();
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.group(`Server started on ${PORT}`))

