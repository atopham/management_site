import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "../Components/BottomNav";

function HistoryScreen() {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        getHistory()
    }, [])

    const getHistory = async() => {
        await axios.get('api/history/')
            .then((response) => setTrades(response.data.trades))
            .catch((error) => console.log(error))
    }

        return (
            <div className="wide-centered">
                <h1 className="title">History</h1>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="purple-text bigger-text">Date</td>
                                <td className="purple-text bigger-text">Time</td>
                                <td className="purple-text bigger-text">Position</td>
                                <td className="purple-text bigger-text">Amount</td>
                                <td className="purple-text bigger-text">$ Value</td>
                                <td className="purple-text bigger-text">Side</td>
                            </tr>
                            {trades.map((trade, i) => (
                            <tr key={i}>
                                <td className='table-item-text'>{trade.date}</td>
                                <td className='table-item-text'>{trade.time}</td>
                                <td className='table-item-text'>{trade.position}</td>
                                <td className='table-item-text'>{trade.amount}</td>
                                <td className='table-item-text'>{trade.value}</td>
                                <td className='table-item-text'>{trade.side}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <BottomNav/>
                </div>
            </div>
        )
}

export default HistoryScreen;