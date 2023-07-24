import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './components/Shared/Header/Header';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';


const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      client.get('/api/users/', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => {
          setCurrentUser(res.data[0].username);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);
  
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
                  setErrorMessage={setErrorMessage}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route path="/logout" element={<Logout />} />
            <Route
              path='/courses'
              element={
                <Courses
                  client={client}
                  currentUser={currentUser}
                />
              }
            />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
