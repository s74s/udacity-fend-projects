import React, { Component } from 'react'
import Bookshelf from './Bookshelf'

const sortBooksByShelf = (array = []) => array.reduce((acc, item) => {
  const { shelf } = item
  if (!acc.has(shelf)) acc.set(shelf, [item])
  else acc.set(shelf, [...acc.get(shelf), item])
  return acc
}, new Map())

export default class BookshelfsList extends Component {
  render() {
    const { books, shelfs } = this.props
    const sortedBooks = sortBooksByShelf(books)
    return (
      <ul>
        {shelfs.map(({ name, title }) => (
          <li key={name}>
            <Bookshelf
              name={name}
              title={title}
              books={sortedBooks.get(name)}
            />
          </li>
        ))}
      </ul>
    )
  }
}
