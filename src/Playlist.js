import React, {useState} from "react";
import { getToken } from "./auth";

const Playlist = () =>{
    const [playlistId, setPlaylistId] = useState("");
    const [backupData, setBackupData] = useState([]);

    const handleChange = (e)=>{
        setPlaylistId(e.target.value);
    }

    const handleBackup = async () =>{
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
            }
        );
        const data = await response.json();
        console.log(data.tracks);
        setBackupData(data.tracks);
        downloadCSV();

    };

    const convertToCSV = (data) =>{
        const header = ['Track Name', 'Spotify URL'];
        const rows = data.items.map(item=>[item.track.name, item.track.uri]);
        console.log(rows[0]);

        const csvContent = [
            header.join(','),
            ...rows.map(row=>row.join(','))
        ].join('\n');

        return csvContent;

    }

    const downloadCSV = ()=>{
        const csv = convertToCSV(backupData);
        const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'playlist.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div>
            <h1>Backup your Playlist</h1>
            <input type="text" placeholder="Enter Playlist ID" value={playlistId} onChange={handleChange}/>
            <button onClick={handleBackup}>Backup</button>
        </div>
    );
}

export default Playlist;

