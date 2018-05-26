import React, { Component, Fragment } from 'react'
import scriptLoader from 'react-async-script-loader'

import PlacesList from './PlacesList'
import { FS_API_SEARCH_URL, MAP_API_KEY, mapCenter } from '../helpers/data'

class App extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  state = {
    isMapLoaded: false,
    mapLoadingFailed: false,
    isPlacesLoaded: false,
    placesLoadingFailed: false,
    places: [],
    map: null,
  }

  componentDidUpdate = () => {
    const { isPlacesLoaded, isMapLoaded, placesLoadingFailed, mapLoadingFailed } = this.state
    const { isScriptLoadSucceed, isScriptLoaded } = this.props
    const { map } = this.state
    // Error catching when map script loads
    if (!isScriptLoadSucceed && isScriptLoaded && !mapLoadingFailed) {
      this.setState({ mapLoadingFailed: true })
    }
    // Init map after map script loaded successfull
    if (isScriptLoadSucceed && !map) {
      const map = new window.google.maps.Map(this.mapRef.current, {
        zoom: 16,
        center: mapCenter,
      })
      this.setState({ map, isMapLoaded: true })
    }
    // Fetch data if map ready
    if (isMapLoaded && !isPlacesLoaded && !placesLoadingFailed) {
      this.fetchPlacesData()
    }
  }

  // Fetch places from Foursquare API
  fetchPlacesData = () => {
    fetch(FS_API_SEARCH_URL)
      .then(res => res.json())
      .then(data => {
        data.response.venues
          ? this.setState({ places: data.response.venues, isPlacesLoaded: true })
          : this.setState({ placesLoadingFailed: true })
      })
      .catch(error => {
        console.info(error)
        this.setState({ placesLoadingFailed: true })
      })
  }

  render() {
    const { places, map, isMapLoaded, mapLoadingFailed, placesLoadingFailed } = this.state
    const isMapExist = isMapLoaded || !mapLoadingFailed
    return (
      <Fragment>
        <div className="App" role="main">
          <section
            id="map"
            ref={this.mapRef}
            className="map"
            role="application"
          >
            {!isMapExist &&
              <div role="alert">
                <h2 className="warning">Map Loading Failed</h2>
              </div>}
          </section>
          {isMapExist &&
            <PlacesList
              places={places}
              map={map}
              fetchFailed={placesLoadingFailed}
            />}
        </div>
      </Fragment>
    )
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`])(App)
