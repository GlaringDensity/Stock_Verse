import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">You have placed {orders.length} orders!</h2>
      <div className="table-responsive">
        <table
          className="table table-hover"
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0" // Removed extra vertical spacing
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #dee2e6",
                  padding: "12px",
                  backgroundColor: "#fff"
                }}
              >
                Sr.no
              </th>
              <th
                style={{
                  border: "1px solid #dee2e6",
                  padding: "12px",
                  backgroundColor: "#fff"
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid #dee2e6",
                  padding: "12px",
                  backgroundColor: "#fff",
                  textAlign: "center"
                }}
              >
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #dee2e6",
                    padding: "12px",
                    backgroundColor: "#fff"
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    border: "1px solid #dee2e6",
                    padding: "12px",
                    backgroundColor: "#fff"
                  }}
                >
                  {order.name}
                </td>
                <td
                  style={{
                    border: "1px solid #dee2e6",
                    padding: "12px",
                    backgroundColor: "#fff",
                    textAlign: "center"
                  }}
                >
                  {order.qty} stocks
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
