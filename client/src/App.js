import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import {
  Header,
  DefaultHomepage,
  AllGuitars,
  Login
} from './components'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Header />
      <Route path='/users/login'>
        <Login />
      </Route>
       <Route path='/guitars'>
          <AllGuitars />
       </Route>
       <Route exact path='/'>
         <DefaultHomepage />
       </Route>
       
      
    </div>
    </BrowserRouter>
  )
}

export default App;