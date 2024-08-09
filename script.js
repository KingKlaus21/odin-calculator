'use strict'


const calcVals = {
    a: null,
    b: null,
    op: null,
    prevType: null,
    ans: null
}


const calculatorButtonContainer = document.getElementById("calculatorButtonContainer");
const calculatorScreen = document.getElementById("calculatorScreen");


// const addNums = (a,b) => a + b;
// const subtractNums = (a,b) => a - b;
// const multiplyNums = (a,b) => a * b;
// const divideNums = (a,b) => a / b;
// const percentNums = (a,b) => b / (100 / a);


// function operate(a,b,op) {
//     switch(op) {
//         case("+"):
//             return addNums(a,b);
//         case("-"):
//             return subtractNums(a,b);
//         case("*"):
//             return multiplyNums(a,b);
//         case("/"):
//             return divideNums(a,b);
//         case("%"):
//             return percentNums(a,b);
//     }
// }


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
                    useNumber(itemText);
                    break;
                case("operator"):
                    useOperator(itemText);
                    break;
                default:
                    break;
                    // in case I accidentally add a style class it will go to id switch case
            }
        }
        else {
            switch(itemId) {
                case("clear"):
                    useClear(itemText);
                    break;
                case("delete"):
                    useDelete(itemText);
                    break;
                case("decimal"):
                    useDecimal(itemText);
                    break;
                case("posNeg"):
                    usePosNeg(itemText);
                    break;
                case("equals"):
                    useEquals(itemText);
                    break;
            }
        }
    }
});


console.table(calcVals); // get rid of this in end


function checkLength() {
    return Object
        .keys(calcVals)
        .slice(0, 2)
        .map((key) => {
            if (typeof calcVals[key] =='string') {
                if (calcVals[key].length >= 11 && calcVals[key].includes('-') && calcVals[key].includes('.')) {
                    calcVals[key] = calcVals[key].slice(0,11);
                }
                else if (calcVals[key].length >= 10 && calcVals[key].includes('-')) {
                    calcVals[key] = calcVals[key].slice(0,10);
                }
                else {
                    calcVals[key] = calcVals[key].slice(0,9);
                }
            }
        });
}


function checkLeadZero(val) {
    const currentVal = typeof calcVals.prevType != 'string' || calcVals.prevType == 'A' ? 'a' : 'b'; //sets the value to check if else

    if (calcVals[currentVal].length < 4) {
        console.log('testing checkLeadZero');

        if (typeof calcVals[currentVal] == 'string' && calcVals[currentVal].length == 3 && calcVals[currentVal].charAt(0) == '-' && calcVals[currentVal].charAt(1) == '0' && val != '-' && val != '.') {
        console.log('checkLeadZero first if ran');
        calcVals[currentVal] = calcVals[currentVal].slice(0, 1) + val;
        calculatorScreen.textContent = calcVals[currentVal];
        }
        else if (typeof calcVals[currentVal] == 'string' && calcVals[currentVal].length == 2 && calcVals[currentVal].charAt(0) == '0' && val != '-' && val != '.') {
            console.log('checkLeadZero second if ran');
            calcVals[currentVal] = val;
            calculatorScreen.textContent = calcVals[currentVal];
        }
    }
}


function useNumber(val) {
    switch(calcVals.prevType) {
        case(null):
            console.log("null useNum ran");
            calcVals.a = val;
            calcVals.prevType = "A";
            checkLength();
            calculatorScreen.textContent = calcVals.a;
            console.table(calcVals);
            break;
        case("A"):
            console.log("A useNum ran");
            calcVals.a += val;
            calcVals.prevType = "A";
            checkLength();
            calculatorScreen.textContent = calcVals.a;
            console.table(calcVals);
            break;
        case("OP"):
            console.log("OP useNum ran");
            calcVals.b = val;
            calcVals.prevType = "B";
            checkLength();
            calculatorScreen.textContent = calcVals.b;
            console.table(calcVals);
            break;
        case("B"):
            console.log("B useNum ran");
            calcVals.b += val;
            calcVals.prevType = "B";
            checkLength();
            calculatorScreen.textContent = calcVals.b;
            console.table(calcVals);
            break;
    }
    checkLeadZero(val);
}


function useOperator(val) {
    switch(calcVals.prevType){
        case(null):
            console.log("null useOperator ran");
            calcVals.a = '0';
            calcVals.op = val;
            calcVals.prevType = "OP";
            calculatorScreen.textContent = calcVals.op;
            console.table(calcVals);
            break;
        default:
            console.log("default useOperator ran");
            calcVals.op = val;
            calcVals.prevType = "OP";
            calculatorScreen.textContent = calcVals.op;
            console.table(calcVals);
            break;
    }
}


function useClear() {
    console.log("useClear called");
    for (let key in calcVals) {
        calcVals[key] = null;
    }
    calculatorScreen.textContent = 0;
    console.table(calcVals);
}


function useDelete() {
    switch(calcVals.prevType){
        case("A"):
            if (calcVals['a'].length >= 2) {
                console.log(calcVals['a'].length);
                calcVals['a'] = calcVals['a'].slice(0, calcVals['a'].length - 1);
                calculatorScreen.textContent = calcVals['a'];
                console.table(calcVals);
            }
            else {
                console.log("else ran");
                calcVals.a = 0;
                calcVals.prevType = null;
                calculatorScreen.textContent = 0;
                console.table(calcVals);
            }
            break;
        case("B"):
            if (calcVals['b'].length >= 2) {
                calcVals['b'] = calcVals['b'].slice(0, calcVals['b'].length - 1);
                calculatorScreen.textContent = calcVals['b'];
                console.table(calcVals);
            }
            else {
                calcVals.b = 0;
                calcVals.prevType = 'OP';
                calculatorScreen.textContent = 0;
                console.table(calcVals);
            }
            break;
    }
}


