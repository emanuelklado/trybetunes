import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Loading extends Component {
  render() {
    const { propLoading } = this.props;
    if (propLoading) {
      return <h1>Carregando...</h1>;
    }
    return '';
  }
}

export default Loading;
