import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import AnimeGallery from './pages/AnimeGallery';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline></CssBaseline>
        <AnimeGallery></AnimeGallery>
      </div>
    );
  }
}

export default App;
