import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  sortBox: {
    display: 'flex',
    border: '1px solid black',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
});

class Sort extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { ratings, ratingsDesc } = this.props.sort;

    return (
      <div className={classes.root}>
        <Grid container spaciing={2}>
          <Grid item xs={3} className={classes.sortBox}>
            <Checkbox onChange={() => this.props.handleSort('ratings')} />
            <Typography variant="h6">Ratings</Typography>
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Sort);
