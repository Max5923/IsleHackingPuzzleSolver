import {evaluate} from 'mathjs'
import * as regmath from 'regression'

const number1 = document.getElementById("number1")
const number2 = document.getElementById("number2")

const inputbutton = document.getElementById("inputbutton")
const regressbutton = document.getElementById("regress")

const questionout = document.getElementById("question")
const formula1 = document.getElementById("formula1")
const formula2 = document.getElementById("formula2")
const devoutput = document.getElementById("devoutput")

var data = [];
var questionnum = [0, 0, 0, 0];

function ProcessNumbers(){

    let num1 = parseInt(number1.value);
    let num2 = parseInt(number2.value);

    data.push([questionnum[0], num1]);
    //data.push([[i, 0, 0, 0], [num1, num2]]);

    if (questionnum[0] > 0){
        formula1.textContent = regmath.polynomial(data, {order: questionnum[0] - 1}).string;
    }

    questionnum[0]++;
    questionout.textContent = "Enter " + questionnum.toString();
}
inputbutton.addEventListener("click", ProcessNumbers);

function RegressData(){
    formula1.textContent = regmath.polynomial(data, {order: 3}).string;
    devoutput.textContent = evaluate(regmath.polynomial(data, {order: 3}).string, {x: 1});
}
regressbutton.addEventListener("click", RegressData);