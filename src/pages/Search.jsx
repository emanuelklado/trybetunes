import React, { Component } from 'react';
import Header from './components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      searchName: '',
    };
  }

  onInputSearch = ({ target: { name, value, type, checked } }) => {
    const valor = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: valor,
    }, () => this.validation());
  }

  handleClickSearch = () => {
  // pesquisa via API
  }

  validation = () => {
    const MAX = 2;
    const { searchName } = this.state;
    if (searchName.length >= MAX) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { searchName, isDisabled } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p> Search </p>
          <form>
            <input
              id="searchName"
              value={ searchName }
              name="searchName"
              type="text"
              data-testid="search-artist-input"
              placeholder="Album ou Artista"
              onChange={ this.onInputSearch }
            />
            <button
              onClick={ this.handleClickSearch }
              disabled={ isDisabled }
              data-testid="search-artist-button"
              type="submit"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
