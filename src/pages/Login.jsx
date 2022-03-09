import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import './login-style.css';
import PropTypes from 'prop-types';
import logo from '../images/logofinal.png';

class Login extends Component {
  render() {
    const {
      propHandleClick,
      propOnChange,
      isDisabled,
      login,
      isRedirect } = this.props;

    return (
      <Fragment>
        <img className="logo-login" src={ logo } alt="logo" />
        <div data-testid="page-login">
          <section className="login-section-titles">
            <h1> Login </h1>
            <h5>Digite seu nome de usuário e senha.</h5>
          </section>

          <form className="form">
            <label htmlFor="login">
              <input
                id="login"
                name="login"
                value={ login }
                onChange={ propOnChange }
                data-testid="login-name-input"
                type="text"
                placeholder="usuário"
              />
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="senha"
            />
            <button
              className="myButton"
              disabled={ isDisabled }
              type="submit"
              data-testid="login-submit-button"
              onClick={ propHandleClick }
            >
              Entrar
            </button>

            { isRedirect && <Redirect to="/search" /> }
          </form>
        </div>
      </Fragment>
    );
  }
}

Login.propTypes = {
  propHandleClick: PropTypes.func,
  propOnChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  login: PropTypes.bool,
  isRedirect: PropTypes.bool,
}.isRequired;

export default Login;
