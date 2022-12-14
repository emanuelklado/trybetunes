import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import './header-style.css';
import logo from '../../images/logofinal.png';

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
      <header className="container-header" data-testid="header-component">
        <img className="logo" src={ logo } alt="logo" />
        <nav>
          <Link data-testid="link-to-search" to="/search">Busca</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Musicas Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
        <section className="loading-header-container">
          <p data-testid="header-user-name">
            {`Bem vindo ${userName}`}
          </p>
          <Loading propLoading={ loading } />
        </section>
      </header>
    );
  }
}

export default Header;
