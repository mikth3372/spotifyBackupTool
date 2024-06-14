import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Callback from './Callback';
import Playlist from './Playlist';

function App() {
 return(
  <Router>
    <Routes>
      <Route path = "/" element = {<Home/>} />
      <Route path = "/callback" element = {<Callback/>}/>
      <Route path = "/playlist" element = {<Playlist/>}/>
    </Routes>
  </Router>
 )
}

export default App;
