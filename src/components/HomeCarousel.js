import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Carousel, Image } from 'antd';

const HomeCarousel = () => {
  const [movies, setMovies] = useState([]);
    const loadMovies = async() => {
        const result = await axios.get(`http://localhost:8080/api/movie/`);
        // console.log(result.data);
        setMovies(result.data);
    }

    useEffect(() => {
        loadMovies();
    });
    return (
      <>
        <br /><br /><br /><br />
      <Carousel arrows arrowSize={40} effect='fade' >
        { movies.map((movie, index) => (
          <Image
            key={index} 
            width={1470}
            height={665}
            src={movie.posterURL}
            alt={`Product Image ${index + 1}`}
          />
        ))}
      </Carousel>
      <br />
      
      </>
    )
    
};

export default HomeCarousel;

