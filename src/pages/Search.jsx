import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import './search-style.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      searchName: '',
      loading: false,
      data: [],
      showMsg: '',

    };
  }

  onInputSearch = ({ target: { name, value, type, checked } }) => {
    const valor = type === 'checkbox' ? checked : value;
    this.setState(
      {
        [name]: valor,
      },
      () => this.validation(),
    );
  };

  handleClickSearch = async (event) => {
    event.preventDefault();
    const { searchName } = this.state;
    this.setState({
      loading: true,
    });
    const result = await searchAlbumsAPI(searchName);
    this.setState({
      loading: false,
      data: result,
    }, () => this.showMensenger());
  };

  showMensenger = () => {
    const { data, searchName } = this.state;
    if (data.length <= 0) {
      this.setState({
        showMsg: 'Nenhum álbum foi encontrado',
      });
    } else {
      this.setState({
        showMsg: `Resultado de álbuns de: ${searchName}`,
        searchName: '',
      });
    }
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
  };

  render() {
    const { data, searchName, isDisabled, loading, showMsg } = this.state;
    return (
      <>
        <Header />
        {loading ? (
          <Loading propLoading={ loading } />
        ) : (
          <div data-testid="page-search">
            <section className="search-content">
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
                  onClick={ (event) => this.handleClickSearch(event) }
                  disabled={ isDisabled }
                  data-testid="search-artist-button"
                  type="submit"
                >
                  Pesquisar
                </button>
              </form>
              <h3>{showMsg}</h3>
            </section>
            <section className="albuns-container">
              {data.map((item) => (
                <Link
                  to={ `/album/${item.collectionId}` }
                  key={ item.collectionId }
                  data-testid={ `link-to-album-${item.collectionId}` }
                >
                  <div className="card-album-container">
                    <img src={ item.artworkUrl100 } alt={ item.collectionName } />
                    <h4>{item.collectionName}</h4>
                  </div>
                </Link>
              ))}
            </section>
          </div>
        )}
      </>
    );
  }
}

export default Search;
