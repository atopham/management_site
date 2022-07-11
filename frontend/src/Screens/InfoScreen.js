import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function InfoScreen() {
    const location = useLocation();
    const loggedIn = location.state;
    const [info, setInfo] = useState("");

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async() => {
        await axios.get('./lib/json/info.json')
            .then((response) => setInfo(response.data))
            .catch((error) => console.log(error))
    }

    // const getData = async () => {
    //     await axios.get("/api/info/")
    //         // .then((response) => this.setState({ Info: response.data[0].data }))
    //         .then((response) => setInfo(response.data[0].data))
    //         .catch((error) => console.log(error));
    // };

        return (
            <div>
                <div>{String(loggedIn)}</div>
                <h2><Link to="/editconfig" state={loggedIn}>Edit Config</Link></h2>
                <h2><Link to="/metamask">MetaMask</Link></h2>

                <h3>Trade Information</h3>
                <div>
                    {JSON.stringify(info)}
                </div>

            </div>
        )
    };

export default InfoScreen;