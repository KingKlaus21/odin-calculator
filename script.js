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
        console.log('Clicked:', item.target.textContent);
        console.log(item.target.className);
        console.log(Boolean(item.target.className));

        if (Boolean(item.target.className) === true) {
            switch(item.target.className) {
                case("number"):
                    return handleValue("number", item.target.textContent);
                case("operator"):
                    return handleValue("operator", item.target.textContent);
                default:
                    break;
                    // in case I accidentally add a style class it will go to id switch case
            }
        }
        else {
            switch(item.target.id) {
                case("clear"):
                    return handleValue("clear", item.target.textContent);
                case("delete"):
                    return handleValue("delete", item.target.textContent);
                case("decimal"):
                    return handleValue("decimal", item.target.textContent);
                case("posNeg"):
                    return handleValue("posNeg", item.target.textContent);
                case("equals"):
                    return handleValue("equals", item.target.textContent);
            }
        }
    }
});



function handleValue(tag, val) {
    console.log(`The tag is ${tag} and the val is ${val}`);
}




