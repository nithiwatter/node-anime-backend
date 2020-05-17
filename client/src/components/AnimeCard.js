import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    position: 'relative',
    border: '1px solid red',
    width: '20px',
  },

  actionArea: {
    margin: 0,
    padding: 0,
    height: '300px',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
  },
  textBG: {
    position: 'absolute',
    width: '100%',
    height: '25%',
    backgroundColor: 'black',
    opacity: '70%',
    zIndex: 1,
    bottom: 0,
  },
  textBox: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    display: 'flex',
    width: '100%',
    height: '25%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 0,
    border: '1px solid blue',
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  text: {
    color: 'white',
    opacity: '100%',
    margin: 0,
  },
  rank: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    margin: theme.spacing(1),
  },
  buttons: {
    boxShadow: 'none',
    marginLeft: 0,
  },
  bottom: {
    display: 'flex',
  },
});

class AnimeCard extends Component {
  render() {
    const { classes, data } = this.props;
    console.log(data);
    return (
      <Card className={classes.root}>
        <Fab size="small" className={classes.rank} color="secondary">
          <Typography variant="h6">{data.rank}</Typography>
        </Fab>
        <CardActionArea className={classes.actionArea}>
          <CardMedia
            className={classes.image}
            component="img"
            alt="Contemplative Reptile"
            height="300"
            image={data.image_url}
            title="Contemplative Reptile"
          />
          <div className={classes.textBG}></div>
          <CardContent className={classes.textBox}>
            {/* <Typography className={classes.text} variant="h6" component="h1">
              {data.name}
            </Typography> */}

            <Typography
              noWrap
              style={{
                height: 'auto',
                width: '90%',
                // border: '1px solid red',
              }}
              className={classes.text}
              variant="subtitle1"
            >
              {data.name}
            </Typography>

            <Typography
              style={
                {
                  // border: '1px solid red',
                }
              }
              className={classes.text}
              variant="h5"
            >
              {data.ratingsAverage}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.bottom}>
          <Button style={{ flexGrow: 1 }} size="small" color="primary">
            Learn More
          </Button>
          <Fab className={classes.buttons} size="small" color="primary">
            <FavoriteIcon />
          </Fab>
          <Fab className={classes.buttons} size="small" color="primary">
            <EditIcon />
          </Fab>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(AnimeCard);
