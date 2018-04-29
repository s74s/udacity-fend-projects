import React, { Component } from 'react'

export default class Book extends Component {
  render() {
    const { authors, imageLinks: { thumbnail }, title } = this.props.book
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors.map(name => (
          <div key={name} className="book-authors">
            {name}
          </div>
        ))}
      </div>
    )
  }
}
