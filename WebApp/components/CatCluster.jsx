import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import { Grid, Container, Button } from '@material-ui/core';
import useStyles from '../styles.js';
// import { AddAlarm } from "@material-ui/icons";

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
    return (parseFloat(price) / 100).toFixed(2);
};
// let duplicateSet = new Set();

export default function CatCluster({
    result,
    indx,
    addToCart,
    duplicatesSet,
    // setCartItems,
    clearDuplicateSet,
    setSoftArray,
    softArray,
    setHardArray,
    // setIdCounterCheapest,
    // idCounterCheapest,
    // setHardsetArrays,
}) {
    const classes = useStyles();
    const itemPrice = {};
    let priceArray = [];

    function registerDuplicates(result) {
        if (result.ProdName2.toString() !== '0') {
            duplicatesSet.add(result.ProdName2.toString());
        }
        if (result.ProdName3.toString() !== '0') {
            duplicatesSet.add(result.ProdName3.toString());
        }
    }

    // Price checking before inserting to ItemPrice object
    const findCheapest = async function (result, indx, cbFunction) {
        console.clear();

        let currentProdNumber;

        function findMarket(number) {
            if (number === 1) return 'SKLV';
            if (number === 2) return 'AB';
            if (number === 3) return 'XALK';
            return 'Cluster: Something went wrong, in findMarket()';
        }

        if (
            result.ProdName1.toString() !== 'T' &&
            result.ProdName1.toString() !== '0'
        ) {
            if (
                result.ProdPrice1[0] === 'OOS' ||
                result.ProdPrice1[0] === '0' ||
                result.ProdPrice1[0] === '0.00' ||
                result._Super1[0] === 0
            ) {
                itemPrice[`price1`] = null;
                itemPrice[`Super1`] = null;
            } else {
                itemPrice[`price1`] = parseFloat(
                    extractNumbersFromString(result.ProdPrice1.toString())
                );
                itemPrice[`Super1`] = findMarket(result._Super1[0]);
                if (itemPrice[`price1`]) priceArray.push(itemPrice[`price1`]);
                // console.log("1st if: ", result.ProdName1.toString());
            }
        } else {
            // console.log("1st else: ", result.ProdName1.toString());
            itemPrice[`price1`] = null;
        }

        if (
            result.ProdName2.toString() !== 'T' &&
            result.ProdName2.toString() !== '0'
        ) {
            if (
                result.ProdPrice2[0] === 'OOS' ||
                result.ProdPrice2[0] === '0' ||
                result.ProdPrice2[0] === '0.00' ||
                result.Super2[0] === 0
            ) {
                itemPrice[`price2`] = null;
                itemPrice[`Super2`] = null;
            }
            itemPrice[`price2`] = parseFloat(
                extractNumbersFromString(result.ProdPrice2.toString())
            );
            itemPrice[`Super2`] = findMarket(result.Super2[0]);
            if (itemPrice[`price2`]) priceArray.push(itemPrice[`price2`]);
            // console.log("2nd if: ", result.ProdName2.toString());
        } else {
            // console.log("2nd else: ", result.ProdName2.toString());
            itemPrice[`price2`] = null;
        }

        if (
            result.ProdName3.toString() !== 'T' &&
            result.ProdName3.toString() !== '0'
        ) {
            if (
                result.ProdPrice3[0] === 'OOS' ||
                result.ProdPrice3[0] === '0' ||
                result.ProdPrice3[0] === '0.00' ||
                result.Super3[0] === 0
            ) {
                itemPrice[`price3`] = null;
                itemPrice[`Super3`] = null;
            }
            itemPrice[`price3`] = parseFloat(
                extractNumbersFromString(result.ProdPrice3.toString())
            );
            itemPrice[`Super3`] = findMarket(result.Super3[0]);
            if (itemPrice[`price3`]) priceArray.push(itemPrice[`price3`]);
            // console.log("3rd if: ", result.ProdName3.toString());
        } else {
            // console.log("3rd else: ", result.ProdName3.toString());
            itemPrice[`price3`] = null;
            itemPrice[`Super3`] = null;
        }
        // console.log(priceArray);
        const cheapestPrice = Math.min(...priceArray).toFixed(2); //[13.2 , 4.50, 45.0] => 4.5
        // console.log(cheapestPrice);
        // console.log(
        //   "AAAAAAAAA2: ",
        //   parseFloat(itemPrice.price2) === parseFloat(cheapestPrice)
        // );
        // console.log(
        //   "AAAAAAAAA3: ",
        //   parseFloat(itemPrice.price3) === parseFloat(cheapestPrice)
        // );

        if (parseFloat(itemPrice.price1) === parseFloat(cheapestPrice)) {
            itemPrice.cheapestMarket = itemPrice.Super1;
            itemPrice.cheapestPrice = Number(cheapestPrice);
            currentProdNumber = 1;
        } else if (parseFloat(itemPrice.price2) === parseFloat(cheapestPrice)) {
            currentProdNumber = 2;
            itemPrice.cheapestPrice = Number(cheapestPrice);
            itemPrice.cheapestMarket = itemPrice.Super2;
        } else if (parseFloat(itemPrice.price3) === parseFloat(cheapestPrice)) {
            currentProdNumber = 3;
            itemPrice.cheapestPrice = Number(cheapestPrice);
            itemPrice.cheapestMarket = itemPrice.Super3;
        } else {
            itemPrice.cheapestMarket =
                'Something Went Wrong, While setting CheapestMarket property!';
        }

        console.log('ItemPrice, used to find CheapestPrice: ', itemPrice);
        // console.log("ItemPrice.cheapestMarket: ", itemPrice.cheapestMarket);
        // console.log("CheapestPrice: ", itemPrice.cheapestPrice);

        // const isItemInSoftArray = softArray.find((item) => {
        //   console.log("Find() -> Item in Soft Array: ", item);
        //   return item.name === result[`ProdName${currentProdNumber}`].toString();
        // });
        // console.log("isItemInSoftArray: ", isItemInSoftArray);
        // console.log("softArray.length: ", softArray.length);
        // console.log("idCounterCheapest: ", idCounterCheapest);
        // if (!isItemInSoftArray && softArray.length > 0)
        //   setIdCounterCheapest(idCounterCheapest + 1);
        //* SoftMatchs must be unique using ID
        // softSetArray = [softMatch1, softMatch2, ...]
        // softMatch {
        //   id: ,
        //   priceA: ,
        //   superMarketA: ,
        //   titleA: ,
        //   priceB: ,
        //   superMarketB: ,
        //   titleB: ,
        //   priceC: ,
        //   superMarketC: ,
        //   titleC: ,
        //   cheapestPrice:,
        //   cheapestMarket:,
        //   qnt: ,// in Cart

        // }
        // setCartItems({
        //   ...itemPrice,
        //   softSet: true,
        // });
        // addToCart({
        //   result.ProdName1,
        // result.Price1,
        // result.ProdPath1
        // clickedItem,
        // clickedItemMarket,
        // clickedItemSoftSet,
        // uniqueID
        // });
        // const itemsNumber = convertLettersToCorrespondingNumbers(
        //   itemPrice.cheapestMarket
        // );
        // const chpPriceNum = extractNumbersFromString(
        //   result[`ProdPrice${itemPrice.cheapestMarket}`].toString()
        // );
        // console.log("AAAAAAAAA: ", result[`ProdName${currentProdNumber}`]);
        const cheapestObj = {
            ...itemPrice,
            name: result[`ProdName${currentProdNumber}`]?.toString(),
            softSet: true,
            qnt: 1,
            id_cluster: indx,
            id_softSet: softArray.length,
            itemProps: result,
            id: result.id,
            rowId: Number(result.rowId.toString()),
        };

        // addToCart(cheapestObj.name, itemPrice.cheapestPrice, result.[`ProdPath${currentProdNumber}`].toString(), result, itemPrice.cheapestMarket, true)

        // console.log(
        //   "@This Item in %cNOT%c the SoftArray? : ",
        //   "color: red; font-size: 14px",
        //   "",
        //   !isItemInSoftArray
        // );

        // console.log(
        //   "CatCluster: FindCheapest() The Created Object for the SetSoftArray: ",
        //   cheapestObj
        // );

        setSoftArray((oldArray) => {
            let filteredArray = [];

            if (oldArray.length === 0) {
                console.log(
                    '[Inside FindCheapest() -> setSoftArray()] The SoftSetArray was empty, and we added this item: ',
                    cheapestObj
                );

                return [...oldArray, cheapestObj];
            }

            filteredArray = oldArray.filter((item) => {
                console.log(
                    '[Inside FindCheapest() -> setSoftArray()] conditional #1 | Does SoftSetArray have this Item? :',
                    item.id === cheapestObj.id
                );

                // if (item.id_softSet === cheapestObj.id_softSet) return true;
                if (item.rowId === cheapestObj.rowId) return true;
                else {
                    return false;
                }
            });

            console.log(
                '[Inside FindCheapest() -> setSoftArray()] The Filtered Array: ',
                filteredArray
            );
            console.log(
                '[Inside FindCheapest() -> setSoftArray()] conditional #2 | Is this a New Item? :',
                filteredArray.length === 0
            );

            if (filteredArray.length === 0) {
                console.log(
                    '[Inside FindCheapest() -> setSoftArray()] Adds the new Item to the Cart!'
                );

                return [...oldArray, cheapestObj];
            } else {
                console.log(
                    '[Inside FindCheapest() -> setSoftArray()] Incrementing the qnt value of the existing Item...'
                );
                return [
                    ...oldArray.map((item) => {
                        console.log(
                            'Was the Incrementation Successful? : ',
                            item.id_cluster === cheapestObj.id_cluster
                        );
                        if (item.rowId === cheapestObj.rowId) {
                            return { ...item, qnt: item.qnt + 1 };
                        }

                        return item;
                    }),
                ];
            }
        });

        // Creates or Increments the Item into the Cart!
        cbFunction(
            result[`ProdName${currentProdNumber}`].toString(),
            cheapestObj.cheapestPrice,
            result[`ProdPath${currentProdNumber}`],
            result,
            cheapestObj.cheapestMarket,
            true
        );

        // console.log("[Inside FindCheapest()] State SoftArray:", softArray);
        // console.log(
        //   "[Inside FindCheapest()] Don't forget that, State in React is Async. That's why we can not see the updated state in the above console.log()"
        // );
        clearDuplicateSet();
        return {}; //
    };

    const ColorPickerSM = function (prodNum) {
        // console.log(result._Super1[0]);
        // let itemMarket = 0;
        if (prodNum === 0) {
            return;
        }
        if (prodNum === 1) {
            const itemMarket = result._Super1[0];
            // console.log("ColorPickerSM1: ", `classes.cardGridItem${itemMarket}`);

            return itemMarket;
        }
        if (prodNum === 2) {
            const itemMarket = result.Super2[0];
            // console.log("ColorPickerSM2: ", `classes.cardGridItem${itemMarket}`);

            return itemMarket;
        }
        if (prodNum === 3) {
            const itemMarket = result.Super3[0];
            // console.log("ColorPickerSM3: ", `classes.cardGridItem${itemMarket}`);

            return itemMarket;
        }
    };

    ColorPickerSM();

    // export const softSetArray = []

    return (
        <React.Fragment>
            {registerDuplicates(result)}
            {/* {console.log(
        "Has Duplicates?: ",
        duplicatesSet.has(result.ProdName1.toString())
      )} */}
            <Container
                className={classes.cardGrid}
                maxWidth="md"
                justifyContent="center"
            >
                {duplicatesSet.has(result.ProdName1.toString()) ? null : (
                    <Grid
                        container
                        // className={classes.cardGrid}
                        // direction="row"
                        className={classes.cardGrid}
                        justifyContent="center"
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            className={
                                classes[`cardGridItem${ColorPickerSM(1)}`]
                            }
                        >
                            {result['ProdName1'][0] !== '0' &&
                            result['ProdName1'][0] !== 'T' ? (
                                <CardItem
                                    result={result}
                                    indx={indx}
                                    prodNum={1}
                                    addToCart={addToCart}
                                    setHardArray={setHardArray}
                                    // setHardsetArrays={setHardsetArrays}
                                    // isDuplicate={isDuplicate}
                                    key={indx + 222}
                                />
                            ) : null}
                        </Grid>
                        {result['ProdName2'][0] !== '0' &&
                        result['ProdName2'][0] !== 'T' ? (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                className={
                                    classes[`cardGridItem${ColorPickerSM(2)}`]
                                }
                            >
                                <CardItem
                                    result={result}
                                    indx={indx}
                                    prodNum={2}
                                    addToCart={addToCart}
                                    setHardArray={setHardArray}
                                    // setHardsetArrays={setHardsetArrays}
                                    // isDuplicate={isDuplicate}
                                    key={indx + 224}
                                />
                            </Grid>
                        ) : null}

                        {result['ProdName3'][0] !== '0' &&
                        result['ProdName3'][0] !== 'T' ? (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                className={
                                    classes[`cardGridItem${ColorPickerSM(3)}`]
                                }
                            >
                                <CardItem
                                    result={result}
                                    indx={indx}
                                    prodNum={3}
                                    addToCart={addToCart}
                                    setHardArray={setHardArray}
                                    // setHardsetArrays={setHardsetArrays}
                                    // isDuplicate={isDuplicate}
                                    key={indx + 226}
                                />
                            </Grid>
                        ) : null}
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            justifyContent="center"
                            // className={classes.cardGridCart}
                            className={classes.ClusterButtonGrid}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                key={indx}
                                onClick={
                                    () =>
                                        // addToCart(
                                        //   result[`ProdName${prodNum}`],
                                        //   result[`ProdPrice${prodNum}`],
                                        //   result[`ProdPath${prodNum}`]
                                        // )
                                        {
                                            findCheapest(
                                                result,
                                                indx,
                                                addToCart
                                            );
                                        }
                                    // findCheapestV2(result, indx)
                                }
                            >
                                💰 Αuto Choose 💰
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </React.Fragment>
    );
}
