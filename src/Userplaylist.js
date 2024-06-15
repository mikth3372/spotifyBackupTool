import React from "react";

import "./App.css";

import { useState, useEffect } from "react";
import { handleBackup } from "./Playlist";

const Userplaylist = () =>{

    const [playlists,setPlaylists] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const fetchPlaylists = async () =>{
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch('https://api.spotify.com/v1/me/playlists',{
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        }); 

        const data = await response.json();
        setPlaylists(data.items);
        console.log('data in playlists is',data);
    }
    
    useEffect(()=>{
        if(localStorage.getItem('access_token')){
            fetchPlaylists();
        }
    },[]);

    return (
        <div className="userPlaylist-container">
            <h1 className="userPlaylist-title">My Playlists</h1>
            {playlists && playlists.length>0 ?(
                <ul className="home-list">
                    {playlists.map((playlist,index)=>(
                        <li key={index} className="home-list-item"><a href="#" onClick={()=>handleBackup(playlist.id, setPlaylists, setLoading,setError)}>{playlist.name}</a></li>
                    ))}
                </ul>
            ):(
                <p className="home-message">No playlists found.</p>
            )}
        </div>
    )


}

export default Userplaylist;