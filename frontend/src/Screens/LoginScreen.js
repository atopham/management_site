import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export default function LoginScreen({ setToken }) {

    const getAccounts = async() => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
            console.error(e.message)
            return
        })
        return accounts[0]
      }

    const postLoginCredentials = async(address) => {
        await axios.post("api/logincredentials/", address)
            // .then((response) => { console.log(response.data); return response })
            .then((response) => setToken(response.data))
    }

    const connectMetaMask = async() => {
        getAccounts()
            .then((response) => postLoginCredentials(response))
    }

    return (
        <div>
            <div className='bottom-nav-home login'>
                <h1>To Login Please Connect to MetaMask</h1>
                <button onClick={() => connectMetaMask()}>Connect To MetaMask</button>
            </div>
        </div>
    )
}

LoginScreen.propTypes = {
    setToken: PropTypes.func.isRequired
};
