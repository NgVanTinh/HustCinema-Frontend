import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Checkbox, Button, FormControlLabel, Typography, Modal } from '@mui/material';
import axios from 'axios';
import ChairIcon from '@mui/icons-material/Chair';
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';

const SeatSelection = () => {
    const { id } = useParams();
    const [seats, setSeats] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bill, setBill] = useState([]);
    const [vnpay, setVnPay] = useState();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('0');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const config = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    }; 
    const findSeatNameById = (seatId) => {
        const seat = seats.find(seat => seat.seatId === seatId);

        return seat ? seat.seatName : 'NULL';
    }

    const loadSeats = async () => {
    const result = await axios.get(`http://localhost:8080/api/seat/${id}`, config);
        const array = result.data;
        array.sort((a, b) => {
        if (a.seatName < b.seatName) return -1;
        if (a.seatName > b.seatName) return 1;
        return 0;
        });
        setSeats(array);
    };

    const loadSchedule = async () => {
        const result = await axios.get(`http://localhost:8080/api/schedule/id=${id}`,config);
        setSchedule(result.data);
    }

    const postSeats = async () => {
       
        // console.log(selectedSeats);
        const result = await axios.post(`http://localhost:8080/api/bill/makeBill`, selectedSeats, config);
        console.log(result.data);
        setBill(result.data);
    }

    const getVNPurl = async () => {
        const result = await axios.post(`http://localhost:8080/api/vnpay/payment`, config);
        // console.log(result.data);
        setVnPay(result.data);
    }

    const getVNPresponse = async () => {
        const result = await axios.get('http://localhost:8080/api/vnpay/respond', config);
        setStatus(result.status);
    }

    useEffect(() => {
        loadSchedule();
        loadSeats();
        // getVNPresponse();
    });

    const handleChange = (seatId) => (event) => {
        if (event.target.checked) {
        setSelectedSeats([...selectedSeats, seatId]);
        } else {
        setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postSeats();
        
    };

    const rows = 5;
    const seatsPerRow = 8;
    const rowLabels = ['A', 'B', 'C', 'D', 'E'];
    return (
        <>
        <Typography
            sx={{ pt: 11, pb:2, backgroundColor: '#162A28', color: 'white', fontSize: '30px',display:'flex', justifyContent: 'center' }}
        >CHỌN GHẾ</Typography>
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#162A28'
            }}
        >
            
            <div
                style={{
                    width: '600px',
                    display: 'block',
                    boxSizing: 'border-box'
                }}
            >
                <div >
                    <img
                        src="https://www.bhdstar.vn/wp-content/assets/loodo/seatMapHeader.png"
                        alt='Screen'
                        width='500px'
                    />
                </div> 
                <Box
                    style={{
                        marginTop:'20px', 
                        display: 'flex',
                        justifyContent: 'space-between',
                        // height: '100px', 
                        width: '480px',
                        marginBottom: '20px'
                    }}
                >
                    <Typography sx={{color: 'white'}}>
                        <ChairIcon sx={{color:'white', mr: 1}} />
                        Ghế trống 
                    </Typography>
                    <Typography sx={{color: 'white'}} > 
                        <ChairIcon sx={{color:'blue', mr: 1}} />
                        Ghế đang chọn 
                    </Typography>
                
                    
                    <Typography sx={{color: 'white'}} > 
                        <ChairIcon sx={{color:'red', mr: 1}} />
                        Ghế đã bán 
                    </Typography>
                
                </Box>
                <Box  
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', ml:2}}
                >
                <form 
                    onSubmit={handleSubmit}
                    style={{
                        marginBottom: '20px',
                    }}
                >
                    <Grid container spacing={2} >
                    {[...Array(rows)].map((_, rowIndex) => (
                        <Grid container item spacing={1} alignItems="center" key={rowIndex}>
                            <Grid item>
                                <h2 style={{marginRight: '10px', color:'#48BA1C'}}>{rowLabels[rowIndex]}</h2>
                            </Grid>
                            {seats.slice(rowIndex * seatsPerRow, rowIndex * seatsPerRow + seatsPerRow).map((seat, seatIndex) => (
                            <Grid item key={seat.id}>
                            {!seat.isOccupied 
                            ? 
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        icon={<ChairIcon sx={{color:'white'}} />}
                                        checkedIcon={<ChairIcon sx={{color:'blue'}} />}
                                        checked={selectedSeats.includes(seat.seatId)}
                                        onChange={handleChange(seat.seatId)}
                                    />
                                    }
                                
                                />
                            : 
                                <FormControlLabel
                                    control={
                                    <Checkbox 
                                        icon={<ChairIcon sx={{color:'red'}} />}
                                        disabled
                                    />
                                    }
                                />
                            }
                            
                            </Grid>
                        ))}
                        </Grid>
                    ))}
                    </Grid>

                    <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '500px',
                            mb:2,
                        }}
                    >
                        <Button type="submit" sx={{backgroundColor: '#25C5AB', color: 'white', width: '20vh', mt:2}}
                            onClick={handleOpen}
                        >Tiếp tục</Button>
                    </Box>
                </form>
                </Box>
            </div>
            
            <div>
                <Box
                    sx={{
                        border: '1px solid #25C5AB',
                        padding: '20px',
                        borderRadius: '20px',
                        width: '380px',
                        // height: '500px',
                        backgroundColor: '#162A28',
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'left',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant='h3' sx={{color:'white'}}>
                        HUST CINEMA
                    </Typography>
                    <Divider sx={{border: '1px solid #25C5AB'}}/>
                    <Typography variant='h4' sx={{color:'white'}}>
                        {schedule.movieName}
                    </Typography>
                    {schedule && (
                        <Typography variant='h6' sx={{color:'white'}}>
                            {schedule.roomName} -  {schedule.showTime} -  {schedule.date}
                        </Typography>
                    )}
                    <Divider sx={{border: '1px solid #25C5AB'}}/>
                    {selectedSeats && selectedSeats.length > 0 
                    ? 
                        <div>
                            <div
                                style={{ display: 'flex', flexDirection: 'row' }}
                            >
                                {selectedSeats.map(seat => (
                                <Typography  style={{color:'white', marginRight: '5px'}} key={seat.id}>
                                    {findSeatNameById(seat)}
                                </Typography>
                                ))}
                            </div>
                            
                            <Typography variant='h6' sx={{color:'white'}}>
                                <span style={{color:'#25C5AB'}}>Tổng tiền: </span>
                                {schedule.price * selectedSeats.length }VND
                            </Typography>

                        </div>
                        :
                        <Typography variant='h6' sx={{color:'blue'}}>Vui lòng chọn ghế</Typography>
                    }

                </Box>
            </div>
        </div>

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
                width: 700,
                boxShadow: 24,
                backgroundColor: "#074C45",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'left',
                borderRadius: '10px',
                padding: '20px',
                }}
            >
                <Button 
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        color:'white'
                    }}
                    onClick={handleClose}>
                        <CancelIcon/>
                </Button>
                <Typography variant='h2' sx={{color:'white'}}>Thông tin hóa đơn</Typography>
                <Typography variant='h6' sx={{color:'white'}}>{bill.createdTime} </Typography>
                <Divider sx={{border: '1px solid #25C5AB ', mb: 2, mt: 2}}/>
                <Typography variant='h4' sx={{color:'white'}}>Tài khoản đặt: {bill.userName}</Typography>
                <Typography variant='h4' sx={{color:'white'}}>Phim: {bill.movieName}</Typography>
                <Typography variant='h4' sx={{color:'white'}}>{bill.roomName} - {bill.showTime} - {bill.date}</Typography>
                <Typography variant='h4' sx={{color:'white'}}>
                    Danh sách ghế: {bill.listSeatName && bill.listSeatName.map((seat, index) => ( 
                        <span style={{marginRight: '5px'}} key={index}>{seat} </span>
                    ))}
                </Typography>
                <Divider sx={{border: '1px solid #25C5AB ', mb: 2, mt: 2}}/>
                <Typography variant='h3' sx={{color:'blue'}}>Tổng tiền: {bill.totalPrice} VND</Typography>

                <Button
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '10px',
                        mt: 4,
                        width:'200px',
                        height:'30px',
                        borderRadius:'20px',
                        '&:hover': {
                            backgroundColor: 'blue',
                        }
                    }}
                >
                    <a 
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width:'200px',
                        color: '#25C5AB',
                        fontWeight: 'bold',
                        fontSize: '15px',
                    }}
                    onClick={(e) => {
                        e.preventDefault(); 
                        getVNPurl();
                        window.open(vnpay, '_blank', 'noopener noreferrer'); // Mở link trong tab mới
                    }}
                     href={vnpay} target="_blank" rel="noopener noreferrer">Thanh toán</a>
                </Button>  

                
            </Box>
            
            

        </Modal>
    </>

  );
};

export default SeatSelection;
