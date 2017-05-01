$(document).ready(function(){
    console.log('document.ready is good!');

    click_handlers();
});
function click_handlers() {
        $('.inputs, .operators, .clear').click(button_clicked);
        $('.equal_button').click(button_clicked);
}
function button_clicked() {
    var buttons_value = $(this).val();
    console.log("value of the button is "+ buttons_value);

    switch (buttons_value){
        case 'C':
            console.log('You have cleared all data.');
            input = [''];
            input_index=0;
            $('.display').text(input);
            break;
        case 'CE':
            console.log('You have cleared last data input');
            if(input[input_index] !== ""){
                if(input_index == 0){
                    input.pop();
                    input = [""];
                }
                else{
                    input.pop();
                    input.push("");
                }
            }
            else if(input[input_index] === "" && input_index !== 0){
                input.pop();
                input.pop();
                input_index -= 2;
            }

            break;
        case '=':
            console.log ('This will compute your output.');
            equal();
            $(".display").text(input);
            break;
        case "*":
            write_operator('*');
            break;
        case "/":
            write_operator('/');
            break;
        case "+":
            write_operator('+');
            break;
        case "-":
            write_operator('-');
            break;
        default:
            console.log("you have selected a number");
            write_number(buttons_value);
            $(".display").text(input.join(" "));
            break;
    }
}

var input_index = 0;
var input =  [''];
var display;

function write_number(number) {
    // Write an if statement that will deter me from adding multiple '.'
    if (number === '.'){
        for (var i = 0; i < input[input_index].length; i++){
            if (input[input_index][i] === '.' ){
                return;
            }
        }
    }

    input[input_index] += number;
    console.log(input)
}

function write_operator (operator){
    if (input[input_index] === ""){
        input[input_index -1] = operator;

        console.log('New operator to replace old ' , input[input_index-1]);
        return;
    };



    input_index++;
    input[input_index] = operator;
    input_index++;
    input[input_index] = '';
}
///equal adds result once the numbers and operators are logged
function equal (){
    while (input.length > 2 && input[2]!= '') {
        var num1 = input[0];
        var num2 = input[2];
        var operator = input[1];

        var answer = doMath(num1, num2, operator);
        console.log(answer);

        input.splice(0, 2);
        input[0] = answer;
    }
    input_index = 0;
}

///This function will be doing the math with given Operators
function doMath(num1, num2, operator) {
    switch (operator){
        case '+':
            return parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            return parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            return parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            return parseFloat(num1) / parseFloat(num2);
            break
    }
}

// write_number('7');
// write_operator('+');
// write_operator('-');
// write_operator('*');
// write_number('2');
// write_number('3');
//
// equal();


