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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MovieIcon from '@material-ui/icons/Movie';
import PlaceIcon from '@material-ui/icons/Place';

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
  tab: {
    textTransform: 'none',
  },
  buttons: {
    marginRight: theme.spacing(2),
    textTransform: 'none',
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
  list: {
    width: '200px',
  },
  sort: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  register: {
    backgroundColor: theme.palette.primary.light,
    color: 'white',
  },
  login: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  sortMQ: {
    '&:hover': { backgroundColor: theme.palette.secondary.dark },
  },
  registerMQ: {
    '&:hover': { backgroundColor: theme.palette.primary.dark },
  },
  loginMQ: {
    '&:hover': { backgroundColor: theme.palette.primary.dark },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      selectValue: 'Ratings',
      drawerValue: false,
      sortDrawerValue: false,
      sortSelectValue: 0,
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
    this.handleSortDrawer = this.handleSortDrawer.bind(this);
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

  handleSortDrawer() {
    this.setState({ sortDrawerValue: !this.state.sortDrawerValue });
  }

  handleSortChange(e, newValue) {
    this.setState({ sortSelectValue: newValue });
  }
  render() {
    const { classes, theme } = this.props;
    const {
      tabValue,
      selectValue,
      drawerValue,
      sortDrawerValue,
      sortSelectValue,
    } = this.state;

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
              <List disablePadding className={classes.list}>
                <ListItem
                  divider
                  className={classes.sort}
                  classes={{ button: classes.sortMQ }}
                  button
                  onClick={this.handleSortDrawer}
                >
                  <ListItemText primary="Sort"></ListItemText>
                  {sortDrawerValue ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={sortDrawerValue} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      divider
                      className={classes.nested}
                      selected={sortSelectValue === 0}
                      onClick={(e) => {
                        this.handleSortChange(e, 0);
                        this.handleDrawer(e, false);
                      }}
                    >
                      <ListItemIcon>
                        <ThumbUpIcon></ThumbUpIcon>
                      </ListItemIcon>
                      <ListItemText primary="Ratings" />
                    </ListItem>
                    <ListItem
                      button
                      divider
                      className={classes.nested}
                      selected={sortSelectValue === 1}
                      onClick={(e) => {
                        this.handleSortChange(e, 1);
                        this.handleDrawer(e, false);
                      }}
                    >
                      <ListItemIcon>
                        <ScheduleIcon></ScheduleIcon>
                      </ListItemIcon>
                      <ListItemText primary="Year" />
                    </ListItem>
                    <ListItem
                      button
                      divider
                      className={classes.nested}
                      selected={sortSelectValue === 2}
                      onClick={(e) => {
                        this.handleSortChange(e, 2);
                        this.handleDrawer(e, false);
                      }}
                    >
                      <ListItemIcon>
                        <MovieIcon></MovieIcon>
                      </ListItemIcon>
                      <ListItemText primary="Episodes" />
                    </ListItem>
                    <ListItem
                      button
                      divider
                      className={classes.nested}
                      selected={sortSelectValue === 3}
                      onClick={(e) => {
                        this.handleSortChange(e, 3);
                        this.handleDrawer(e, false);
                      }}
                    >
                      <ListItemIcon>
                        <PlaceIcon></PlaceIcon>
                      </ListItemIcon>
                      <ListItemText primary="Studio" />
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem
                  divider
                  button
                  component={Link}
                  to="/"
                  onClick={(e) => {
                    this.handleDrawer(e, false);
                    this.handleTabChange(e, 0);
                  }}
                  selected={tabValue === 0}
                >
                  <ListItemText>Animes</ListItemText>
                </ListItem>
                <ListItem
                  divider
                  button
                  component={Link}
                  to="/addAnime"
                  onClick={(e) => {
                    this.handleDrawer(e, false);
                    this.handleTabChange(e, 1);
                  }}
                  selected={tabValue === 1}
                >
                  <ListItemText primary="Add More"></ListItemText>
                </ListItem>
                <ListItem
                  divider
                  button
                  component={Link}
                  to="/favorites"
                  onClick={(e) => {
                    this.handleDrawer(e, false);
                    this.handleTabChange(e, 2);
                  }}
                  selected={tabValue === 2}
                >
                  <ListItemText primary="Favorites"></ListItemText>
                </ListItem>
                <ListItem
                  className={classes.register}
                  classes={{ button: classes.registerMQ }}
                  divider
                  button
                  component={Link}
                  to="/register"
                  onClick={(e) => {
                    this.handleDrawer(e, false);
                    this.handleTabChange(e, false);
                  }}
                >
                  <ListItemText primary="Register"></ListItemText>
                </ListItem>
                <ListItem
                  className={classes.login}
                  classes={{ button: classes.loginMQ }}
                  divider
                  button
                  component={Link}
                  to="/login"
                  onClick={(e) => {
                    this.handleDrawer(e, false);
                    this.handleTabChange(e, -1);
                  }}
                >
                  <ListItemText primary="Login"></ListItemText>
                </ListItem>
              </List>
            </Drawer>
            <React.Fragment>
              <Tabs
                className={classes.tabs}
                value={tabValue}
                onChange={this.handleTabChange}
                indicatorColor="primary"
              >
                <Tab
                  label="Animes"
                  className={classes.tab}
                  component={Link}
                  to="/"
                />
                <Tab
                  label="Add More"
                  className={classes.tab}
                  component={Link}
                  to="/addAnime"
                />
                <Tab
                  label="Favorites"
                  className={classes.tab}
                  component={Link}
                  to="/favorites"
                />
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
