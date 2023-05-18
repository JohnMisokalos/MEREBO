import React from 'react';
import Images from '../Images/imageExporter.js';
import imageNotFound from '../Images/imageNotFound.jpg';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@material-ui/core';
import TransitionsModal from './Modal';
import useStyles from '../styles.js';

export default function CardItem({
    result,
    indx,
    prodNum,
    addToCart,
    setHardArray,
    // setHardsetArrays,
}) {
    // const [currentImg, setCurrentImg] = useState("");

    // -- Styles --
    // Ctrl+P => "styles.js"
    const classes = useStyles();

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

    const wantedImage = getImgString(result[`ProdPath${prodNum}`].toString());

    return (
        <Card className={classes.card} key={indx + 124}>
            {/* {console.log("----   Entering Card   ----")}
      {console.log("Card: ProdName: ", result[`ProdName${prodNum}`].toString())}
      {console.log("Card: ProdPath: ", result[`ProdPath${prodNum}`].toString())}
      {console.log("Card: Returned Image.exist: ", wantedImage.exist)}
      {console.log("Card: Returned Image.alt: ", wantedImage.alt)}
      {console.log("Card: Returned Image.image: ", wantedImage.image)} */}
            {/* {console.log("Card: All Images: " + Images[254].default)} */}
            {wantedImage.exist ? (
                <CardMedia
                    className={classes.cardMedia}
                    image={Images[Number(wantedImage.image) - 1]?.default}
                    title="Image title"
                />
            ) : (
                <CardMedia
                    className={classes.cardMedia}
                    image={wantedImage.alt}
                    title="Image title"
                />
            )}
            <CardContent className={classes.cardContent}>
                {/* {console.log("  ---  Creating Card Content  ---")}
        {console.time("Card Creation Benchmark")} */}
                <Typography>{result[`ProdName${prodNum}`]}</Typography>
            </CardContent>
            <CardActions>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <TransitionsModal
                            index={indx}
                            item={result}
                            prodNum={prodNum}
                            addToCart={addToCart}
                            setHardArray={setHardArray}
                            // setHardsetArrays={setHardsetArrays}
                            key={indx + 25}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h6"
                            align="center"
                            className={classes.cardPrice}
                            gutterBottom
                        >
                            {result[`ProdPrice${prodNum}`].toString() === 'OOS'
                                ? 'Out Of Stock'
                                : result[`ProdPrice${prodNum}`].toString()}
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
            {/* {console.timeEnd("Card Creation Benchmark")} */}
            {/* {console.log("###  End of Card ###")} */}
        </Card>
    );
}
