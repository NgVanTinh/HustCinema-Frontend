import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify'
const CountDownTimer = ( {scheduleId} ) => {
    const [time, setTime] = useState(10 * 1); // 10 minutes in seconds
    const navigate = useNavigate();
    const config = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    const freeAllSeat = async () => {
        try {
            const result = await axios.post(`http://localhost:8080/api/holdseat/freeAll`,
            {seatId: null, scheduleId: scheduleId},
            config);
            console.log(result.data);
        } catch (error) {
            console.error("Error in freeing seats:", error);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 1) {
                    freeAllSeat();
                    clearInterval(timer);

                    toast.warn('Đã hết thời gian đặt ghế!', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                    setTimeout(() => {
                        navigate('/schedules');
                    },5000)
                }
                return prevTime > 0 ? prevTime - 1 : 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
        <div
            style={{
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                backgroundColor: '#162A28',
                marginTop: '10px',
            }}
        >
            Còn lại {formatTime(time)}
        </div>

        <ToastContainer/>
        </>
    );
};

export default CountDownTimer;