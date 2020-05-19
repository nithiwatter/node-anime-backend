import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

const styles = (theme) => ({
  header: {
    background: theme.palette.primary.main,
    padding: 0,
  },
  headerMargin: {
    ...theme.mixins.toolbar,
  },
  title: {
    marginLeft: theme.spacing(1),
    color: 'white',
    fontWeight: 300,
    [theme.breakpoints.down('md')]: {
      ...theme.typography.h6,
      fontWeight: 300,
      marginLeft: theme.spacing(2),
    },
  },
  tabs: {
    marginLeft: 'auto',
    marginRight: theme.spacing(4),
    color: 'white',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  buttons: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  select: {
    marginRight: theme.spacing(4),
    color: 'white',
    minWidth: '100px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  burger: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    marginLeft: 'auto',
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { tabValue: 0, selectValue: 'Ratings', drawerValue: false };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
  }

  componentDidMount() {
    // Refresh active tabs fixes
    const path = window.location.pathname;

    switch (path) {
      case '/':
        if (this.state.tabValue !== 0) this.setState({ tabValue: 0 });
        break;
      case '/addAnime':
        if (this.state.tabValue !== 1) this.setState({ tabValue: 1 });
        break;
      case '/favorites':
        if (this.state.tabValue !== 2) this.setState({ tabValue: 2 });
        break;
      case '/register':
        this.setState({ tabValue: false });
        break;
      case '/login':
        this.setState({ tabValue: false });
        break;
      default:
        break;
    }
  }

  handleTabChange(e, newValue) {
    if (newValue === -1) {
      this.setState({ tabValue: false });
      return;
    }
    this.setState({ tabValue: newValue });
  }

  handleSelectChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  handleDrawer(e, newValue) {
    this.setState({ drawerValue: newValue });
  }

  render() {
    const { classes, theme } = this.props;
    const { tabValue, selectValue, drawerValue } = this.state;

    return (
      <React.Fragment>
        <AppBar>
          <Toolbar className={classes.header}>
            <IconButton className={classes.icon}>
              <VerticalSplitIcon></VerticalSplitIcon>
            </IconButton>
            <Typography className={classes.title} variant="h5">
              Node Anime Backend
            </Typography>
            <IconButton
              className={classes.burger}
              onClick={(e) => this.handleDrawer(e, true)}
            >
              <MenuIcon></MenuIcon>
            </IconButton>
            <Drawer
              open={drawerValue}
              onClose={(e) => this.handleDrawer(e, false)}
            >
              Hello
            </Drawer>
            <React.Fragment>
              <Tabs
                className={classes.tabs}
                value={tabValue}
                onChange={this.handleTabChange}
                indicatorColor="primary"
              >
                <Tab label="Animes" component={Link} to="/" />
                <Tab label="Add More" component={Link} to="/addAnime" />
                <Tab label="Favorites" component={Link} to="/favorites" />
              </Tabs>

              <Select
                value={selectValue}
                onChange={this.handleSelectChange}
                className={classes.select}
                disableUnderline
              >
                <MenuItem value={'Ratings'}>Ratings</MenuItem>
                <MenuItem value={'Year'}>Year</MenuItem>
                <MenuItem value={'Episodes'}>Episodes</MenuItem>
                <MenuItem value={'Studio'}>Studio</MenuItem>
              </Select>

              <Button
                className={classes.buttons}
                variant="contained"
                color="secondary"
                onClick={(e) => this.handleTabChange(e, -1)}
                component={Link}
                to="/register"
                disableElevation
              >
                Register
              </Button>
              <Button
                className={classes.buttons}
                variant="contained"
                color="secondary"
                onClick={(e) => this.handleTabChange(e, -1)}
                component={Link}
                to="/login"
                disableElevation
              >
                Log In
              </Button>
            </React.Fragment>
          </Toolbar>
        </AppBar>
        <div className={classes.headerMargin}></div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
