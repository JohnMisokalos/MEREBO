import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    width: "7vw",
    height: "7vh",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  mainGrid: {
    justifyContent: "center",
  },
  superMarketGrid: {
    paddingTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  super1: {
    border: "5px solid yellow",
    paddingLeft: "30px",
    fontWeight: "500",
  },
  super2: {
    border: "5px solid orange",
    paddingLeft: "10px",
    fontWeight: "500",
  },
  super3: {
    border: "5px solid red",
    paddingLeft: "26px",
    fontWeight: "500",
  },
  cardGrid: {
    display: "flex",
    justifyContent: "center",
    // backgroundColor: "red",

    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%", // 56.25% --> 16:9
    float: "left",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  modal: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    // height: "34vh",
    backgroundColor: "#f7f2f2",
    border: "3px solid #3867f5",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  aaa: {
    paddingTop: theme.spacing(6),
  },

  modalBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitleBox: {
    // justifyContent: "space-between",
    // display: "inline-block",
    // textAlign: "center",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: "0px",
    right: "0px",
    paddingRight: "0px",
  },
  cardGridItem1: {
    backgroundColor: "yellow",
    paddingRight: "0px",
  },
  cardGridItem2: {
    backgroundColor: "orange",
  },
  cardGridItem3: {
    backgroundColor: "red",
  },
  cardPrice: {
    paddingRight: "10px",
  },
  cartIcon: {
    color: "#fff",
    textShadow: "1px 1px 1px #ccc",
    fontSize: "45px",
    paddingLeft: "10px",
    // paddingRight: "10px",
  },
  cartItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    // display: "flex",
    // display: "inline-block",
    justifyContent: "space-between",
    // flexWrap: "wrap",
  },
  cartItemInformation: {
    display: "flex",
    width: "100%",
    fontSize: "18px",
    fontWeight: "bold",
    // verticalAlign: "middle",
    justifyContent: "space-between",
    textAlign: "justify",
  },
  cartItemButtons: {
    display: "flex",
    // verticalAlign: "middle",
    width: "100%",
    justifyContent: "space-between",
  },
  cartItemContainer: {
    justifyContent: "center",
    textAlign: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    // width: "28.5%",
  },
  cartItemImg: {
    maxWidth: "80%",
    objectFit: "cover",
    // marginLeft: "40px",
    justifyContent: "center",
  },
  cartItemDiv: {
    flex: 1,
  },
  cart: {
    width: "600px",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  ClusterContainer: {
    justifyContent: "center",
    textAlign: "center",
  },
}));

export default useStyles;
