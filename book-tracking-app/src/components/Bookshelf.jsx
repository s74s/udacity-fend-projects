import React from 'react'
import BooksList from './BooksList'

export default function Bookshelf(props) {
  const { title, books } = props
  return (
    <div className="bookshelf" >
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksList
          books={books || []}
          changeBookShelf={props.changeBookShelf}
        />
      </div>
    </div >
  )
}
