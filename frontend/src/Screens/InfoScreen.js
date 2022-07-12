import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BottomNav from "../Components/BottomNav";

function InfoScreen() {
    const location = useLocation();
    // const { loggedIn } = location.state;
    const [currentTradeEntries, setCurrentTradeEntries] = useState([]);

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async() => {
        await axios.get('api/info/')
            .then((response) => setCurrentTradeEntries(Object.entries(Object.values(response.data)[0])))
            .catch((error) => console.log(error))
    }

    let value = 0;
    currentTradeEntries.map((entry) => (
        value = value + parseInt(entry[1])
    ))


        return (
            <div className="wide-centered">
                <h1 className="title">Account Information</h1>

                <div>
                    <span className="purple-text bigger-text">Total Value: {value}</span>
                    <table>
                        <tbody>
                            <tr>
                                <td className="purple-text bigger-text">Position</td>
                                <td className="purple-text bigger-text">Amount</td>
                                <td className="purple-text bigger-text">$ Value</td>
                            </tr>
                            {currentTradeEntries.map((entry) => (
                            <tr key={entry}>
                                <td className='table-item-text'>{entry[0]}</td>
                                <td className='table-item-text'>{entry[1]}</td>
                                <td className='table-item-text'>{entry[1]}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    {/* <BottomNav loggedIn={loggedIn}/> */}
                    <BottomNav/>
                </div>
            </div>
        )
    };

export default InfoScreen;