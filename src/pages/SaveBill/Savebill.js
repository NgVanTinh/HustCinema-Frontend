import { useEffect } from 'react';
import axios from 'axios';
const Savebill = () => {

    const queryParams = new URLSearchParams(window.location.search);
    
    const vnpResponseCode = queryParams.get('vnp_ResponseCode');
    
    const config = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    };

    const saveBill = async() => {
        await axios.get(`http://localhost:8080/api/bill/saveBill`, config);
    }

    if (vnpResponseCode === '00') {
        saveBill();
        localStorage.setItem('isPaid', 'TRUE');
    } 
    else {
        localStorage.setItem('isPaid', 'FALSE');
    }
    
    useEffect(() => {

    window.close();
    }, []);

    return null;
};

export default Savebill;
