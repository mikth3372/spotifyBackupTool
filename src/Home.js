import React, {useState, useEffect} from "react";

import { redirectToSpotify } from "./auth";

const Home = () =>{

    const [playlists, setPlaylists] = useState([]);

    const fetchPlaylists = async () =>{
        const accessToken = localStorage.getItem('access_token');
        const playlistId = "37i9dQZF1DWWY64wDtewQt"; 
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        console.log(data);
        // setPlaylists(data.tracks.items);
    };

    useEffect(()=>{
        if(localStorage.getItem('access_token')){
            fetchPlaylists();
        }
    }, []);


    return (
        <div>
            <h1> spotify pkce auth</h1>
            <button onClick={redirectToSpotify}>Login with Spotify</button>
            <h2>My Songs</h2>
            {/* {playlists && playlists.length>0  ? (
                <ul>
                    {playlists.map((item,index) => (
                        <li key={index}>{item.track.album.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No playlists found.</p>
            )} */}
        </div>
    );
};

export default Home;