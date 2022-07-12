import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../Components/BottomNav';

function MetaMaskConnector() {
    const [account, setAccount] = useState("");
    const [addressObject, setAddressObject] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        try {
            getAccounts().then((res) => setAccount(res));
    
            getLoginAddressObjects().then((res) => { setAddressObject(res[0]); return res })
                .then((res) => (setAddresses(res[1])))
                .then(() => evalLoggedIn.then((res) => setLoggedIn(res)))
                .catch((error) => console.log(error))
        } catch {
            console.log("needs to login")
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])

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
    //   console.log(accounts[0])
      return accounts[0]
    }

    const getLoginAddressObjects = async() => {

        let loginaddressReceiver = []
        let loginaddressobjects = []
        await axios.get('api/login/')
            // .then((response) => console.log(response.data))
            .then((response) => loginaddressReceiver = response.data)
            .then(() => {
                loginaddressReceiver.map((addressobject) => (
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

    return (

        <div className='wide-centered'>
            {loggedIn ? (
                <div>
                    {/* <div>{account}</div> */}
                    {/* <div>{balanceE}</div> */}
                    {/* <div>{account === addresses[0] ? "your account is whitelisted" : "Your account isn't whitelisted"}</div> */}
                    
                    {/* <div>{loggedIn ? "You are logged in" : "You are not logged in"}</div> */}

                    <div className='title'>
                        <h1>Authentication</h1>
                    </div>

                    <div>
                        <p className="purple-text bigger-text">Whitelisted Addresses:</p>
                        <button><Link to="/createaddress" className="override-link" >Create Address</Link></button>
                        <table>
                            <tbody>
                                {addressObject.map((address) => (
                                    <tr key={address.address}>
                                        <td className='table-item-text'>{address.nickname}</td>
                                        <td className='table-item-text'>{address.address}</td>
                                        <td><button><Link to="/editaddress" className="override-link" state={address}>Edit</Link></button></td>
                                        <td><button><Link to="/deleteaddress" className="override-link" state={address}>Delete</Link></button></td>
                                    </tr>

                                ))}
                                    {/* <tr >
                                        <td className='table-item-text'></td>
                                        <td className='table-item-text'><input type="text"/></td>
                                        <td><button><Link to="/editaddress" className="override-link" state={address}>Edit</Link></button></td>
                                        <td></td>
                                    </tr> */}
                            </tbody>
                        </table>

                        <div>
                            <BottomNav loggedIn={loggedIn}/>
                        </div>
                    </div>



                </div>
            ) : (
                <div>Please Login to MetaMask</div>
            )}

            

        </div>
    )
}

export default MetaMaskConnector;