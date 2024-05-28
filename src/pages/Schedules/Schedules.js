import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Image } from '@mui/icons-material'
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const dayAfterTomorrow = dayjs().add(2, 'days');

const Schedules = () => {

    const navigate = useNavigate();
    const [movies, setMovie] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);

    const loadMovie = async() => {
        const result = await axios.get(`http://localhost:8080/api/movie/`);
        setMovie(result.data);
    }
    

    const loadSchedule = async() => {
        const date = selectedDate.format("YYYY-MM-DD");
        const result = await axios.get(`http://localhost:8080/api/schedule/date=${date}`);
        const array = result.data;
        array.sort((a, b) => {
        if (a.showTime < b.showTime) return -1;
        if (a.showTime > b.showTime) return 1;
        return 0;
        });
        setSchedules(array);
    }

    useEffect ( () => {
        loadMovie();
        loadSchedule();
    }, [selectedDate])
    
    console.log(schedules)
    return (
        <div
            style={{backgroundColor: '#080505'}}
        >
        <Typography variant='h4' sx={{color: 'white', mt: '80px', display: 'flex', justifyContent: 'center', padding: '10px'}}
        >Phim đang chiếu</Typography>
        <Box 
            sx={{
                display: 'flex', 
                justifyContent: 'center', 
                width: '100%',
                backgroundColor: '#080505',  
                padding: '30px',
                    
            }}
        >
            <Button 
                sx={{
                color: '#25C5AB' ,
                backgroundColor: selectedDate === today ? '#73807E' : '#080505',
                '&:hover': {
                backgroundColor: '#73807E',
                },
                '&:focus': {  
                    backgroundColor: '#73807E',
                },
                ml:2, mr:2,
                border: '1px solid #25C5AB',
                borderRadius:'30px',
                }}
                onClick={() => {
                setSelectedDate(today);
                // loadSchedule();
            }}
            >
            {today.format("DD/MM/YYYY")}
            </Button>
            <Button 
                sx={{
                color: '#25C5AB',
                '&:hover': {
                backgroundColor: '#73807E',
                },
                '&:focus': {  
                    backgroundColor: '#73807E',
                },
                border: '1px solid #25C5AB',
                borderRadius:'30px',
                ml:2, mr:2,
                }}
                onClick={() => {
                setSelectedDate(tomorrow);
                // loadSchedule();
                }}
            >
            {tomorrow.format("DD/MM/YYYY")}
            </Button>
            <Button 
                sx={{
                color: '#25C5AB',
                '&:hover': {
                backgroundColor: '#73807E',
                },
                '&:focus': { 
                    backgroundColor: '#73807E',
                },
                border: '1px solid #25C5AB',
                borderRadius:'30px',
                ml:2, mr:2,
                }}
                onClick={() => {
                setSelectedDate(dayAfterTomorrow);
                // loadSchedule();
            }}
            >
            {dayAfterTomorrow.format("DD/MM/YYYY")}
            </Button>
        </Box>

    <Grid container spacing={4} justifyContent='center' >
   
        {movies && movies.map((movie, index) => (
            <Grid item xs={5} key={index}>
                <div 
                style={{color: 'white', display:'flex', flexDirection: 'row',
                    border: '1px solid #25C5AB',
                    borderRadius:'10px',
                    // backgroundColor: '#162A28',
                }}>
                    <img
                        src={movie.imgURL}
                        alt=''
                        style={{ width: '220px', height: '290px', borderRadius:'10px', }}

                    />

                    <div
                        style={{marginLeft: '20px', marginTop: '20px', marginRight: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column'}}
                    > 
                        <Typography variant='h7' sx={{color: 'grey', mt: 2}}>{movie.categories} 
                            <Typography variant='h7' sx={{color: 'grey', ml: 2}}>{movie.length} phút</Typography> 
                        </Typography> 
                        <Typography variant='h5' sx={{color: 'white'}}>{movie.movieName}</Typography>
                        
                        <Typography variant='h7' sx={{color: 'grey'}}>Khởi chiếu: {movie.releaseDate}</Typography>
                        <Typography variant='h7' sx={{color: 'grey'}}>Đạo diễn: {movie.directors}</Typography>
                        <Typography variant='h6' sx={{color: 'white'}}>Lịch chiếu: </Typography>                       
                        {schedules && (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row', 
                                    flexWrap: 'wrap',
                                    marginTop: '10px',
                                }}
                            >
                                {schedules.map((schedule, index) => (
                                schedule.movieName === movie.movieName && (
                                    <div
                                    key={index}
                                    style={{
                                        marginRight: '10px',
                                    }}
                                    >
                                    <Button
                                        sx={{
                                            color: '#25C5AB',
                                            border: '1px solid #25C5AB',
                                            borderRadius: '20px',
                                            '&:hover': {
                                                backgroundColor: '#73807E',
                                            }
                                        }}
                                        onClick={() => {
                                            if (localStorage.getItem('token')) {
                                                navigate(`/seat-selection/${schedule.id}`);
                                            } else {
                                                navigate(`/login`);
                                            }
                                        }}
                                    >
                                        {schedule.showTime}
                                    </Button>
                                    </div>
                                )
                                ))}
                            </div>
                            )}

                    </div>
                </div> 
            </Grid>
            ))}
        {movies.length % 2 !== 0 && (
            <Grid item xs={5} key={movies.length} style={{ visibility: 'hidden' }} />
        )}
                
    </Grid>
    </div>

    )
}

export default Schedules
