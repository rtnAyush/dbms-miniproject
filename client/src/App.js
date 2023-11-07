import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

import NotFound from './components/not-found/NotFound';
import MainArea from './components/homepage/MainArea';
import AttendenceMarker from './components/attendence-marker/AttendenceMarker';
import Nav from './components/navbar/Nav';
import Menu from './components/showmenu/Menu';

import Complains from './components/complain/Complains';
import Admin from './components/admin/Admin';
import Users from './components/users/Users';

import HomepageLogo from './components/homepage/HomepageLogo';
import LoginPage from './components/login/LoginPage';

import AddMenuItem from './components/admin/AddMenuItem';
import Footer from './components/footer/Footer';



function App() {
  const location = useLocation();


  return (
    <>
      {
        !location.pathname.includes("/login") &&
        <Nav />
      }
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <div className='dash-cont'>
                <HomepageLogo />
                <MainArea />
              </div>
            </>
          } />
          <Route path='/attendance' element={<AttendenceMarker />} />
          <Route path='/complaints' element={<Complains />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/menu' element={<Menu />} />

          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/menu' element={
            <div className='container1'><AddMenuItem /></div>
          } />
          <Route path='/admin/users' element={<Users />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {
        !location.pathname.includes("/login") &&
        <Footer />
      }
    </>
  );
}

export default App;