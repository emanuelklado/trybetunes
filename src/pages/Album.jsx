import React, { Component } from 'react';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      listMusic: [],
      nomeArtist: [],
      nomeCollection: [],

    };
  }

  componentDidMount() {
    this.handleShowMusic();
  }

  handleShowMusic = async () => {
    const { params } = this.props.match;
    console.log(params.id);
    const musicId = params.id;
    const requestMusics = await getMusics(musicId);
    this.setState({
      nomeArtist: requestMusics[0].artistName,
      nomeCollection: requestMusics[0].collectionName,
      listMusic: requestMusics,
    });
  }

  render() {
    const { listMusic, nomeArtist, nomeCollection } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <div>
            <h4 data-testid="artist-name">{ nomeArtist }</h4>
            <p data-testid="album-name">{ nomeCollection }</p>
          </div>
          { listMusic.map((el, index) => (index !== 0
            && <MusicCard key={ index } propTrackName={ el } />
          ))}
        </div>
      </>
    );
  }
}

export default Album;
