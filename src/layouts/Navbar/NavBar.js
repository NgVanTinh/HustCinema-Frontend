import React from 'react'
import { useNavigate } from 'react-router-dom';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const NavBar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" className='app-bar'
            sx={{
                backgroundColor: '#B0B8B7',
            }}
        >
            <Container maxWidth="xl" 
                sx={{
                    marginX: -3
                }}
            >
                <Toolbar disableGutters
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:'space-between',
                    }}
                >
                    <img
                        style={{
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        width={228}
                        src="https://res.cloudinary.com/ddfhkjugr/image/upload/v1703333046/H1_mre9wf.png"
                        alt='logo'
                        onClick={() => navigate('/')}
                    />

                    <Box sx={{ 
                        flexGrow: 1, 
                        display: { xs: 'none', md: 'flex' } }}>
                        
                        <Button
                            key='home'
                            onClick={() => {navigate('/')}}
                            sx={{ ml: 2,my: 2, color: 'white', display: 'block',
                            '&:hover': {
                                color: '#25C5AB' /* Thay đổi màu nền khi hover */
                            } }}
                        >
                            Trang chủ
                        </Button>

                        <Button
                            key='schedule'
                            onClick={() => {navigate('/schedules')}}
                            sx={{ ml: 2,my: 2, color: 'white', display: 'block',
                            '&:hover': {
                                color: '#25C5AB' /* Thay đổi màu nền khi hover */
                            } }}
                        >
                            Lịch chiếu
                        </Button>

                        <Button
                            key='about-us'
                            onClick={() => {navigate('/about-us')}}
                            sx={{ ml: 2,my: 2, color: 'white', display: 'block',
                            '&:hover': {
                                color: '#25C5AB' /* Thay đổi màu nền khi hover */
                            } }}
                        >
                            Giới thiệu
                        </Button>

                    </Box>
                    
                    {localStorage.getItem('token') 
                    ?
                        <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <AccountCircleIcon sx={{fontSize: 35, color: '#6AF1D8'}}/>
                            
                            <Typography textAlign="center" color={'white'} ml={1}>
                                {localStorage.getItem('user').toString().slice(1, -1)}
                            </Typography>
                        </IconButton>
                        
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='logout' onClick={handleCloseUserMenu}>
                                <Button 
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('user');
                                        navigate('/');
                                    }}
                                >
                                    <p>Đăng xuất</p>
                                </Button>
                            </MenuItem>

                            <MenuItem key='profile' onClick={handleCloseUserMenu} >
                                <Button 
                                    onClick={() => navigate('/profile')}
                                >
                                    <p>Thông tin cá nhân</p>
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                    :
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            onClick={() => navigate('/login')}
                            sx={{
                                borderRadius: '20px',
                                border:'1px solid #149E8D',
                                color:'#149E8D',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                '&:hover' :{
                                     backgroundColor: '#6AF1D8', /* Thay đổi màu nền khi hover */
                                     color: 'white' /* Thay đổi màu chữ khi hover */
                                }
                            }}
                        >
                            Đăng nhập
                        </Button>

                        <Button
                            onClick={() => navigate('/signup')}
                            sx={{
                                borderRadius: '20px',
                                border:'1px solid #149E8D',
                                color:'#149E8D',
                                marginLeft: '10px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                '&:hover' :{
                                     backgroundColor: '#6AF1D8', /* Thay đổi màu nền khi hover */
                                     color: 'white' /* Thay đổi màu chữ khi hover */
                                }
                            }}
                        >
                            Đăng ký
                        </Button>
                    </Box>
                    }
                    
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar

