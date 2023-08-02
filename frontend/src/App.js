import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import Header from './components/Shared/Header/Header';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';
import Notification from './components/Achievements/Notification';
import Footer from './components/Shared/Footer/Footer';


const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});


function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [achievement, setAchievement] = useState('');
  const [userURL, setUserURL] = useState();
  const [loading, setLoading] = useState(true);

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
          setUserURL(res.data[0].url);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [currentUser, userURL]);

  useEffect(() => {
    if (currentUser && userURL) {
      const token = localStorage.getItem('token');
      const wsClient = new W3CWebSocket(`ws://127.0.0.1:8000/ws/notifications/?token=${token}`);
      
      wsClient.onopen = () => {
        console.log('WebSocket connection opened');
        const url = new URL(userURL);
        const userId = url.pathname.split('/')[3];
        wsClient.send(JSON.stringify({
          command: 'subscribe',
          group: `user_${userId}`,
        }));
      };

      wsClient.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'achievement_notification') {
          console.log('Updating state:', data.achievement);
          setAchievement(data.achievement);
          setModalShow(true);
        }
      };
  
      wsClient.onerror = (error) => {
        console.log('WebSocket error:', error);
      };
  
      wsClient.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
  }, [currentUser, userURL]);
  
  return (
    <div>
      <Notification
        achievement={achievement}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
