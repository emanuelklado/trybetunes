import React, { Component } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.handleUserName();
  }

  handleUserName = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <>
        <Loading propLoading={ loading } />
        <header className="container-header" data-testid="header-component">
          <h1>Cabeçalho</h1>
          <p data-testid="header-user-name">
            {' '}
            {`Bem vindo ${userName}`}
          </p>
        </header>
      </>
    );
  }
}

export default Header;
