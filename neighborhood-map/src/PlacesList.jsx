import React, { Component } from 'react'

export default class PlacesList extends Component {
  constructor(props) {
    super(props)
    this.filterInput = React.createRef()
  }

  state = {
    places: [],
    filtredPlaces: [],
  }

  static getDerivedStateFromProps({ places }) {
    return { places, filtredPlaces: places }
  }

  handleFilterChange = () => {
    const { value } = this.filterInput.current
    const { filtredPlaces, places } = this.state
    if (value) {
      const filtred = places.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()))
      this.setState({ filtredPlaces: filtred })
    } else this.setState({ filtredPlaces: places })
  }

  render() {
    const { filtredPlaces } = this.state
    console.log(filtredPlaces)
    return (
      <section>
        <input
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
