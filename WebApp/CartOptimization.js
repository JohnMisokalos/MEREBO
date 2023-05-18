// const { softSetArray } = require("./Simple-Simplex");
// const { testData1 } = require("./testData.js");

// const testObj = { X11: 1, X22: 2, X31: 3 };
// for (const [key, value] of Object.entries(testObj)) {
//   console.log(key, value);
// }
// const { testData1 } = require("./testData.js");
// const softSetArray = testData1;

let curA = 0;
let curB = 0;
let curC = 0;
let deliveryA = 15 - curA;
let deliveryB = 30 - curB;
let deliveryC = 45 - curC;
let softSetArrayOriginal;
let softSetArray;
let optQntMatrix = [[], [], []];
let priceMatrix = [[], [], []];
let quantity = [];

function hardSetArrayImporter(array) {
    console.log('@@ HSI: ', array);
    curA = array[0];
    curB = array[1];
    curC = array[2];
    deliveryA = 15 - curA;
    deliveryB = 30 - curB;
    deliveryC = 45 - curC;
    console.log('@@ HSI curA: ', array);
}

function softSetArrayImporter(array) {
    optQntMatrix = [[], [], []];
    priceMatrix = [[], [], []];
    let super1Temp;
    let super2Temp;
    let super3Temp;
    let price1Temp;
    let price2Temp;
    let price3Temp;

    quantity = [];
    // console.log("CartOPT: SSA Importer: ", array);

    console.log('CartOPT: SSA Importer: ', array);
    console.log('CartOPT: SSA Importer: ', array);
    softSetArrayOriginal = [...array];
    softSetArray = [...softSetArrayOriginal];
    console.log('CartOPT: SSA softSetArrayOriginal: ', softSetArrayOriginal);
    console.log('CartOPT: SSA softSetArray: ', softSetArray);

    for (let i = 0; i < softSetArray.length; i++) {
        super1Temp = softSetArray[i].Super1;
        super2Temp = softSetArray[i].Super2;
        super3Temp = softSetArray[i].Super3;
        price1Temp = softSetArray[i].price1;
        price2Temp = softSetArray[i].price2;
        price3Temp = softSetArray[i].price3;
        softSetArray[i].flag1 = false;
        softSetArray[i].flag2 = false;
        softSetArray[i].flag3 = false;
        for (let j = 1; j <= 3; j++) {
            if (softSetArray[i][`Super${j}`] === 'SKLV') {
                super1Temp = softSetArray[i][`Super${j}`];
                price1Temp = softSetArray[i][`price${j}`];
                softSetArray[i].flag1 = true;
            } else if (softSetArray[i][`Super${j}`] === 'AB') {
                super2Temp = softSetArray[i][`Super${j}`];
                price2Temp = softSetArray[i][`price${j}`];
                softSetArray[i].flag2 = true;
            } else if (softSetArray[i][`Super${j}`] === 'XALK') {
                super3Temp = softSetArray[i][`Super${j}`];
                price3Temp = softSetArray[i][`price${j}`];
                softSetArray[i].flag3 = true;
            }
        }
        if (!softSetArray[i].flag1) {
            super1Temp = null;
            price1Temp = null;
        }
        if (!softSetArray[i].flag2) {
            super2Temp = null;
            price2Temp = null;
        }
        if (!softSetArray[i].flag3) {
            super3Temp = null;
            price3Temp = null;
        }
        softSetArray[i].Super1 = super1Temp;
        softSetArray[i].Super2 = super2Temp;
        softSetArray[i].Super3 = super3Temp;

        softSetArray[i].price1 = price1Temp;
        softSetArray[i].price2 = price2Temp;
        softSetArray[i].price3 = price3Temp;
    }
    quantityFiller();
    extractSoftSet();
    return main();
}

