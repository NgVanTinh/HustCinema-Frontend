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


const Bill = () => {

    const [bills, setBills] = useState();

    const loadBills = async () => {
        const result = await axios.get(`http://localhost:8080/api/bill/my-bill/`);
        setBills(result.data);
    }

    useEffect(() => {
        loadBills();
    });

    console.log(bills)

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Mã hóa đơn</TableCell>
                <TableCell align="right">Thời gian đặt</TableCell>
                <TableCell align="right">Tên phim</TableCell>
                <TableCell align="right">Suất chiếu</TableCell>
                <TableCell align="right">Ghế đã đặt</TableCell>
                
            </TableRow>
            </TableHead>
            <TableBody>
            {bills.map((bill) => (
                <TableRow
                key={bill.billId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {bill.billId}
                </TableCell>
                <TableCell align="right">{bill.createdTime}</TableCell>
                <TableCell align="right">{bill.movieName}</TableCell>
                <TableCell align="right">{bill.date} - {bill.showTime} - {bill.roomName}</TableCell>
                <TableCell align="right">{bill.listSeatName}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default Bill