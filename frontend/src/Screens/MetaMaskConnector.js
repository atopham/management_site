import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../Components/BottomNav';

function MetaMaskConnector() {
    const [addressObject, setAddressObject] = useState([]);

    useEffect(() => {
        try {
            getLoginAddressObjects().then((res) => { setAddressObject(res); return res })
                .catch((error) => console.log(error))
        } catch {
            console.log("needs to login")
        }
    }, [])

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
            return loginaddressobjects
        // let loginaddresses = [];
        // loginaddressobjects.map((addressObj) => (
        //     loginaddresses.push(addressObj.address)
        // ))
        // return [ loginaddressobjects, loginaddresses ]
    }

    return (
        <div className='wide-centered'>
            <div>
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
                        <BottomNav/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MetaMaskConnector;


    // eslint-disable-next-line react-hooks/exhaustive-deps