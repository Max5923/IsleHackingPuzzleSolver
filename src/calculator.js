import {evaluate} from 'mathjs'
import * as regmath from 'regression'
import { arrayBuffer } from 'stream/consumers'

const number1 = document.getElementById("number1")
const number2 = document.getElementById("number2")

const inputbutton = document.getElementById("inputbutton")
const regressbutton = document.getElementById("regress")

const questionout = document.getElementById("question")
const formula1 = document.getElementById("formula1")
const formula2 = document.getElementById("formula2")
const devoutput = document.getElementById("devoutput")

var data = [];
var regdata = [];
var questionnum = [0, 0, 0, 0];

var tempdata = new Array(10);
function ProcessNumbers(){
    let num1 = parseInt(number1.value);
    let num2 = parseInt(number2.value);

    data.push([questionnum, [num1, num2]]);
    tempdata[questionnum[0]] = num1;
    regdata.push([questionnum[0], num1]);

    let regformula = regmath.polynomial(data, {order: questionnum[0] - 1}).string;
    let invalidation = false;
    if (questionnum[0] > 0){
        
        for (let i = 0; i < questionnum[0] | invalidation; i++){
            if(evaluate(regformula, {x: i}) != tempdata[i]){
                invalidation = true;
            }
        }
    }

    if(invalidation){
        questionnum[0]++;
        questionout.textContent = "Enter " + questionnum.toString();
    } else{
        questionout.textContent = regformula;
    }

}
inputbutton.addEventListener("click", ProcessNumbers);

function RegressData(){
    formula1.textContent = regmath.polynomial(data, {order: 3}).string;
    devoutput.textContent = evaluate(regmath.polynomial(data, {order: 3}).string, {x: 1});
}
regressbutton.addEventListener("click", RegressData);