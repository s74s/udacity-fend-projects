import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Searcbar extends Component {
  state = {
    value: '',
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({ value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.searchBooks(this.state.value)
    this.setState({ value: '' })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            onClick={this.handleBack}
            to="/"
          />
          <form
            className="search-books-input-wrapper"
            onSubmit={this.handleSubmit}
          >
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </form>
        </div>
      </div>
    )
  }
}
