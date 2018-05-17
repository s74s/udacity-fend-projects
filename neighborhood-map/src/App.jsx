import React, { Component } from 'react'
import logo from './logo.svg'
import { FS, FS_API_SEARCH_URL, mapCenter } from './data'

class App extends Component {
  componentDidMount = () => {
    fetch(FS_API_SEARCH_URL)
    .then(res => res.json())
    .then(data => console.log(data.response.venues))
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <section id="map" className="map" role="application">
          <header>Here will be map</header>
        </section>
      </div>
    )
  }
}

export default App
