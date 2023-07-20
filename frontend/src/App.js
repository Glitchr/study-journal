import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from './components/Shared/Header/Header';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';


axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [errorMessage, setErrorMessage] = useState();

  return (
    <div>
      <Router>
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
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
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUp
                  client={client}
                  username={username}
                  setUsername={setUsername}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
