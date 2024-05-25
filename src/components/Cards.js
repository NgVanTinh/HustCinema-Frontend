import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ImgMediaCard = () => {

    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const loadMovies = async() => {
        const result = await axios.get(`http://localhost:8080/api/movie/`);
        setMovies(result.data);
    }

    useEffect(() => {
        loadMovies();
    });
        return ( 
        <>

        <Typography 
            variant="h4" 
            gutterBottom
            sx={{
                ml:3,
                color: '#FFFFFF',
            }}
        >
            Phim đang chiếu
        </Typography>               
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: '15px'
                // justifyContent:'space-between',
                // alignItems: 'flex-start',
            }}
        >
            {movies.map((movie) => (
                <Card 
                    key={movie.id} 
                    sx={{ width: 250, mb: 4, ml:2, mr:2 }}
                    onClick={() => {navigate(`/movie/${movie.id}`)}}
                    style={{cursor: 'pointer'}}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        src={movie.imgURL}
                        alt={movie.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movie.movieName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Thể loại: {movie.categories}
                        </Typography>
                    </CardContent>
                    </Card>
                ))}
        </div>
        </>
        );
        
}

export default ImgMediaCard