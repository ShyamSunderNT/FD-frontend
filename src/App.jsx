import React from 'react';
import Register from './screens/register';
import OtpVerify from './screens/otprequest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Userprofile from './screens/Userprofile';
import Feedback from './screens/Feedback';
import Cards from './screens/Cart';
import MyOrder from './screens/myorder';



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register/>} /> 
        <Route path='/request-otp' element={<OtpVerify/>} />
        <Route path='/Login' element={<Login />} />
        <Route path='/user-profile' element={<Userprofile />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/order' element={<Cards />} />
        <Route path='/Myorder' element={<MyOrder />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;