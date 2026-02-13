import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('OctoFit Tracker App loaded');
  console.log('Codespace Name:', process.env.REACT_APP_CODESPACE_NAME);
  
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" expand="lg" sticky="top" className="navbar">
          <Container>
            <Navbar.Brand as={Link} to="/" className="navbar-brand">
              <img 
                src="/octofit-logo.png" 
                alt="OctoFit Logo" 
                style={{ height: '45px', width: 'auto' }}
              />
              OctoFit Tracker
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className="nav-link">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/activities" className="nav-link">
                  Activities
                </Nav.Link>
                <Nav.Link as={Link} to="/workouts" className="nav-link">
                  Workouts
                </Nav.Link>
                <Nav.Link as={Link} to="/teams" className="nav-link">
                  Teams
                </Nav.Link>
                <Nav.Link as={Link} to="/users" className="nav-link">
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to="/leaderboard" className="nav-link">
                  Leaderboard
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4" style={{ flex: 1 }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="home-hero">
                  <h1>🏋️ Welcome to OctoFit Tracker</h1>
                  <p className="lead">Your fitness journey starts here!</p>
                  <p>Use the navigation menu above to explore activities, workouts, teams, users, and the leaderboard.</p>
                </div>
              } 
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
