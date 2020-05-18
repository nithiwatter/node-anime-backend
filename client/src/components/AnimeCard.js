import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  actionArea: {
    height: '300px',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  textArea: {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '90%',
    height: '20%',
    color: 'white',
    zIndex: 2,
  },

  learnMore: {
    marginLeft: 'auto',
  },
  rank: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    zIndex: 2,
  },
  backdrop: {
    width: '100%',
    height: '30%',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
    margin: 0,
    opacity: '50%',
  },
});

class AnimeCard extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Card className={classes.root}>
        <CardActionArea className={classes.actionArea}>
          <Avatar className={classes.rank}>{data.rank}</Avatar>
          <CardMedia
            className={classes.image}
            component="img"
            image={data.image_url}
          />
          <CardContent>
            <div className={classes.backdrop}></div>
            <div className={classes.textArea}>
              <Typography
                noWrap
                variant="h6"
                align="left"
                style={{ width: '100%' }}
              >
                {data.name}
              </Typography>
              <Grid
                container
                spacing={0}
                justify="space-between"
                style={{ marginTop: '4px' }}
              >
                <Typography variant="body1" align="left">
                  {data.ratingsAverage}
                </Typography>
                <Typography variant="body1" align="right">
                  {data.studio}
                </Typography>
              </Grid>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          disableSpacing
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '60px',
          }}
        >
          <IconButton>
            <FavoriteIcon></FavoriteIcon>
          </IconButton>
          <IconButton>
            <EditIcon></EditIcon>
          </IconButton>
          <Button className={classes.learnMore} size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(AnimeCard);
