import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  { useLocation, useNavigate } from 'react-router-dom';

function DeleteScreen() {
    const location = useLocation();
    const addressobject = location.state;
    const [index, setIndex] = useState(0);
    const [nicknames, setNickNames] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let indexholder;
        getObjects()
            .then((response) => indexholder = response.indexOf(addressobject.address))
            .then(() => setIndex(indexholder))
            .catch((error) => console.log(error))
    }, [addressobject.address])    

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
        let addressesLength = addresses.length;
        let count = Array.from({length: addressesLength}, (_, i) => i)
        count.map((i) => (
            i === index ? (
                ""
            ) : (
                output = output + (`{"nickname":"${nicknames[i]}", "address":"${addresses[i]}"}${i === addressesLength - 1 || ( i === index - 1 && index === addressesLength - 1) ? "" : ", "}`)
            )
        ))
        output = output + "]"
        console.log("output: ", output)
        postLogin(output)
    }

    const deleteHandler = (e) => {
        e.preventDefault()
        updateAddress();
        navigate("/metamask");
    }

    const noHandler = (e) => {
        e.preventDefault()
        navigate("/metamask");
    }

    return (
        <div className='wide-centered vert-align bottom-nav'>
            <h3>Are you sure you want to delete the address "{addressobject.address}"" with nickname "{addressobject.nickname}"?</h3>
            <button onClick={deleteHandler} className="">Yes</button>
            <button onClick={noHandler} className="">No</button>
        </div>
    )
}

export default DeleteScreen;