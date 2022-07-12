import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';


function ConfigEditScreen() {
    const location = useLocation();
    const loggedIn = location.state;
    // const [id, setId] = useState("");
    const [running, setRunning] = useState("");
    const [max_allocations, setMax_allocations] = useState("");
    const [config, setConfig] = useState("");
    const isFirstRender = useRef(true)

    useEffect(() => {
        getConfig()
        getRunning()

    }, [])

    useEffect(() => {
        if (isFirstRender.current == true) {
            isFirstRender.current = false
            return
        }

        postRunning(`[{"running":${running}}]`)

    }, [running])



    const getConfig = async() => {
        await axios.get("api/config/")
            .then((response) => { setConfig(response.data); setMax_allocations(response.data[0].max_allocations)})
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

        // postConfig([
        //     {"max_allocations":max_allocations}
        // ])
    }

    return (

            <div>
                <div>
                    <div>{String(loggedIn)}</div>
                    <h2><Link to="/info" state={loggedIn}>Info</Link></h2>
                    <h2><Link to="/metamask">MetaMask</Link></h2>
                    <h1>Config</h1>
                    <h3>Running value: {String(running)}</h3>
                    {/* <h2>Running: {String(this.state.running)}</h2> */}
                    {/* <h2>max_allocations: {this.state.max_allocations}</h2>
                    <h2>Password: {this.state.view_password}</h2> */}
                </div>
                <div>
                    {JSON.stringify(config)}
                </div>


                <div>
                    <div>Running:</div>
                    <label className="switch">
                    <input type="checkbox" checked={running} onChange={() => setRunning(!running) } />
                    <span className="slider round"></span>
                    </label>
                </div>

                <div>
                    <form className='form' onSubmit={submitHandler}>
                        {/* <div>
                            <label htmlFor='running'>Running:</label>
                            <input id="running" name="running" type="checkbox" checked={running} onChange={(event) => setRunning(event.target.checked)}/>
                        </div> */}
                        <div>
                            <label htmlFor='max_allocations'>max_allocations:</label>
                            <input id="max_allocations" name="max_allocations" type="text" value={max_allocations} onChange={(event) => setMax_allocations(event.target.value)}/>
                        </div>
                        {/* <div>
                            <label htmlFor='view_password'>view_password:</label>
                            <input id="view_password" name="view_password" type="text" value={view_password} onChange={(event) => setView_password(event.target.value)}/>
                        </div> */}
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </form>
                </div>  
            </div>

        )
    }



export default ConfigEditScreen;