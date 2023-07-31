import MoviesList from './components/MoviesList';
import './App.css';
import React, { useState } from 'react';

function App() {
  const[movies,setMovie]=useState([]);
  const[isLoading,setIsLoading]=useState(false);

  async function fetchmovies(){
    setIsLoading(true);
  const response= await fetch('https://swapi.dev/api/films/')
 const data= await response.json();
 
    const transferData = data.results.map(moviedata=>{
      return {
        id:moviedata.episode_id,
        title:moviedata.title,
        openingText:moviedata.opening_crawl,
        releaseDate:moviedata.release_date

      }
      
    })
    setIsLoading(false);
    setMovie (transferData);
  
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovies}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
       {!isLoading && movies.length===0 && <p>No movie found</p>}
       {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;