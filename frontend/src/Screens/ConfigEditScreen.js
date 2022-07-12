import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from '../Components/BottomNav';


function ConfigEditScreen() {
    const location = useLocation();
    // const loggedIn = location.state;
    // const [id, setId] = useState("");
    const [running, setRunning] = useState("");
    const [max_allocations, setMax_allocations] = useState("");
    const isFirstRender = useRef(true)

    useEffect(() => {
        getConfig()
        getRunning()

    }, [])

    useEffect(() => {
        if (isFirstRender.current === true) {
            isFirstRender.current = false
            return
        }

        postRunning(`[{"running":${running}}]`)

    }, [running])

    const getConfig = async() => {
        await axios.get("api/config/")
            .then((response) => setMax_allocations(response.data[0].max_allocations))
            .catch((error) => console.log(error))
    }

    const postConfig = async(config) => {
        await axios.post("api/config/", config)
            .catch((error) => console.log(error))
    }

    const getRunning = async() => {
        await axios.get("api/running/")
            .then((response) => setRunning(response.data[0].running))
            .catch((error) => console.log(error))
    }

    const postRunning = async(running) => {
        await axios.post("api/running/", running)
            .catch((error) => console.log(error))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        postConfig(`[{ "max_allocations": ${max_allocations} }]`)

    }

    return (

            <div className="wide-centered">
                <div>

                    <h1 className="title">Edit Configuration</h1>
                    {/* <h3>Running value: {String(running)}</h3> */}
                </div>
                {/* <div>
                    {JSON.stringify(config)}
                </div> */}


                <div className="vert-item-margin">
                    {/* <div>Bot Running Live</div> */}
                    <label htmlFor="running" className='label-input-spacing'>Bot Running Live</label>
                    <label className="switch">
                    <input name="running" type="checkbox" checked={running} onChange={() => setRunning(!running) } />
                    <span className="slider round"></span>
                    </label>
                </div>

                <div className="vert-item-margin">
                    <form className='form' onSubmit={submitHandler}>
                        <div>
                            <label className="label-input-spacing" htmlFor='max_allocations'>Max Allocation</label>
                            <input  className="label-input-spacing" id="max_allocations" name="max_allocations" type="text" value={max_allocations} onChange={(event) => setMax_allocations(event.target.value)}/>
                            <button type="submit" className='button'>Change Allocation</button>
                        </div>
                        
                    </form>
                </div>  

                {/* <div className='bottom-nav'>
                    <button><Link to="/info" className="override-link" state={loggedIn}>Info</Link></button>
                    <button><Link to="/metamask" className="override-link">Configurations</Link></button>
                    <button><Link to="/metamask" className="override-link">Authentication</Link></button>
                    <button><Link to="/metamask" className="override-link">History</Link></button>
                </div> */}
                {/* <BottomNav loggedIn={loggedIn}/> */}
                <BottomNav/>

            </div>

        )
    }



export default ConfigEditScreen;