import { makeStyles } from "@material-ui/core";

const useStyles = () =>
  makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(0),
      },
    },
    flexGrow: {
      flexGrow: 1,
    },
    scroll: {
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      height: `calc(100vh - 128px)`,
      [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
        height: `calc(100vh - 48px)`,
      },
      [theme.breakpoints.up("sm")]: {
        height: `calc(100vh - 128px)`,
      },
    },
    input: {
      display: "none",
    },
    image: {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
    },
    text: {
      padding: theme.spacing(2, 2, 2, 2),
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    creatorText: {
      padding: theme.spacing(0, 0, 0, 4),
    },
    creatorTextCard: {
      padding: theme.spacing(2, 0, 0, 2),
    },
    header: {
      color: "secondary",
      padding: theme.spacing(2, 0, 0, 2),
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
    cardHeader: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    countdown: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.contrastText,
    },
    adminHeader: {
      color: "#fff",
      padding: theme.spacing(2, 2, 2, 2),
    },
    adminButton: {
      color: "#fff",
      margin: theme.spacing(2),
    },
    adminTextField: {
      backgroundColor: theme.palette.secondary.main,
      borderColor: "white",
      margin: theme.spacing(2),
    },
    paper: {
      margin: theme.spacing(1),
      elevation: 3,
    },
    card: {
      margin: theme.spacing(1),
      elevation: 3,
    },
    contentCard: {
      margin: theme.spacing(1),
      elevation: 3,
      display: "flex",
    },
    list: {
      margin: theme.spacing(0),
    },
    cardAdmin: {
      margin: theme.spacing(1),
      elevation: 3,
      backgroundColor: theme.palette.primary.main,
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBarTop: {
      position: "fixed",
      top: 0,
      bottom: "auto",
    },
    appBar: {
      position: "fixed",
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    bread: {
      padding: theme.spacing(0, 2, 0),
    },
    breadText: {
      alignItems: "center",
      display: "flex",
      height: 60,
    },
    fabButton: {
      position: "fixed",
      bottom: theme.spacing(9),
      left: theme.spacing(3),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    pos: {
      marginBottom: 12,
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
    speedDial4: {
      position: "fixed",
      bottom: theme.spacing(30),
      right: theme.spacing(3),
    },
    speedDial3: {
      position: "fixed",
      bottom: theme.spacing(23),
      right: theme.spacing(3),
    },
    speedDial2: {
      position: "fixed",
      bottom: theme.spacing(16),
      right: theme.spacing(3),
    },
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(9),
      right: theme.spacing(3),
    },
    formControl: {},
    dataGrid: {},
    textChart: {
      padding: theme.spacing(0, 0, 2, 2),
    },
    pad: {
      padding: theme.spacing(4),
    },
    padTop: {
      padding: theme.spacing(4),
    },
    linkHeader: {
      padding: theme.spacing(10, 10, 10, 5),
    },
    chart: {
      margin: theme.spacing(2),
    },
    speakerCard: {
      margin: theme.spacing(1, 1, 10, 1),
      elevation: 3,
    },
  }))();
export default useStyles;
