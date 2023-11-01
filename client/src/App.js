import './App.css';
import { Route, Routes } from 'react-router-dom';

import NotFound from './components/not-found/NotFound';
import Navbar from './components/navbar/Navbar';
import MainArea from './components/homepage/MainArea';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <MainArea />
          </>
        } />
        <Route path='/main' element={
          <>
            <Login />
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;