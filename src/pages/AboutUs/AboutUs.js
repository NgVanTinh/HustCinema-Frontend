import { Typography } from '@mui/material'

import React from 'react'

const AboutUs = () => {
  return (
    <div>
        <Typography variant='h1'
            sx={{
                minHeight:'100vh',
                padding: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#080505',
                color: 'white',
                textAlign: 'center',
            }}
        >
          
            About Us
        </Typography>
    </div>
  )
}

export default AboutUs