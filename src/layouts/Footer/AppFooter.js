import React from 'react'

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './Footer.css'
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <img className="logo" src="https://res.cloudinary.com/ddfhkjugr/image/upload/v1703333046/H1_mre9wf.png" alt="Logo HustCinema" />

        <div id="footer-column">
          <h1>Liên hệ hợp tác</h1>
          <p>Địa chỉ: abcxyz</p>
          <p>Điện thoại: 0326888jqk</p>
          <p>Email: hustcinema.contact@hustcorp.com</p>
        </div>

        <div id="footer-column">
          <h1>Chăm sóc khách hàng</h1>
          <p>Hotline: 1900 jqka</p>
          <p>Email: cskh@hustcorp.com</p>
          <p>
            Giờ làm việc: 20:00 - 4:00 (tất cả các ngày không bao gồm ngày lễ)
          </p>
        </div>

        <div id="footer-column">
          <h1>Kết nối với chúng tôi</h1>
          <div>
            <FacebookOutlinedIcon sx={{color: 'blue', fontSize: 50}}/>
            <TwitterIcon sx={{color: 'blue', fontSize: 50}}/>
            <LinkedInIcon sx={{color: 'blue', fontSize: 50}}/>
          </div>

        </div>
      </div>

      {/* <div className="divider"></div> */}

      <div className=" brand-info">
        <h1>HustCinema</h1>
        <p>&copy; 2024 Rạp chiếu phim HustCinema. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer