
import React, { useState, useEffect } from 'react';
import { actionCreator } from "../state/index";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../state/action_creater/action_creater';
import Payment from './Payment';

export default function Cart() {
  const approvedArray = useSelector((state) => state.ADMIN);

  const approved = approvedArray.length > 0 && approvedArray[0].approved;

  const userEmail = localStorage.getItem("userEmail");
  const cartItems = useSelector(state => state.cartItems);

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator, dispatch);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

console.log(approved)

//payment
const [showPayment, setShowPayment] = useState(false);


  if (cartItems.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckout = async () => {
    setShowPayment(true);
    try {
      const orderData = cartItems.map(({ id, name, price, qty  }) => ({
        foodItemId: id,
        name,
        price,
        quantity: qty,
      }));
      const orderDate = new Date();
      const response = await fetch("http://localhost:5000/myorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userEmail, orderData, orderDate })
      });
  
      if (response.ok) {
        const { order } = await response.json();
        console.log("Order saved successfully!", order);
      } else {
        throw new Error("Error saving order details!");
      }
    } catch (error) {
      console.error("Error hai bhai",error);
    }
  }
  if (showPayment) {
    return <Payment totalPrice={totalPrice} />;
  }
  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' style={{ "color": "white" }}>
        <table className='table table-hover'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Total Price</th>
              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody className='text-light'>
            {cartItems.map((item, index) => (
              <tr key={item.code}>
                <th scope='row'>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price * item.qty}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => {
                    dispatch(removeFromCart({ index }));
                    actions.withdrawMoney(1);
                  }}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h2 className='fs-2'>Total Price: ₹ {totalPrice}</h2></div>
        {approved && (
          <div>
            <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
          </div>
        )}
        {!approved && (
        <div className="alert alert-warning mt-5" role="alert">
          You are not approved yet!
        </div> )}
        </div>
        </div>
        )}

         