function intsMaker(super1, super2, super3) {
    const returnedObj = {};
    if (super1) {
        for (let i = 0; i < softSetArray.length; i++) {
            returnedObj[`X1${i + 1}`] = 1;
        }
    }
    if (super2) {
        for (let i = 0; i < softSetArray.length; i++) {
            returnedObj[`X2${i + 1}`] = 1;
        }
    }
    if (super3) {
        for (let i = 0; i < softSetArray.length; i++) {
            returnedObj[`X3${i + 1}`] = 1;
        }
    }
    console.log('intsMaker(): ', returnedObj);
    return returnedObj;
}
function simplexCaller(super1, super2, super3) {
    var solver = require('../../../node_modules/javascript-lp-solver/src/solver'),
        results,
        calcQuantities = {},
        model = {
            optimize: 'finPrice',
            opType: 'min',
            constraints: constraintsMaker(super1, super2, super3),
            variables: variableMaker(super1, super2, super3),
            ints: intsMaker(super1, super2, super3),
        };

    results = solver.Solve(model);
    calcQuantities = { ...results };
    console.log('From inside SimplexCaller: ', results);

    delete calcQuantities.feasible;
    delete calcQuantities.result;
    delete calcQuantities.bounded;
    delete calcQuantities.isIntegral;

    console.log('A: ', results.result);
    console.log('B: ', results.feasible);

    console.log('From simplexCaller(), calcQuantities: ', calcQuantities);

    return {
        finPrice: results.result,
        isFeasible: results.feasible,
        calcQuantities,
    };
}

// console.log("MySolver: ", solver2.Solve(model2));

function quantityFiller() {
    for (let i = 0; i < softSetArray.length; i++) {
        quantity.push(softSetArray[i].qnt);
    }
}
// console.log("Quantity: ", quantity);

function extractSoftSet() {
    console.log('extractSoftSet: ', softSetArray.length);
    for (let i = 0; i < softSetArray.length; i++) {
        priceMatrix[0].push(softSetArray[i].price1); //[[],[],[]]
        priceMatrix[1].push(softSetArray[i].price2);
        priceMatrix[2].push(softSetArray[i].price3); //null

        console.log('priceMatrix Loop:', i, priceMatrix[0]);
        console.log('priceMatrix AAAAAA:', softSetArray[i].price1);

        optQntMatrix[0].push(0);
        optQntMatrix[1].push(0);
        optQntMatrix[2].push(0);
    }
    console.log('priceMatrix', priceMatrix);
    console.log('optQntMatrix', optQntMatrix);
}

function areWeGood() {
    let sumA = 0;
    let sumB = 0;
    let sumC = 0;
    console.log('1. AreWeGood:', softSetArray);
    for (let i = 0; i < softSetArray.length; i++) {
        if (softSetArray[i].cheapestMarket === 'SKLV') {
            sumA += softSetArray[i].cheapestPrice * softSetArray[i].qnt;
            console.log(
                'Are we good: IF ',
                softSetArray[i].cheapestPrice,
                softSetArray[i].qnt
            );
        } else if (softSetArray[i].cheapestMarket === 'AB') {
            sumB += softSetArray[i].cheapestPrice * softSetArray[i].qnt;
        } else if (softSetArray[i].cheapestMarket === 'XALK') {
            sumC += softSetArray[i].cheapestPrice * softSetArray[i].qnt;
        }
    }

    console.log('Are we good, Sums: ', sumA, sumB, sumC);
    console.log('Are we good Limits: ', deliveryA, deliveryB, deliveryC);
    if (
        (sumA >= deliveryA || (sumA === 0 && deliveryA <= 0)) &&
        (sumB >= deliveryB || (sumB === 0 && deliveryB <= 0)) &&
        (sumC >= deliveryC || (sumC === 0 && deliveryC <= 0))
    )
        return true;
    return false;
}

function constraintsMaker(super1, super2, super3) {
    const constraints = {};
    if (super1) {
        constraints['sm1Delivery'] = {
            min: deliveryA,
        };
        // } else {
        //   constraints["sm1Delivery"] = {
        //     max: 0,
        //   };
    }

    if (super2) {
        constraints['sm2Delivery'] = {
            min: deliveryB,
        };
        // } else {
        //   constraints["sm2Delivery"] = {
        //     max: 0,
        //   };
    }

    if (super3) {
        constraints['sm3Delivery'] = {
            min: deliveryC,
        };
        // } else {
        //   constraints["sm3Delivery"] = {
        //     max: 0,
        //   };
    }

    for (let i = 0; i < softSetArray.length; i++) {
        constraints[`X${i + 1}demand`] = {
            min: quantity[i],
            max: quantity[i],
        };
    }
    console.log('ConstraintsMaker(): ', constraints);
    return constraints;
}

