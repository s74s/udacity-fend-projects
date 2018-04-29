import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import BookshelfsList from './components/BookshelfsList'
import MainHeader from './components/MainHeader'
import SearchPage from './components/SearchPage'
import NavButton from './components/NavButton'

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
    .then(books => this.setState({ books }))
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

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll())
      .then((books) => {
        this.setState({ books });
      });
  }

  render() {
    const { books, fetchingBooks } = this.state

    return (
        <div className="app">
          <MainHeader />
          <NavButton location={this.props.location} />
          <Switch>
            <Route exact path="/" render={() => 
              <BookshelfsList
              books={books}
              shelfs={shelfs}
              changeBookShelf={this.handleShelfChange}
              />}
            />
            <Route path="/search" render={() => (
              <SearchPage
                searchBooks={this.searchBooks}
                isFetching={fetchingBooks}
                searchResults={this.state.searchResults}
                handleShelfChange={this.handleShelfChange}
              />)} 
            />
          </Switch>
        </div>
    )
  }
}

export default App
