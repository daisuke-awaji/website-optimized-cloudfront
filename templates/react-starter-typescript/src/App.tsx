import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import imageHero from './images/hero.png'

const Template: React.FC<{ txt: string }> = ({ txt }) => {
  const [vote, setVote] = useState(0)
  return (
    <div className="container">
      <div className="hero">
        <img alt="sls hero" src={imageHero} />
      </div>

      <div className="tagline">
        A website built on serverless components `website-optimized-cloudfront`
      </div>
      <div className="tagline">Page Name: {txt}</div>

      <div className="buttonContainer">
        <div
          className={`button`}
          onClick={() => {
            setVote(vote + 1)
          }}
        >
          <div className={`buttonInner`}>
            <div className={`buttonLeft`}>ß</div>
            <div className="buttonRight">{vote}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const About = () => <Template txt="about" />
const Home = () => <Template txt="home" />

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
