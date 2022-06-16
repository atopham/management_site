import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function ConfigEditScreen() {
    const location = useLocation();
    const loggedIn = location.state;
    const [id, setId] = useState("");
    const [running, setRunning] = useState("");
    const [max_allocations, setMax_allocations] = useState("");
    const [view_password, setView_password] = useState("");

    useEffect(() => {
        getConfig()
    }, [])

    const updateConfig = async(config) => {
        // console.log(config)
        await axios.put(`/api/config/${config.id}/`, config);
    }

    const getConfig = async() => {
        await axios.get('/api/config')
            .then((response) => { setId(response.data[0].id); return response })
            .then((response) => { setRunning(response.data[0].running); return response })
            .then((response) => { setMax_allocations(response.data[0].max_allocations); return response })
            .then((response) => { setView_password(response.data[0].view_password); return response })
            .catch((error) => console.log(error))

        // await axios.get('/api/config')
        //     .then((response) => this.setState({ id: response.data[0].id }))
        //     // .then(() => console.log(this.state.id))
        //     .catch((error) => console.log(error))
        // await axios.get('/api/config')
        //     .then((response) => this.setState({ running: response.data[0].running }))
        //     // .then(() => console.log(this.state.running))
        //     .catch((error) => console.log(error))
        // await axios.get('/api/config')
        //     .then((response) => this.setState({ max_allocations: response.data[0].max_allocations }))
        //     // .then(() => console.log(this.state.max_allocations))
        //     .catch((error) => console.log(error))
        // await axios.get('/api/config')
        //     .then((response) => this.setState({ view_password: response.data[0].view_password }))
        //     // .then(() => console.log(this.state.view_password))
        //     .catch((error) => console.log(error))
    }

    // const onChangeHandler = (event) => {
    //     const target = event.target;
    //     const value = target.type === "checkbox" ? target.checked : target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name] : value
    //     });
    // }

    const submitHandler = (e) => {
        e.preventDefault()
        updateConfig({ id:id, running:running, max_allocations:max_allocations, view_password:view_password })
    }

    return (
            <div>
                <div>
                    <div>{String(loggedIn)}</div>
                    <h2><Link to="/info" state={loggedIn}>Info</Link></h2>
                    <h2><Link to="/metamask">MetaMask</Link></h2>
                    <h1>Config</h1>
                    {/* <h2>Running: {String(this.state.running)}</h2> */}
                    {/* <h2>max_allocations: {this.state.max_allocations}</h2>
                    <h2>Password: {this.state.view_password}</h2> */}
                </div>
                <div>
                    <form className='form' onSubmit={submitHandler}>
                        <div>
                            <label htmlFor='running'>Running:</label>
                            <input id="running" name="running" type="checkbox" checked={running} onChange={(event) => setRunning(event.target.checked)}/>
                        </div>
                        <div>
                            <label htmlFor='max_allocations'>max_allocations:</label>
                            <input id="max_allocations" name="max_allocations" type="text" value={max_allocations} onChange={(event) => setMax_allocations(event.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor='view_password'>view_password:</label>
                            <input id="view_password" name="view_password" type="text" value={view_password} onChange={(event) => setView_password(event.target.value)}/>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>  
            </div>

        )
    }



export default ConfigEditScreen;