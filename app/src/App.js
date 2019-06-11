import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Login from './components/login.js';
import Register from './components/register.js';


function App() {
  return (
    <div className="App">
      <Route path='/auth/register' component={Register} />
      <Route path='/auth/link' component={Link} />
      <Link to='/auth/register'>Register</Link>
      <Link to='/auth/register'>Login</Link>
    </div>
  );
}

export default App;
