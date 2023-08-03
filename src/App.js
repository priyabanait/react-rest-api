import MoviesList from './components/MoviesList';
import './App.css';
import React, { useState ,useEffect, useCallback} from 'react';
import AddMovie from './components/AddMovie';

function App() {
  const[movies,setMovie]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);

  
 
 const fetchCase= useCallback(async()=>{
    setIsLoading(true);
    
    setError(null);
    try {
      const response= await fetch('https://react-moviesform-default-rtdb.firebaseio.com/movies.json');
     
      if(!response.ok){
     
         throw new Error('Something went wrong...Retrying');
     
      }
      const data= await response.json();
      console.log(data);

      const loadedMovies=[];
      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate

          })
      }

        setMovie (loadedMovies);
        
        
    } catch (error) {
      setError(error.message);
     
     setInterval(fetchCase,5000)
   }
   
   
    setIsLoading(false);
    
  },[])
  
 
  useEffect(()=>{
    fetchCase();
     },[fetchCase])
    
    async function addMovieHandler(movie){
      const response= await fetch('https://react-moviesform-default-rtdb.firebaseio.com/movies.json',{
        method:'POST',
        body:JSON.stringify(movie),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data= await response.json();
      
     }


  let content=<p>No movie found.</p>
if(error){
  content=<p>{error}</p>
}
if(movies.length>0){
 content= <MoviesList movies={movies} deleteMovie={deleteMovie} />
}
  if(isLoading){
    content=<p>Loading...</p>
  }
  
  
    async function deleteMovie(id) {
     const response= await fetch(`https://react-moviesform-default-rtdb.firebaseio.com/movies/${id}.json`, {
        method: "DELETE",
      })
      
    const data= await response.json();
    };
    
    

  return (
    <React.Fragment>
    <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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