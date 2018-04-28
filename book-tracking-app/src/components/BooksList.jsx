import React, { Component } from 'react'
import Book from './Book'

export default class BooksList extends Component {
  render() {
    return (
      <ol className="books-grid">
        <Book />
      </ol>
    )
  }
}
