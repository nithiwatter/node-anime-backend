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

const data = {
  anime: {
    episodes: 25,
    studio: 'J.C.Staff',
    synopsis:
      "Onto their third serialization, manga duo Moritaka Mashiro and Akito Takagi—also known by their pen name, Muto Ashirogi—are ever closer to their dream of an anime adaption. However, the real challenge is only just beginning: if they are unable to compete with the artist Eiji Niizuma in the rankings within the span of six months, they will be canceled. To top it off, numerous rivals are close behind and declaring war. They don't even have enough time to spare thinking about an anime! In Bakuman. 3rd Season, Muto Ashirogi must find a way to stay atop the colossal mountain known as the Shounen Jack rankings. With new problems and new assistants, the pair continue to strive for their dream. [Written by MAL Rewrite]",
    createdAt: '2020-05-16T14:52:07.839Z',
    _id: '5ebffe1711e9fc463cad5647',
    name: 'Bakuman. 3rd Season',
    rank: 61,
    ratingsAverage: 8.62,
    mal_id: 12365,
    year: 2013,
    image_url: './images/12365.jpg',
    slug: 'bakuman.-3rd-season',
    __v: 0,
    reviews: [],
  },
};

const styles = (theme) => ({
  animeCard: {
    position: 'relative',
    border: '1px solid red',
    margin: theme.spacing(2),
    height: '350px',
  },
  root: {
    position: 'relative',
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
    justifyContent: 'space-between',
    alignItems: 'baseline',
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
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardActionArea className={classes.actionArea}>
          <Fab
            size="small"
            className={classes.rank}
            color="secondary"
            aria-label="add"
          >
            <Typography variant="h6">1</Typography>
          </Fab>
          <CardMedia
            className={classes.image}
            component="img"
            alt="Contemplative Reptile"
            height="300"
            image="./918.jpg"
            title="Contemplative Reptile"
          />
          <div className={classes.textBG}></div>
          <CardContent className={classes.textBox}>
            <Typography className={classes.text} variant="h4" component="h1">
              Gintama
            </Typography>
            <Typography className={classes.text} variant="h5" component="h2">
              9.12
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
