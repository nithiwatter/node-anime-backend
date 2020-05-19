import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';
import Header from './components/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <BrowserRouter>
          <div className="App">
            <Header></Header>
            <Switch>
              <Route exact path="/" component={() => <div>Main</div>}></Route>
              <Route
                exact
                path="/addAnime"
                component={() => <div>Add Anime</div>}
              ></Route>
              <Route
                exact
                path="/login"
                component={() => <div>Log In</div>}
              ></Route>
              <Route
                exact
                path="/register"
                component={() => <div>Register</div>}
              ></Route>
              <Route
                exact
                path="/favorites"
                component={() => <div>Favorites</div>}
              ></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
