import React from "react";
import "./App.css"
import { Link } from "react-router-dom";

const Menu = () => {


    return (
        <div className="menu-container">
            <h1 className="menu-title">Menu</h1>
            <ul className="menu-list">
                <li className="menu-list-item"><Link className="menu-link"  to="/playlist">Fetch a public playlist</Link></li>
                <li className="menu-list-item"><Link className="menu-link" to="/Userplaylist">Fetch Personal Playlists</Link></li>
            </ul>
        </div>
    )

}

export default Menu;