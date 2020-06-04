import React from "react";
import { useHistory } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import "../style/Example.scss";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Slider
} from "@material-ui/core";

function Banner(props) {
  const history = useHistory();
  if (props.newProp) console.log(props.newProp);
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems;

  let items = [];
  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid
        item
        xs={12 / totalItems}
        key={item.Name}
        onClick={() => history.push(`/recipe/${item.id}`)}
      >
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography style={{fontFamily: "Noto Serif JP, serif"}} className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
}

function Banner2(props) {
  const history = useHistory();
  return (
    <Card
      raised
      className="Banner"
      onClick={() => history.push(`/recipe/${props.item.id}`)}
    >
      <CardMedia
        className="Media"
        image={props.item.Image}
        title={props.item.Name}
      >
        <Typography style={{fontFamily: "Noto Serif JP, serif", fontSize: '30px'}} className="MediaCaption">{props.item.Name}</Typography>
      </CardMedia>
    </Card>
  );
}

const items = [
  {
    Items: [
      {
        Name: "Smoked Salmon Sushi",
        Image:
          "https://cdn.greatlifepublishing.net/wp-content/uploads/sites/2/2014/09/21140224/sushi.jpg",
        id: 224150
      },
      {
        Name: "Chocolate Baklava",
        Image:
          "https://i.pinimg.com/originals/21/13/5f/21135f8d66e04a00c9d337c0ce971954.jpg",
        id: 896626
      },
      {
        Name: "Blueberry Crostata",
        Image:
          "https://www.katiescucina.com/wp-content/uploads/2019/09/Blueberry-Crostata-Recipe.jpg",
        id: 1116348
      }
    ]
  },
  {
    Items: [
      {
        Name: "Hawaiian Pork Burger",
        Image:
          "https://www.rachaelraymag.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQ1OTQ3NzMzODUxNjQ1NjQ1/hawaiian-pork-burgers-102439701.jpg",
        id: 245166
      },
      {
        Name: "Nasi Goreng",
        Image:
          "https://i0.wp.com/tastynesia.com/wp-content/uploads/2020/01/Resep-Nasi-Goreng-Kampung.jpg",
        id: 474266
      },
      {
        Name: "Pumpkin Soup",
        Image:
          "https://img.delicious.com.au/0Hfc6oZG/w1200/del/2017/03/creamy-pumpkin-soup-43936-2.jpg",
        id: 574574
      }
    ]
  },
  {
    Items: [
      {
        Name: "Spaghetti Aglio e Olio",
        Image:
          "https://www.vincenzosplate.com/wp-content/uploads/2020/03/spaghetti-aglio-olio-recipe.png",
        id: 260845
      },
      {
        Name: "Beef Rendang",
        Image:
          "https://omnivorescookbook.com/wp-content/uploads/2019/12/1911_Beef-Rendang_550.jpg",
        id: 200298
      },
      {
        Name: "Ossobuco Alla Milanese",
        Image:
          "https://www.sfizioso.it/wp-content/uploads/2017/10/Ossobuco-alla-milanese-teresa-balzano-e1509446833142.jpg",
        id: 1433623
      }
    ]
  }
];

const items2 = [
  {
    Name: "Smoked salmon & avocado sushi",
    Image:
      "https://cdn.greatlifepublishing.net/wp-content/uploads/sites/2/2014/09/21140224/sushi.jpg",
    id: 224150
  },
  {
    Name: "Chocolate Baklava",
    Image:
      "https://i.pinimg.com/originals/21/13/5f/21135f8d66e04a00c9d337c0ce971954.jpg",
    id: 896626
  },
  {
    Name: "Blueberry Crostata",
    Image:
      "https://www.katiescucina.com/wp-content/uploads/2019/09/Blueberry-Crostata-Recipe.jpg",
    id: 1116348
  },
  {
    Name: "Hawaiian Pork Burger",
    Image:
      "https://www.rachaelraymag.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQ1OTQ3NzMzODUxNjQ1NjQ1/hawaiian-pork-burgers-102439701.jpg",
    id: 245166
  },
  {
    Name: "Nasi Goreng",
    Image:
      "https://i0.wp.com/tastynesia.com/wp-content/uploads/2020/01/Resep-Nasi-Goreng-Kampung.jpg",
    id: 474266
  },
  {
    Name: "Pumpkin Soup",
    Image:
      "https://img.delicious.com.au/0Hfc6oZG/w1200/del/2017/03/creamy-pumpkin-soup-43936-2.jpg",
    id: 574574
  },
  {
    Name: "Spaghetti Aglio e Olio",
    Image:
      "https://www.vincenzosplate.com/wp-content/uploads/2020/03/spaghetti-aglio-olio-recipe.png",
    id: 260845
  },
  {
    Name: "Beef Rendang",
    Image:
      "https://omnivorescookbook.com/wp-content/uploads/2019/12/1911_Beef-Rendang_550.jpg",
    id: 200298
  },
  {
    Name: "Ossobuco Alla Milanese",
    Image:
      "https://www.sfizioso.it/wp-content/uploads/2017/10/Ossobuco-alla-milanese-teresa-balzano-e1509446833142.jpg",
    id: 1433623
  }
];

class StaffPicks extends React.Component {
  constructor(props) {
    console.log("aaaaaaaaaa");
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    console.log("aaaaaaaaaa");

    super(props);

    this.state = {
      autoPlay: true,
      timer: 400,
      animation: "fade",
      indicators: false,
      timeout: 200,
      navButtonsAlwaysVisible: true,
      height: window.innerHeight,
      width: window.innerWidth
    };
    window.addEventListener("resize", this.update);
    autoBind(this);
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  render() {
    return (
      <div style={{ color: "#ff959c" }}>
        {this.state.width * 1.35 > this.state.height && (
          <>
            <Carousel
              className="Example"
              autoPlay={this.state.autoPlay}
              timer={this.state.timer}
              animation={this.state.animation}
              indicators={this.state.indicators}
              timeout={this.state.timeout}
              navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
            >
              {items.map((item, index) => {
                return (
                  <Banner
                    item={item}
                    key={index}
                    contentPosition={item.contentPosition}
                  />
                );
              })}
            </Carousel>
          </>
        )}
        {this.state.width * 1.35 <= this.state.height && (
          <>
            <Carousel
              className="Example"
              autoPlay={this.state.autoPlay}
              timer={this.state.timer}
              animation={this.state.animation}
              indicators={this.state.indicators}
              timeout={this.state.timeout}
              navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
            >
              {items2.map((item, index) => {
                return (
                  <Banner2
                    item={item}
                    key={index}
                    contentPosition={item.contentPosition}
                  />
                );
              })}
            </Carousel>
          </>
        )}
      </div>
    );
  }
}

export default StaffPicks;
