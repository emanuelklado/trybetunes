import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './components/Header';
import MusicCard from './MusicCard';
import './favorites-style.css';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.handlePageFavorites();
  }

  updateFavorites = () => {
    this.handlePageFavorites();
  }

  handlePageFavorites = async () => {
    // this.setState({ loading: true });
    const songs = await getFavoriteSongs();
    this.setState({ favorites: songs });
  }

  render() {
    const { favorites } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <p> Favorites </p>
          {favorites.map((el) => (<MusicCard
            propOnClick={ () => this.updateFavorites() }
            key={ el.trackId }
            propTrackName={ el }
          />))}
          {/* // mudar função // */}
        </div>
      </>
    );
  }
}

export default Favorites;
