import React, { Component } from 'react'
import { setInfoWindowContent } from '../helpers/helpers'

export default class PlacesList extends Component {
  constructor(props) {
    super(props)
    this.filterInput = React.createRef()
  }

  state = {
    places: [],
    filtredPlaces: [],
    markers: [],
    infoWindows: [],
    isMarkersSet: false,
  }

  // Set markers to map after map and data ready
  componentDidUpdate() {
    const { map } = this.props
    const { places, isMarkersSet } = this.state
    if (map && places.length && !isMarkersSet) {
      this.setMapMarkersAndInfowindows()
      this.setState({ isMarkersSet: true })
    }
  }

  // Set filtredPlaces initial state
  static getDerivedStateFromProps({ places }) {
    return { places, filtredPlaces: places }
  }

  // Filter Markers and Places list on inupt value change
  handleFilterChange = () => {
    const { value } = this.filterInput.current
    const { places } = this.state
    this.filterMarkers(value)
    if (value) {
      const filtred = places.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()))
      this.setState({ filtredPlaces: filtred })
    }
    else this.setState({ filtredPlaces: places })
  }

  // Handling Filter Markers
  filterMarkers = (value) => {
    const { markers } = this.state
    const { map } = this.props
    markers.forEach((marker, i) => {
      const isVisible = marker.name.toLowerCase().includes(value.toLowerCase())
      marker.setMap(isVisible ? map : null)
    })
  }

  // Close all opened infowindows
  closeAllInfoWindows = () => {
    this.state.infoWindows.forEach(infoWindow => infoWindow.close())
  }

  // Set map markers on map and add infowindows for every marker instance
  setMapMarkersAndInfowindows = () => {
    const { places } = this.state
    const { map } = this.props
    const markers = []
    const infoWindows = []
    if (map) {
      places.forEach(place => {
        // Create marker instance
        const marker = new window.google.maps.Marker({
          map: map,
          position: place.location,
          animation: window.google.maps.Animation.DROP,
          name: place.name
        })

        // Create infowindow instance
        const content = setInfoWindowContent(place)
        const infoWindow = new window.google.maps.InfoWindow({
          content,
          name: place.name,
          maxWidth: 300,
        })

        // Set marker animation
        marker.addListener('click', () => {
          infoWindow.open(map, marker)
          if (marker.getAnimation()) {
            marker.setAnimation(null)
          } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(() => marker.setAnimation(null), 500)
          }
        })

        // Open marker infowindow, only one open at time
        marker.addListener('click', () => {
          this.closeAllInfoWindows()
          infoWindow.open(map, marker)
          map.setCenter(marker.getPosition())
        })

        // Push marker and infowindow instances to array
        markers.push(marker)
        infoWindows.push(infoWindow)
      })
    }
    // Save marker and infowindow instances to state
    this.setState({ markers, infoWindows })
  }

  handleListItemClick = (name) => (e) => {
    const { markers, infoWindows } = this.state
    const { map } = this.props
    const marker = markers.find(marker => marker.name === name)
    const infoWindow = infoWindows.find(marker => marker.name === name)
    this.closeAllInfoWindows()
    map.setCenter(marker.getPosition())
    infoWindow.open(map, marker)
  }

  renderList = () => {
    const { filtredPlaces } = this.state
    return (
      <section
        className="places-form"
        role="complementary"
      >
        <label>
          Filter:
        <input
            role="search"
            aria-labelledby="filter"
            type="text"
            ref={this.filterInput}
            onChange={this.handleFilterChange}
          />
        </label>
        <ul>
          {filtredPlaces.map(place => {
            return (
              <li
                key={place.id}
                onClick={this.handleListItemClick(place.name)}
                onKeyPress={this.handleListItemClick(place.name)}
                tabIndex="0"
                role="button"
              >
                {place.name}
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  render() {
    const { fetchFailed } = this.props
    return (
      fetchFailed
        ? <div role="alert"><h2>Foursquare data load failed</h2></div>
        : this.renderList()
    )
  }
}
