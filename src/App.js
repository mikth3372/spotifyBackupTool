import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Callback from './Callback';
import {Playlist} from './Playlist';
import Userplaylist from './Userplaylist';
import Menu from './Menu';

function App() {
 return(
  <Router>
    <Routes>
      <Route path = "/" element = {<Home/>} />
      <Route path = "/callback" element = {<Callback/>}/>
      <Route path = "/playlist" element = {<Playlist/>}/>
      <Route path = "/Userplaylist" element = {<Userplaylist/>}/>
      <Route path = "/menu" element = {<Menu/>}/> 
    </Routes>
  </Router>
 )
}

export default App;