function variableMaker(super1, super2, super3) {
    let globalObj = {};
    let demand1 = {};
    let demand2 = {};
    let demand3 = {};

    console.log(super1, super2, super3);
    if (super1) {
        for (let i = 0; i < softSetArray.length; i++) {
            if (
                priceMatrix[0][i] !== 'OOS' &&
                priceMatrix[0][i] !== null &&
                priceMatrix[0][i] !== 0
            ) {
                const xxx = {};
                xxx[`X${i + 1}demand`] = 1;
                xxx[`sm1Delivery`] = priceMatrix[0][i];
                xxx[`finPrice`] = priceMatrix[0][i];
                demand1[`X1${i + 1}`] = xxx;

                globalObj[`X1${i + 1}`] = demand1[`X1${i + 1}`];
            }
        }
    }
    if (super2) {
        for (let i = 0; i < softSetArray.length; i++) {
            if (
                priceMatrix[1][i] !== 'OOS' &&
                priceMatrix[1][i] !== null &&
                priceMatrix[1][i] !== 0
            ) {
                const xxx = {};
                xxx[`X${i + 1}demand`] = 1;
                xxx[`sm2Delivery`] = priceMatrix[1][i];
                xxx[`finPrice`] = priceMatrix[1][i];
                demand2[`X2${i + 1}`] = xxx;

                globalObj[`X2${i + 1}`] = demand2[`X2${i + 1}`];
            }
        }
    }
    if (super3) {
        for (let i = 0; i < softSetArray.length; i++) {
            if (
                priceMatrix[2][i] !== 'OOS' &&
                priceMatrix[2][i] !== null &&
                priceMatrix[2][i] !== 0
            ) {
                const xxx = {};
                xxx[`X${i + 1}demand`] = 1;
                xxx[`sm3Delivery`] = priceMatrix[2][i];
                xxx[`finPrice`] = priceMatrix[2][i];
                demand3[`X3${i + 1}`] = xxx;

                globalObj[`X3${i + 1}`] = demand3[`X3${i + 1}`];
            }
        }
    }
    console.log('VariableMaker(): ', globalObj);
    return globalObj;
}

function resultFinder(resultArray) {
    let tempResult = {};
    let flag = false;
    resultArray.forEach((result) => {
        if (flag) {
            if (result.finPrice < tempResult.finPrice) tempResult = result;
        } else {
            flag = true;
            tempResult = result;
        }
    });
    console.log('resultFinder(), tempResult: ', tempResult);
    return tempResult;
}

