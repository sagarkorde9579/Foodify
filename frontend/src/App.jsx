import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom';
import "./index.css";
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import MyOrders from './pages/MyOrders/MyOrders';

export const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const [search, setSearch] = useState("");

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}

      <div className='app'>

        <Navbar setShowLogin={setShowLogin} setSearch={setSearch} />

        <Routes>
    
          <Route path='/' element={<Home search={search} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}