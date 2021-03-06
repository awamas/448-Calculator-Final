var num = "";
//var num2 = "";
var operation = "";
var globalTotal = "";
var globalTotalFlag = false;
var equalsFlag = false; // Goes to true after user equals two values.
//var nextNumFlag = false; // Goes to true after user chooses operation.
var decimalFlag = false; // Goes to true if value has a decimal.
var preOperationFlag = false;
var equationArray = [];


/**
  * Onclick handlers for basic calculator.
  */
document.getElementById("btnOne").onclick = function() {numPressed("1")};
document.getElementById("btnTwo").onclick = function() {numPressed("2")};
document.getElementById("btnThree").onclick = function() {numPressed("3")};
document.getElementById("btnFour").onclick = function() {numPressed("4")};
document.getElementById("btnFive").onclick = function() {numPressed("5")};
document.getElementById("btnSix").onclick = function() {numPressed("6")};
document.getElementById("btnSeven").onclick = function() {numPressed("7")};
document.getElementById("btnEight").onclick = function() {numPressed("8")};
document.getElementById("btnNine").onclick = function() {numPressed("9")};
document.getElementById("btnZero").onclick = function() {numPressed("0")};
// Decimal uses numPressed so it can be added to the number. Therefore it is not
// treated like a symbol.
document.getElementById("btnDecimal").onclick = function() {numPressed(".")};
document.getElementById("btnAdd").onclick = function() {symbolPressed("+")};
document.getElementById("btnSub").onclick = function() {symbolPressed("-")};
document.getElementById("btnMultiply").onclick = function() {symbolPressed("*")};
document.getElementById("btnDivide").onclick = function() {symbolPressed("/")};
document.getElementById("btnClear").onclick = function() {symbolPressed("clr")};
document.getElementById("btnInverse").onclick = function() {inverse()};
document.getElementById("btnSquare").onclick = function() {square()};
document.getElementById("btnSquareRoot").onclick = function() {squareRoot()};
document.getElementById("btnEquals").onclick = function() {evaluate()};




/**
  * Binding buttons to keyboard. Technically it's not interacting with the actual
  * buttons, but rather just calls the function that is also called by the button
  * onclick.
  */
$(document).keydown( function (e) {
  if (e.keyCode==96 || e.keyCode==48){
    numPressed("0");
  }
  else if (e.keyCode==97 || e.keyCode==49){
    numPressed("1");
  }
  else if (e.keyCode==98 || e.keyCode==50){
    numPressed("2");
  }
  else if (e.keyCode==99 || e.keyCode==51){
    numPressed("3");
  }
  else if (e.keyCode==100 || e.keyCode==52){
    numPressed("4");
  }
  else if (e.keyCode==101 || e.keyCode==53){
    numPressed("5");
  }
  else if (e.keyCode==102 || e.keyCode==54){
    numPressed("6");
  }
  else if (e.keyCode==103 || e.keyCode==55){
    numPressed("7");
  }
  else if (e.keyCode==104 || e.keyCode==56){
    numPressed("8");
  }
  else if (e.keyCode==105 || e.keyCode==57){
    numPressed("9");
  }
  else if (e.which==106 || (e.keyPressed==42 && e.shiftKey)){ //This key biunding is not doing so well.
    symbolPressed("*");
  }
  else if (e.keyCode==107 || (e.keyPressed==187 && e.shiftKey)){
    symbolPressed("+");
  }
  else if (e.keyCode==109 || e.keyCode==189){
    symbolPressed("-");
  }
  else if (e.keyCode==111 || e.keyCode==191){
    symbolPressed("/");
  }
  else if (e.keyCode==13 || e.keyCode==187){
    symbolPressed("=");
  }
  else if (e.keyCode==27){
    symbolPressed("clr");
  }

});




/**
  * checkIfNewOperation(op) takes in the state described in numPressed() and
  * symbolPressed() to determine if the user is doing a continuous operation,
  * or if it's a new equation altogether.
  */
function checkIfNewOperation (op) {


  // ############################ debug code ##################################
  // use this to check status of flags when doing continuous operations,
  // back and forth with new equations.
  // ##########################################################################
  console.log("here" + " " + globalTotalFlag + " " + op);



  if(globalTotalFlag && op){

    num = globalTotal.toString(); // If it's a continuous operation, set prev total to new num1.
    equationArray = [];
    // ######################### debug code ###################################
    // Use this to see that the new total is changing when it's a continuous
    // operation.
    // ########################################################################
    //console.log(equationArray);
  }
  globalTotal = 0;
  globalTotalFlag = false;
  return;
}




/**
  * Determines which number was pressed and what to display in the viewer.
  */
function numPressed (numTemp) {

    console.log(equationArray);
  // Passes 0 to let the function know we're in the number state.
  if(preOperationFlag == true){
    checkIfNewOperation(0);
    num="";
    document.getElementById("calcDisplay").value = "";
    preOperationFlag = false;

    console.log(num);
    console.log(equationArray);
  }
  else{
    checkIfNewOperation(0);
  }

  // Deletes the starting 0 that displays at start.
  if(document.getElementById("calcDisplay").value == "0"){
    document.getElementById("calcDisplay").value = "";
    console.log(document.getElementById("calcDisplay").value);
  }

  // check if number already has a decimal in it.
  if(num.includes(".") && numTemp == "."){
    return;
  }

  // Uses nextNumFlag to determine if it's the first value or second, then displays it.
  num = num + numTemp;
  document.getElementById("calcDisplay").value = num;
  console.log(num);
  return;
}




/**
  * Determines what happens when a symbol is pressed.
  */
