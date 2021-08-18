import React, { Component } from 'react'
import imageHero from './images/hero.png'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.loading = false
    this.state.votes = 0
    this.saveVote = this.saveVote.bind(this)
  }

  /**
   * Component Did Mount
   */

  async componentDidMount() {}

  /**
   * Save Vote
   */

  async saveVote() {
    this.setState({ votes: this.state.votes + 1 })
  }

  /**
   * Render
   */

  render() {
    return (
      <div className="container">
        <div className="hero">
          <img alt="sls hero" src={imageHero} />
        </div>

        <div className="tagline">
          A website built on serverless components `website-optimized-cloudfront`
        </div>

        <div className="buttonContainer">
          <div
            className={`button`}
            onClick={() => {
              this.saveVote()
            }}
          >
            <div className={`buttonInner`}>
              <div className={`buttonLeft`}>ß</div>
              <div className="buttonRight">{this.state.votes}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
