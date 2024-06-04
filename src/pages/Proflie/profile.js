import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

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


const Profile = () => {
    const [current, setCurrent] = useState('profile');
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        userName: "",
    });
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        cfPassword: "",
    });

    const [bills, setBill] = useState(null);
    const [modal2Visible, setModal2Visible] = useState(false); 
    const config = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/api/user/my-infor`, config);
        setUser(result.data);
    }

    const loadBill = async () => {
        const result = await axios.get(`http://localhost:8080/api/bill/my-bill`, config);
        setBill(result.data);
    }

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onPasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const onSubmitUpdateUser = async () => {
        console.log(user)
        try{
            const result = await axios.put(`http://localhost:8080/api/user/`, user, config);
            console.log(result.data);
            toast.success('Cập nhật thông tin thành công', {
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
        catch(error) {
            if (error.response && error.response.status === 400) {
                console.error('Bad request error. Response data:', error.response.data);
                toast.error(`${error.response.data}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            } 
            else {
                console.error('Error posting user:', error);
            }
        }
        
    };

    const onSubmitChangePassword = async () => {
        try{
            if((password.newPassword === password.cfPassword) === false) {
                toast.warn('Xác nhận lại mật khẩu!', {
                    style: {
                        backgroundColor: '#162A28', 
                    },
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                const response = await axios.put('http://localhost:8080/api/user/change-password',
                    { oldPassword: password.oldPassword, newPassword: password.newPassword },
                    config
                );

                toast.success('Đổi mật khẩu thành công', {
                    style: {
                        backgroundColor: '#162A28', 
                    },
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log('Response:', response.data);
                setModal2Visible(false)

            }
            
        }
        catch(error) {
            if (error.response && error.response.status === 400) {
                console.error('Bad request error. Response data:', error.response.data);
                toast.error(`${error.response.data}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            } 
            else {
                console.error('Error posting user:', error);
            }
        }
        
    }

    useEffect(() => {
        loadUser();
        loadBill();
    }, []);

    const items = [
        {
            label: 'Thông tin cá nhân',
            key: 'profile',
            icon: <UserOutlined />,
        },
        {
            label: 'lịch sử giao dịch',
            key: 'history',
            icon: <ShoppingOutlined />,
        }
    ];
    
    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <div style={{marginTop:'80px', padding: '30px', backgroundColor: '#162A28', minHeight: '90vh'}}>
            <Menu 
                style={{backgroundColor: '#E8E8E8',
                         '&:hover':{
                            backgroundColor: '#162A28',
                            color: 'white'
                         }
                    }} 
                onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            {current === 'history' 
            ?
                <div style={{backgroundColor: 'white', paddingLeft: '40px',paddingRight:'40px', minHeight: '80vh'}}>
                    <TableContainer component={Paper} 
                        // sx={{mt:'5px', backgroundColor:"#162A28"}}
                    >
                    <Table sx={{ minWidth: 650}} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell sx={{color: 'blue'}} >Mã hóa đơn</TableCell>
                            <TableCell sx={{color: 'blue'}} align="left">Thời gian đặt</TableCell>
                            <TableCell sx={{color: 'blue'}} align="left">Tên phim</TableCell>
                            <TableCell sx={{color: 'blue'}} align="left">Suất chiếu</TableCell>
                            <TableCell sx={{color: 'blue'}} align="left">Ghế đã đặt</TableCell>
                            <TableCell sx={{color: 'blue'}} align="left">Tổng tiền</TableCell>
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
                            <TableCell align="left">{bill.totalPrice && bill.totalPrice} VNĐ</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            :
                <div style={{backgroundColor: 'white', padding: '20px', minHeight: '80vh'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}} >
                        <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item sm={8} >
                            <TextField
                                variant="standard"
                                fullWidth={true}
                                required
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                value={user && user.firstName}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                InputProps={{ style: { color: 'grey' } }}
                                onChange={onInputChange}
                            />
                            </Grid>

                            <Grid item sm={8}>
                            <TextField
                                variant="standard"
                                name="lastName"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                value={user && user.lastName}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                InputProps={{ style: { color: 'grey' } }}
                                required
                                onChange={onInputChange}
                            />
                            </Grid>

                            <Grid item sm={8}>
                            <TextField
                                variant="standard"
                                name="phoneNumber"
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                value={user && user.phoneNumber}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                InputProps={{ style: { color: 'grey' } }}
                                required
                                onChange={onInputChange}
                            />
                            </Grid>

                            <Grid item sm={8}>
                            <TextField
                                variant="standard"
                                name="email"
                                fullWidth
                                id="email"
                                label="Email"
                                value={user && user.email}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                InputProps={{ style: { color: 'grey' } }}
                                required
                                onChange={onInputChange}
                            />
                            </Grid>
                            <Grid item sm={8}>
                            <TextField
                                variant="standard"
                                fullWidth
                                name="username"
                                label="User Name"
                                id="username"
                                value={user && user.userName}
                                InputLabelProps={{ style: { color: 'blue' } }}
                                InputProps={{ style: { color: 'grey' } }}
                                required
                                onChange={onInputChange}
                            />
                            </Grid>
                            
                            
                        </Grid> 

                                                 
                    </Box>
                    <div
                        style={{display: 'flex', justifyContent: 'right', padding: '30px', marginRight: '200px'}}
                    >
                        <Button
                            onClick={() => {onSubmitUpdateUser()}}
                        >Cập nhật thông tin</Button>
                        <Button
                            onClick={() => setModal2Visible(true)}
                        >Đổi mật khẩu</Button>
                    </div>

                    <Modal
                        // title="Product Information"
                        centered
                        visible={modal2Visible}
                        onCancel={() => setModal2Visible(false)} 
                        footer={[
                            <Button key="ok" onClick={() => onSubmitChangePassword()}>
                                Xác nhận
                            </Button>
                         ]}
                    >
                    <div
                        style={{marginTop: '30px'}}
                    >
                        <Typography variant='h5'sx={{mb:2}}>Đổi Mật khẩu</Typography>

                        <div
                            style={{marginTop: '10px'}}
                        >
                            <Input.Password name='oldPassword' size='large' placeholder="Nhập mật khẩu hiện tại" required
                                onChange={onPasswordChange}
                            />
                        </div>
                        
                        <div
                            style={{marginTop: '10px'}}
                        >
                            <Input.Password
                                name='newPassword'
                                size='large'
                                placeholder="Nhập mật khẩu mới"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                required
                                onChange={onPasswordChange}
                            />
                        </div>
                        
                        <div
                            style={{marginTop: '10px'}}
                        >
                            <Input.Password
                                name='cfPassword'
                                size='large'
                                placeholder="Xác nhận mật khẩu mới"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                required
                                onChange={onPasswordChange}
                            />
                        </div>
                        
                        
                    </div>
                    </Modal>
                </div>
            }
        <ToastContainer/>
        </div>

    )                           
       
};

export default Profile;