import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function EditAddress() {
    // const [addressobject]
    const location = useLocation();
    const addressobject = location.state;
    const [nickname, setNickName] = useState(addressobject.nickname)
    const [address, setAddress] = useState(addressobject.address);
    const navigate = useNavigate();

    const updateAddress = async(address) => {
        await axios.put(`/api/loginaddress/${address.id}/`, address);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        updateAddress({ id:addressobject.id, nickname: nickname, address: address});
        navigate("/metamask");
    }

    return (
        <div>
            <h2><Link to="/metamask">MetaMask</Link></h2>
            <h1>Edit Address</h1>

            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="nickname">Nickname:</label>
                    <input id="nickname" name="nickname" type="text" value={nickname} onChange={(event) => setNickName(event.target.value)}/>
                    <label htmlFor="address">Address:</label>
                    <input id="address" name="address" type="text" value={address} onChange={(event) => setAddress(event.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditAddress;