var num1 = "";
var num2 = "";
var operation = "";
var globalTotal = "";
var equalsFlag = false; // Goes to true after user equals two values.
var nextNumFlag = false; // Goes to true after user chooses operation.
var decimalFlag = false; // Goes to true if value has a decimal.



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
document.getElementById("btnEquals").onclick = function() {symbolPressed("=")};
document.getElementById("btnClear").onclick = function() {symbolPressed("clr")};


/**
  * Binding buttons to keyboard. Technically it's not interacting with the actual
  * buttons, but rather just calls the function that is also called by the button
  * onclick.
  */
$(document).keydown(function(e){
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
function checkIfNewOperation(op){


  // ############################ debug code ##################################
  // use this to check status of flags when doing continuous operations,
  // back and forth with new equations.
  // ##########################################################################
  console.log("here" + " " + equalsFlag + " " + op);



  if(equalsFlag && op){

    num1 = globalTotal; // If it's a continuous operation, set prev total to new num1.
    nextNumFlag = true; // Set flag to true so numPressed() knows to treat next number as the second term.


    // ######################### debug code ###################################
    // Use this to see that the new total is changing when it's a continuous
    // operation.
    // ########################################################################
    console.log(num1);
  }
  else if(equalsFlag && !nextNumFlag){ // If it's a new operation, reset equalsFlag.
    equalsFlag = false;
  }

}

/**
  * Determines which number was pressed and what to display in the viewer.
  */
function numPressed(num) {

  // Passes 0 to let the function know we're in the number state.
  checkIfNewOperation(0);

  // Deletes the starting 0 that displays at start.
  if(document.getElementById("calcDisplay").value == "0"){
    document.getElementById("calcDisplay").value = "";
    console.log(document.getElementById("calcDisplay").value);
  }

  // Uses nextNumFlag to determine if it's the first value or second, then displays it.
  if(!nextNumFlag){
    num1 = num1 + num;
    if(num == "."){decimalFlag = true};
    document.getElementById("calcDisplay").value = num1;
  }
  else{
    num2 = num2 + num;
    if(num == "."){decimalFlag = true};
    equalsFlag = false;
    document.getElementById("calcDisplay").value = num2;
  }
}


/**
  * Determines what happens when a symbol is pressed.
  */
function symbolPressed(sym){

  //if(sym == "-")

  // Passes 1 to let the function know we're in symbol state.
  checkIfNewOperation(1);

  // Depending on the symbol, do the suggested operation.
  switch(sym){

                // Might be a better way to do this, but for "+", "-", "*",
                // and "/" sym sets the operation variable to be used by the "=" case.
                case "+":
                            operation = sym;
                            nextNumFlag = true;
                            break;
                case "-":
                            operation = sym;
                            nextNumFlag = true;
                            break;
                case "*":
                            operation = sym;
                            nextNumFlag = true;
                            break;
                case "/":
                            operation = sym;
                            nextNumFlag = true;
                            break;

                // Handles all the basic arithmetic operations and displays.
                case "=":

                            // Since num1, num2, and globalTotal are strings,
                            // this snippet of code saves it to a float or an
                            // int determined by the decimalFlag
                            var term1 = 0;
                            var term2 = 0;
                            if(decimalFlag){
                              term1 = parseFloat(num1);
                              term2 = parseFloat(num2);
                            }
                            else {
                              term1 = parseInt(num1);
                              term2 = parseInt(num2);
                            }


                            // Depending on the operation, do that operation and display.
                            switch(operation){
                              case "+":
                                        var thisTotal = term1 + term2;
                                        globalTotal = (term1 + term2).toString(); // Saves to globalTotal in case user does continuous operations.
                                        document.getElementById("calcDisplay").value = thisTotal.toString();
                                        break;
                              case "-":
                                        var thisTotal = term1 - term2;
                                        globalTotal = (term1 - term2).toString(); // Saves to globalTotal in case user does continuous operations.
                                        document.getElementById("calcDisplay").value = thisTotal.toString();
                                        break;
                              case "*":
                                        var thisTotal = term1 * term2;
                                        globalTotal = (term1 * term2).toString(); // Saves to globalTotal in case user does continuous operations.
                                        document.getElementById("calcDisplay").value = thisTotal.toString();
                                        break;
                              case "/":
                                        var thisTotal = term1 / term2;
                                        globalTotal = (term1 / term2).toString(); // Saves to globalTotal in case user does continuous operations.
                                        document.getElementById("calcDisplay").value = thisTotal.toString();
                                        break;

                            }

                            // Reset variables and set equalsFlag for checkIfNewOperation()
                            num1 = "";
                            num2 = "";
                            nextNumFlag = false;
                            equalsFlag = true;
                            break;

                // If user presses clear it resets all variables, flags, and sets
                // display back to 0.
                case "clr":
                            document.getElementById("calcDisplay").value = "0";
                            num1 = "";
                            num2 = "";
                            total = "";
                            equalsFlag = false;
                            decimalFlag = false;
                            nextNumFlag = false;
                            break;
                // Else, YIKES!
                default:
                            document.getElementById("calcDisplay").value = "Err";
                            num1 = "";
                            num2 = "";
                            total = "";
                            break;

  }
}
