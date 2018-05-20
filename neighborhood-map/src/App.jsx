import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

import PlacesList from './PlacesList'
import logo from './logo.svg'
import { FS, FS_API_SEARCH_URL, MAP_API_KEY, mapCenter } from './data'

class App extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  state = {
    isMapLoaded: false,
    isPlacesLoaded: false,
    places: [],
    map: null,
  }

  componentDidMount = () => {
    fetch(FS_API_SEARCH_URL)
    .then(res => res.json())
    .then(data => this.setState({ places: data.response.venues, isPlacesLoaded: true }))
  }

  static getDerivedStateFromProps({ isScriptLoadSucceed }, prevState) {
    const { map, isPlacesLoaded } = prevState
    if (isScriptLoadSucceed && !map) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: mapCenter,
      })
      return { ...prevState, map, isMapLoaded: true }
    }
    else return null
  }

  render() {
    const { places, map } = this.state
    return (
      <div className="App" role="main">
        <section id="map" ref={this.mapRef} className="map" role="application">
        </section>
        <PlacesList places={places} map={map} />
      </div>
    )
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`])
  (App)
