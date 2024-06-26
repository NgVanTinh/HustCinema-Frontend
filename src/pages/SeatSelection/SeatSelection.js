import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Checkbox, Button, Typography } from '@mui/material';
import axios from 'axios';
import ChairIcon from '@mui/icons-material/Chair';
import Divider from '@mui/material/Divider';
import { ToastContainer, toast } from 'react-toastify';

import CountdownTimer from '../../components/CountdownTimer';

const SeatSelection = () => {
    const { id } = useParams();
    const [seats, setSeats] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [vnpay, setVnPay] = useState();
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

    const makeBill = async () => {
        try {
            await axios.post(`http://localhost:8080/api/bill/makeBill`, selectedSeats, config);
        } catch (error) {
            console.error("Error in makeBill:", error);
        }
    };

    const getVNPurl = async () => {
        try {
            const result = await axios.post(`http://localhost:8080/api/vnpay/payment`, config);
            setVnPay(result.data);
        } catch (error) {
            console.error("Error in getVNPurl:", error);
        }
    };

    const handleSucceedPaid = () => {
        localStorage.removeItem("isPaid");
        setSelectedSeats('');
        toast.success('Thanh toán thành công', {
            style: {
                backgroundColor: '#162A28', 
            },
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }); 
    }

    const handleFailedPaid = () => {
        localStorage.removeItem("isPaid");
        setSelectedSeats('');
        toast.error('Thanh toán thất bại', {
            style: {
                backgroundColor: '#162A28', 
            },
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            progress: undefined,
        });
    }

    const holdSeat = async(seatId) => {
        try {
            await axios.post(`http://localhost:8080/api/holdseat/hold`,
            {seatId: seatId, scheduleId: id}
            , config);
        } catch (error) {
            console.error("Error in holding seat:", error);
        }
    }

    const freeSeat = async(seatId) => {
        try {
            await axios.post(`http://localhost:8080/api/holdseat/free`, 
            {seatId: seatId, scheduleId: id}
            , config);
        } catch (error) {
            console.error("Error in holding seat:", error);
        }
    }

    useEffect(() => {
        loadSchedule();
        loadSeats();

        const isPaid = localStorage.getItem('isPaid');

        if (isPaid === 'TRUE') {
            handleSucceedPaid();
            
        } else if (isPaid === 'FALSE') {
            handleFailedPaid();
        }

        
    });

    const handleChange = (seatId) => (event) => {
        if (event.target.checked) {
            if(selectedSeats.length < 10) {
                setSelectedSeats([...selectedSeats, seatId]);
                holdSeat(seatId);
            }
            else {
                toast.error('Chỉ được chọn tối đa 10 ghế', {
                    style: {
                        backgroundColor: '#162A28', 
                    },
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "dark",
                    draggable: true,
                    progress: undefined,
                });
                return;
            }
        } else {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
            freeSeat(seatId);
        }
    };

    const handleSubmit = async () => {
        await makeBill();         
        await getVNPurl();
        window.open(vnpay);  
    };
        
    const rows = 5;
    const seatsPerRow = 8;
    return (
        <>
        <Typography
            sx={{ pt: 11, pb:1, backgroundColor: '#162A28', color: 'white', fontSize: '25px',display:'flex', justifyContent: 'center' }}
        >CHỌN GHẾ</Typography>
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: '#162A28'
            }}
        >
            
            <div
                style={{
                    width: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#162A28'
                }}
            >
                <div >
                    <img
                        src="https://www.bhdstar.vn/wp-content/assets/loodo/seatMapHeader.png"
                        alt='Screen'
                        width='105%'
                    />

                    <Box
                        style={{
                            width: '100%',
                            marginTop:'20px', 
                            display: 'flex',
                            justifyContent: 'space-between',
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
                            <ChairIcon sx={{color:'yellow', mr: 1}} />
                            Ghế đang được giữ 
                        </Typography>
                    
                        <Typography sx={{color: 'white'}} > 
                            <ChairIcon sx={{color:'red', mr: 1}} />
                            Ghế đã bán 
                        </Typography>

                        
                    
                    </Box>

                    
                    <Box 
                        sx={{
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                           
                        }}
                    >
                        <div>
                        {[...Array(rows)].map((_, rowIndex) => (
                        <Grid container item spacing={2} alignItems="center" key={rowIndex}>
                                
                            {seats.slice(rowIndex * seatsPerRow, rowIndex * seatsPerRow + seatsPerRow).map((seat, seatIndex) => (
                                <Grid item key={seatIndex}>
                                {seat.isOccupied 
                                ? 
                                    <Checkbox 
                                        icon={<ChairIcon sx={{color:'red'}} />}
                                        disabled
                                    />
                                :
                                    (
                                    !seat.hold 
                                    ?
                                        <Checkbox
                                            icon={<ChairIcon sx={{color:'white'}} />}
                                            checkedIcon={<ChairIcon sx={{color:'blue'}} />}
                                            checked={selectedSeats.includes(seat.seatId)}
                                            onChange={handleChange(seat.seatId)}
                                        />
                                    :
                                        <Checkbox 
                                            icon={<ChairIcon sx={{color:'yellow'}} />}
                                            disabled
                                        />
                                    )
                                }
                                </Grid>

                            ))}
                        </Grid>                            
                        ))}
                        </div> 
                    </Box>
                </div> 
                
            </div>
            
            <div>
                <Box
                    sx={{
                        border: '1px solid #25C5AB',
                        padding: '20px',
                        borderRadius: '20px',
                        // width: '380px',
                        // height: '500px',
                        backgroundColor: '#162A28',
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'left',
                        flexDirection: 'column',
                        ml:2
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
                                <Typography  style={{color:'white', marginRight: '5px', fontSize:'20px'}} key={seat.id}>
                                    {findSeatNameById(seat)}
                                </Typography>
                                ))}
                            </div>
                            
                            <Typography variant='h6' sx={{color:'white'}}>
                                <span style={{color:'#25C5AB'}}>Tổng tiền: </span>
                                {schedule.price * selectedSeats.length }VND
                            </Typography>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'right',                                   
                                    marginTop: '20px',
                                    marginBottom: '10px',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{
                                        border: '1px solid #25C5AB',
                                        backgroundColor: '#162A28',
                                        color: 'white',
                                        borderRadius: '20px',
                                        '&:hover':{backgroundColor: '#25C5AB'}
                                    }}
                                >Thanh toán</Button>
                            </div>
                            

                        </div>
                        :
                        <Typography variant='h6' sx={{color:'#25C5AB', font: '20px'}}>Vui lòng chọn ghế!!!</Typography>
                    }
                    <CountdownTimer scheduleId={id}/>
                </Box>

                
            </div>
        </div>

        <ToastContainer/>
    </>

  );
};

export default SeatSelection;