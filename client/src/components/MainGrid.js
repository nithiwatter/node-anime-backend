import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import AnimeCard from './AnimeCard';

const styles = (theme) => ({
  root: {
    overflowX: 'hidden',
  },
  grid: {
    justifyContent: 'space-between',
  },
  box: {
    margin: theme.spacing(2),
  },
});

class MainGrid extends Component {
  state = {};
  render() {
    const { classes, animes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container spacing={0}>
          {animes.map((anime) => (
            <Grid className={classes.box} item xs={2} key={anime._id}>
              <AnimeCard data={anime}></AnimeCard>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MainGrid);
