import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import {
    Grid,
    Card,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CardContent,
    CardHeader,
    CardActionArea,
    CardMedia,
    Typography
} from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useStyles } from '../assets/css';

export default function CardStep(props) {

    let [id, setid] = useState(0);
    function createData(name) {
        setid(id + 1);
        return { id, name };
    }
    let [rows, setRows] = useState([]);

    useEffect(() => {
        if (props) {
            let temp = [];
            props.data.forEach(item => {
                temp.push(createData(item.name));
            });
            setRows(temp);
        }
    }, [props])
    console.log(props.data[0])
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Grid item lg={6} sm={12}>
            {/* {props && JSON.stringify(props)} */}
            <Card className={cx(classes.card, cardShadowStyles.root)} style={{ width: '100%' }}>
                <CardHeader
                    className={cardHeaderShadowStyles.root}
                    classes={cardHeaderStyles}
                    title={props.type}
                />
                <CardContent className={classes.content}>
                    <Table>
                        {/* <TableHead>
                        <TableRow>
                        <TableCell>Dessert</TableCell>
                        <TableCell align="right">Fat (g)</TableCell>
                        <TableCell align="right">Price ($)</TableCell>
                        </TableRow>
                    </TableHead> */}
                        <TableBody>
                            {rows.map(row => (
                                <Grid item lg={2} md={3} xs={6}>
                                    <CardActionArea className='cardIngredient'>
                                        <CardMedia
                                            className={classes.media}
                                            component="img"
                                            src={props.type == 'Ingredients' ? `https://spoonacular.com/cdn/ingredients_250x250/${props.data[0].image}` : `https://spoonacular.com/cdn/equipment_250x250/${props.data[0].image}`}
                                            title={props.type == 'Ingredients' ? "bumbu" : "alat"}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {props.data[0].name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Grid>
    )
}