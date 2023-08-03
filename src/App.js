import MoviesList from './components/MoviesList';
import './App.css';
import React, { useState ,useEffect, useCallback} from 'react';

function App() {
  const[movies,setMovie]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);

  
 
 const fetchCase= useCallback(async()=>{
    setIsLoading(true);
    
    setError(null);
    try {
      const response= await fetch('https://swapi.dev/api/film/');
     
      if(!response.ok){
     
         throw new Error('Something went wrong...Retrying');
     
      }
      const data= await response.json();

         const transferData = data.results.map((moviedata)=>{
           return {
             id:moviedata.episode_id,
             title:moviedata.title,
             openingText:moviedata.opening_crawl,
             releaseDate:moviedata.release_date
     
          
           }
         })
    
         setMovie (transferData);
        
        
    } catch (error) {
      setError(error.message);
     
     setInterval(fetchCase,5000)
   }
   
   
    setIsLoading(false);
    
  },[])
  
 
  useEffect(()=>{
    fetchCase();
     },[fetchCase])
    
     
  let content=<p>No movie found.</p>
if(error){
  content=<p>{error}</p>
}
if(movies.length>0){
 content= <MoviesList movies={movies} />
}
  if(isLoading){
    content=<p>Loading...</p>
  }
  
 
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchCase}>Fetch Movies</button>
       
      </section>
      <section>
       {content}
       
      </section>
    </React.Fragment>
  );
}

export default App;