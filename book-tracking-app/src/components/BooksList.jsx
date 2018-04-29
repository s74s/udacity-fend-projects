import React, { Component } from 'react'
import Book from './Book'

export default class BooksList extends Component {
  render() {
    const { books } = this.props

    if (!books.length) return ( <h2>{ books.error }</h2> )
    return (
      <ol className="books-grid">
        { books.map(book => (
          <li key={book.id}>
            <Book
              book={book}
              changeBookShelf={this.props.changeBookShelf}
            />
          </li>
        )) }
      </ol>
    )
  }
}
