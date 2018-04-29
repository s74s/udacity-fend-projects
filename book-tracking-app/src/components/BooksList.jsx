import React, { Component } from 'react'
import Book from './Book'

export default class BooksList extends Component {
  render() {
    const { name, title, books } = this.props    
    return (
      <ol className="books-grid">
        { books.map(book => (
          <li key={book.id}>
            <Book book={book}/>
          </li>
        )) }
      </ol>
    )
  }
}
