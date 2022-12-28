import axios from 'axios';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [chosenQuery, setchosenQuery] = useState(null);
  const [documents, setDocuments] = useState(null);

  const sendSearchRequest = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3002/results',
      params: {
     
        location: chosenQuery,
   
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='app'>
      <nav>
        <ul className='nav-bar'>
          <li>Sinhala Songs Search Engine</li>
        </ul>
      </nav>
      <p className='directions'>
        {' '}
        Enter the search query here:
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
                    placeholder='Enter Query'
                    value={chosenQuery}
                    onChange={(e) => setchosenQuery(e.target.value)}
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
          <div className='search-results'>
            {documents.length > 0 ? (
              <p> Number of hits: {documents.length}</p>
            ) : (
              <p> No results found. Try broadening your search criteria.</p>
            )}
            {documents.map((document) => (
              <div className='results-card'>
                <div className='results-text'>
                  <p>{document._source.song}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;