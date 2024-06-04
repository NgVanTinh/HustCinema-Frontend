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
        const result = await axios.get(`http://localhost:8080/api/bill/saveBill`, config);
        console.log(result.data);
    }

    
    useEffect(() => {
        const processPayment = async () => {
            if (vnpResponseCode === '00') {
                await saveBill();
                localStorage.setItem('isPaid', 'TRUE');
            } else {
                localStorage.setItem('isPaid', 'FALSE');
            }
            window.close();
            };

            processPayment();
    }, [vnpResponseCode]);

    // return null;
    return(
        <div>
            <h1>Đã thanh toán</h1>
        </div>
    )
};

export default Savebill;