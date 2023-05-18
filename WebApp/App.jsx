import React, { useState, useEffect } from 'react';
import SimpleSearchBar from './components/SimpleSerachBar';
import CatCluster from './components/CatCluster';
import Logo from './Images/solr-logo.svg';
import {
    Badge,
    Drawer,
    AppBar,
    Button,
    CssBaseline,
    Grid,
    Toolbar,
    Typography,
    Container,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import Cart from './components/Cart/Cart';

import useStyles from './styles';

const { requestQuerySolr } = require('./solrConnector.js');

const Album = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchClicked, setSearchClicked] = useState(true);
    const [results, setResults] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [softArray, setSoftArray] = useState([]);
    const [hardArray, setHardArray] = useState([]);
    const [totalSums, setTotalSums] = useState({ a: 0, b: 0, c: 0 });

    const [idCounter, setIdCounter] = useState(0);
    const [idCounterCheapest, setIdCounterCheapest] = useState(0);

    useEffect(() => {
        console.log('From App, use Effect, Soft:', softArray);
    }, [softArray.length]);

    useEffect(() => {
        console.log('From App, use Effect, Cart:', cartItems);
    }, [softArray.length]);

    function createSums(items) {
        let sumA = 0;
        let sumB = 0;
        let sumC = 0;
        // totalSums = { a: 0, b: 0, c: 0 };
        setTotalSums({ a: 0, b: 0, c: 0 });
        items.forEach((item) => {
            if (item.market === 'SKLV') sumA += item.price * item.amount;
            if (item.market === 'AB') sumB += item.price * item.amount;
            if (item.market === 'XALK') sumC += item.price * item.amount;
        });
        setTotalSums({
            a: sumA,
            b: sumB,
            c: sumC,
        });
    }

    const duplicateSetProp = new Set();

    const classes = useStyles();

    // Code For Cart -- Beginning
    const getTotalItems = (items) =>
        items.reduce((acc, item) => acc + item.amount, 0);

    function clearDuplicateSet() {
        duplicateSetProp.clear();
    }

    const handleAddToCart = (
        clickedItemName,
        clickedItemPrice,
        clickedItemPath,
        clickedItem,
        clickedItemMarket,
        clickedItemSoftSet,
        clickedItemAmount
    ) => {
        let finalItem = {};

        setCartItems((prev) => {
            // console.log("App.jsx: handleAddToCart:  Item Whole: ", clickedItem);
            // console.log(
            //   "App.jsx: handleAddToCart:  Item Market: ",
            //   clickedItemMarket
            // );

            if (clickedItemAmount && clickedItemSoftSet) {
                finalItem = {
                    name: clickedItemName,
                    price: parseFloat(clickedItemPrice),
                    path: clickedItemPath.toString(),
                    itemProps: clickedItem,
                    market: clickedItemMarket,
                    softSet: clickedItemSoftSet,
                    amount: clickedItemAmount,
                    hardC: 0,
                    softC: clickedItemAmount,
                    id: idCounter,
                };

                return [...prev, finalItem];
            }

            if (clickedItemAmount && !clickedItemSoftSet) {
                finalItem = {
                    name: clickedItemName,
                    price: parseFloat(clickedItemPrice),
                    path: clickedItemPath.toString(),
                    itemProps: clickedItem,
                    market: clickedItemMarket,
                    softSet: clickedItemSoftSet,
                    amount: clickedItemAmount,
                    hardC: clickedItemAmount,
                    softC: 0,
                    id: idCounter,
                };

                return [...prev, finalItem];
            }

            const isItemInCart = prev.find(
                (item) => item.name === clickedItemName
            );

            //The format or type of the CartItem Object that is added to the Cart

            if (!isItemInCart) {
                if (clickedItemSoftSet) {
                    finalItem = {
                        name: clickedItemName,
                        price: parseFloat(clickedItemPrice),
                        path: clickedItemPath.toString(),
                        itemProps: clickedItem,
                        market: clickedItemMarket,
                        softSet: clickedItemSoftSet,
                        amount: 1,
                        hardC: 0,
                        softC: 1,
                        id: idCounter,
                    };
                } else {
                    finalItem = {
                        name: clickedItemName,
                        price: parseFloat(clickedItemPrice),
                        path: clickedItemPath.toString(),
                        itemProps: clickedItem,
                        market: clickedItemMarket,
                        softSet: clickedItemSoftSet,
                        amount: 1,
                        hardC: 1,
                        softC: 0,
                        id: idCounter,
                    };
                }
                return [...prev, finalItem];
            }

            if (isItemInCart) {
                return prev.map((item) => {
                    if (item.name === clickedItemName) {
                        if (clickedItemSoftSet === false) {
                            return {
                                ...item,
                                amount: item.amount + 1,
                                hardC: item.hardC + 1,
                            };
                        }
                        return {
                            ...item,
                            amount: item.amount + 1,
                            softC: item.softC + 1,
                        };
                    }
                    return item;
                });
            }

            setIdCounter(idCounter + 1);

            return [...prev, finalItem];
        });
    };

    const handleRemoveFromCart = (name, softSet) => {
        setCartItems((prev) =>
            prev.reduce((acc, item) => {
                if (item.name === name) {
                    if (item.amount === 1) return acc;
                    if (softSet === false) {
                        return [
                            ...acc,
                            {
                                ...item,
                                amount: item.amount - 1,
                                hardC: item.hardC - 1,
                            },
                        ];
                    }
                    return [
                        ...acc,
                        {
                            ...item,
                            amount: item.amount - 1,
                            softC: item.softC - 1,
                        },
                    ];
                } else {
                    return [...acc, item];
                }
            }, [])
        );
    };
    // Code For Cart -- Ending

    const getDataFromSearchBar = function (dataFromSearchBar) {
        setSearchInput(dataFromSearchBar);
        // console.log("From App: " + searchInput);
    };

    const handleKeyboardClick = function (dataFromSearchBar) {
        if (dataFromSearchBar) handleSearch();
    };

    // const extractNumbersFromString = function (priceString) {
    //   let price;
    //   if (priceString.includes("/")) {
    //     // 1. Removes the part of the string after the 1st "/" - slice()
    //     // 2. // replaces non-Digit characters with "" - replace(/\D/g, "")
    //     price = priceString.slice(0, priceString.indexOf("/")).replace(/\D/g, "");
    //   } else {
    //     price = priceString.replace(/\D/g, ""); // replaces non-Digit characters with ""
    //   }
    //   return (parseFloat(price) / 100).toFixed(2);
    // };

    const handleSearch = async () => {
        // console.log(`Data from Submit: ${searchInput}`); //asd
        setSearchClicked(false);
        try {
            let queryRsult = await requestQuerySolr(searchInput, 1, 50); // <-- Arg = Number Of Rows to fetch
            const dataArray = queryRsult.data.response.docs; // <-- This is of type "Array"

            // console.log("Data Array: ", dataArray);
            setResults(dataArray); // <-- This is a React hook that handles "State"
            // "State" is just a variable that can dynamically change from User Inputs and/or Code
            clearDuplicateSet();
            // console.log("Duplicate Array: ", duplicate);
        } catch (err) {
            console.error(
                `😅 It seems that something went wrong when App.js was trying to request a query from Solr server through the solrConnector.js
        Error Origin: App.js
        ${err}`
            );
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            >
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                    softArray={softArray}
                    setSoftArray={setSoftArray}
                    setCartItems={setCartItems}
                    totalSums={totalSums}
                    hardArray={hardArray}
                    setHardArray={setHardArray}
                    createSums={createSums}
                />
            </Drawer>

            <AppBar position="sticky">
                <Toolbar>
                    <img src={Logo} className={classes.icon} alt="Logo" />
                    <Typography variant="h6" color="inherit" noWrap>
                        Apache Solr Seeker
                    </Typography>

                    {/* Cart Button */}
                    <Button
                        onClick={() => {
                            setCartOpen(true);
                            createSums(cartItems);
                        }}
                    >
                        <Badge
                            badgeContent={getTotalItems(cartItems)}
                            // onClick={() => {
                            //   hardSetArrayImporter(createHardsetSums(cartItems));
                            //   softSetArrayImporter(softArray);
                            // hardSetArrayImporter(hardsetSums);
                            // }}
                            color="error"
                            softArray={softArray}
                        >
                            <AddShoppingCart className={classes.cartIcon} />
                        </Badge>
                    </Button>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Apache Solr Seeker
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Something short and leading about the collection
                            below—its contents, the creator, etc. Make it short
                            and sweet, but not too short so folks don't simply
                            skip over it entirely.
                        </Typography>
                        <SimpleSearchBar
                            SearchBarProp={getDataFromSearchBar}
                            onKeyDownEnter={handleKeyboardClick}
                        />
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        I'm feeling lucky!
                                    </Button>
                                </Grid>
                            </Grid>
                            <div>
                                {searchClicked ? null : (
                                    <Grid
                                        className={classes.superMarketGrid}
                                        container
                                        spacing={2}
                                    >
                                        <Grid xs={4} md={4} item>
                                            <Typography
                                                className={classes.super1}
                                            >
                                                ΣΚΛΑΒΕΝΙΤΗΣ
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} md={4} item>
                                            <Typography
                                                className={classes.super2}
                                            >
                                                ΑΒ ΒΑΣΙΛΟΠΟΥΛΟΣ
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4} md={4} item>
                                            <Typography
                                                className={classes.super3}
                                            >
                                                ΧΑΛΚΙΑΔΑΚΗΣ
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
                {/* <Container className={classes.cardGrid} maxWidth="md"> */}
                {results.map((result, indx) => {
                    return (
                        <Container className={classes.ClusterContainer}>
                            <CatCluster
                                result={result}
                                indx={indx}
                                addToCart={handleAddToCart}
                                duplicatesSet={duplicateSetProp}
                                clearDuplicateSet={clearDuplicateSet}
                                softArray={softArray}
                                setSoftArray={setSoftArray}
                                idCounterCheapest={idCounterCheapest}
                                setIdCounterCheapest={setIdCounterCheapest}
                                setHardArray={setHardArray}
                                // setHardsetArrays={setHardsetArrays}
                                // checkDup={checkDuplicatesSet}
                                key={indx + 53}
                                setCartItems={setCartItems}
                            />
                            {/* {console.log(
                "Test!!!: ",
                duplicateSetProp.has(result.ProdName1.toString())
              )} */}
                        </Container>
                    );
                })}
                {/* </Container> */}
            </main>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
            </footer>
            <div>
                <img
                    // src={Images[245].default}
                    // srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                    alt={'Alternative Text Display'}
                    loading="lazy"
                />
            </div>
        </React.Fragment>
    );
};

export default Album;
