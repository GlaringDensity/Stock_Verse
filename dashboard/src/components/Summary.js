"use client"

import React from "react";

export default function Summary() {
  return (
    <div className="summary-page">
      <style jsx>{`
        .summary-page {
          padding: 20px;
          font-family: 'Poppins', sans-serif;
          color: #333;
        }
        .summary-page main {
          margin-top: 0;
          padding: 2rem 1.5rem;
          min-height: 100vh;
        }
        .summary-page .cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 1rem;
        }
        .summary-page .card-single {
          display: flex;
          justify-content: space-between;
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
            0 15px 40px rgba(166, 173, 201, 0.2);
        }
        .summary-page .card-single div:last-child span {
          color: #11101d;
          font-size: 3rem;
        }
        .summary-page .card-single div:first-child span {
          color: #8390A2;
        }
        .summary-page .recent-grid {
          margin-top: 3.5rem;
          display: grid;
          gap: 2rem;
          grid-template-columns: 65% auto;
          align-items: stretch;
        }
        .summary-page .card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
            0 15px 40px rgba(166, 173, 201, 0.2);
          padding: 1rem;
        }
        .summary-page .projects .card,
        .summary-page .customers .card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .summary-page .projects .card-body,
        .summary-page .customers .card-body {
          flex: 1 1 auto;
          overflow-y: auto;
        }
        .summary-page .card-header {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f0f0f0;
        }
        .summary-page .card-header button {
          background: #11101d;
          border-radius: 10px;
          color: #fff;
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
          border: 1px solid #11101d;
        }
        .summary-page table {
          border-collapse: collapse;
        }
        .summary-page thead tr {
          border-top: 1px solid #f0f0f0;
          border-bottom: 2px solid #f0f0f0;
        }
        .summary-page thead td {
          font-weight: 700;
        }
        .summary-page td {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          color: #222;
        }
        .summary-page tr td:last-child {
          display: flex;
          align-items: center;
        }
        .summary-page td .status {
          display: inline-block;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          margin-right: 1rem;
        }
        .summary-page .status.purple {
          background: rebeccapurple;
        }
        .summary-page .status.pink {
          background: deeppink;
        }
        .summary-page .status.orange {
          background: orangered;
        }
        .summary-page .table-responsive {
          width: 100%;
          overflow-x: auto;
        }
        .summary-page .customer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0.7rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .summary-page .info {
          display: flex;
          align-items: center;
        }
        .summary-page .info img {
          border-radius: 50%;
          margin-right: 1rem;
          object-fit: contain;
        }
        .summary-page .info h4 {
          font-size: 0.8rem;
          font-weight: 700;
          color: #222;
          text-align: left;
        }
        .summary-page .info small {
          font-weight: 600;
          color: #8390A2;
        }
        .summary-page .contact {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .summary-page .contact span {
          font-size: 1.2rem;
          color: #11101d;
        }
        @media only screen and (max-width: 960px) {
          .summary-page .cards {
            grid-template-columns: repeat(3, 1fr);
          }
          .summary-page .recent-grid {
            grid-template-columns: 60% 40%;
          }
        }
        @media only screen and (max-width: 768px) {
          .summary-page .cards {
            grid-template-columns: repeat(2, 1fr);
          }
          .summary-page .recent-grid {
            grid-template-columns: 100%;
          }
        }
        @media only screen and (max-width: 560px) {
          .summary-page .cards {
            grid-template-columns: 100%;
          }
        }
      `}</style>
      <div className="main-content">
        <main>
          {/* Summary Cards */}
          <div className="cards">
            <div className="card-single">
              <div>
                <h1>₹1,250,000</h1>
                <span>Portfolio Value</span>
              </div>
              <div>
                <span className="fas fa-chart-line"></span>
              </div>
            </div>
            <div className="card-single">
              <div>
                <h1>₹25,000</h1>
                <span>Today's Gain/Loss</span>
              </div>
              <div>
                <span className="fas fa-arrow-up"></span>
              </div>
            </div>
            <div className="card-single">
              <div>
                <h1>320</h1>
                <span>Total Trades</span>
              </div>
              <div>
                <span className="fas fa-exchange-alt"></span>
              </div>
            </div>
            <div className="card-single">
              <div>
                <h1>₹150,000</h1>
                <span>Available Cash</span>
              </div>
              <div>
                <span className="fas fa-dollar-sign"></span>
              </div>
            </div>
          </div>

          {/* Recent Grid */}
          <div className="recent-grid">
            {/* Recent Trades */}
            <div className="projects">
              <div className="card">
                <div className="card-header">
                  <h2>Recent Trades</h2>
                  <button>
                    See all <span className="fas fa-arrow-right"></span>
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Symbol</td>
                          <td>Action</td>
                          <td>Shares</td>
                          <td>Price</td>
                          <td>Time</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>AAPL</td>
                          <td>Buy</td>
                          <td>100</td>
                          <td>₹150.25</td>
                          <td>09:30 AM</td>
                        </tr>
                        <tr>
                          <td>TSLA</td>
                          <td>Sell</td>
                          <td>50</td>
                          <td>₹720.50</td>
                          <td>10:15 AM</td>
                        </tr>
                        <tr>
                          <td>AMZN</td>
                          <td>Buy</td>
                          <td>20</td>
                          <td>₹3300</td>
                          <td>11:00 AM</td>
                        </tr>
                        <tr>
                          <td>GOOGL</td>
                          <td>Buy</td>
                          <td>10</td>
                          <td>₹2750</td>
                          <td>11:45 AM</td>
                        </tr>
                        <tr>
                          <td>NFLX</td>
                          <td>Sell</td>
                          <td>30</td>
                          <td>₹550</td>
                          <td>12:30 PM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Watchlist */}
            <div className="customers">
              <div className="card">
                <div className="card-header">
                  <h2>Watchlist</h2>
                  <button>
                    See all <span className="fas fa-arrow-right"></span>
                  </button>
                </div>
                <div className="card-body">
                  {/* Four items with proper logos */}
                  <div className="customer">
                    <div className="info">
                      <img
                        src="https://logo.clearbit.com/apple.com"
                        alt="Apple"
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <h4>AAPL</h4>
                        <small>Apple Inc.</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="fas fa-arrow-up"></span> Up 2.5%
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src="https://logo.clearbit.com/microsoft.com"
                        alt="Microsoft"
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <h4>MSFT</h4>
                        <small>Microsoft Corp.</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="fas fa-arrow-down"></span> Down 1.3%
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src="https://logo.clearbit.com/google.com"
                        alt="Alphabet"
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <h4>GOOGL</h4>
                        <small>Alphabet Inc.</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="fas fa-arrow-up"></span> Up 0.8%
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <img
                        src="https://logo.clearbit.com/amazon.com"
                        alt="Amazon"
                        width="40px"
                        height="40px"
                      />
                      <div>
                        <h4>AMZN</h4>
                        <small>Amazon.com</small>
                      </div>
                    </div>
                    <div className="contact">
                      <span className="fas fa-arrow-up"></span> Up 1.0%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
