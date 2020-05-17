import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import Sort from '../components/Sort';

class animeGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3],
      sort: {
        ratings: true,
        ratingsDesc: true,
        year: false,
        yearDesc: true,
        studio: false,
        studioDesc: true,
        episodes: false,
        episodesDesc: true,
      },
    };
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(sortParameter) {
    this.setState((prevState) => {
      const newSort = {
        sort: {
          ...prevState.sort,
        },
      };
      newSort.sort[sortParameter] = !prevState.sort[sortParameter];
      return newSort;
    });
  }

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <Header></Header>
        <Sort sort={this.state.sort} handleSort={this.handleSort}></Sort>
      </Fragment>
    );
  }
}

export default animeGallery;
