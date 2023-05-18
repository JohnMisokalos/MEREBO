import React from 'react';
import { useState } from 'react';
// import useStyles from "../styles";
// import Images from "../Images/imageExporter";
// import CloseIcon from "@material-ui/icons/Close";

// import Backdrop from "@material-ui/material/Backdrop";
// import Box from "@material-ui/material/Box";
// import Modal from "@material-ui/material/Modal";
// import Fade from "@material-ui/material/Fade";
// import Button from "@material-ui/material/Button";
// import Typography from "@material-ui/material/Typography";
import {
    // Backdrop,
    // Card,
    // Grid,
    // CardContent,
    // CardMedia,
    // Box,
    // Modal,
    // Fade,
    // Typography,
    // Divider,
    // IconButton,
    Button,
    CssBaseline,
} from '@material-ui/core';

// import {
//   createMuiTheme,
//   // MuiThemeProvider,
//   responsiveFontSizes,
// } from "@material-ui/core/styles";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// let theme = createMuiTheme();
// theme = responsiveFontSizes(theme);
function findItemMarket(item, prodNum) {
    // console.log("App: findItemMarket: ", items);
    let correctMarket; // a number representing the SuperMarket
    // console.log("Modal: FindItemMarket: ", item);
    const super1 = item._Super1.toString();
    const super2 = item.Super2.toString();
    const super3 = item.Super3.toString();
    // console.log(super1, super2, super3);
    if (prodNum === 1) {
        if (Number(super1) === 1) {
            correctMarket = 'SKLV';
        } else if (Number(super1) === 2) {
            correctMarket = 'AB';
        } else if (Number(super1) === 3) {
            correctMarket = 'XALK';
        }
    }

    if (prodNum === 2) {
        if (Number(super2) === 1) {
            correctMarket = 'SKLV';
        } else if (Number(super2) === 2) {
            correctMarket = 'AB';
        } else if (Number(super2) === 3) {
            correctMarket = 'XALK';
        }
    }

    if (prodNum === 3) {
        if (Number(super3) === 1) {
            correctMarket = 'SKLV';
        } else if (Number(super3) === 2) {
            correctMarket = 'AB';
        } else if (Number(super3) === 3) {
            correctMarket = 'XALK';
        }
    }

    return correctMarket;
}

const extractNumbersFromString = function (priceString) {
    let price;
    // console.log(priceString);
    if (priceString.includes('/')) {
        // 1. Removes the part of the string after the 1st "/" - slice()
        // 2. // replaces non-Digit characters with "" - replace(/\D/g, "")
        price = priceString
            .slice(0, priceString.indexOf('/'))
            .replace(/\D/g, '');
    } else {
        price = priceString.replace(/\D/g, ''); // replaces non-Digit characters with ""
    }
    // console.log("CartItem.jsx: Numbers: ", (Number(price) / 100).toFixed(2));
    return (parseFloat(price) / 100).toFixed(2);
};

export default function TransitionsModal({
    item,
    index,
    addToCart,
    prodNum,
    setHardArray,
    // setHardsetArrays,
}) {
    // const [idCounter, setIdCounter] = useState(0);

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    // const classes = useStyles();

    // const getImgString2 = function (element) {
    //   // console.log(element);
    //   if (!element[0])
    //     console.error(
    //       new Error("CardItem.jsx: 😅 Product Doesn't have and image")
    //     );
    //   const imgIndex = element[0].indexOf(".");
    //   const imgIndex2 = element[0].indexOf("/");

    //   return element[0].substring(imgIndex2 + 4, imgIndex);
    // };

    return (
        <div>
            <CssBaseline />
            {/* Was View Item */}
            {/* <Button color="primary" onClick={() => addToCart(item, prodNum)}> */}
            {/* {console.log("Modal.jsx: ", item[`ProdName${prodNum}`].toString())} */}
            {item[`ProdPrice${prodNum}`].toString() === 'OOS' ? (
                <Button disable>Not Available</Button>
            ) : (
                <Button
                    color="primary"
                    onClick={() => {
                        //TODO: Separate when s

                        setHardArray((prev) => {
                            const isItemInCart = prev.find(
                                (itemEl) =>
                                    itemEl.name ===
                                    item[`ProdName${prodNum}`].toString()
                            );

                            if (isItemInCart) {
                                return prev.map((itemEl) => {
                                    if (
                                        item[
                                            `ProdName${prodNum}`
                                        ].toString() === itemEl.name
                                    ) {
                                        return {
                                            ...itemEl,
                                            amount: itemEl.amount + 1,
                                            hardC: itemEl.hardC + 1,
                                        };
                                    }
                                    return itemEl;
                                });
                            }

                            const newHardItem = {
                                name: item[`ProdName${prodNum}`].toString(),
                                price: parseFloat(
                                    extractNumbersFromString(
                                        item[`ProdPrice${prodNum}`].toString()
                                    )
                                ),
                                path: item[`ProdPath${prodNum}`].toString(),
                                itemProps: item,
                                market: findItemMarket(item, prodNum),
                                softSet: false,
                                amount: 1,
                                hardC: 1,
                                softC: 0,
                            };
                            return [...prev, newHardItem];
                        });

                        addToCart(
                            item[`ProdName${prodNum}`].toString(),
                            extractNumbersFromString(
                                item[`ProdPrice${prodNum}`].toString()
                            ),
                            item[`ProdPath${prodNum}`],
                            item,
                            findItemMarket(item, prodNum),
                            false
                            // item.id + idCounter.toString()
                        );
                        // setIdCounter((prev) => prev++);
                    }}
                >
                    Add to Cart
                </Button>
            )}
            {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      > */}
            {/* <Fade in={open}>
          <Box className={classes.modal}>
            <Grid container spacing={3}>
              <Grid xs={6} md={4} item={true}> */}
            {/* <Grid> */}
            {/* <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      Images[getImgString2(item[`ProdPath${1}`]) - 1].default
                    }
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}></CardContent>
                </Card>
              </Grid>
              <Grid xs={6} md={1} item={true}></Grid> */}
            {/* <Grid> */}
            {/* <Grid xs={6} md={7} item={true}>
                <Box className={classes.modalTitleBox}>
                  <Grid container spacing={6}>
                    <Grid item xs={6} md={10}>
                      <Typography
                        id="transition-modal-title"
                        variant="h4"
                        component="h2"
                      >
                        Τιμές Προϊόντος
                      </Typography>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <IconButton
                        aria-label="closeIcon"
                        onClick={() => setOpen(false)}
                      >
                        <CloseIcon className={classes.closeIcon} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box className={classes.modalBox}>
                  <MuiThemeProvider theme={theme}>
                    <Typography
                      id="transition-modal-description"
                      className={classes.aaa}
                      variant="h5"
                    >
                      <b>SuperMarket A: &nbsp;</b> {item["ProdPrice1"][0]}
                    </Typography>
                    {item["ProdPrice2"][0] !== "0" ? (
                      <Typography
                        id="transition-modal-description"
                        className={classes.aaa}
                        variant="h5"
                      >
                        <b>SuperMarket B: &nbsp;</b> {item["ProdPrice2"][0]}
                      </Typography>
                    ) : null}
                    {item["ProdPrice3"][0] !== "0" ? (
                      <Typography
                        id="transition-modal-description"
                        className={classes.aaa}
                        variant="h5"
                      >
                        <b>SuperMarket Γ: &nbsp;</b> {item["ProdPrice3"][0]}
                      </Typography>
                    ) : null}
                  </MuiThemeProvider>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal> */}
        </div>
    );
}
