import React from "react";
import { Link } from 'react-router-dom';

function HomeScreen() {

    return (
        <div>
            <div className="wide-centered vert-align">
                <h1 className="title"><span className="purple-text">Welcome</span> To Management Console</h1>
            </div>
            <div className='bottom-nav-home'>
                <button><Link to="/info" className="override-link">Info</Link></button>
                <button><Link to="/editconfig" className="override-link">Configurations</Link></button>
                <button><Link to="/metamask" className="override-link">Authentication</Link></button>
                <button><Link to="/metamask" className="override-link">History</Link></button>
            </div>
        </div>
    )
}

export default HomeScreen;