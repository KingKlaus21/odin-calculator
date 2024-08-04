'use strict'

// let a = 25;
// let b = 5;
// let operator = '';

const calcVals = {
    a: null,
    b: null,
    op: null,
    prevType: null, //formerly previousClass
    prevVal: null,
    ans: null,
}


const addNums = (a,b) => a + b;
const subtractNums = (a,b) => a - b;
const multiplyNums = (a,b) => a * b;
const divideNums = (a,b) => a / b;
const percentNums = (a,b) => b / (100 / a);


function operate(a,b,op) {
    switch(op) {
        case("+"):
            return addNums(a,b);
        case("-"):
            return subtractNums(a,b);
        case("x"):
            return multiplyNums(a,b);
        case("/"):
            return divideNums(a,b);
        case("%"):
            return percentNums(a,b);
    }
}

const calculatorButtonContainer = document.getElementById("calculatorButtonContainer");

calculatorButtonContainer.addEventListener('click', (item) => {
    if (item.target !== calculatorButtonContainer) {

        // console.log('Clicked:', item.target.textContent);
        // console.log(item.target.className);
        // console.log(Boolean(item.target.className));

        const itemClass = item.target.className;
        const itemId = item.target.id;
        const itemText = item.target.textContent;

        if (Boolean(itemClass) === true) {
            switch(itemClass) {
                case("number"):
                    return useNumber(itemText);
                case("operator"):
                    return useOperator(itemText);
                default:
                    break;
                    // in case I accidentally add a style class it will go to id switch case
            }
        }
        else {
            switch(itemId) {
                case("clear"):
                    return useClear(itemText);
                case("delete"):
                    return useDelete(itemText);
                case("decimal"):
                    return useDecimal(itemText);
                case("posNeg"):
                    return usePosNeg(itemText);
                case("equals"):
                    return useEquals(itemText);
            }
        }
    }
});

const calculatorScreen = document.getElementById("calculatorScreen");
// let screenVal = calculatorScreen.textContent;

console.table(calcVals);

function useNumber(val) {
    
    switch(calcVals.prevType) {
        case(null):
            console.log("null useNum ran");
            calcVals.a = val;
            calcVals.prevType = "A";
            calcVals.prevVal = calcVals.a;
            calculatorScreen.textContent = calcVals.a;
            console.table(calcVals);
            break;
        case("A"):
            console.log("number useNum ran");
            calcVals.a += val;
            calcVals.prevType = "A"; // make OP to test.  normally A
            calcVals.prevVal = calcVals.a;
            calculatorScreen.textContent = calcVals.a;
            console.table(calcVals);
            break;
        case("OP"):
            console.log("number useNum ran");
            calcVals.b = val;
            calcVals.prevType = "B";
            calcVals.prevVal = calcVals.b;
            calculatorScreen.textContent = calcVals.b;
            console.table(calcVals);
            break;
        case("B"):
            console.log("number useNum ran");
            calcVals.b += val;
            calcVals.prevType = "B";
            calcVals.prevVal = calcVals.b;
            calculatorScreen.textContent = calcVals.b;
            console.table(calcVals);
            break;
    }

}

function useOperator(val) {
    
}



function useClear(val) {

}

function useDelete(val) {

}

function useDecimal(val) {
    
}

function usePosNeg(val) {
    
}

function useEquals(val) {
    // dont write this yet
}



