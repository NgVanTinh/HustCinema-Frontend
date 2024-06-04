import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function formatDate(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toLocaleString('vi-VN', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  return formattedDate;
}


const Bill = () => {

    const [bills, setBills] = useState();

    const config = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    };
    const loadBills = async () => {
        const result = await axios.get(`http://localhost:8080/api/bill/my-bill`, config);
        setBills(result.data);
    }

    useEffect(() => {
        loadBills();
    });
    return (
        <div
            style={{padding: '30px', backgroundColor: '#162A28'}}
        >
        <Typography variant="h2"sx={{color: 'white', mt: '80px'}}>Lịch sử giao dịch </Typography>
        <TableContainer component={Paper} sx={{mt:'5px'}}>
        <Table sx={{ minWidth: 650, color:"#162A28" }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Mã hóa đơn</TableCell>
                <TableCell align="left">Thời gian đặt</TableCell>
                <TableCell align="left">Tên phim</TableCell>
                <TableCell align="left">Suất chiếu</TableCell>
                <TableCell align="left">Ghế đã đặt</TableCell>
                
            </TableRow>
            </TableHead>
            <TableBody>
            {bills && bills.map((bill) => (
                <TableRow
                key={bill.billId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {bill.billId}
                </TableCell>
                <TableCell align="left">{bill.createdTime && formatDate(`${bill.createdTime}`) }</TableCell>
                <TableCell align="left">{bill.movieName && bill.movieName}</TableCell>
                <TableCell align="left">
                    {bill.date && bill.date}  
                    - {bill.roomName && bill.roomName} 
                    - {bill.showTime && bill.showTime}
                </TableCell>
                <TableCell align="left">{bill.listSeatName && bill.listSeatName.map((seat, index) => (
                    <span key={index}>{seat} </span>
                ))}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    );
}

export default Bill

