import React, {useState, useEffect} from 'react';
import './App.css';
import {
  Header,
  DefaultHomepage
} from './components'

function App() {
  return (
    <div className="App">
       <Header />
       <DefaultHomepage />
    </div>
  );
}

export default App;
