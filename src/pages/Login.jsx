import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
