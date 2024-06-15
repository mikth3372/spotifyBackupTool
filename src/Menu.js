import React from "react";
import "./App.css"

const Menu = () => {


    return (
        <div className="menu-container">
            <h1 className="menu-title">Menu</h1>
            <ul className="menu-list">
                <li className="menu-list-item"><a className="menu-link" href="/playlist">Fetch a public playlist</a></li>
                <li className="menu-list-item"><a href="/Userplaylist">Fetch Personal Playlists</a></li>
            </ul>
        </div>
    )

}

export default Menu;