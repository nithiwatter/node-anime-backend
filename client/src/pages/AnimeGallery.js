import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import Sort from '../components/Sort';
import Grid from '@material-ui/core/Grid';
import AnimeCard from '../components/AnimeCard';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  main: {
    padding: theme.spacing(1),
  },
});

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
    const { classes } = this.props;
    return (
      <Fragment>
        <Header></Header>
        <Sort sort={this.state.sort} handleSort={this.handleSort}></Sort>
        <Grid className={classes.main} container spacing={2}>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
          <Grid item xs={2}>
            <AnimeCard></AnimeCard>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(animeGallery);
