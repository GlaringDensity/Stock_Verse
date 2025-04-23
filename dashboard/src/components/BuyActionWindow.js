import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow } = useContext(GeneralContext); 
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleBuyClick = async () => {
    try {
      // new order
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      });
  
      // Update holding
      try {
        await axios.put("http://localhost:3002/updateHolding", {
          name: uid,
          qty: Number(stockQuantity),
        });
      } catch (error) {
        // create new
        if (error.response && error.response.status === 404) {
          console.log("Holding not found, creating a new one.");
          await axios.post("http://localhost:3002/createHolding", {
            name: uid,
            qty: Number(stockQuantity),
            price: Number(stockPrice),
          });
        } else {
          throw error; 
        }
      }
  
      closeBuyWindow(); 
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Error processing order. Please try again.");
    }
  };
    

  const handleCancelClick = () => {
    closeBuyWindow(); 
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;