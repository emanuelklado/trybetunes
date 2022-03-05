import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profiles';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';
import Loading from './pages/Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      login: '',
      loading: false,
      isRedirect: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.validation = this.validation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    event.preventDefault();
    const { login } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: login });
    this.setState({
      loading: false,
      isRedirect: true,
    });
  }

  onInputChange({ target: { name, value, type, checked } }) {
    const valor = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: valor,
    }, () => this.validation());
  }

  validation() {
    const MAX = 3;
    const { login } = this.state;
    if (login.length >= MAX) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (<Login
                propOnChange={ this.onInputChange }
                propHandleClick={ (event) => this.handleClick(event) }
                { ...props }
                { ...this.state }
              />) }
            />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="*" component={ NotFound } />
          </Switch>

        </BrowserRouter>
        <Loading propLoading={ loading } />
      </Fragment>
    );
  }
}

export default App;
