import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import '../style/Example.scss';

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
} from '@material-ui/core';

function Banner(props) {
    if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">
                    {props.item.Name}
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>

                <Button variant="outlined" className="ViewButton">
                    View Now
                </Button>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className="MediaCaption">
                        {item.Name}
                    </Typography>
                </CardMedia>

            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Desserts",
        Caption: "Life is short, eat more cupcakes",
        contentPosition: "left",
        Items: [
            {
                Name: "Sex in a pan",
                Image: "https://mealplannerpro.com/images/recipes/1616/12143.jpg"
            },
            {
                Name: "Apple and Blueberry Tarts",
                Image: "https://img.taste.com.au/I3pVZ2Oc/w720-h480-cfill-q80/taste/2016/11/apple-and-blueberry-tarts-17864-1.jpeg"
            }
        ]
    },
    {
        Name: "Indonesian Cuisine",
        Caption: "Strong and diverse flavours",
        contentPosition: "middle",
        Items: [
            {
                Name: "Nasi Goreng",
                Image: "https://i0.wp.com/tastynesia.com/wp-content/uploads/2020/01/Resep-Nasi-Goreng-Kampung.jpg"
            },
            {
                Name: "Sop Buntut",
                Image: "https://www.themulia.com/getmedia/8487b5a7-79a6-436c-b813-ec54e75c1d54/sop-buntut-forblog.jpg/?width=1000&height=727&ext=.jpg&maxsidesize=750"
            }
        ]
    },
    {
        Name: "Italian Cuisine",
        Caption: "There's nothing more romantic than Italian food",
        contentPosition: "right",
        Items: [
            {
                Name: "Spaghetti Aglio e Olio",
                Image: "https://www.vincenzosplate.com/wp-content/uploads/2020/03/spaghetti-aglio-olio-recipe.png"
            },
            {
                Name: "Ossobuco Alla Milanese",
                Image: "https://www.sfizioso.it/wp-content/uploads/2017/10/Ossobuco-alla-milanese-teresa-balzano-e1509446833142.jpg"
            }
        ]
    }
]

class BannerExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: true,
            timer: 400,
            animation: "fade",
            indicators: false,
            timeout: 200,
            navButtonsAlwaysVisible: true
        }
        autoBind(this);
    }

    render() {
        return (
            <div style={{marginTop: "50px", color: "#ff959c"}}>
                <Carousel
                    className="Example"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                >
                    {
                        items.map((item, index) => {
                            return <Banner item={item} key={index} contentPosition={item.contentPosition}/>
                        })
                    }
                </Carousel>

            </div>

        )
    }
}

export default BannerExample;
