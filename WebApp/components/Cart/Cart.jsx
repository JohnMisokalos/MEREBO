import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import useStyles from '../../styles.js';
import { softSetArrayImporter, hardSetArrayImporter } from './CartOptimization';

// Props:
// - cartItems: is an array from App.jsx State
// - addToCart: function
// - removeFromCart: function
// const totalSums = { a: 0, b: 0, c: 0 };
function createHardsetSums(items) {
    let curA = 0;
    let curB = 0;
    let curC = 0;
    // console.log("HardSet: ", items);

    for (let i = 0; i < items.length; i++) {
        if (items[i].market === 'SKLV' && !items[i].softSet)
            curA += items[i].amount * items[i].price;

        if (items[i].market === 'AB' && !items[i].softSet)
            curB += items[i].amount * items[i].price;

        if (items[i].market === 'XALK' && !items[i].softSet)
            curC += items[i].amount * items[i].price;

        console.log('The HardSet Sums: ', curA, curB, curC);
    }
    return [curA, curB, curC];
}

const Cart = ({
    cartItems,
    addToCart,
    removeFromCart,
    softArray,
    setSoftArray,
    setCartItems,
    totalSums,
    hardArray,
    createSums,
    setHardArray,
}) => {
    useEffect(() => {
        console.log('Use Effect!');
        console.log('hardArray: ', hardArray);
        createSums(cartItems);
    }, [cartItems]);

    const calculateTotal = (items) =>
        items.reduce((acc, item) => {
            return acc + item.amount * item.price;
            // return acc + item.amount * item.price;
        }, 0);

    function looper(array) {
        const initialValue = 0;
        const a = array.reduce((acc, item) => acc + item.amount, initialValue);
        return a;
    }

    function findProperty(property, itemDetails, number, wholeItem) {
        if (number === 1) {
            // SKLV
            console.log(`findProperty, SKLV Details: `, itemDetails);
            console.log(`findProperty, SKLV Item: `, wholeItem);

            const rightNumberSting = Object.keys(itemDetails).find(
                (key) => itemDetails[key][0] === 1
            );
            const rightNumber = parseInt(rightNumberSting.slice(-1));

            if (property === 'name') {
                return itemDetails[`ProdName${rightNumber}`].toString();
            }

            if (property === 'path') {
                return itemDetails[`ProdPath${rightNumber}`].toString();
            }
        }

        if (number === 2) {
            // AB
            console.log(`findProperty, AB Details: `, itemDetails);
            console.log(`findProperty, AB Item: `, wholeItem);

            const rightNumberSting = Object.keys(itemDetails).find(
                (key) => itemDetails[key][0] === 2
            );
            const rightNumber = parseInt(rightNumberSting.slice(-1));

            if (property === 'name') {
                return itemDetails[`ProdName${rightNumber}`].toString();
            }

            if (property === 'path') {
                return itemDetails[`ProdPath${rightNumber}`].toString();
            }
        }

        if (number === 3) {
            // XALK
            console.log(`findProperty, XALK Details: `, itemDetails);
            console.log(`findProperty, XALK Item: `, wholeItem);

            const rightNumberSting = Object.keys(itemDetails).find(
                (key) => itemDetails[key][0] === 3
            );
            const rightNumber = parseInt(rightNumberSting.slice(-1));

            if (property === 'name') {
                return itemDetails[`ProdName${rightNumber}`].toString();
            }

            if (property === 'path') {
                return itemDetails[`ProdPath${rightNumber}`].toString();
            }
        }
    }

    function findProdNumFromName(name, item) {
        const targetValue = name.toString();

        const targetProperty = Object.keys(item).find(
            (key) => item[key][0] === targetValue
        );

        const prodNum = parseInt(targetProperty.replace(/\D/g, ''));
        return prodNum;
    }

    function updateCart() {
        console.log('asdasd: ', createHardsetSums(cartItems));
        hardSetArrayImporter(createHardsetSums(cartItems)); // giving hardSet sums to CartOptimization.js
        const simplexResult = softSetArrayImporter(softArray);

        console.log('Cart.jsx -> updateCart(): Simplex:', simplexResult);

        if (Array.isArray(simplexResult)) {
            setCartItems([]);
            console.log(
                'Here is the SoftArray we are going to use: ',
                simplexResult
            );
            console.log('Do We have a Hard Array?: ', Boolean(hardArray));

            //HardsetArray
            if (hardArray) {
                for (let i = 0; i < hardArray.length; i += 1) {
                    addToCart(
                        hardArray[i].name,
                        hardArray[i].price,
                        hardArray[i].path,
                        hardArray[i].itemProps,
                        hardArray[i].market,
                        hardArray[i].softSet
                    );
                }
            }
            console.log('Added Hard Array to Cart: ', hardArray);

            // SoftArray from Simplex
            for (let i = 0; i < simplexResult.length; i += 1) {
                const item = simplexResult[i];
                const itemDetails = simplexResult[i].itemProps;

                console.log('After Simplex, Recreating CartItem: ', item);

                if ('X1' in item) {
                    for (let i = 1; i < 4; i += 1) {
                        if (item[`X${i}`]) {
                            console.log(
                                i + ') Creating Item from Simple Array:',
                                item
                            );
                            addToCart(
                                findProperty('name', itemDetails, i, item),
                                item[`price${i}`],
                                findProperty('path', itemDetails, i, item),
                                item,
                                item[`Super${i}`],
                                true,
                                item[`X${i}`]
                            );
                        }
                    }
                }
            }
        } else if (typeof simplexResult === 'boolean') {
            if (simplexResult) {
                setCartItems([]);

                if (hardArray) {
                    for (let i = 0; i < hardArray.length; i += 1) {
                        addToCart(
                            hardArray[i].name,
                            hardArray[i].price,
                            hardArray[i].path,
                            hardArray[i].itemProps,
                            hardArray[i].market,
                            hardArray[i].softSet
                        );
                    }
                }

                for (let i = 0; i < softArray.length; i += 1) {
                    const item = softArray[i];
                    const itemDetails = softArray[i].itemProps;
                    const prodNum = findProdNumFromName(item.name, itemDetails);

                    console.log(item, prodNum, itemDetails);
                    addToCart(
                        item.name,
                        item.cheapestPrice,
                        itemDetails[`ProdPath${prodNum}`][0],
                        item,
                        item.cheapestMarket,
                        true,
                        item.qnt
                    );
                }
                setTimeout(() => {
                    alert('There is no need for Optimization');
                }, 350);
            } else {
                alert(
                    'The SuperMarket Delivery Limits can not be satified whichever combination is used. Please add more products.'
                );
            }
        } else {
            alert('Cart.jsx -> updateCart(): Something went terribly wrong!');
        }
        console.log('ssssssssss', cartItems);
    }

    const classes = useStyles();

    return (
        <div className={classes.cart}>
            <div style={{ display: 'block', justifyContent: 'space-between' }}>
                <h1>🛒 Your Shopping Cart</h1>
                {/* <button onClick={() => createSums(cartItems)}>Refresh</button> */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        updateCart();
                        // TODO: When Optize is pressed, refresh Sums in Cart
                    }}
                >
                    Optimize
                </Button>
            </div>
            <div>
                <h3
                    style={{
                        fontSize: '26px',
                    }}
                >
                    Total{' '}
                    <span
                        style={{
                            color: 'yellow',
                            textShadow: '2px 2px 5px black',
                        }}
                    >
                        SKLV
                    </span>
                    : {totalSums.a.toFixed(2)}
                </h3>
                <h3
                    style={{
                        fontSize: '26px',
                    }}
                >
                    Total{' '}
                    <span
                        style={{
                            color: 'orange',
                            textShadow: '2px 2px 5px black',
                        }}
                    >
                        AB
                    </span>
                    : {totalSums.b.toFixed(2)}
                </h3>
                <h3
                    style={{
                        fontSize: '26px',
                    }}
                >
                    Total{' '}
                    <span
                        style={{
                            color: 'red',
                            textShadow: '2px 2px 5px black',
                        }}
                    >
                        XALK
                    </span>
                    : {totalSums.c.toFixed(2)}
                </h3>
                <h3
                    style={{
                        fontSize: '26px',
                    }}
                >
                    Total Amount: {looper(cartItems)}
                </h3>
            </div>

            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map((item, indx) => (
                <CartItem
                    key={indx}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    setSoftArray={setSoftArray}
                    softArray={softArray}
                    softItem={softArray[indx]}
                    setHardArray={setHardArray}
                    hardArray={hardArray}
                    cartItems={cartItems}
                />
            ))}
            {console.log('Cart.jsx: cartItems', cartItems)}
            {console.log('Cart.jsx: SoftArray', softArray)}
            {console.log('Cart.jsx: HardArray', hardArray)}
            <h2>Total: €{calculateTotal(cartItems).toFixed(2)}</h2>
        </div>
    );
};

export default Cart;
