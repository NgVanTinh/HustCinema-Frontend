import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bill = () => {
    
    const[bill, setBill] = useState();
    const config = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    };

    const loadBill = async() => {
        const result = await axios.get(`http://localhost:8080/api/bill/saveBill`, config);
        setBill(result.data);
    }

    useEffect(() => {
        loadBill();
    });


    return (
        <div style={{marginTop: '90px'}}>
            <p>Đây là Bill</p> 
        </div>
    );
};

export default Bill;
