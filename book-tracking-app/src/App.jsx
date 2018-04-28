import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import BookshelfsList from './components/BookshelfsList'
import MainHeader from './components/MainHeader'

const shelfs = [
  { name: 'wantToRead', title: 'Want To Read' },
  { name: 'currentlyReading', title: 'Currently Reading' },
  { name: 'read', title: 'Read' },  
]

export class App extends Component {
  state = {
    books: [],
  }

  componentWillMount = () => {
    BooksAPI.getAll()
    .then(books => this.setState({ books }, () => {
      console.log(books)
    }))
  }
  

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <MainHeader />
        <BookshelfsList books={books} shelfs={shelfs} />
      </div>
    )
  }
}

export default App
