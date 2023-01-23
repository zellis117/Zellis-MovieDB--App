import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";
import Sidebar from "./Sidebar";

//API key = 8f4bda6b
const API_URL = 'https://www.omdbapi.com?apikey=8f4bda6b';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async(title) =>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  }

  //populates initial landing page with star wars movies
  useEffect(() =>{
    searchMovies('Star Wars');
  }, []);

  return (
    <div className="app">
      <h1>Zellis' Dope Movie App</h1>

      {/* Sidebar of popular movie title searches */}
      <nav>
        <h4 id='navTitle'>Popular Searches</h4>
        <button onClick={(()=>searchMovies('Batman'))}>Batman</button>
        <button onClick={(()=>searchMovies('Star Wars'))}>Star Wars</button>
        <button onClick={(()=>searchMovies('Avengers'))}>Avengers</button>
        <button onClick={(()=>searchMovies('Top Gun'))}>Top Gun</button>
        <button onClick={(()=>searchMovies('Jurassic Park'))}>Jurassic Park</button>
        <button onClick={(()=>searchMovies('Avatar'))}>Avatar</button>
        <button onClick={(()=>searchMovies('Toy Story'))}>Toy Story</button>
        <button onClick={(()=>searchMovies('The Godfather'))}>The Godfather</button>
      </nav>

      {/* Search bar and search button */}
      <div className="search">
        <input placeholder="Search..." value={searchTerm} onChange={((e)=>setSearchTerm(e.target.value))} onKeyDown={((e)=>{if(e.key==='Enter'){searchMovies(searchTerm)}})}/>
        <img src={searchIcon} alt="serach icon" onClick={(()=>searchMovies(searchTerm))}/>
      </div>

      {/* Maps through movies and displays movie cards, or displays no movies found */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie)=>(<MovieCard movie={movie}/>))}
        </div>
      ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
      )}
    </div>
  );
}

export default App;
