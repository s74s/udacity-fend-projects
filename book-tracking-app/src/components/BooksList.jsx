import React from 'react'
import Book from './Book'

export default function BooksList(props) {
  const { books } = props

  if (!books.length) return (<h2>{books.error}</h2>)
  return (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.id}>
          <Book
            book={book}
            changeBookShelf={props.changeBookShelf}
          />
        </li>
      ))}
    </ol>
  )
}
