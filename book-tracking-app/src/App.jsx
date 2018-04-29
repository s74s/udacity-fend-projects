import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import BookshelfsList from './components/BookshelfsList'
import MainHeader from './components/MainHeader'
import Searchbar from './components/Searchbar'
import Bookshelf from './components/Bookshelf'

const shelfs = [
  { name: 'wantToRead', title: 'Want To Read' },
  { name: 'currentlyReading', title: 'Currently Reading' },
  { name: 'read', title: 'Read' },  
]

export class App extends Component {
  state = {
    books: [],
    searchResults: [],
    fetchingBooks: false,
  }

  componentWillMount = () => {
    BooksAPI.getAll()
    .then(books => this.setState({ books }, () => {
      console.log(books)
    }))
  }
  
  searchBooks = (query) => {
    this.setState({ fetchingBooks: true })
    BooksAPI.search(query)
      .then(searchResults => {
        this.setState({ searchResults }) 
      })
      .then(() => {
        this.setState({ fetchingBooks: false })
      })
      .then(() => this.props.history.push('/search'))
  }

  render() {
    const { books, fetchingBooks } = this.state

    return (
        <div className="app">
          <MainHeader />
          <Searchbar searchBooks={this.searchBooks} />
          { fetchingBooks && <h2>Fetching Books</h2> }
          <Switch>
            <Route exact path="/" render={() => 
              <BookshelfsList books={books} shelfs={shelfs} />}
            />
            <Route path="/search" render={() => (
              <Bookshelf
                title="Search Results"
                name="searchResults"
                books={this.state.searchResults}
              />)} 
            />
          </Switch>
        </div>
    )
  }
}

export default App
