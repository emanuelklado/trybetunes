import React, { Component } from 'react';

class MusicCard extends Component {
    state = { }

    render() {
      const { propTrackName } = this.props;
      return (
        <div>
          <p>{propTrackName.trackName}</p>
          <audio data-testid="audio-component" src={ propTrackName.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
      );
    }
}

export default MusicCard;
