import { Button, Container, Divider } from '@material-ui/core';
import Images from '../../Images/imageExporter.js';
import imageNotFound from '../../Images/imageNotFound.jpg';
import useStyles from '../../styles.js';
import { useEffect } from 'react';

// const getImgString = function (element) {
//     if (element === '0') {
//         console.error(
//             new Error("CardItem.jsx: 😅 Product Doesn't have and image")
//         );
//         return false;
//     }
//     const imgIndex = element.indexOf('.');

//     return element.substring(6, imgIndex);
// };

const getImgString = function (element) {
    if (element === '0') {
        console.error(
            new Error("CardItem.jsx: 😅 Product Doesn't have and image")
        );
        return { exist: false, alt: imageNotFound };
    }
    const imgIndex = element.indexOf('.');

    return { exist: true, image: element.substring(6, imgIndex) };
};

// Props:
// - item: is an element => Cart.jsx cartItems array which comes => App.jsx State
// - addToCart: function
// - removeFromCart: function
const CartItem = ({
    item,
    addToCart,
    removeFromCart,
    setSoftArray,
    setHardArray,
    cartItems,
    softArray,
    softItem,
    hardArray,
}) => {
    const classes = useStyles();

    const wantedImage = getImgString(item.path);

    const softItemExists = cartItems.find((el, index) => {
        if (el.softC <= 0) {
            return false;
        }
        if (el.name === item.name) {
            return true;
        }
        return false;
    });

    const hardItemExists = cartItems.find((el, index) => {
        if (el.hardC <= 0) {
            return false;
        }
        if (el.name === item.name) {
            return true;
        }
        return false;
    });

    return (
        <>
            <div className={classes.cartItem}>
                <h3>{item.name.toString()}</h3>
                <h3
                    style={{
                        fontSize: '18px',
                        color: 'blue',
                    }}
                >
                    Market: {item.market}
                </h3>
                <div className={classes.cartItemInformation}>
                    <p>Price: €{item.price}</p>
                    <p>Total: €{(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className={classes.cartItemInformation}>
                    <p>Amount: {item.amount}</p>
                </div>
                {hardItemExists && (
                    <div className={classes.cartItemButtons}>
                        <Button
                            size="small"
                            aria-details="removeFromCart-Button"
                            disableElevation
                            variant="contained"
                            onClick={() => {
                                setHardArray((prev) => {
                                    const itemInHardArray = prev.find(
                                        (element) => element.name === item.name
                                    );
                                    const hasMoreThan2 =
                                        itemInHardArray.hardC === 1
                                            ? false
                                            : true;

                                    if (hasMoreThan2) {
                                        console.log('BBBBBBBBBBBB');

                                        // hasAmount -> bigger than 1
                                        return prev.map((element) =>
                                            element.name === item.name
                                                ? {
                                                      ...element,
                                                      amount:
                                                          element.amount - 1,
                                                      hardC: element.hardC - 1,
                                                  }
                                                : element
                                        );
                                    } else {
                                        console.log('AAAAAAAAAAAA');
                                        // hasAmount -> bigger === 1
                                        const itemIndex = prev.findIndex(
                                            (element) =>
                                                element.name === item.name
                                        );
                                        const asd = prev.slice(itemIndex + 1);
                                        console.log(asd);
                                        return asd;
                                    }
                                });

                                if (item.hardC > 0)
                                    removeFromCart(item.name, false);
                            }}
                            style={{ fontSize: '24px' }}
                        >
                            -
                        </Button>
                        <p>{item.hardC}</p>
                        <Button
                            size="small"
                            aria-details="addToCart-Button"
                            disableElevation
                            variant="contained"
                            style={{ fontSize: '24px' }}
                            onClick={() => {
                                setHardArray((prev) =>
                                    prev.map((element) =>
                                        element.name === item.name
                                            ? {
                                                  ...element,
                                                  amount: element.amount + 1,
                                                  hardC: element.hardC + 1,
                                              }
                                            : element
                                    )
                                );
                                addToCart(item.name, '_', '_', '_', '_', false);
                            }}
                        >
                            +
                        </Button>
                    </div>
                )}

                {softItemExists && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '12px',
                        }}
                    >
                        <Button
                            size="small"
                            aria-details="removeFromSSA-Button"
                            disableElevation
                            variant="contained"
                            style={{
                                backgroundColor: 'green',
                                fontSize: '24px',
                            }}
                            onClick={() => {
                                setSoftArray((prev) => {
                                    const itemInSoftArray = prev.find(
                                        (element) => element.name === item.name
                                    );
                                    const hasAmount =
                                        itemInSoftArray.qnt === 1 ||
                                        itemInSoftArray.qnt === undefined
                                            ? true
                                            : false;

                                    if (!hasAmount) {
                                        return prev.map((element) =>
                                            element.name === item.name
                                                ? {
                                                      ...element,
                                                      qnt: element.qnt - 1,
                                                  }
                                                : element
                                        );
                                    } else {
                                        const itemIndex = prev.findIndex(
                                            (element) =>
                                                element.name === item.name
                                        );
                                        console.log(
                                            'Removed the item: ',
                                            softArray[itemIndex]
                                        );
                                        const asd = prev.splice(itemIndex, 1);
                                        return prev;
                                    }
                                });
                                if (item.softC > 0)
                                    removeFromCart(item.name, true);
                            }}
                        >
                            -
                        </Button>
                        <p>{item.softC}</p>
                        <Button
                            size="small"
                            aria-details="addToSSA-Button"
                            disableElevation
                            variant="contained"
                            style={{
                                backgroundColor: 'green',
                                fontSize: '24px',
                            }}
                            onClick={() => {
                                setSoftArray((prev) => {
                                    const filteredArray = prev.filter(
                                        (element) => element.qnt > 0
                                    );
                                    if (!filteredArray) {
                                        console.log('12312313231****');
                                        return [];
                                    }

                                    return prev.map((element) =>
                                        element.name === item.name
                                            ? {
                                                  ...element,
                                                  qnt: element.qnt + 1,
                                              }
                                            : element
                                    );
                                });
                                addToCart(item.name, '_', '_', '_', '_', true);
                            }}
                        >
                            +
                        </Button>
                    </div>
                )}
            </div>
            <Container maxWidth="sm" className={classes.cartItemContainer}>
                <img
                    className={classes.cartItemImg}
                    height={'300px'}
                    src={
                        wantedImage.exist
                            ? Images[wantedImage.image - 1]?.default
                            : imageNotFound
                    }
                    alt={item.name.toString()}
                />
                <br />
                <br />
                <br />
                {/* <Typography>
          {?}
        </Typography> */}
                <Divider />

                <br />
            </Container>
        </>
    );
};

export default CartItem;
