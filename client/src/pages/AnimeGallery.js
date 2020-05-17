import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import Sort from '../components/Sort';
import Grid from '@material-ui/core/Grid';
import AnimeCard from '../components/AnimeCard';
import { withStyles } from '@material-ui/core/styles';

let data = {
  animes: [
    {
      episodes: 11,
      studio: 'Shuka',
      synopsis:
        'Takashi Natsume has grown accustomed to his encounters with youkai through the Book of Friends, which contains the names of youkai whom his grandmother, Reiko Natsume, has sealed in contracts. These encounters allow Natsume to better understand the youkai, Reiko, and himself. The Book of Friends is a powerful tool that can be used to control youkai; it is sought after by both youkai and exorcists alike. Natsume just wants to live out his daily life in peace but is constantly disrupted by these experiences. If he is to end this torment, Natsume must explore more about the book and the world of exorcism, as well as begin to open his heart to those who can help him. [Written by MAL Rewrite]',
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad563d',
      name: 'Natsume Yuujinchou Roku',
      rank: 51,
      ratingsAverage: 8.68,
      mal_id: 34591,
      year: 2017,
      image_url: './images/34591.jpg',
      slug: 'natsume-yuujinchou-roku',
    },
    {
      episodes: 12,
      studio: 'CloverWorks',
      synopsis:
        'Surrounded by a forest and a gated entrance, the Grace Field House is inhabited by orphans happily living together as one big family, looked after by their "Mama," Isabella. Although they are required to take tests daily, the children are free to spend their time as they see fit, usually playing outside, as long as they do not venture too far from the orphanage—a rule they are expected to follow no matter what. However, all good times must come to an end, as every few months, a child is adopted and sent to live with their new family... never to be heard from again. However, the three oldest siblings have their suspicions about what is actually happening at the orphanage, and they are about to discover the cruel fate that awaits the children living at Grace Field, including the twisted nature of their beloved Mama. [Written by MAL Rewrite]',
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad563e',
      name: 'Yakusoku no Neverland',
      rank: 52,
      ratingsAverage: 8.68,
      mal_id: 37779,
      year: 2019,
      image_url: './images/37779.jpg',
      slug: 'yakusoku-no-neverland',
    },
    {
      episodes: 47,
      studio: 'Tokyo Movie Shinsha',
      synopsis:
        'Yabuki Joe is left downhearted and hopeless after a certain tragic event. In attempt to put the past behind him, Joe leaves the gym behind and begins wandering. On his travels he comes across the likes of Wolf Kanagushi and Goromaki Gondo, men who unintentionally fan the dying embers inside him, leading him to putting his wanderings to an end. His return home puts Joe back on the path to boxing, but unknown to himself and his trainer, he now suffers deep-set issues holding him back from fighting. In attempt to quell those issues, Carlos Rivera, a world renowned boxer is invited from Venezuela to help Joe recover.',
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad563f',
      name: 'Ashita no Joe 2',
      rank: 53,
      ratingsAverage: 8.66,
      mal_id: 2921,
      year: 1981,
      image_url: './images/2921.jpg',
      slug: 'ashita-no-joe-2',
    },
    {
      episodes: 1,
      studio: 'ufotable',
      synopsis:
        "The Fifth Holy Grail War continues, and the ensuing chaos results in higher stakes for all participants. Shirou Emiya continues to participate in the war, aspiring to be a hero of justice who saves everyone. He sets out in search of the truth behind a mysterious dark shadow and its murder spree, determined to defeat it. Meanwhile, Shinji Matou sets his own plans into motion, threatening Shirou through his sister Sakura Matou. Shirou and Rin Toosaka battle Shinji, hoping to relieve Sakura from the abuses of her brother. But the ugly truth of the Matou siblings begins to surface, and many dark secrets are exposed. Fate/stay night Movie: Heaven's Feel - II. Lost Butterfly continues to focus on the remaining Masters and Servants as they fight each other in the hopes of obtaining the Holy Grail. However, as darkness arises within Fuyuki City, even the state of their sacred war could be in danger. [Written by MAL Rewrite]",
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad5640',
      name: "Fate/stay night Movie: Heaven's Feel - II. Lost Butterfly",
      rank: 54,
      ratingsAverage: 8.66,
      mal_id: 33049,
      year: 2019,
      image_url: './images/33049.jpg',
      slug: "fatestay-night-movie:-heaven's-feel-ii.-lost-butterfly",
    },
    {
      episodes: 1,
      studio: 'Artland',
      synopsis:
        'On a warm summer day, a boy heard the sound of bells ringing, as if in celebration, in the mountain near his home. Several years later in that same mountain, the mushishi Ginko encounters a strange girl with weeds growing out of her body. Soon after, Ginko coincidentally runs into the now grown-up boy Yoshiro on his way off the mountain. With Yoshiro’s help, Ginko soon begins to uncover who this mysterious girl is and what happened to her. An adaptation of the last arc in the manga, Mushishi Zoku Shou: Suzu no Shizuku follows Ginko’s peculiar journey amidst the occult to unravel the mystery behind the enigmatic girl called Kaya and the mountain that has become her home. [Written by MAL Rewrite]',
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad5641',
      name: 'Mushishi Zoku Shou: Suzu no Shizuku',
      rank: 55,
      ratingsAverage: 8.66,
      mal_id: 28957,
      year: 2015,
      image_url: './images/28957.jpg',
      slug: 'mushishi-zoku-shou:-suzu-no-shizuku',
    },
    {
      episodes: 12,
      studio: 'Madhouse',
      synopsis:
        "The seemingly ordinary and unimpressive Saitama has a rather unique hobby: being a hero. In order to pursue his childhood dream, he trained relentlessly for three years—and lost all of his hair in the process. Now, Saitama is incredibly powerful, so much so that no enemy is able to defeat him in battle. In fact, all it takes to defeat evildoers with just one punch has led to an unexpected problem—he is no longer able to enjoy the thrill of battling and has become quite bored. This all changes with the arrival of Genos, a 19-year-old cyborg, who wishes to be Saitama's disciple after seeing what he is capable of. Genos proposes that the two join the Hero Association in order to become certified heroes that will be recognized for their positive contributions to society, and Saitama, shocked that no one knows who he is, quickly agrees. And thus begins the story of One Punch Man, an action-comedy that follows an eccentric individual who longs to fight strong enemies that can hopefully give him the excitement he once felt and just maybe, he'll become popular in the process. [Written by MAL Rewrite]",
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad5642',
      name: 'One Punch Man',
      rank: 56,
      ratingsAverage: 8.66,
      mal_id: 30276,
      year: 2015,
      image_url: './images/30276.jpg',
      slug: 'one-punch-man',
    },
    {
      episodes: 1,
      studio: 'Shaft',
      synopsis:
        "No longer truly human, Koyomi Araragi decides to retrieve Kiss-shot Acerola-orion Heart-under-blade's severed body parts that were stolen by three powerful vampire hunters. Awaiting him are Dramaturgie, a vampire hunter who is a vampire himself; Episode, a half-vampire with the ability to transform into mist; and Guillotinecutter, a human priest who is the most dangerous of them all. Unbeknownst to Araragi, each minute he spends trying to retrieve Kiss-shot's limbs makes him less of a human and more of a vampire. Will he be able to keep his wish of becoming human once again by the end of his battles? [Written by MAL Rewrite]",
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad5643',
      name: 'Kizumonogatari II: Nekketsu-hen',
      rank: 57,
      ratingsAverage: 8.64,
      mal_id: 31757,
      year: 2016,
      image_url: './images/31757.jpg',
      slug: 'kizumonogatari-ii:-nekketsu-hen',
    },
    {
      episodes: 37,
      studio: 'Madhouse',
      synopsis:
        "A shinigami, as a god of death, can kill any person—provided they see their victim's face and write their victim's name in a notebook called a Death Note. One day, Ryuk, bored by the shinigami lifestyle and interested in seeing how a human would use a Death Note, drops one into the human realm. High school student and prodigy Light Yagami stumbles upon the Death Note and—since he deplores the state of the world—tests the deadly notebook by writing a criminal's name in it. When the criminal dies immediately following his experiment with the Death Note, Light is greatly surprised and quickly recognizes how devastating the power that has fallen into his hands could be. With this divine capability, Light decides to extinguish all criminals in order to build a new world where crime does not exist and people worship him as a god. Police, however, quickly discover that a serial killer is targeting criminals and, consequently, try to apprehend the culprit. To do this, the Japanese investigators count on the assistance of the best detective in the world: a young and eccentric man known only by the name of L. [Written by MAL Rewrite]",
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad5644',
      name: 'Death Note',
      rank: 58,
      ratingsAverage: 8.63,
      mal_id: 1535,
      year: 2007,
      image_url: './images/1535.jpg',
      slug: 'death-note',
    },
    {
      episodes: 1,
      studio: 'J.C.Staff',
      synopsis:
        "It is not strange that the Demon Lord's forces fear the Crimson Demons, the clan from which Megumin and Yunyun originate. Even if the Demon Lord's generals attack their village, the Crimson Demons can just easily brush them off with their supreme mastery of advanced and overpowered magic. When Yunyun receives a seemingly serious letter regarding a potential disaster coming to her hometown, she immediately informs Kazuma Satou and the rest of his party. After a series of wacky misunderstandings, it turns out to be a mere prank by her fellow demon who wants to be an author. Even so, Megumin becomes worried about her family and sets out toward the Crimson Demons' village with the gang. There, Kazuma and the others decide to sightsee the wonders of Megumin's birthplace. However, they soon come to realize that the nonsense threat they received might have been more than just a joke. [Written by MAL Rewrite]",
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad5645',
      name: 'Kono Subarashii Sekai ni Shukufuku wo!: Kurenai Densetsu',
      rank: 59,
      ratingsAverage: 8.63,
      mal_id: 38040,
      year: 2019,
      image_url: './images/38040.jpg',
      slug: 'kono-subarashii-sekai-ni-shukufuku-wo!:-kurenai-densetsu',
    },
    {
      episodes: 11,
      studio: 'Tatsunoko Production',
      synopsis:
        '"The hero comes. The hero comes. The hero comes. Chant these words in your mind, and I\'ll surely come to you..." This mantra is what Makoto Tsukimoto repeats as a source of motivation when he fights through the stress of not only grueling ping pong matches, but also in situations of his life. Makoto doesn\'t fight alone; he and his friend, Yutaka Hoshino, nicknamed Smile and Peco respectively, are two boys who have grown up playing ping pong together nearly every day. Peco, brimming with confidence, aims to be the best table tennis player in the world; Smile, on the other hand, shows little ambition. Nevertheless, the two have always stuck together, with a bond built upon their mutual love for this sport. Every year, students from all across Japan gather for the inter-high table tennis competition to achieve national and international stardom. Through intense training and competition, only the very best persevere. From the avant-garde director of Tatami Galaxy, Masaaki Yuasa, Ping Pong the Animation serves a tale of ambition with its fair share of bumps along the way. Whatever the odds, Peco and Smile will face them together. [Written by MAL Rewrite]',
      createdAt: '2020-05-16T14:52:07.839Z',
      _id: '5ebffe1711e9fc463cad5646',
      name: 'Ping Pong the Animation',
      rank: 60,
      ratingsAverage: 8.63,
      mal_id: 22135,
      year: 2014,
      image_url: './images/22135.jpg',
      slug: 'ping-pong-the-animation',
    },
  ],
};
data = data.animes;

const styles = (theme) => ({});

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
      <div style={{ overflowX: 'hidden' }}>
        <Header></Header>
        <Sort sort={this.state.sort} handleSort={this.handleSort}></Sort>
        <Grid
          style={{ width: '100%' }}
          className={classes.main}
          container
          spacing={1}
        >
          {data.map((anime) => (
            <Grid item xs={2} key={anime._id}>
              <AnimeCard data={anime}></AnimeCard>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(animeGallery);
