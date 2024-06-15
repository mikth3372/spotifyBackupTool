import React, { useEffect, useState } from "react";
import { checkAndRefreshToken } from "./auth";

const Playlist = () => {
  const [playlistId, setPlaylistId] = useState("");
  const [backupData, setBackupData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      await checkAndRefreshToken();
    };
    initialize();
  }, []);

  const handleChange = (e) => {
    setPlaylistId(e.target.value);
  };

  // const handleBackup = async (id) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     await checkAndRefreshToken();
  //     const accessToken = localStorage.getItem('access_token');
  //     if (!accessToken) {
  //       console.error("No access token found after refresh");
  //       return;
  //     }

  //     const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch playlist data");
  //     }

  //     const data = await response.json();
  //     if (!data.tracks) {
  //       throw new Error("No tracks found in the playlist");
  //     }

  //     setBackupData(data.tracks);
  //     downloadCSV(data.tracks);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };





  return (
    <div className="home-container">
      <h1>Backup your Playlist</h1>
      <input className="playlist-input" type="text" placeholder="Enter Playlist ID" value={playlistId} onChange={handleChange} />
      <button className="home-button" onClick={()=>handleBackup(playlistId, setBackupData, setLoading, setError)} disabled={loading}>
        {loading ? 'Backing up...' : 'Backup'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const downloadCSV = (data) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'playlist.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const convertToCSV = (data) => {
  const header = ['Track Name', 'Spotify URL'];
  const rows = data.items.map(item => [item.track.name, item.track.uri]);
  const csvContent = [
    header.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csvContent;
};

const handleBackup = async (id, setBackupData, setLoading, setError) => {
  setLoading(true);
  setError(null);
  try {
      await checkAndRefreshToken();
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
          console.error("No access token found after refresh");
          return;
      }

      const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      });

      if (!response.ok) {
          throw new Error("Failed to fetch playlist data");
      }

      const data = await response.json();
      if (!data.tracks) {
          throw new Error("No tracks found in the playlist");
      }

      setBackupData(data.tracks);
      downloadCSV(data.tracks);
  } catch (err) {
      console.error(err);
      setError(err.message);
  } finally {
      setLoading(false);
  }
};

export { Playlist, downloadCSV, handleBackup };
