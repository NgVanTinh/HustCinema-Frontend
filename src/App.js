import './App.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Layout} from 'antd'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/Signup/Signup';
import NavBar from './layouts/Navbar/NavBar';
import AppFooter from './layouts/Footer/AppFooter';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import SeatSelection from './pages/SeatSelection/SeatSelection';
import Bill from './pages/Bill/Bill';
import SaveBill from './pages/SaveBill/Savebill';

import Schedules from './pages/Schedules/Schedules';
const { Content, Footer } = Layout;


const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [hideNavAndFooter, setHideNavAndFooter] = useState(false);

  // Kiểm tra nếu đường dẫn là '/login' hoặc '/signup', ẩn NavBar và Footer
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/savebill') {
      setHideNavAndFooter(true);
    } else {
      setHideNavAndFooter(false);
    }
  }, [location.pathname]);

  return (
    <Layout>
      {!hideNavAndFooter && <NavBar />}
      <Content>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={<MovieDetail />} />
          <Route path='seat-selection/:id' element={<SeatSelection />} />
          <Route path='schedules' element={<Schedules />} />
          <Route path='my-bill' element={<Bill />} />
          <Route path='savebill' element={<SaveBill />} />
        </Routes>
      </Content>
      {!hideNavAndFooter && (
        <Footer style={{ backgroundColor: 'rgb(8, 5, 5)' }}>
          <AppFooter />
        </Footer>
      )}
    </Layout>
  );
}


export default App;
