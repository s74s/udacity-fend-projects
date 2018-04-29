import React, { Component } from 'react'
import BooksList from './BooksList'

export default class Bookshelf extends Component {
  render() {
    const { name, title, books } = this.props
    return (
      <div className = "bookshelf" >
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <BooksList books={books || []} />
        </div>
      </div >
    )
  }
}