function symbolPressed (sym) {
  console.log(equationArray);
  console.log(num);
  // Passes 0 to let the function know we're in the number state.
  checkIfNewOperation(1);
  //if(sym == "-")

  // Passes 1 to let the function know we're in symbol state.
  //checkIfNewOperation(1);
  if(sym == "clr"){
    num = "";
    //num2 = "";
    //operation = "";
    globalTotal = "";
    globalTotalFlag = false;
    equalsFlag = false; // Goes to true after user equals two values.
    //nextNumFlag = false; // Goes to true after user chooses operation.
    decimalFlag = false; // Goes to true if value has a decimal.
    equationArray = [];
    document.getElementById("calcDisplay").value = "0";
  }
  else if(num != ""){
    equationArray.push(num);
    JSON.stringify(equationArray);
    console.log("numpush")
    equationArray.push(sym);
    num = "";

    //JSON.stringify(equationArray);
    console.log(equationArray);
    console.log("sympush");

  }
  else if(num == "" && sym == "-"){
    numPressed(sym);
  }
  return;
}




/**
  * Takes the number preceding pressing x^2, squares it, and saves it as globalTotal.
  */
function square () {
  checkIfNewOperation(1);
  var numToBeSquared = 0;
  var numSquared = 0;
  preOperationFlag = true;
  if(num.includes(".")){
    numToBeSquared = parseFloat(num);
  }
  else{
    numToBeSquared = parseInt(num);
  }
  numSquared = numToBeSquared * numToBeSquared;
  num = "";
  document.getElementById("calcDisplay").value = numSquared;
  num = numSquared.toString();
  globalTotal = numSquared;
  globalTotalFlag = true;
  return;
}




/**
  * ####################IN PROGRESS########################
  */
function squareRoot () {
    checkIfNewOperation(1);
    console.log("Inside SquareRoot():")
    console.log("num is: " + num);
    var numToBeSquareRooted = 0;
    var numSquareRooted = 0;
    preOperationFlag = true;
    if(num.includes(".")){
      numToBeSquareRooted = parseFloat(num);
    }
    else{
      numToBeSquareRooted = parseInt(num);
    }
    numSquareRooted = Math.sqrt(numToBeSquareRooted);
    console.log("numSquared is: " + numSquareRooted);
    num = "";
    document.getElementById("calcDisplay").value = numSquareRooted;
    num = numSquareRooted.toString();
    globalTotal = numSquareRooted;
    globalTotalFlag = true;
    return;
}




/**
  * ####################IN PROGRESS########################
  */
function inverse () {
    checkIfNewOperation(1);
    console.log("Inside inverse():")
    console.log("num is: " + num);
    var numToBeInverted = 0;
    var numInverted = 0;
    preOperationFlag = true;
    if(num.includes(".")){
      numToBeInverted = parseFloat(num);
    }
    else{
      numToBeInverted = parseInt(num);
    }
    numInverted= 1 / numToBeInverted;
    console.log("numSquared is: " + numInverted);
    num = "";
    document.getElementById("calcDisplay").value = numInverted;
    num = numInverted.toString();
    globalTotal = numInverted;
    globalTotalFlag = true;
    return;
}




/**
  * Evaluates the equation that is currently in the equationArray.
  */
function evaluate () {
  console.log(equationArray[0]);
  if((typeof equationArray[0] === 'undefined' || equationArray[0] === null)){
      if(num != ""){
          document.getElementById("calcDisplay").value = num;
          preOperationFlag = true;
      }
      else{
          document.getElementById("calcDisplay").value = "0";
      }
      console.log("inside eval() first if{}: num = " + num);
      return;
  }
  equationArray.push(num);
  num = "";
  var tempNum1 = 0;
  var tempNum2 = 0;
  var tempTotal = 0;
  var tempSym;
  var symFlag = false;
  var tempNum1Flag = false;
  var tempNum2Flag = false;
  console.log(equationArray);
  for(var i = 0; i<equationArray.length;i++){
    if(isNaN(equationArray[i])){
      tempSym = equationArray[i];
      symFlag = true;
    }
    else if(!tempNum1Flag){
      if(equationArray[i].includes(".")){
        tempNum1 = parseFloat(equationArray[i]);
      }
      else{
        tempNum1 = parseInt(equationArray[i]);
      }
      tempNum1Flag = true;
    }
    else if(!tempNum2Flag){
      if(equationArray[i].includes(".")){
        tempNum2 = parseFloat(equationArray[i]);
      }
      else{
        tempNum2 = parseInt(equationArray[i]);
      }
      tempNum2Flag = true;
    }



    if(tempNum1Flag && tempNum2Flag && symFlag){
      switch(tempSym){
                          case "+":
                                tempNum1 = tempNum1 +  tempNum2;
                                break;
                          case "-":
                                tempNum1 = tempNum1 - tempNum2;
                                break;
                          case "/":
                                if(tempNum2 == 0){
                                  symbolPressed("clr");
                                  document.getElementById('calcDisplay').value = "ERR: Divide by zero.";
                                  return;
                                }
                                tempNum1 = tempNum1 / tempNum2;
                                break;
                          case "*":
                                tempNum1 = tempNum1 * tempNum2;
                                break;
      }
      tempNum2 = 0;
      tempNum2Flag = false;
      tempSym = "";
      symFlag = false;
      console.log(tempNum1);
    }
  }
  globalTotal = tempNum1;
  globalTotalFlag = true;
  document.getElementById("calcDisplay").value = globalTotal;
  // reset all variables that need reset at this point
  tempNum1 = 0;
  tempNum2 = 0;
  tempTotal = 0;
  tempSym = "";
  symFlag = false;
  tempNum1Flag = false;
  tempNum2Flag = false;
  equationArray = [];
  return;
}
