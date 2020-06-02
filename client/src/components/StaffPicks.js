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

window.mobileCheck = function() {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

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
          <Typography className="MediaCaption">{item.Name}</Typography>
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
  // if (props.newProp) console.log(props.newProp)
  // const totalItems = props.length ? props.length : 3;
  // const mediaLength = totalItems;

  // let items = [];
  // for (let i = 0; i < mediaLength; i++) {
  //     const item = props.item.Items[i];

  //     const media = (
  //         <Grid item xs={12 / totalItems} key={item.Name} onClick={ ()=> history.push(`/recipe/${item.id}`)}>
  //             <CardMedia
  //                 className="Media"
  //                 image={item.Image}
  //                 title={item.Name}
  //             >
  //                 <Typography className="MediaCaption">
  //                     {item.Name}
  //                 </Typography>
  //             </CardMedia>

  //         </Grid>
  //     )

  //     items.push(media);
  // }

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
        <Typography className="MediaCaption">{props.item.Name}</Typography>
      </CardMedia>
    </Card>
  );
}

const items = [
  {
    Items: [
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
            <h1
              style={{
                color: "#fd626c",
                fontSize: "40px",
                textAlign: "center",
                fontFamily: "Noto Serif JP, serif"
              }}
            >
              Happiness Is Homemade
            </h1>
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
