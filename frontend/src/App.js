import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './components/Shared/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header
          client={client}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          registrationToggle={registrationToggle}
          setRegistrationToggle={setRegistrationToggle}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                client={client}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                client={client}
                setUsername={setUsername}
                setPassword={setPassword}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
