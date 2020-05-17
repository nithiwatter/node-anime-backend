import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  sortBox: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  paper: {
    paddingTop: theme.spacing(1),
  },
  text: {
    marginLeft: theme.spacing(1),
  },
});

class Sort extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const {
      ratings,
      ratingsDesc,
      year,
      yearDesc,
      studio,
      studioDesc,
      episodes,
      episodesDesc,
    } = this.props.sort;

    return (
      <div>
        <Paper className={classes.paper}>
          <Grid className={classes.root} container spacing={1}>
            <Grid item xs={3} className={classes.sortBox}>
              <Checkbox
                checked={ratings}
                onChange={() => this.props.handleSort('ratings')}
              />
              <Typography variant="h6" className={classes.text}>
                Ratings
              </Typography>
              {ratingsDesc ? (
                <KeyboardArrowDownIcon
                  className={classes.icon}
                  onClick={() => this.props.handleSort('ratingsDesc')}
                ></KeyboardArrowDownIcon>
              ) : (
                <KeyboardArrowUpIcon
                  className={classes.icon}
                  onClick={() => this.props.handleSort('ratingsDesc')}
                ></KeyboardArrowUpIcon>
              )}
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item xs={3} className={classes.sortBox}>
              <Checkbox
                checked={year}
                onChange={() => this.props.handleSort('year')}
              />
              <Typography variant="h6" className={classes.text}>
                Year
              </Typography>
              {yearDesc ? (
                <KeyboardArrowDownIcon
                  className={classes.icon}
                  onClick={() => this.props.handleSort('yearDesc')}
                ></KeyboardArrowDownIcon>
              ) : (
                <KeyboardArrowUpIcon
                  className={classes.icon}
                  onClick={() => this.props.handleSort('yearDesc')}
                ></KeyboardArrowUpIcon>
              )}
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item xs={3} className={classes.sortBox}>
              <Checkbox
                checked={studio}
                onChange={() => this.props.handleSort('studio')}
              />
              <Typography variant="h6" className={classes.text}>
                Studio
              </Typography>
              {studioDesc ? (
                <KeyboardArrowDownIcon
                  className={classes.icon}
                  onClick={() => this.props.handleSort('studioDesc')}
                ></KeyboardArrowDownIcon>
              ) : (
                <KeyboardArrowUpIcon
                  className={classes.icon}
                  onClick={() => this.props.handleSort('studioDesc')}
                ></KeyboardArrowUpIcon>
              )}
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item xs={3} className={classes.sortBox}>
              <Checkbox
                checked={episodes}
                onChange={() => this.props.handleSort('episodes')}
              />
              <Typography variant="h6" className={classes.text}>
                Episodes
              </Typography>
              {episodesDesc ? (
                <KeyboardArrowDownIcon
                  className={classes.icon}
                  onClick={() => this.props.handleSort('episodesDesc')}
                ></KeyboardArrowDownIcon>
              ) : (
                <KeyboardArrowUpIcon
                  className={classes.icon}
                  onClick={() => this.props.handleSort('episodesDesc')}
                ></KeyboardArrowUpIcon>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Sort);
