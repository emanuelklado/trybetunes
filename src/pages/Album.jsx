import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import './album-style.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listMusic: [],
      imgAlbum: [],
      nomeArtist: [],
      nomeCollection: [],

    };
  }

  componentDidMount() {
    this.handleShowMusic();
  }

  handleShowMusic = async () => {
    const { match } = this.props;
    // console.log(params.id);
    const musicId = match.params.id;
    const requestMusics = await getMusics(musicId);
    this.setState({
      imgAlbum: requestMusics[0].artworkUrl100,
      nomeArtist: requestMusics[0].artistName,
      nomeCollection: requestMusics[0].collectionName,
      listMusic: requestMusics,
    });
  }

  render() {
    const { imgAlbum, listMusic, nomeArtist, nomeCollection } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <div className="album-container">
            <img src={ imgAlbum } alt={ nomeCollection } />
            <h4 data-testid="artist-name">{ nomeArtist }</h4>
            <p data-testid="album-name">{ nomeCollection }</p>
          </div>
          <div className="musics-container">
            { listMusic.map((el, index) => (index !== 0
            && <MusicCard
              key={ index }
              propOnClick={ () => {} } // solução proposta por emerson alves, passar uma função vazia para implementar a 12 questão, porém não passa nos testes;
              propTrackName={ el }
            />
            ))}
          </div>

        </div>
      </>
    );
  }
}

Album.propTypes = {
  params: PropTypes.string,
}.isRequired;

export default Album;
