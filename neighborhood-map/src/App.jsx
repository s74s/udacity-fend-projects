import React, { Component, Fragment } from 'react'
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
    mapLoadingFailed: false,
    places: [],
    map: null,
  }

  componentDidUpdate = () => {
    const { isPlacesLoaded, isMapLoaded } = this.state
    console.log(this.state)
    if (isMapLoaded && !isPlacesLoaded) {
      this.fetchPlacesData()
    }
  }
  

  static getDerivedStateFromProps({ isScriptLoadSucceed, isScriptLoaded }, prevState) {
    const { map, isPlacesLoaded } = prevState
    if (!isScriptLoadSucceed && isScriptLoaded) {
      return { mapLoadingFailed: true }
    }

    if (isScriptLoadSucceed && !map) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: mapCenter,
      })
      return { ...prevState, map, isMapLoaded: true }
    }

    else return null
  }

  fetchPlacesData = () => {
    fetch(FS_API_SEARCH_URL)
      .then(res => res.json())
      .then(data => this.setState({ places: data.response.venues, isPlacesLoaded: true }))
      .catch(error => console.error(error))
  }

  render() {
    const { places, map, mapLoadingFailed } = this.state
    return (
      <Fragment>
        { mapLoadingFailed
          ? <div role="alert">
              <h2 className="warning">Map Loading Failed</h2>
            </div>
          : <div className="App" role="main">
              <section id="map" ref={this.mapRef} className="map" role="application">
              </section>
              <PlacesList places={places} map={map} />
            </div>
        }
      </Fragment>
    )
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/aps/api/js?key=${MAP_API_KEY}`])
  (App)
