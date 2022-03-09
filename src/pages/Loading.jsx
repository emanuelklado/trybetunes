import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
  render() {
    const { propLoading } = this.props;
    if (propLoading) {
      return <h3 className="loading-text">Carregando...</h3>;
    }
    return '';
  }
}
Loading.propTypes = {
  propLoading: PropTypes.bool,
}.isRequired;
export default Loading;
