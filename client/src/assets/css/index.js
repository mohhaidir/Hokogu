import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 1,
    // },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: `${theme.spacing.unit * 3}px`
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    card: {
      marginTop: 40,
      borderRadius: theme.spacing(0.5),
      transition: '0.3s',
      width: '90%',
      overflow: 'initial',
      background: '#ffffff',
    },
    content: {
      textAlign: 'left',
      overflowX: 'auto',
    },
}));