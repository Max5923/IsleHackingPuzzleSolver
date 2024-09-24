import {evaluate} from 'mathjs'
import * as regmath from 'regression'
import { arrayBuffer } from 'stream/consumers'

const number1 = document.getElementById("number1")
const number2 = document.getElementById("number2")

const inputbutton = document.getElementById("inputbutton")

const questionout = document.getElementById("question")
const formula1 = document.getElementById("formula1")
const formula2 = document.getElementById("formula2")
const devoutput = document.getElementById("devoutput")

var questionnum = [0, 0, 0, 0];

var data = [];
var regdata1 = [];
var regdata2 = [];
var tempdata = [];

var regformula1 = "";
var regformula2 = "";
var formula1complete = false;
var formula2complete = false;
function ProcessNumbers(){
    let num1 = parseInt(number1.value);
    let num2 = parseInt(number2.value);

    //data.push([questionnum, [num1, num2]]);
    tempdata.push([num1, num2]);
    regdata1.push([questionnum[0], num1]);
    regdata2.push([questionnum[0], num2]);

    let invalidation1 = true;
    let invalidation2 = true;
    if (questionnum[0] > 0){
        let polyorder = questionnum[0] - 1;

        if(!formula1complete){
            invalidation1 = false;
            regformula1 = regmath.polynomial(regdata1, {order: polyorder}).string;
            regformula1 = regformula1.replace(/x/g, "a")
            formula1.textContent = "I'm unsure what the top formula is, but I'm currently thinking that it is: " + regformula1;
            for (let i = 0; i <= questionnum[0]; i++){
                if(evaluate(regformula1, {a: i}) != tempdata[i][0]){
                    devoutput.textContent += tempdata[i][0] + "; "
                    invalidation1 = true;
                }
            }
        }

        if(!formula2complete){
            invalidation2 = false;
            regformula2 = regmath.polynomial(regdata2, {order: polyorder}).string;
            regformula2 = regformula2.replace(/x/g, "a")
            formula2.textContent = "I'm unsure what the bottom formula is, but I'm currently thinking that it is: " + regformula2;
            for (let i = 0; i <= questionnum[0]; i++){
                if(evaluate(regformula2, {a: i}) != tempdata[i][1]){
                    devoutput.textContent += tempdata[i][1] + "; "
                    invalidation2 = true;
                }
            }
        }
    }

    if(!invalidation1){
        formula1.textContent = "The top formula is: " + regformula1;
        formula1complete = true;
    } 
    if(!invalidation2){
        formula2.textContent = "The bottom formula is: " + regformula2;
        formula2complete = true;
    }
    if(invalidation1 || invalidation2){
        questionnum[0]++;
        questionout.textContent = "Enter " + questionnum.toString();
    }

}
inputbutton.addEventListener("click", ProcessNumbers);