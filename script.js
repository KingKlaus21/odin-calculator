'use strict'

// let a = 25;
// let b = 5;
// let operator = '';

const calculatorValues = {
    a: null,
    b: null,
    operator: null,
    previousClass: null,
    previousValue: null,
    calculation: null
}


const addNums = (a,b) => a + b;
const subtractNums = (a,b) => a - b;
const multiplyNums = (a,b) => a * b;
const divideNums = (a,b) => a / b;
const percentNums = (a,b) => b / (100 / a);


function operate(a,b,operator) {
    switch (operator) {
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
                    return useNumber("number", itemText);
                case("operator"):
                    return useOperator("operator", itemText);
                default:
                    break;
                    // in case I accidentally add a style class it will go to id switch case
            }
        }
        else {
            switch(itemId) {
                case("clear"):
                    return useClear("clear", itemText);
                case("delete"):
                    return useDelete("delete", itemText);
                case("decimal"):
                    return useDecimal("decimal", itemText);
                case("posNeg"):
                    return usePosNeg("posNeg", itemText);
                case("equals"):
                    return useEquals("equals", itemText);
            }
        }
    }
});



function useNumber(tag, val) {

}

function useOperator(tag, val) {
    
}



function useClear(tag, val) {

}

function useDelete(tag, val) {

}

function useDecimal(tag, val) {
    
}

function usePosNeg(tag, val) {
    
}

function useEquals(tag, val) {
    // dont write this yet
}



