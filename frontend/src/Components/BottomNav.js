import React from "react";
import { Link } from 'react-router-dom';

function BottomNav(props) {
    return (
        // state={{loggedIn: loggedIn, account: account}}
        <div className='bottom-nav'>
            <button><Link to="/info" className="override-link" >Info</Link></button>
            <button><Link to="/editconfig" className="override-link" >Configurations</Link></button>
            <button><Link to="/metamask" className="override-link" >Authentication</Link></button>
            <button><Link to="/history" className="override-link" >History</Link></button>
        </div>
    )
}

export default BottomNav;