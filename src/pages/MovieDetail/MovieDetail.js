import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const dayAfterTomorrow = dayjs().add(2, 'days');

const MovieDetail = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(today);
  const [schedules, setSchedules] = useState([]);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [movie, setMovie] = useState([])
  const { id } = useParams()

  const loadMovie = async() => {
        const result = await axios.get(`http://localhost:8080/api/movie/${id}`);
        setMovie(result.data);
    }

  const loadSchedule = async() => {
    const result = await axios.get(`http://localhost:8080/api/schedule/${id}/${selectedDate.format("YYYY-MM-DD")}`);
    const array = result.data;
    array.sort((a, b) => {
    if (a.showTime < b.showTime) return -1;
    if (a.showTime > b.showTime) return 1;
    return 0;
    });
    setSchedules(array);
  }

  useEffect(() => {
      loadMovie();
      if (selectedDate) {
      loadSchedule();
    }
  },[selectedDate]);

  return (
    <>
    <div className='container' 
      style={{
        minHeight: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundImage: `url(${movie.posterURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '20px', 
        marginTop: 0
      }}
    >

      <Card 
        sx={{ 
          display: 'flex', 
          filter:'brightness(0.8)',
          boxShadow: '0px 0px 10px 0px #E5FBF7', 
          borderRadius: '20px',
         }}
      >
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <CardMedia
              component="img"
              sx={{ width: 280, height: 350 }}
              src={movie.imgURL}
              alt="image"
            />
          </Box>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              height: 350, 
              width: 620, 
              backgroundColor: '#162A28', 
              color: '#ffffff'
             }}>
            <CardContent
              sx={{
                alignItems: 'left', 
              }}
            >
              <p style={{fontSize: '35px', fontWeight: 'bold'}}>{movie ? movie.movieName : null}</p>
              <p> 
                <span style={{marginRight: '20px', color: 'grey'}}>{movie ? movie.categories : null}</span> 
                <span style={{color: 'grey'}}>{movie ? movie.length : null}phút</span> 
              </p>
              <div> <b>Đạo diễn: </b> {movie ? movie.directors : null}</div>
              <div> <b>Diễn viên: </b>{movie ? movie.actors : null}</div>
  
              <div style={{marginBottom: '10px'}}> <b>Khởi chiếu: </b> {movie ? movie.releaseDate : null} </div> 
              <p style={{fontSize:'15px'}}>{movie ? movie.description : null}</p>
              
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleOpen}>Xem trailer</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box 
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    boxShadow: 24,
                  }}
                >
                  <Button sx={{
                    position: 'absolute',
                    marginLeft: '740px',
                    justifyContent: 'right',
                    color: 'red',
                  }}  onClick={handleClose}><CloseIcon/></Button>
                  <iframe
                    width="100%"
                    height="400"
                    src={movie.trailerURL}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  
                </Box>
              </Modal>
            </CardActions>
          </Box>
      </Card>
    </div>
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        minHeight: '100px', 
        width: '100%',
        backgroundColor: '#080505',        
      }}
    >
      <Button 
        sx={{
          color: '#25C5AB',
          backgroundColor: selectedDate === today ? '#73807E' : '#080505',
          '&:hover': {
          backgroundColor: '#73807E',
          },
          '&:focus': {  
            backgroundColor: '#73807E',
          }
        }}
        onClick={() => {
          setSelectedDate(today);
          // loadSchedule();
      }}
      >
      {today.format('DD/MM/YYYY')}
      </Button>
      <Button 
        sx={{
          color: '#25C5AB',
          '&:hover': {
          backgroundColor: '#73807E',
          },
          '&:focus': {  
            backgroundColor: '#73807E',
          }
        }}
        onClick={() => {
          setSelectedDate(tomorrow);
          // loadSchedule();
        }}
      >
      {tomorrow.format('DD/MM/YYYY')}
      </Button>
      <Button 
        sx={{
          color: '#25C5AB',
          '&:hover': {
          backgroundColor: '#73807E',
          },
          '&:focus': { 
            backgroundColor: '#73807E',
          }
        }}
        onClick={() => {
          setSelectedDate(dayAfterTomorrow);
          // loadSchedule();
      }}
      >
      {dayAfterTomorrow.format('DD/MM/YYYY')}
      </Button>
    </Box>
    <div 
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        backgroundColor: '#080505',
        paddingTop: '20px',
        paddingLeft: '288px',
        paddingRight: '288px',
      }}
    >
      <Box 
      sx={{ 
        display: 'block',
        boxSizing: 'border-box', 
        alignItems: 'center', 
        height: '100px', 
        // width: '600px',
        backgroundColor: '#080505',       
      }}
      >
        {schedules.map((schedule, index) => (
          <Button
            key={index}
            sx={{
              width:'160px',
              border: '1px solid #25C5AB ',
              '&:hover': {
                backgroundColor: '#25C5AB',
                },
              borderRadius:'30px',
              ml:1,
              color: '#ADB5B3'
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
        ))}
      </Box>
    </div>
    </>
  )
}

export default MovieDetail