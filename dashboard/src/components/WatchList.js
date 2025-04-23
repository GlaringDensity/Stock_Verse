"use client"

import React, { useState, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnutChart";

const labels = watchlist.map((stock) => stock["name"]);

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="watchlist-container">
      <style>{`
        .watchlist-container {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto;
        }
        .search-container {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .search-container input.search {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: #333;
          font-size: 14px;
        }
        .search-container input.search::placeholder {
          color: #666;
        }
        .search-container .counts {
          margin-left: 10px;
          font-size: 14px;
          color: #666;
        }
        .list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .list li {
          position: relative;
          padding: 10px 15px;
          margin-bottom: 10px;
          background-color: #fff;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .list li .item p {
          text-align: left;
          margin: 0;
          font-size: 16px;
          font-weight: 500;
        }
        .list li .itemInfo {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: #888;
        }
        .actions {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 5px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .list li:hover .actions {
          opacity: 1;
        }
        .actions button {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 14px;
          padding: 5px;
        }
        .actions button.buy {
          background-color: #b71c1c;
          color: white;
          border-radius: 4px;
        }
        .actions button.sell {
          background-color: #0d47a1;
          color: white;
          border-radius: 4px;
        }
        .actions button:hover {
          opacity: 0.8;
        }
      `}</style>
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="counts">
          {filteredWatchlist.length} / {watchlist.length}
        </span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>

      <DoughnutChart
        data={{
          labels,
          datasets: [
            {
              label: "Price",
              data: watchlist.map((stock) => stock.price),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => setShowWatchlistActions(true);
  const handleMouseLeave = () => setShowWatchlistActions(false);

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const stock = watchlist.find((s) => s.name === uid);
  const [showSellWindow, setShowSellWindow] = useState(false);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick = () => {
    setShowSellWindow(true);
  };

  return (
    <>
      <span className="actions">
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={handleSellClick}>Sell</button>
        </Tooltip>
        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
      {showSellWindow && (
        <SellWindow stock={stock} onClose={() => setShowSellWindow(false)} />
      )}
    </>
  );
};

const SellWindow = ({ stock, onClose }) => {
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleSell = async () => {
    const qty = parseInt(quantity);
  
    if (!qty || qty <= 0) {
      return setError("Enter a valid quantity.");
    }
  
    try {
      const response = await fetch("http://localhost:3002/sellStock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if using cookies/session
        body: JSON.stringify({ name: stock.name, qty }),
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        setError(data.error || "Sell failed.");
      } else {
        alert(data.message);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };
  

  return (
    <div style={sellWindowStyles.overlay}>
      <div style={sellWindowStyles.window}>
        <h3>Sell {stock.name}</h3>
        <p>Owned: {stock.quantity} shares</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          style={sellWindowStyles.input}
        />
        {error && <p style={sellWindowStyles.error}>{error}</p>}
        <div style={sellWindowStyles.actions}>
          <button style={sellWindowStyles.sellBtn} onClick={handleSell}>Sell</button>
          <button style={sellWindowStyles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const sellWindowStyles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 9999,
  },
  window: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%", padding: "10px", marginTop: "10px",
    border: "1px solid #ccc", borderRadius: "4px",
  },
  error: {
    color: "red", fontSize: "13px", marginTop: "5px",
  },
  actions: {
    marginTop: "15px", display: "flex", justifyContent: "space-between",
  },
  sellBtn: {
    backgroundColor: "#0d47a1", color: "#fff", padding: "8px 16px",
    border: "none", borderRadius: "4px", cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#aaa", color: "#fff", padding: "8px 16px",
    border: "none", borderRadius: "4px", cursor: "pointer",
  },
};
