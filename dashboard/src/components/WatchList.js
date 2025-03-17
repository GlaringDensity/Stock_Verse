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
  // Filter watchlist based on search query (case-insensitive)
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
          color: #333; /* Darker text for visibility */
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
        /* Align company names to the left */
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
        /* Position actions absolutely on the right */
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
        /* Buy button in muted red, Sell button in muted blue */
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

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <Tooltip
        title="Buy (B)"
        placement="top"
        arrow
        TransitionComponent={Grow}
        onClick={handleBuyClick}
      >
        <button className="buy">Buy</button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button className="sell">Sell</button>
      </Tooltip>
      <Tooltip
        title="Analytics (A)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
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
  );
};
