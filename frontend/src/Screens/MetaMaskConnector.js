import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import axios from 'axios';


function MetaMaskConnector() {
    const [account, setAccount] = useState("");
    const [balanceE, setBalanceE] = useState(false);
    const [addressObject, setAddressObject] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {

        try {
            getAccounts().then((res) => setAccount(res));
            getBalance().then((res) => setBalanceE(res));
    
            getLoginAddressObjects().then((res) => { setAddressObject(res[0]); return res })
                .then((res) => (setAddresses(res[1])))
                // .then(() => console.log("addressObject",addressObject))
                // .then(() => console.log("addresses",addresses))
                .then(() => evalLoggedIn.then((res) => setLoggedIn(res)))
                .catch((error) => console.log(error))
        } catch {
            console.log("needs to login")
        }


    }, [account, render])

    const evalLoggedIn = new Promise((resolve, reject) => {
        if (account === addresses[0]) {
            resolve(true)
        } else {
            resolve(false)
        }
        reject("Error")
    })

    const getAccounts = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((e) => {
          console.error(e.message)
          return
      })
      return accounts[0]
    }

    const getBalance = async () => {
        try{
            let web3 = new Web3(window.ethereum);
            let balW = await web3.eth.getBalance(account)
            // console.log("Wei from getBalance", balW)
            let balE = await web3.utils.fromWei(balW, 'ether');
            return balE;
          } catch {
            console.log("this method won't get the balance");
          }
    }

    const getLoginAddressObjects = async() => {
        let loginaddressReceiver = []
        let loginaddressobjects = []
        await axios.get('api/loginaddress/')
            .then((response) => loginaddressReceiver.push(response.data))
            .then(() => {
                loginaddressReceiver[0].map((addressobject) => (
                    loginaddressobjects.push(addressobject)
                ))
            })
            .catch((error) => console.log(error))
        let loginaddresses = [];
        loginaddressobjects.map((addressObj) => (
            loginaddresses.push(addressObj.address)
        ))

        return [ loginaddressobjects, loginaddresses ]

    }

    const deleteAddress = async(addressObject) => {
        await axios.delete(`/api/loginaddress/${addressObject.id}/`)
            // .then(() => getLoginAddressObjects());
            .then(() => setRender(!render));
    };

    return (

        <div>
            {loggedIn ? (
                <div>
                    <div>{account}</div>
                    {/* <div>{balanceE}</div> */}
                    {/* <div>{account === addresses[0] ? "your account is whitelisted" : "Your account isn't whitelisted"}</div> */}
                    <div>{loggedIn ? "You are logged in" : "You are not logged in"}</div>
                    <div>
                        <h2><Link to="/info" state={loggedIn} >Info</Link></h2>
                        <h2><Link to="/editconfig" state={loggedIn} >Edit Config</Link></h2>
                        <p>The wallet with the address of {account} has an ethereum balance of {balanceE} ETH</p>
                    </div>
                    <div>
                        <h2>Login Addresses</h2>
                        <h3><Link to="/createaddress">Create Address</Link></h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nickname</th>
                                    <th>Address</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {addressObject.map((address) => (
                                <tr key={address.id}>
                                    <td>{address.nickname}</td>
                                    <td>{address.address}</td>
                                    <td><Link to="/editaddress" state={address}>Edit</Link></td>
                                    <td><button onClick={() => deleteAddress(address)}>Delete</button></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>Please Login to MetaMask</div>
            )}
        </div>
    )
}

export default MetaMaskConnector;