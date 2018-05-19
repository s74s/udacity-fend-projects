import React, { Component } from 'react'

export default class PlacesList extends Component {
  constructor(props) {
    super(props)
    this.filterInput = React.createRef()
  }

  state = {
    places: [],
    filtredPlaces: [],
    markers: [],
    isMarkersSet: false,
  }

  componentDidUpdate() {
    const { map } = this.props
    const { places, isMarkersSet } = this.state
    if (map && places.length && !isMarkersSet) {
      console.log('set markers')
      this.setMapMarkers()
      this.setState({ isMarkersSet: true })
    }
  }

  static getDerivedStateFromProps({ places }) {
    return { places, filtredPlaces: places }
  }

  handleFilterChange = () => {
    const { value } = this.filterInput.current
    const { filtredPlaces, places } = this.state
    this.filterMarkers(value)
    if (value) {
      const filtred = places.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()))
      this.setState({ filtredPlaces: filtred })
    }
    else this.setState({ filtredPlaces: places })
  }

  filterMarkers = (value) => {
    const { markers } = this.state
    const { map } = this.props    
    console.log(value)
    markers.forEach((marker, i) => {
      const isVisible = marker.name.toLowerCase().includes(value.toLowerCase())
      marker.setMap(isVisible ? map : null)
    })
  }

  setMapMarkers = () => {
    const { filtredPlaces, places } = this.state
    const { map } = this.props
    const markers = []
    if (map) {
      places.forEach(place => {
        const marker = new window.google.maps.Marker({
          map: map,
          position: place.location,
          animation: window.google.maps.Animation.DROP,
          name: place.name
        })
        markers.push(marker);
      })
    }
    this.setState({markers})
  }

  render() {
    const { filtredPlaces } = this.state
    return (
      <section>
        <input
          role="search"
          aria-labelledby="filter"
          type="text"
          ref={this.filterInput}
          placeholder="Filter..."
          onChange={this.handleFilterChange}
        />
        <ul>
          { filtredPlaces.map(place => {
            return (
              <li key={place.id}>{ place.name }</li>
            )
          }) }
        </ul>
      </section>
    )
  }
}
