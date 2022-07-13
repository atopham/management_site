import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function EditAddress() {
    const location = useLocation();
    const addressobject = location.state;
    const [nickname, setNickName] = useState(addressobject.nickname);
    const [address, setAddress] = useState(addressobject.address);

    const [index, setIndex] = useState(0);
    const [nicknames, setNickNames] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        let indexholder;
        getObjects()
            .then((response) => indexholder = response.indexOf(address))
            // .then(() => console.log("address: ",address))
            // .then(() => console.log("indexholder: ",indexholder))
            .then(() => setIndex(indexholder))
            .catch((error) => console.log(error))
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])    

    const getObjects = async() => {
        let objectsholder;
        let nicknamesholder = [];
        let addressesholder = [];
        
        await axios.get("api/login/")
            .then((response) => { objectsholder = response.data; return response })
            .then(() => {
                objectsholder.map((object) => (
                    nicknamesholder.push(object.nickname)
                ))
            })
            .then(() => setNickNames(nicknamesholder))
            .then(() => {
                objectsholder.map((object) => (
                    addressesholder.push(object.address)
                ))
            })
            .then(() => setAddresses(addressesholder))
            .catch((error) => console.log(error))

        return addressesholder
    }

    const postLogin = async(login) => {
        await axios.post("api/login/", login)
            .catch((error) => console.log(error))
    }

    const updateAddress = async() => {
        let output = "[";
        // console.log("index: " , index)
        nicknames[index] = nickname;
        addresses[index] = address;
        let addressesLength = addresses.length;
        let count = Array.from({length: addressesLength}, (_, i) => i)
        count.map((i) => (
            output = output + (`{"nickname":"${nicknames[i]}", "address":"${addresses[i]}"}${i === addressesLength - 1 ? "" : ","}`)
        ))
        output = output + "]"
        // console.log("index: ", index)
        // console.log(output)
        postLogin(output)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        updateAddress();
        navigate("/metamask");
    }

    return (
        <div>
            <button className="back-button"><Link to="/metamask" className="override-link">Back</Link></button>
            <div className="wide-centered">
                
                <h1>Edit Address</h1>

                <form onSubmit={submitHandler} autoComplete="off">
                    <div className="crud-form">
                        <span>
                            <label htmlFor="nickname">Nickname:</label>
                            <input id="nickname" name="nickname" type="text" value={nickname} onChange={(event) => setNickName(event.target.value)}/>
                        </span>
                        <span>
                            <label htmlFor="address">Address:</label>
                            <input id="address" name="address" type="text" value={address} onChange={(event) => setAddress(event.target.value)}/>
                        </span>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditAddress;