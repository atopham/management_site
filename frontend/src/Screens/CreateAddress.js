import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAddress() {
    const [nickname, setNickName] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const createAddress = async(address) => {
        await axios.post('/api/loginaddress/', address)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        createAddress({ nickname: nickname, address: address })
        navigate("/metamask");
    }
    return (
        <div>
            <h2><Link to="/metamask">MetaMask</Link></h2>
            <h1>Create Address</h1>

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

export default CreateAddress;