import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import NotFound from './components/not-found/NotFound';
// import Navbar from './components/navbar/Navbar';
import MainArea from './components/homepage/MainArea';
// import Login from './components/login/Login';
import AttendenceMarker from './components/attendence-marker/AttendenceMarker';
import Nav from './components/login/Nav';

// import Attendence from './components/attendence-marker/Attendence';

import HomepageLogo from './components/homepage/HomepageLogo';
// import Menu from './components/showmenu/Menu';
// import { useState } from 'react';



function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={
          <>

            <div className='dash-cont'>
              <HomepageLogo />
              <MainArea />


            </div>
          </>
        } />
        {/* <Route path='/login' element={<Login />} /> */}

        <Route path='/attendance' element={<AttendenceMarker />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;