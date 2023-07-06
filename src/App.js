import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import {
  Header,
  DefaultHomepage,
  AllProducts,
  Login,
  Register
} from './components'

function App() {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState([])
  const [productsType, setProductType] = useState('')

  return (
    
    <div className="App">
       <Header token={token} setToken={setToken} setUser={setUser} setProductType={setProductType}/>
      <Route path='/users/login'>
        <Login username={username} setUsername={setUsername} setToken={setToken} setUser={setUser}/>
      </Route>
      <Route path = '/users/register'>
        <Register username = {username} setUsername={setUsername} setToken={setToken} setUser={setUser} />
      </Route>
       <Route path='/products'>
          <AllProducts productsType={productsType}/>
       </Route>
       <Route exact path='/'>
         <DefaultHomepage />
       </Route>
       
      
    </div>
    
  )
}

export default App;
