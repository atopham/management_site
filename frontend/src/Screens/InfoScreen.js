import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function InfoScreen() {
    const location = useLocation();
    const loggedIn = location.state;
    const [Info, setInfo] = useState("");
    const [status, setStatus] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    const run_cycle = () => {
        // setTimeout(function () {
        //   console.log("running...")
        // }, 5000);
        console.log("running...");
      }

    const tradingprocess = () => {
        evalRunning()
        setTimeout(function () {
            while (status) {
                evalRunning()
                if (!status) {
                    break;
                }
                run_cycle()
            }
            console.log("Trading bot is turned off")
        }, 5000)
    }

    const evalRunning = async() => {
        await axios.get('/api/config/')
            // .then((response) => this.setState({ status: response.data[0].running}))
            // .then(() => console.log(this.state.status))
            .then((response) => { setStatus(response.data[0].running); return response  })
            .then((response) => console.log(response.data[0].running))
            .catch((error) => console.log(error))
      }

    const getData = async () => {
        await axios.get("/api/info/")
            // .then((response) => this.setState({ Info: response.data[0].data }))
            .then((response) => setInfo(response.data[0].data))
            .catch((error) => console.log(error));
    };

        return (
            <div>
                <div>{String(loggedIn)}</div>
                <h2><Link to="/editconfig" state={loggedIn}>Edit Config</Link></h2>
                <h2><Link to="/metamask">MetaMask</Link></h2>
                <h1>Info:</h1>
                <h2>{Info}</h2>
            </div>
        )
    };

export default InfoScreen;