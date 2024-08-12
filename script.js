// OLD BROKEN CODE STARTS HERE
// let expression = [];
// let op;
// let lastClicked = 0; // 0 = und, 1 = num, 2 = op

// let equals = document.querySelector("#equals");
// equals.addEventListener("click", () => {
//     display.innerHTML = evaluate();
// })

// let clear = document.querySelector("#clear");
// clear.addEventListener("click", () => {
//     display.innerHTML = "display";
//     expression = [];
//     lastClicked = 0;
// })

// const operate = function(a, b, op){
//     a = Number(a);
//     b = Number(b);
//     switch(op){
//         case '+':
//             return a + b;
//         case '-':
//             return a - b;
//         case '*':
//             return a * b;
//         case '/':
//             return a / b;
//     }
// }

// let display = document.querySelector("p.display");

// let ops = document.querySelector("div.ops");
// ops.addEventListener("click", (e) => {
//     // bound check!
//     if(e.target.tagName != "BUTTON"){
//         return;
//     }

//     switch(lastClicked){
//         case 0:
//             break;

//         case 1:
//             expression.push(display.innerText);

//         default:
//             op = e.target.innerText;
//     }

//     lastClicked = 2;
// })

// let nums = document.querySelector("div.nums");
// nums.addEventListener("click", (e) => {

//     // bound check!
//     if(e.target.tagName != "BUTTON"){
//         return;
//     }

//     switch(lastClicked){
//         case 1:
//             display.innerText += e.target.innerText;
//             break;
        
//         case 2:
//             expression.push(op);

//         default:
//             display.innerText = e.target.innerText;
//     }

//     lastClicked = 1;
// })



// function evaluate(){
//     switch(lastClicked){
//         case 1: // last entered a number
//             expression.push(display.innerText);
//             break;
        
//         case 2: // last entered an operation
//             return "ERROR: after operation input must enter a number"

//         default:
//            return "display";
//     }
    
// }


/* PLAN

clicking number:
    1. push last op to opQ

click op:
    1. push num to numQ
    2. evaluate 


updateDisplay(): calls evaluate and update display
    check: if 2 numbers in q
    1. when expression is enetered and op is pressed
    2. when last entered num and equals is pressed 

equals:
    - if last entered num, push num to numQ
    - if last entered op, display ERROR
*/

// GLOBAL VARIABLES ========== ========== ========== ==========
const NONE = 0;
const NUM = 1;
const OP = 2;
let lastClicked = NONE; // 0 = none, 1 = num, 2 = op
let op;
let numQ = [];
let opQ = [];

let display = document.querySelector("p.display");
let numberPad = document.querySelector("div.nums");
let ops = document.querySelector("div.ops");
let equals = document.querySelector("#equals");
let clear = document.querySelector("#clear");

// EVENT HANDLERS ========== ========== ========== ========== ==========

// displays correct number. append last op (if applicable)
numberPad.addEventListener("click", (e) => {

    if(e.target.tagName != "BUTTON") return;  // bound check!

    switch(lastClicked){
        case NUM:
            display.innerText += e.target.innerText;
            break;
        
        case OP:
            opQ.push(op);

        default: 
            display.innerText = e.target.innerText;
    }

    lastClicked = NUM;
})

// push num to q (if applicable). Switch current selected op
ops.addEventListener("click", (e) => {
    if(e.target.tagName != "BUTTON") return;  // bound check!
    

    switch(lastClicked){
        case NONE:
            break;

        case NUM:
            numQ.push(Number(display.innerText));

        default:
            op = e.target.innerText;
    }
    updateDisplay();
    lastClicked = 2;
})

// returns a [op] b where a, b are numbers
const operate = function(a, b, op){
    a = Number(a);
    b = Number(b);
    switch(op){
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}

// calculate expression if possible, update display, then update expression
function updateDisplay(){
    if (numQ.length < 2 || opQ.length < 1) return; // boundchecks

    let result = operate(numQ.shift(), numQ.shift(), opQ.shift());

    numQ.push(result);

    display.innerText = result;
}

// display result if expression is valid
equals.addEventListener("click", () => {
    switch(lastClicked){
        case NUM:
            numQ.push(Number(display.innerText));
            updateDisplay();
            break;
        default:
            return;
    }
})

// clear all
clear.addEventListener("click", () => {
    display.innerText = "display";
    let numQ = [];
    let opQ = [];
    lastClicked = NONE;
})