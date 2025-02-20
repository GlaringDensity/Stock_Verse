import React from 'react';

import { holdings } from "../data/data";

const Holdings = () => {
    return (
        <>
            <h3 className='title'>Holdings ({holdings.lengtd}) </h3>

            <div className="order-table">
            <table>
                <tr>
                    <th>Instrument</th>
                    <th>Qty.</th>
                    <th>Avg. cost</th>
                    <th>LTP</th>
                    <th>Cur. val</th>
                    <th>P&L</th>
                    <th>Net chg.</th>
                    <th>Day chg.</th>
                </tr>

                {holdings.map((stock, index) => {
                    const currValue = stock.price * stock.qty;
                    const isProfit = currValue - stock.avg*stock.qty >= 0.0;
                    const profitclass = isProfit ? "profit" : "loss";
                    const dayClass = stock.isLoss ? "loss" : "profit";

                    return (
                        <tr key={index}>
                            <td>{stock.name}</td>
                            <td>{stock.name}.</td>
                            <td>{stock.avg.toFixed(2)}</td>
                            <td>{stock.price.toFixed(2)}</td>
                            <td>{currValue.toFixed(2)}</td>
                            <td className={profitclass}>{(currValue - stock.avg*stock.qty).toFixed(2)}</td>
                            <td className={profitclass}>{stock.net}</td>
                            <td className={dayClass}>{stock.day}</td>
                        </tr>
                    );
                })}
            </table>
            </div>
        </>
    )
}