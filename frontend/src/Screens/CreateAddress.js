import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAddress() {
    const [nickname, setNickName] = useState("");
    const [address, setAddress] = useState("");
    const [nicknames, setNickNames] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getObjects()
            .catch((error) => console.log(error))
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

    const createAddress = async() => {
        let output = "[";
        let addressesLength = addresses.length;
        let count = Array.from({length: addressesLength}, (_, i) => i)
        count.map((i) => (
            output = output + (`{"nickname":"${nicknames[i]}", "address":"${addresses[i]}"},`)
        ))
        output = output + (`{"nickname":"${nickname}", "address":"${address}"}]`)
        // console.log("output: ", output)
        postLogin(output)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        createAddress()
        navigate("/metamask");
    }
    return (
        <div>
            <button className="back-button"><Link to="/metamask" className="override-link">Back</Link></button>
            <div className="wide-centered">
                
                <h1>Create Address</h1>

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

export default CreateAddress;