function useDecimal() {
    switch(calcVals.prevType) {
        case(null):
            console.log('useDecimal null ran');
            calcVals.a = "0.";
            calcVals.prevType = "A";
            calculatorScreen.textContent = "0.";
            console.table(calcVals);
            break;
        case("A"):
            console.log('useDecimal A ran');
            if (!calcVals['a'].includes(".") && calcVals['a'].length > 1 && calcVals['a'].length < 9) {
                calcVals['a'] = `${calcVals.a}.`;
            }
            else if (!calcVals['a'].includes(".") && calcVals['a'].length == 1 && calcVals['a'].includes('-')) {
                console.log('ran second if');
                calcVals['a'] = `${calcVals.a}0.`; // problem with single digits, but setting to "." only causes bug with putting "-"
            }
            else if (!calcVals['a'].includes(".") && calcVals['a'].length == 1) {
                console.log('ran third if');
                calcVals['a'] = `${calcVals.a}.`;
            }
            checkLength();
            calculatorScreen.textContent = `${calcVals.a}`;
            calcVals.prevType = "A";
            console.table(calcVals);
            break;
        case("OP"):
            calcVals.b = "0.";
            calcVals.prevType = "B";
            calculatorScreen.textContent = "0.";
            console.table(calcVals);
            break;
        case("B"):
            if (!calcVals['b'].includes(".") && calcVals['b'].length > 1 && calcVals['b'].length < 9) {
                calcVals['b'] = `${calcVals.b}.`;
            }
            else if (!calcVals['b'].includes(".") && calcVals['b'].length == 1 && calcVals['b'].includes('-')) {
                calcVals['b'] = `${calcVals.b}0.`;
            }
            else if (!calcVals['b'].includes(".") && calcVals['b'].length == 1) {
                calcVals['b'] = `${calcVals.b}.`;
            }
            checkLength();
            calculatorScreen.textContent = `${calcVals.b}`;
            calcVals.prevType = "B";
            console.table(calcVals);
            break;    
    }
}


function usePosNeg() {
    switch(calcVals.prevType) {
        case(null):
            console.log('ran posNeg null');
            calcVals.a = "-";
            calcVals.prevType = "A";
            calculatorScreen.textContent = `-${calculatorScreen.textContent}`;
            console.table(calcVals);
            break;
        case("A"):
            console.log('ran posNeg A');
            if (!calcVals['a'].includes("-")) {
                calcVals.a = `-${calcVals.a}`;
            }
            else if (calcVals['a'] != '-') {
                calcVals.a = calcVals['a'].slice(1, calcVals['a'].length);
            }
            else {
                calcVals.a = '0';
            }
            // checkLength();
            calculatorScreen.textContent = calcVals.a;
            console.table(calcVals);
            break;
        case("OP"):
            console.log('ran posNeg OP');
            calcVals.b = "-";
            calcVals.prevType = "B";
            calculatorScreen.textContent = `-0`;
            console.table(calcVals);
            break;
        case("B"):
            console.log('ran posNeg B');
            if (!calcVals['b'].includes("-")) {
                calcVals.b = `-${calcVals.b}`;
            }
            else if (calcVals['b'] != '-') {
                calcVals.b = calcVals['b'].slice(1, calcVals['b'].length);
            }
            else {
                calcVals.b = '0';
            }
            // checkLength();
            calculatorScreen.textContent = calcVals.b;
            console.table(calcVals);
            break;
    }
}


function useEquals() {
    if (typeof calcVals['a'] == 'string' && typeof calcVals['b'] == 'string' && typeof calcVals['op'] == 'string') {
        console.log('useEquals all vals ran');
        calcVals['ans'] = operate(calcVals['a'], calcVals['b'], calcVals['op']);
    }
    else if (typeof calcVals['a'] == 'string' && typeof calcVals['b'] != 'string' && typeof calcVals['op'] == 'string') {
        console.log('useEquals no b ran');
        calcVals['ans'] = operate(calcVals['a'], calcVals['a'], calcVals['op']);
    }
    else if (typeof calcVals['a'] == 'string' && typeof calcVals['b'] != 'string' && typeof calcVals['op'] != 'string') {
        console.log('useEquals only a ran');
        calcVals['ans'] = calcVals['a'];
    }
    else {
        console.log('useEquals no values ran');
        return;
    }
    console.log(calcVals['ans']);
    calculatorScreen.textContent = calcVals['ans'];
    calcVals['a'] = calcVals['ans'];
    calcVals['prevType'] = null;
    console.table(calcVals);
    calcVals['typeof'] = null;
}


function operate(a,b,op) {
    
    switch(op) {
        case("+"):
            return (+a + +b).toString(); // first and last pluses make a and b numbers
        case("-"):
            return (a - b).toString();
        case("*"):
            return (a * b).toString();
        case("/"):
            return (a / b).toString();
        case("%"):
            return (b / (100 / a)).toString();
    }
}



