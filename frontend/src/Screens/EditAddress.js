import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function EditAddress() {
    // const [addressobject]
    const location = useLocation();
    const addressobject = location.state;
    const [nickname, setNickName] = useState(addressobject.nickname);
    const [address, setAddress] = useState(addressobject.address);

    const [objects, setObjects] = useState([]);
    const [startAddress] = useState(addressobject.address);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("addressobject: ", addressobject)
        getAddressObject(startAddress)
    }, [])

    let nicknames = [];
    let addresses = [];
    

    const getObjects = async() => {
        await axios.get("api/login/")
            // .then((response) => { console.log(response.data); return response })
            .then((response) => setObjects(response.data))

            .then(() => console.log("objects: ", objects))
            // .then(() => console.log(objects))
            .then(() => {
                objects.map((object) => (
                    console.log(object.nickname)
                    // nicknames.push(object.nickname)
                ))
            })
            .then(() => {
                objects.map((object) => (
                    addresses.push(object.address)
                ))
            })
            .catch((error) => console.log(error))
    }

    const getAddressObject = async(address) => {
        getObjects()
            .then(() => {
                setIndex(addresses.indexOf(address))
            })
            .then(() => console.log("just index: ",index))
            // .then(() => console.log("specifically address", addresses.indexOf(startAddress)))
            .catch((error) => console.log(error))
    }

    const updateAddress = async() => {
        let output = "[";
        nicknames[index] = nickname;
        addresses[index] = address;
        let addressesLength = addresses.length;
        console.log("addressesLength", addressesLength)
        let count = Array.from({length: addressesLength}, (_, i) => i + 1)
        console.log(count)
        count.map((i) => (
            output = output + (`"nickname":"${nicknames[i]}", "address":"${addresses[i]}"}${i === addressesLength - 1 ? "" : ","}`)
        ))
        output = output + "]"
        console.log(output)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        updateAddress();
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