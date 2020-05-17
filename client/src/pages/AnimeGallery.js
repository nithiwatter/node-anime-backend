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
      },
    };
    this.handleSort = this.handleSort.bind(this);
    this.handleJ = this.handleJ.bind(this);
  }

  handleJ() {
    console.log(1);
    this.setState({});
  }

  handleSort(sortParameter) {
    console.log(sortParameter);

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
        <Sort
          sort={this.state.sort}
          handleSort={this.handleSort}
          handleJ={this.handleJ}
        ></Sort>
      </Fragment>
    );
  }
}

export default animeGallery;
