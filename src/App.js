// import React, { useState, useEffect } from 'react';

// function App() {
//   const [barcode, setBarcode] = useState('');

//   useEffect(() => {
//     function handleKeyDown(event) {
//       // Check if input is a digit
//       if (/[0-9]/.test(event.key)) {
//         setBarcode(prevBarcode => prevBarcode + event.key);
//       }
//     }

//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Scan a barcode:</h1>
//       <div>{barcode}</div>
//     </div>
//   );
// }

// export default App;
import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Test from "./components/Test"
import { Provider } from 'react-redux';
import store from './store';
import Card from './components/Card';
import Footer from './components/Footer';
import {  Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Cart from './components/Cart';
import Admin from './components/Admin';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import MyOrders from './components/Myorder';
import Alert from './components/Alert';
import Reset from './components/Reset';
import Verify from './components/Verify';

export default function App() { 
  const [alert, setalert] = useState(null);
  
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 3000);
  };
  return (
    <Provider store={store}>
      <Router >
      <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/cart' element={<Cart />}/>
      <Route exact path='/myorders' element={<MyOrders />}/>
      <Route exact path='/admin' element={<Admin />}/>
      <Route exact path='/reset' element={<Reset />}/>
      <Route exact path='/verify' element={<Verify />}/>
     
        
      <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>
    
      <Route exact path='/signup' element={<Signup />}/>
      </Routes>
    </Router>
    </Provider>
  );
}