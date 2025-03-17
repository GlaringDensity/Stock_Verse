"use client"

import React, { useState } from "react";

export default function Funds() {
  // State for form inputs
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [bankName, setBankName] = useState("");

  // State for showing success message
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock account data
  const accountBalance = 150000.00;
  const pendingDeposits = 0;

  // Mock transaction history
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-03-15", type: "Deposit", amount: 500, status: "Completed" },
    { id: 2, date: "2024-02-28", type: "Withdrawal", amount: 200, status: "Completed" },
    { id: 3, date: "2024-02-15", type: "Deposit", amount: 1000, status: "Completed" },
    { id: 4, date: "2024-01-30", type: "Deposit", amount: 750, status: "Completed" },
  ]);

  // Format currency as rupees (INR)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (paymentMethod === "credit-card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        alert("Please fill in all card details");
        return;
      }
    } else if (paymentMethod === "bank-transfer") {
      if (!accountNumber || !routingNumber || !bankName) {
        alert("Please fill in all bank details");
        return;
      }
    }
    // For Google Pay, no additional fields are required

    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split("T")[0],
      type: "Deposit",
      amount: Number.parseFloat(amount),
      status: "Pending",
    };

    setTransactions([newTransaction, ...transactions]);

    setShowSuccess(true);
    setAmount("");
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvv("");
    setAccountNumber("");
    setRoutingNumber("");
    setBankName("");

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');

        .funds-page {
          font-family: 'Poppins', sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        main {
          background: #ffe6e6; /* Very light red background */
          padding: 2rem 1.5rem;
          min-height: 100vh;
        }
        
        .success-message {
          background-color: #d4edda;
          color: #155724;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
          animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .account-summary, .add-funds-form-container, .transaction-history {
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 20px;
        }
        
        .balance-info {
          margin-top: 15px;
        }
        
        .balance-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f1f1f1;
        }
        
        .balance-item:last-child {
          border-bottom: none;
        }
        
        .balance-label {
          color: #7f8c8d;
        }
        
        .balance-value {
          font-weight: 600;
          font-size: 18px;
          color: #2c3e50;
        }
        
        .add-funds-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-row {
          display: flex;
          gap: 15px;
        }
        
        .half {
          flex: 1;
        }
        
        label {
          margin-bottom: 8px;
          font-weight: 500;
          color: #4a5568;
        }
        
        input[type="text"],
        input[type="number"] {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.2s;
        }
        
        input[type="text"]:focus,
        input[type="number"]:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 2px rgba(52,152,219,0.2);
        }
        
        .amount-input {
          position: relative;
        }
        
        .currency-symbol {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #4a5568;
        }
        
        input[type="number"] {
          padding-left: 25px;
        }
        
        .payment-methods {
          display: flex;
          gap: 20px;
        }
        
        .payment-method {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .payment-method input[type="radio"] {
          margin: 0;
        }
        
        .payment-details {
          background-color: #f8fafc;
          padding: 15px;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
          min-height: 180px; /* Fixed height to avoid layout shift */
        }
        
        .google-pay-details {
          text-align: center;
        }
        
        .google-pay-details img {
          margin-top: 10px;
        }
        
        .form-actions {
          margin-top: 10px;
        }
        
        .submit-button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
        }
        
        .submit-button:hover {
          background-color: #2980b9;
        }
        
        .transactions-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .transactions-table th,
        .transactions-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #f1f1f1;
        }
        
        .transactions-table th {
          font-weight: 600;
          color: #4a5568;
          background-color: #f8fafc;
        }
        
        .transactions-table tr:last-child td {
          border-bottom: none;
        }
        
        .amount-positive {
          color: #27ae60;
          font-weight: 500;
        }
        
        .amount-negative {
          color: #e74c3c;
          font-weight: 500;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-completed {
          background-color: #d4edda;
          color: #155724;
        }
        
        .status-pending {
          background-color: #fff3cd;
          color: #856404;
        }
        
        .status-failed {
          background-color: #f8d7da;
          color: #721c24;
        }
        
        .no-transactions {
          color: #7f8c8d;
          text-align: center;
          padding: 20px 0;
        }
      `}</style>
      <div className="funds-page">
        <div className="funds-header">
          <h1>Add Funds</h1>
          <p>Add money to your account to start trading</p>
        </div>

        {showSuccess && (
          <div className="success-message">
            <p>Your deposit request has been submitted successfully!</p>
          </div>
        )}

        <div className="funds-container">
          <div className="account-summary">
            <h2>Account Summary</h2>
            <div className="balance-info">
              <div className="balance-item">
                <span className="balance-label">Available Balance</span>
                <span className="balance-value">{formatCurrency(accountBalance)}</span>
              </div>
              <div className="balance-item">
                <span className="balance-label">Pending Deposits</span>
                <span className="balance-value">{formatCurrency(pendingDeposits)}</span>
              </div>
            </div>
          </div>

          <div className="add-funds-form-container">
            <h2>Add Funds</h2>
            <form className="add-funds-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <div className="amount-input">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment-method"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={() => setPaymentMethod("credit-card")}
                    />
                    <label htmlFor="credit-card">Credit/Debit Card</label>
                  </div>
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="bank-transfer"
                      name="payment-method"
                      value="bank-transfer"
                      checked={paymentMethod === "bank-transfer"}
                      onChange={() => setPaymentMethod("bank-transfer")}
                    />
                    <label htmlFor="bank-transfer">Bank Transfer</label>
                  </div>
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="google-pay"
                      name="payment-method"
                      value="google-pay"
                      checked={paymentMethod === "google-pay"}
                      onChange={() => setPaymentMethod("google-pay")}
                    />
                    <label htmlFor="google-pay">Google Pay</label>
                  </div>
                </div>
              </div>

              {paymentMethod === "credit-card" && (
                <div className="payment-details">
                  <div className="form-group">
                    <label htmlFor="card-number">Card Number</label>
                    <input
                      type="text"
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength="19"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="card-name">Cardholder Name</label>
                    <input
                      type="text"
                      id="card-name"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group half">
                      <label htmlFor="expiry-date">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry-date"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group half">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank-transfer" && (
                <div className="payment-details bank-transfer-details">
                  <div className="form-group">
                    <label htmlFor="bank-name">Bank Name</label>
                    <input
                      type="text"
                      id="bank-name"
                      placeholder="Enter bank name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="account-number">Account Number</label>
                    <input
                      type="text"
                      id="account-number"
                      placeholder="Enter account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="routing-number">Routing Number</label>
                    <input
                      type="text"
                      id="routing-number"
                      placeholder="Enter routing number"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "google-pay" && (
                <div className="payment-details google-pay-details">
                  <p>Scan the QR code with Google Pay to complete your deposit:</p>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GooglePay"
                    alt="Google Pay QR Code"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Add Funds
                </button>
              </div>
            </form>
          </div>

          <div className="transaction-history">
            <h2>Transaction History</h2>
            {transactions.length > 0 ? (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.type}</td>
                      <td className={transaction.type === "Deposit" ? "amount-positive" : "amount-negative"}>
                        {transaction.type === "Deposit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td>
                        <span className={`status-badge status-${transaction.status.toLowerCase()}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-transactions">No transactions found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
