
import { redirectToSpotify } from "./auth";

import "./App.css";

const Home = () =>{

    // const [playlists, setPlaylists] = useState([]);

    // const fetchPlaylists = async () =>{
    //     const accessToken = localStorage.getItem('access_token');
    //     const playlistId = "37i9dQZF1DWWY64wDtewQt"; 
    //     const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`,{
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     // setPlaylists(data.tracks.items);
    // };

    // useEffect(()=>{
    //     if(localStorage.getItem('access_token')){
    //         fetchPlaylists();
    //     }
    // }, []);


    return (
        <div className="home-container">
            <h1 className="home-title"> Spotify Playlist Backup Tool</h1>
            <button className="home-button" onClick={redirectToSpotify}>Login with Spotify</button>
            {/* <h2>My Songs</h2> */}
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