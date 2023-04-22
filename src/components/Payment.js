import React, { useState } from 'react';

export default function Payment({ totalAmount, handlePayment }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Done")
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Payment Details</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                placeholder="Enter Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardHolderName">Card Holder Name:</label>
              <input
                type="text"
                className="form-control"
                id="cardHolderName"
                placeholder="Enter Card Holder Name"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="expiryMonth">Expiry Month:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="expiryMonth"
                    placeholder="MM"
                    min="1"
                    max="12"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="expiryYear">Expiry Year:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="expiryYear"
                    placeholder="YYYY"
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 10}
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder="Enter CVV"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group text-center">
              <h4>Total Amount: ₹{totalAmount}</h4>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}