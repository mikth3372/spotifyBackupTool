import React, {useState, useEffect} from "react";

import { redirectToSpotify } from "./auth";

const Home = () =>{
    return (
        <div>
            <h1> spotify pkce auth</h1>
            <button onClick={redirectToSpotify}>Login with Spotify</button>
        </div>
    )
}

export default Home;