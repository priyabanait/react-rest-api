import MoviesList from './components/MoviesList';
import './App.css';
import React, { useState } from 'react';

function App() {
  const[movies,setMovie]=useState([]);
  
 function fetchmovies(){
  fetch('https://swapi.dev/api/films/').then((response)=>{
 return response.json();
  }).then((data)=>{
    const transferData = data.results.map(moviedata=>{
      return {
        id:moviedata.episode_id,
        title:moviedata.title,
        openingText:moviedata.opening_crawl,
        releaseDate:moviedata.release_date

      }
    })
    setMovie (transferData);
  })
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchmovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;