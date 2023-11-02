import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import NotFound from './components/not-found/NotFound';
// import Navbar from './components/navbar/Navbar';
import MainArea from './components/homepage/MainArea';
// import Login from './components/login/Login';
import AttendenceMarker from './components/attendence-marker/AttendenceMarker';
import Nav from './components/login/Nav';
import Attendence from './components/attendence-marker/Attendence';
import Menu from './components/showmenu/Menu';
import Admin from './components/admin/Admin';
import AddMenuItem from './components/admin/AddMenuItem';
import Users from './components/users/Users';

// import Attendence from './components/attendence-marker/Attendence';

import HomepageLogo from './components/homepage/HomepageLogo';
import LoginPage from './components/login/LoginPage';
import { useEffect } from 'react';
// import Menu from './components/showmenu/Menu';
// import { useState } from 'react';



function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isLogged")) {
      navigate('/login')
    }
  }, [localStorage.getItem("isLogged")])

  return (
    <div className="App">
      {
        !location.pathname.includes("/login") &&
        <Nav />
      }
      <Routes>
        <Route path="/" element={
          <>

            <div className='dash-cont'>
              <HomepageLogo />
              <MainArea />


            </div>
          </>
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/attendence' element={<AttendenceMarker />} />
        <Route path="/att" element={<Attendence />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/admin/menu' element={<Admin />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path="*" element={<NotFound />} />

        <Route path='/attendance' element={<AttendenceMarker />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;