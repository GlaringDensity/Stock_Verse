import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div className="orders">
      <div className="no-orders">
        <h2>You have placed {orders.length} orders!</h2>
      </div>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            {order.name} -- {order.qty} stocks
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