function main() {
    let resultArray = [];
    if (!areWeGood() && softSetArray.length > 0) {
        const result123 = simplexCaller(true, true, true); //solution: result,

        if (result123.isFeasible) resultArray.push(result123);

        let flag1 = false;
        for (let index = 0; index < priceMatrix[0].length; index++) {
            if (priceMatrix[0][index] === null) flag1 = true;
            if (flag1) break;
        }
        let flag2 = false;
        for (let index = 0; index < priceMatrix[1].length; index++) {
            //[[],[],[]]
            if (priceMatrix[1][index] === null) flag2 = true;
            if (flag2) break;
        }
        let flag3 = false;
        for (let index = 0; index < priceMatrix[2].length; index++) {
            //[[],[],[]]
            if (priceMatrix[2][index] === null) flag3 = true;
            if (flag3) break;
        }
        let flag12 = false;
        for (let index = 0; index < priceMatrix[0].length; index++) {
            //[[],[],[]]
            if (
                priceMatrix[0][index] === null &&
                priceMatrix[1][index] === null
            )
                flag12 = true;
            if (flag12) break;
        }
        let flag23 = false;
        for (let index = 0; index < priceMatrix[1].length; index++) {
            //[[],[],[]]
            if (
                priceMatrix[1][index] === null &&
                priceMatrix[2][index] === null
            )
                flag23 = true;
            if (flag23) break;
        }
        let flag13 = false;
        for (let index = 0; index < priceMatrix[0].length; index++) {
            //[[],[],[]]
            if (
                priceMatrix[0][index] === null &&
                priceMatrix[2][index] === null
            )
                flag13 = true;
            if (flag13) break;
        }
        if (!flag1 && curB === 0 && curC === 0) {
            const result1 = simplexCaller(true, false, false);

            console.log('result1: ', result1);

            if (result1.isFeasible) resultArray.push(result1);
        }

        if (!flag2 && curA === 0 && curC === 0) {
            const result2 = simplexCaller(false, true, false);
            console.log('result2: ', result2);

            if (result2.isFeasible) resultArray.push(result2);
        }
        if (!flag3 && curB === 0 && curA === 0) {
            const result3 = simplexCaller(false, false, true);
            console.log('result3: ', result3);

            if (result3.isFeasible) resultArray.push(result3);
        }
        if (!flag12 && curC === 0) {
            const result12 = simplexCaller(true, true, false);
            console.log('result12: ', result12);

            if (result12.isFeasible) resultArray.push(result12);
        }
        if (!flag23 && curA === 0) {
            const result23 = simplexCaller(false, true, true);
            console.log('result23: ', result23);

            if (result23.isFeasible) resultArray.push(result23);
        }
        if (!flag13 && curB === 0) {
            const result13 = simplexCaller(true, false, true);
            console.log('result13: ', result13);

            if (result13.isFeasible) resultArray.push(result13);
        }

        console.log('The Results: ', resultArray);
        // If it is not feasible, return empty object
        const finalResult = resultFinder(resultArray);
        console.log('FINAL RESULT: ', finalResult);

        const OPT_SSA = { ...finalResult };
        console.log(
            'Final Soft Set Array Quantities: ',
            // Object.keys(OPT_SSA).length !== 0
            OPT_SSA.calcQuantities
        );
        let ObjectID;
        if (Object.keys(OPT_SSA).length !== 0) {
            for (const [key, quantity] of Object.entries(
                OPT_SSA.calcQuantities
            )) {
                const newKey = key.replace(/\D/g, '');
                const superID = newKey[0];
                ObjectID = newKey.slice(1);
                // console.log("ObjectID: ", ObjectID);
                softSetArray[ObjectID - 1][`qnt${superID}`] = quantity;
            }
            softSetArray.feasible = true;

            for (let i = 0; i < softSetArray.length; i++) {
                softSetArray[i].X1 = OPT_SSA?.calcQuantities[`X1${i + 1}`];
                softSetArray[i].X2 = OPT_SSA?.calcQuantities[`X2${i + 1}`];
                softSetArray[i].X3 = OPT_SSA?.calcQuantities[`X3${i + 1}`];
            }

            for (let i = 0; i < softSetArray.length; i++) {
                let requiredSMs = [];
                if (softSetArray[i].X1) requiredSMs.push('SKLV');
                if (softSetArray[i].X2) requiredSMs.push('AB');
                if (softSetArray[i].X3) requiredSMs.push('XALK');
                softSetArray[i].neededSMs = requiredSMs;
            }

            console.log(`Final SSA: `, softSetArray);

            return softSetArray;
        }
        return false;
    } else if (areWeGood()) {
        return true;
        // console.log('We are good, Here is the SoftArray: ', softSetArray);
        // return softSetArray;
    } else if (
        (deliveryA <= 0 || deliveryA === 15) &&
        (deliveryB <= 0 || deliveryB === 30) &&
        (deliveryC <= 0 || deliveryC === 45) &&
        (deliveryA !== 15 || deliveryB !== 30 || deliveryC !== 45)
    ) {
        return true;
    } else return false;
}
module.exports = {
    softSetArrayImporter,
    hardSetArrayImporter,
    // softSetArray,
};

// X1i: 45;

