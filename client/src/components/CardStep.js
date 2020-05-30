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
} from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useStyles } from '../assets/css';

export default function CardStep(props) {

    let [id, setid] = useState(0);
    function createData(name) {
        setid(id+1);
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

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    return (
        <Grid item lg={6} sm={12}>
            {/* {props && JSON.stringify(props)} */}
            <Card className={cx(classes.card, cardShadowStyles.root)} style={{width:'100%'}}>
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
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                            {row.name}
                            </TableCell>
                            {/* <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.price}</TableCell> */}
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Grid>
    )
}