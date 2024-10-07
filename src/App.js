import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './layout/Homepage'
import Menu from './main/Menu'
import Meja from './main/Meja'
import Customer from './main/Customer'
import Order from './main/Order'
import Payment from './main/Payment'


const App = () => {
  return (
    <BrowserRouter basename='/uts-CiessnaPutraAndika_FE/'>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/meja' element={<Meja/>}/>
        <Route path='/customer' element={<Customer/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/payment' element={<Payment/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App