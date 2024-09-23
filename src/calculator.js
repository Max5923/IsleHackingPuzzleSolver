//import {evaluate} from 'mathjs'
import * as regmath from 'regression'

const number1 = document.getElementById("number1")
const number2 = document.getElementById("number2")

const inputbutton = document.getElementById("inputbutton")
const regressbutton = document.getElementById("regress")

const questionout = document.getElementById("question")
const formula1 = document.getElementById("formula1")
const formula2 = document.getElementById("formula2")

var data1 = []
//var data2 = []

var i = 0;
function ProcessNumbers(){

    let numa = parseInt(number1.value);

    data1.push([i, numa])

    //let numb = parseInt(number2.value);
    //let result = 'a + b'

    i++
    questionout.textContent = "Enter a = " + i.toString();
    //questionout.textContent = evaluate(result, {a: numa, b: numb}).toString();
}
inputbutton.addEventListener("click", ProcessNumbers);

function RegressData(){    
    formula1.textContent = regmath.polynomial(data1, {order: 3}).string
}
regressbutton.addEventListener("click", RegressData);