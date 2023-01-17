import axios from 'axios';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [chosen, setchosen] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [lyricistAgg, setLyricistAgg] = useState(null);
  const [musicComposerAgg, setMusicComposerAgg] = useState(null);

  const sendSearchRequest = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3002/results',
      params: {
     
        para: chosen,
   
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log("res",response.data);
        setDocuments(response.data.hits);
        setLyricistAgg(response.data.aggregations.lyricists.buckets);
        setMusicComposerAgg(response.data.aggregations.music_composers.buckets);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <div className='app'>
      <nav>
        <ul className='nav-bar'>
          <li>Sinhala Songs of New Pop Genre</li>
        </ul>
      </nav>
      <p className='directions'>
        {' '}
        Enter the Search Query:
      </p>
      <div className='main'>
        <div className='type-selector'>
          <ul>
            
            <li>
              <form>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Full text search'
                    value={chosen}
                    onChange={(e) => setchosen(e.target.value)}
                  />
                </label>
              </form>
            </li>
           
            <li>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
        </div>
        {documents && (
          <div className='search-results1'>
          <div className='search-results'>
            {documents.length > 0 ? (
              <p>&nbsp;&nbsp;&nbsp;Number of hits: {documents.length}</p>
            ) : (
              <p> No results found. Try broadening your search criteria.</p>
            )}
            {documents.map((document) => (
              <div className='results-card'>
                <div className='results-text'>
                  <p>Title: {document._source.title}</p>
                  <p>Genre: {document._source.genre.map((doc,index)=>(
                        <>
                          {doc}
                          {index !== document._source.genre.length - 1 ? ', ' : ''}
                        </>
                   ))}</p>
                  <p>Artist: {document._source.artist.map((doc,index)=>(
                        <>
                          {doc}
                          {index !== document._source.artist.length - 1 ? ', ' : ''}
                        </>
                   ))}</p>
                  <p>Music Composer: {document._source.musicComposer.map((doc,index)=>(
                        <>
                          {doc}
                          {index !== document._source.musicComposer.length - 1 ? ', ' : ''}
                        </>
                   ))}</p>
                  <p>Lyricist: {document._source.lyricist.map((doc,index)=>(
                        <>
                          {doc}
                          {index !== document._source.lyricist.length - 1 ? ', ' : ''}
                        </>
                   ))}</p>
                  <p>Metaphor: {document._source.metaphor}</p>
                  <p>Interpretation: {document._source.interpretation}</p>
                  <p>Views: {document._source.views}</p>
                </div>
              </div>
            ))}
            
          </div>
          <div className='search-results2'>
          <h1>Faceted Search</h1>
          {lyricistAgg.map((document) => (
              <div className='results'>
                <div className='results-text'>
                  <p>Lyricist: {document.key}, Count: {document.doc_count}</p>
                </div>
              </div>
            ))}
            </div>

            <div className='search-results2'>
          <h1>Faceted Search</h1>
          {musicComposerAgg.map((document) => (
              <div className='results'>
                <div className='results-text'>
                  <p>Music Composer: {document.key}, Count: {document.doc_count}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;