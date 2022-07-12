import React from "react";
import { Link } from 'react-router-dom';

function BottomNav(props) {
    const { loggedIn, account } = props;
    return (
        <div className='bottom-nav'>
            <button><Link to="/info" className="override-link" state={{loggedIn: loggedIn, account: account}}>Info</Link></button>
            <button><Link to="/editconfig" className="override-link" state={{loggedIn: loggedIn, account: account}}>Configurations</Link></button>
            <button><Link to="/metamask" className="override-link" state={{loggedIn: loggedIn, account: account}}>Authentication</Link></button>
            <button><Link to="/metamask" className="override-link" state={{loggedIn: loggedIn, account: account}}>History</Link></button>
        </div>
    )
}

export default BottomNav;