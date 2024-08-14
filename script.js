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

const commandInfo = document.getElementById("commandInfo");

commandInfo.addEventListener('click', () => 
    alert(
        'Button                     Key' + '\n' + 
        '--------------------------------' + '\n' +
        'CLEAR:                        c' + '\n' + 
        'DELETE:             backspace' + '\n' + 
        '(   +/-   ):                      n' + '\n' + 
        '(    =    ):                   enter' + '\n' + 
        '(+-/*%):                    self' + '\n' + 
        '(   0-9   ):                   self'
        )
    );


calculatorButtonContainer.addEventListener('click', (item) => chooseCommand(item.target.id));
document.addEventListener('keydown', (item) => chooseCommand(item.key));


function chooseCommand(itemId) {

    console.log(`itemId = ${itemId}`);
    console.log(`itemId type = ${typeof itemId}`);

    const checkOperator = ['%', '/', '*', '+', '-'].includes(itemId);

    if (itemId >= 0 && itemId < 10 && itemId != ' ') {
        console.log('chooseCommand number used');
        useNumber(itemId);
    }
    else if (checkOperator == true) {
        console.log('chooseCommand operator used');
        useOperator(itemId);
    }
    else {
        console.log('chooseCommand switch used');
        switch(itemId) {
            case("c"):
                useClear();
                break;
            case("Backspace"):
                useDelete();
                break;
            case("."):
                useDecimal();
                break;
            case("n"):
                usePosNeg();
                break;
            case("Enter"):
                useEquals();
                break;
            default:
                break;
        }
    }
}


console.table(calcVals); // get rid of this in end


function checkLength() {
    console.log('checkLength ran');
    return Object
        .keys(calcVals)
        .slice(0, 2)
        .map((key) => {
            if (typeof calcVals[key] == 'string'/* && calcVals[key] < 13*/) {
                if (calcVals[key].length == 12 && calcVals[key].includes('-') && calcVals[key].includes('.')) {
                    console.log('checkLength yes - yes . ran');
                    calcVals[key] = calcVals[key].slice(0,11);
                }
                else if (calcVals[key].length == 11 && calcVals[key].includes('-') && !calcVals[key].includes('.')) {
                    console.log('checkLength yes - no . ran');
                    calcVals[key] = calcVals[key].slice(0,10);
                }
                else if (calcVals[key].length == 11 && !calcVals[key].includes('-') && calcVals[key].includes('.')) {
                    console.log('checkLength no - yes . ran');
                    calcVals[key] = calcVals[key].slice(0,10);
                }
                else if (calcVals[key].length == 10 && !calcVals[key].includes('-') && !calcVals[key].includes('.')) {
                    console.log('checkLength no - no . ran');
                    calcVals[key] = calcVals[key].slice(0,9);
                }
            }
        });
}

function checkAnsLength() {
    console.log('checkAnsLength ran');
    if (typeof calcVals['ans'] == 'string') {
        if (calcVals['ans'].includes('-') && calcVals['ans'].includes('.')) {
            console.log('checkLength yes - yes . ran');
            calcVals['ans'] = calcVals['ans'].slice(0,11);
        }
        else if (calcVals['ans'].includes('-') && !calcVals['ans'].includes('.')) {
            console.log('checkLength yes - no . ran');
            calcVals['ans'] = calcVals['ans'].slice(0,10);
        }
        else if (!calcVals['ans'].includes('-') && calcVals['ans'].includes('.')) {
            console.log('checkLength no - yes . ran');
            calcVals['ans'] = calcVals['ans'].slice(0,10);
        }
        else if (!calcVals['ans'].includes('-') && !calcVals['ans'].includes('.')) {
            console.log('checkLength no - no . ran');
            calcVals['ans'] = calcVals['ans'].slice(0,9);
        }
    }
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
            calcVals.b = null;
            calcVals.op = null;
            calcVals.prevType = "A";
            checkLength();
            calculatorScreen.textContent = calcVals.a;
            console.table(calcVals);
            break;
        case("A"):
            console.log("A useNum ran");
            if (typeof calcVals['a'] == 'string' && calcVals['a'].includes('e+') || calcVals['a'].includes('e-')) {
                calcVals.a = val;
                calculatorScreen.textContent = calcVals.a;
                calcVals.b = null;
                calcVals.op = null;
            }
            else if (typeof calcVals['a'] == 'string' && !calcVals['a'].includes('e+') && !calcVals['a'].includes('e-')) {
                calcVals.a += val;
                checkLength();
                calculatorScreen.textContent = calcVals.a;
            }
            calcVals.prevType = "A";
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
            if (typeof calcVals['a'] != 'string') {
                calcVals.a = '0';
            }
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
    calculatorScreen.textContent = '0';
    console.table(calcVals);
}


