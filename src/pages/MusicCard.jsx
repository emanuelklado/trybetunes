import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// import { removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      loading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { propTrackName } = this.props;
    const { checked } = target;
    return (checked)
      && this.handleAddFavoritesSongs(propTrackName);
    //   : this.removeSong(propTrackName);
  }

  //   handleRemoveFavoritesSongs = async () => {
  //     this.setState({
  //         loading: true,
  //     })}
  //     const requestRemoveSongs = await removeSong();
  //     this.setState({
  //         loading: false,
  //     })
  //   }

  handleAddFavoritesSongs = async (song) => {
    this.setState({
      loading: true,
    });
    const requestFavorites = await addSong(song);
    console.log('entrei aqui');
    this.setState({
      loading: false,
      isChecked: true,
    });
  }

  render() {
    const { propTrackName } = this.props;
    const { loading, isChecked } = this.state;
    return (

      <div>
        { loading ? (<Loading propLoading={ loading } />) : (
          <div>
            <p>{propTrackName.trackName}</p>
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
            <label htmlFor="check">
              {' '}
              <input
                onChange={ this.onInputChange }
                data-testid={ `checkbox-music-${propTrackName.trackId}` }
                type="checkbox"
                name=""
                id="check"
                checked={ isChecked }
              />
              {' '}
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default MusicCard;
