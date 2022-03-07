import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './login-style.css';

class Login extends Component {
  render() {
    const {
      propHandleClick,
      propOnChange,
      isDisabled,
      login,
      isRedirect } = this.props;

    return (
      <div data-testid="page-login">
        <section className="login-section-titles">
          <h1> Login </h1>
          <h4>Digite seu nome de usuário</h4>
        </section>

        <form>
          <label htmlFor="login">
            <input
              id="login"
              name="login"
              value={ login }
              onChange={ propOnChange }
              data-testid="login-name-input"
              type="text"
            />
          </label>
          <button
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

    );
  }
}

export default Login;