function useDelete() {
    switch(calcVals.prevType){
        case(null):
            break;
        case("A"):
            if (calcVals['a'].length >= 2) {
                console.log(calcVals['a'].length);
                calcVals['a'] = calcVals['a'].slice(0, calcVals['a'].length - 1);
                calculatorScreen.textContent = calcVals['a'];
                console.table(calcVals);
            }
            else {
                console.log("else ran");
                calcVals.a = '0';
                calcVals.prevType = null;
                calculatorScreen.textContent = '0';
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
                calcVals.b = '0';
                calcVals.prevType = 'OP';
                calculatorScreen.textContent = '0';
                console.table(calcVals);
            }
            break;
    }
}


function useDecimal() {
    // this always reassigns, even if you want a fresh ans (ans = a) to put a '.' at the end.
    switch(calcVals.prevType) {
        case(null):
            console.log('useDecimal null ran');
            if (typeof calcVals['a'] == 'string' && !calcVals['a'].includes('e+') && !calcVals['a'].includes('e-') && calcVals['a'].length < 9) {
                if (!calcVals['a'].includes(".") && calcVals['a'].length > 1 && calcVals['a'].length < 9) {
                    calcVals['a'] = `${calcVals.a}.`;
                }
                else if (!calcVals['a'].includes(".") && calcVals['a'].length == 1 && calcVals['a'].includes('-')) {
                    console.log('ran second if');
                    calcVals['a'] = `${calcVals.a}0.`;
                }
                else if (!calcVals['a'].includes(".") && calcVals['a'].length == 1) {
                    console.log('ran third if');
                    calcVals['a'] = `${calcVals.a}.`;
                }
            }
            else if (typeof calcVals['a'] != 'string' || calcVals['a'].includes('e+') || calcVals['a'].includes('e-') || calcVals['a'].length > 9) {
                calcVals['a'] = "0.";
            }
            checkLength(); // needed?
            calcVals.prevType = "A";
            calculatorScreen.textContent = calcVals.a;
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
            if (typeof calcVals['a'] == 'string' && calcVals['a'].includes('e+')) {
                if (calcVals['a'].includes("-")) {
                    calcVals.a = calcVals['a'].slice(1, calcVals['a'].length);
                    calculatorScreen.textContent = Number(calcVals.a).toExponential(4).toString();
                }
                else if (!calcVals['a'].includes("-")) {
                    calcVals.a = `-${calcVals.a}`;
                    calculatorScreen.textContent = Number(calcVals.a).toExponential(4).toString();
                }
            }
            else if (typeof calcVals['a'] == 'string' && calcVals['a'].includes('e-')) {
                if (Number(calcVals['a']) < 0) {
                    calcVals.a = calcVals['a'].slice(1, calcVals['a'].length);
                    calculatorScreen.textContent = Number(calcVals.a).toExponential(4).toString();
                }
                else if (Number(calcVals['a']) > 0) {
                    calcVals.a = `-${calcVals.a}`;
                    calculatorScreen.textContent = Number(calcVals.a).toExponential(4).toString();
                }
            }
            else if (typeof calcVals['a'] == 'string' && calcVals['a'].length < 10) {
                if (calcVals['a'].includes("-")) {
                    calcVals.a = calcVals['a'].slice(1, calcVals['a'].length);
                    calculatorScreen.textContent = calcVals.a;
                    calcVals.prevType = "A";
                }
                else if (!calcVals['a'].includes("-")) {
                    calcVals.a = `-${calcVals.a}`;
                    calculatorScreen.textContent = calcVals.a;
                    calcVals.prevType = "A";
                }
            }
            else if (typeof calcVals['a'] == 'string' && calcVals['a'].length >= 10) {
                calcVals['a'] = (calcVals['a'] * -1).toString();
                calculatorScreen.textContent = Number(calcVals['a']).toPrecision(9);
            }
            else {
                calcVals.a = "-0";
                calculatorScreen.textContent = calcVals.a;
                calcVals.prevType = "A";
            }
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

    
    if (calcVals['ans'] != 'NaN' && calcVals['ans'] > 0) {
        if (calcVals['ans'] <= 999999999 && calcVals['ans'] >= 0.00000001) {
            // normal for positive numbers
            // checkLength();

            // calcVals['a'] = calcVals['ans'];

            // if (calcVals['ans'].length > 9) {
            //     calcVals['ans'] = Number(calcVals['ans']).toFixed(15).toString();
            //     calcVals['a'] = Number(calcVals['ans']).toFixed(15).toString();
            //     calculatorScreen.textContent = Number(calcVals['ans']).toFixed(8);
            // }
            // else {
            //     calcVals['a'] = calcVals['ans'];
            //     calculatorScreen.textContent = calcVals['ans'];
            // }

            checkAnsLength();
            calculatorScreen.textContent = calcVals['ans'];
            calcVals['a'] = calcVals['ans'];








            // calculatorScreen.textContent = Number(calcVals['ans']).toPrecision(9);

            // if (calcVals['a'].length >= 9) {
            //     calculatorScreen.textContent = Number(calcVals['a']).toPrecision(1);
            //     console.log(`if toPrecision: ${Number(calcVals['a']).toPrecision(1)}`);
            //     console.log(`if length: ${calcVals['a'].length}`);
            // }
            // else {
            //     calculatorScreen.textContent = calcVals['ans'];
            //     console.log(`else length: ${calcVals['a'].length}`);
            // }

            // calculatorScreen.textContent = calcVals['ans'].length >= 8
            //     ? calcVals['ans'].slice(0, 8) + Math.round(Number(calcVals['ans'].slice(8, 9) + '.' + calcVals['ans'].slice(9, 10)))
            //     : calcVals['ans'];

            // if (calcVals['ans'].length >= 8 && !calcVals['ans'].includes('e-') && !calcVals['ans'].includes('e+') && !calcVals['ans'].includes('NaN')) {
            //     console.log('fucking code if ran');
            //     calculatorScreen.textContent = calcVals['ans'].slice(0, 8) + Math.round(Number(calcVals['ans'].slice(8, 9) + '.' + calcVals['ans'].slice(9, 10)));
            //     console.log(Math.round(Number(calcVals['ans'].slice(8, 9) + '.' + calcVals['ans'].slice(9, 10))));
            //     console.log(calcVals['ans'].slice(8, 9));
            //     console.log(calcVals['ans'].slice(9, 10));
            // }
            // else {
            //     console.log('fucking code else ran');
            //     calculatorScreen.textContent = calcVals['ans'];
            // }

            

                // USE FOR NEGATIVES // calcVals['ans'].slice(0, 10) + Math.round(Number(calcVals['ans'].slice(10, 11) + '.' + calcVals['ans'].slice(11, 12)))



            // calculatorScreen.textContent = calcVals['ans'];
            // calcVals['a'] = calcVals['ans'];
            console.log('range 8 works');
        }
        else if ((calcVals['ans'] >= Math.pow(9.999999999999999, -99) && calcVals['ans'] < 0.00000001) 
                || (calcVals['ans'] <= Math.pow(9.999999999999999, 99) && calcVals['ans'] > 999999999)) {
            // sci notation for this range
            // checkLength();
            calcVals['ans'] = Number(calcVals['ans']).toExponential(15).toString();
            calcVals['a'] = Number(calcVals['ans']).toExponential(15).toString();
            calculatorScreen.textContent = Number(calcVals['ans']).toExponential(4).toString();
            // calcVals['ans'] = Number(calcVals['ans']).toExponential(15).toString();
            // calcVals['a'] = Number(calcVals['ans']).toExponential(15).toString();
            console.log('range 7 or 9 works');
        }
        else {
            // send error message
            useClear();
            calculatorScreen.textContent = 'Error';
            console.log('range 6 or 10 works');
        }
    }
    else if (calcVals['ans'] != 'NaN' && calcVals['ans'] < 0) {
        if (calcVals['ans'] >= -999999999 && calcVals['ans'] <= -0.00000001) {
            // normal for negative numbers
            // checkLength();
            // if (calcVals['ans'].length > 9) {
            //     calcVals['ans'] = Number(calcVals['ans']).toFixed(15).toString();
            //     calcVals['a'] = Number(calcVals['ans']).toFixed(15).toString();
            //     calculatorScreen.textContent = Number(calcVals['ans']).slice(0,9);
            // }
            // else {
            //     calcVals['a'] = calcVals['ans'];
            //     calculatorScreen.textContent = calcVals['ans'];
            // }
            
            checkAnsLength();
            calculatorScreen.textContent = calcVals['ans'];
            calcVals['a'] = calcVals['ans'];

            // calcVals['a'] = calcVals['ans'];

            // calculatorScreen.textContent = calcVals['ans'].length >= 9 
            //     ? Number(calcVals['ans']).toPrecision(9)
            //     : calcVals['ans'];

            // // calculatorScreen.textContent = calcVals['ans'];
            // //calcVals['a'] = calcVals['ans'];
            console.log('range 3 works');
        }
        else if ((calcVals['ans'] <= Math.pow(-9.999999999999999, -99) && calcVals['ans'] > -0.00000001) 
                || (calcVals['ans'] >= Math.pow(-9.999999999999999, 99) && calcVals['ans'] < -999999999)) {
            // sci notation for this range
            // checkLength();
            calcVals['ans'] = Number(calcVals['ans']).toExponential(15).toString();
            calcVals['a'] = Number(calcVals['ans']).toExponential(15).toString();
            calculatorScreen.textContent = Number(calcVals['ans']).toExponential(4).toString();
            // calcVals['ans'] = Number(calcVals['ans']).toExponential(15).toString();
            // calcVals['a'] = Number(calcVals['ans']).toExponential(15).toString();
            console.log('range 2 or 4 works');
        }
        else {
            // send error message
            useClear();
            calculatorScreen.textContent = 'Error';
            console.log('range 1 or 5 works');
        }
    }
    else if (calcVals['ans'] != 'NaN' && calcVals['ans'] == 0) {
        // normal for zero
        calcVals['a'] = calcVals['ans'];
        calculatorScreen.textContent = calcVals['ans'];
        // calcVals['a'] = calcVals['ans'];
        console.log('0 works');
    }
    else {
        // error message for NaN
        useClear();
        calculatorScreen.textContent = 'Error';
        console.log('NaN works');
    }

    calcVals['prevType'] = null;
    console.table(calcVals);
    



    // if (calcVals['ans'] != 'NaN' && calcVals['ans'] <= Math.pow(9.999999999999999, 99) && calcVals['ans'] >= Math.pow(-9.999999999999999, 99)) {
    //     console.log('main if ran');
    //     if (calcVals['ans'] )


    //     if (calcVals['ans'] > 999999999 || calcVals['ans'] < -999999999/*|| calcVals['ans'].length > 9*/) {
    //         calculatorScreen.textContent = Number(calcVals['ans']).toExponential(4).toString();
    //         // textContent uses 5 to fit number on screen
    //         calcVals['ans'] = Number(calcVals['ans']).toExponential(15).toString();
    //         calcVals['a'] = Number(calcVals['ans']).toExponential(15).toString();
    //         // these use 15 due to js limitations on accuracy past 15 digits
    //     }
    //     else if (calcVals['ans'].length > 9) {
    //         calculatorScreen.textContent = Number(calcVals['ans']).toPrecision(9);
    //         calcVals['ans'] = Number(calcVals['ans']).toPrecision(15).toString();
    //         calcVals['a'] = Number(calcVals['ans']).toPrecision(15).toString();
    //     }
    //     else {
    //         // calcVals['a'] = calcVals['ans'];
    //         // checkL
    //         calculatorScreen.textContent = calcVals['ans'];
    //         calcVals['a'] = calcVals['ans'];
    //     }
    // }

    // else if (calcVals['ans'] != 'NaN' && calcVals['ans'] <= Math.pow(-9.999999999999999, -99) && calcVals['ans'] >= Math.pow(9.999999999999999, -99)) {
    //     if (calcVals['ans'] < 0.00000001 || calcVals['ans'] > -0.00000001) {
    //         calculatorScreen.textContent = Number(calcVals['ans']).toExponential(4).toString();
    //         // textContent uses 5 to fit number on screen
    //         calcVals['ans'] = Number(calcVals['ans']).toExponential(15).toString();
    //         calcVals['a'] = Number(calcVals['ans']).toExponential(15).toString();
    //         // these use 15 due to js limitations on accuracy past 15 digits
    //     }
    //     // else if (calcVals['ans'] > -1 && calcVals['ans'] < -0.00000001) {
    //     //     calculatorScreen.textContent = Number(calcVals['ans']).toExponential(4).toString();
    //     //     // textContent uses 5 to fit number on screen
    //     //     calcVals['ans'] = Number(calcVals['ans']).toExponential(15).toString();
    //     //     calcVals['a'] = Number(calcVals['ans']).toExponential(15).toString();
    //     //     // these use 15 due to js limitations on accuracy past 15 digits
    //     // }
    //     else if (calcVals['ans'].length > 9) { // SWITCH TO 10???
    //         calculatorScreen.textContent = Number(calcVals['ans']).toPrecision(9);
    //         calcVals['ans'] = Number(calcVals['ans']).toPrecision(15).toString();
    //         calcVals['a'] = Number(calcVals['ans']).toPrecision(15).toString();
    //     }
    //     else {
    //         calculatorScreen.textContent = calcVals['ans'];
    //         calcVals['a'] = calcVals['ans'];
    //     }
    // }
    // else {
    //     useClear();
    //     calculatorScreen.textContent = 'Error';
    // }

    

    // calculatorScreen.textContent = calcVals['ans'];
    // calcVals['a'] = calcVals['ans'];
}


function operate(a,b,op) {
    // let finalVal;
    
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
    // return (finalVal > 999999999 || finalVal.length > 9 
    //             ? finalVal.toExponential(5).toString() 
    //             : finalVal.toString());
}



