import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './musicCard-style.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.favoritesSongs();
  }

  favoritesSongs = async () => {
    this.setState({ loading: true });
    const songs = await getFavoriteSongs();
    this.setState({ loading: false, favorites: songs });
    const { favorites } = this.state;
    const { propTrackName } = this.props;
    const listFavorites = favorites.find((elem) => (
      elem.trackName.includes(propTrackName.trackName)));
    if (listFavorites) {
      this.setState({ isChecked: true });
    }
  }

  handleCheckbox= ({ target }) => {
    const { propTrackName } = this.props;
    const { checked } = target;
    return (checked) ? this.handleAddFavoritesSongs(propTrackName)
      : this.handleRemoveFavoritesSongs(propTrackName);
  }

    handleAddFavoritesSongs = async (song) => {
      this.setState({ loading: true });
      await addSong(song);
      console.log('entrei no ADD');
      this.setState({ loading: false, isChecked: true });
    }

    handleRemoveFavoritesSongs = async (song) => {
      const { propOnClick } = this.props;
      this.setState({ loading: true });
      await removeSong(song);
      propOnClick();
      console.log('entrei na remove');
      this.setState({ loading: false, isChecked: false });
    }

    render() {
      const { propTrackName } = this.props;
      const { loading, isChecked } = this.state;
      return (

        <div className="cantainer-all-musics">

          <div className="music-card-container">
            <div>

              <audio
                data-testid="audio-component"
                src={ propTrackName.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>

            <div className="input-track-container">
              <p>{propTrackName.trackName}</p>
              <input
                // onClick={ propOnClick }
                onChange={ this.handleCheckbox }
                data-testid={ `checkbox-music-${propTrackName.trackId}` }
                type="checkbox"
                checked={ isChecked }
              />
            </div>

          </div>
          {loading && (
            <Loading propLoading={ loading } />
          )}
        </div>
      );
    }
}

MusicCard.propTypes = {
  propTrackName: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  propOnClick: PropTypes.func.isRequired,
};
export default MusicCard;
