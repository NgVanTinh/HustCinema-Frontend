import React from 'react'
import HomeCarousel from '../../components/HomeCarousel'
import Cards from '../../components/Cards'
const Home = () => {
  return (
    <div style={{
      backgroundColor: '#222828',
    }}>
        <HomeCarousel/>
        <Cards/>
    </div>
  )
}

export default Home