// function simplexCallerSimpler() {
//   var solver = require("../../../node_modules/javascript-lp-solver/src/solver"),
//     results,
//     model = {
//       optimize: "finPrice",
//       opType: "min",
//       constraints: {
//         sm1Delivery: { min: 15 },
//         sm2Delivery: { min: 30 },
//         sm3Delivery: { min: 45 },
//         X1demand: { min: 1, max: 1 },
//         X2demand: { min: 1, max: 1 },
//         X3demand: { min: 1, max: 1 },
//         X4demand: { min: 1, max: 1 },
//       },
//       variables: {
//         X11: { finPrice: 155, sm1Delivery: 115, X1demand: 1 },
//         X12: { finPrice: 100, sm1Delivery: 100, X2demand: 1 },
//         X13: { finPrice: 333, sm1Delivery: 333, X3demand: 1 },
//         X14: { finPrice: 500, sm1Delivery: 500, X4demand: 1 },

//         X21: { finPrice: 112, sm2Delivery: 112, X1demand: 1 },
//         X22: { finPrice: 252, sm2Delivery: 252, X2demand: 1 },
//         X23: { finPrice: 343, sm2Delivery: 343, X3demand: 1 },
//         X24: { finPrice: 623, sm2Delivery: 623, X4demand: 1 },

//         X31: { finPrice: 227, sm3Delivery: 227, X1demand: 1 },
//         X32: { finPrice: 302, sm3Delivery: 302, X2demand: 1 },
//         X33: { finPrice: 355, sm3Delivery: 355, X3demand: 1 },
//         X34: { finPrice: 212, sm3Delivery: 212, X4demand: 1 },
//       },
//       // variables: {
//       //   X11: { finPrice: 155, sm1Delivery: 115, X1demand: 1, prod11: 1 },
//       //   X12: { finPrice: 100, sm1Delivery: 100, X2demand: 1, prod12: 1 },
//       //   X13: { finPrice: 100, sm1Delivery: 100, X3demand: 1, prod12: 1 },
//       //   X14: { finPrice: 100, sm1Delivery: 100, X4demand: 1, prod12: 1 },

//       //   X21: { finPrice: 155, sm1Delivery: 115, X1demand: 1, prod11: 1 },
//       //   X22: { finPrice: 100, sm1Delivery: 100, X2demand: 1, prod12: 1 },
//       //   X23: { finPrice: 100, sm1Delivery: 100, X3demand: 1, prod12: 1 },
//       //   X24: { finPrice: 100, sm1Delivery: 100, X4demand: 1, prod12: 1 },

//       //   X31: { finPrice: 155, sm1Delivery: 115, X1demand: 1, prod11: 1 },
//       //   X32: { finPrice: 100, sm1Delivery: 100, X2demand: 1, prod12: 1 },
//       //   X33: { finPrice: 100, sm1Delivery: 100, X3demand: 1, prod12: 1 },
//       //   X34: { finPrice: 100, sm1Delivery: 100, X4demand: 1, prod12: 1 },
//       // },
//       // ints: {
//       //   X: 1,
//       //   X: 1,
//       //   X: 1,
//       //   X: 1,
//       //   X: 1,
//       //   X: 1,
//       // },
//       // ints: intsMaker(super1, super2, super3),
//     };

//   results = solver.Solve(model);
//   console.log("TEST!!: ", results);

//   //  return {finPrice, isOptimal}
// }
// simplexCallerSimpler();

//Dummy Data

// const softSetArray = [
//   {
//     priceA: 115,
//     priceB: 112,
//     priceC: 227,
//     Super1: 1,
//     Super2: 2,
//     Super3: 3,
//     qnt: 1,
//     cheapestMarket: 1,
//     cheapestPrice: 5.4,
//   },
//   {
//     priceA: 100,
//     priceB: 252,
//     priceC: 302,
//     Super1: 1,
//     Super2: 2,
//     Super3: 3,
//     qnt: 1,
//     cheapestMarket: 2,
//     cheapestPrice: 25,
//   },
//   {
//     priceA: 333,
//     priceB: 443,
//     priceC: 355,
//     qnt: 1,
//     cheapestMarket: 1,
//     cheapestPrice: 3,
//     // Super1: 1,
//     // Super2: 2,
//     // Super3: 3,
//   },
//   {
//     priceA: 500,
//     priceB: 623,
//     priceC: 212,
//     Super1: 1,
//     Super2: 2,
//     Super3: 3,
//     qnt: 1,
//     cheapestMarket: 3,
//     cheapestPrice: 2.1,
//   },
// ];
