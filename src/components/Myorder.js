

import React, { useEffect, useState } from 'react';


export default function MyOrders() {
  const [items, setItems] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  // load data
  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/digiorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      });
      const json = await response.json();
      setItems(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  // send email
  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, orderData: JSON.stringify(items), orderDate: new Date().toLocaleDateString() }),
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className='container'>
    <div className='row'>
      {items.map(({ userEmail, orderData, orderDate }) => {
        const orderItems = JSON.parse(orderData);
        let totalPrice = 0;
        orderItems.forEach(({ price, quantity }) => {
          totalPrice += price * quantity;
        });
        return (
          <div className='col-md-4' key={orderDate}>
            <div className='card'>
              <div className='card-header bg-primary text-white'>Order Date: {orderDate}</div>
              <ul className='list-group list-group-flush'>
                {orderItems.map(({ name, price, quantity }, index) => (
                  <li className='list-group-item' key={index}>
                    <div className='d-flex justify-content-between'>
                      <div>{name}</div>
                      <div>₹{price}/-</div>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <div>Quantity: {quantity}</div>
                      <div>Subtotal: ₹{price * quantity}/-</div>
                    </div>
                  </li>
                ))}
                <li className='list-group-item'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <b>Total: ₹{totalPrice}/-</b>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
    <button className='btn btn-primary mt-3' onClick={sendEmail}>Send Email</button>
  </div>
);
    }