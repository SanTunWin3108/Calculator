const numberButtons = document.querySelectorAll(".number");
const outputValue = document.querySelector(".outputValue");
const historyValue = document.querySelector(".historyValue");
const operatorButtons = document.querySelectorAll(".operator");

let num = "";
let history = "";
outputValue.innerText = "0";
//Number buttons
for(let numberBtn of numberButtons) {
    numberBtn.addEventListener("click", (e) => {
        num += e.target.id;
        num = reverseFormattedString(num); //returns string without comma
        num = formattedString(num); // returns string with comma
        
        //show output
        outputValue.innerText = num;
    })
}

//Operator buttons
for(let operatorBtn of operatorButtons) {
    operatorBtn.addEventListener("click", (e) => {
        if(e.target.id === "clear") {
            outputValue.innerText = "0";
            historyValue.innerText = "";
            history = "";
            num = "";
        }

        else if(e.target.id === "backspace") {
            num = reverseFormattedString(num);
            num = num.substr(0, num.length-1);
            num = formattedString(num);
            outputValue.innerText = num;
        }

        else if(e.target.id === "%") {
            num = reverseFormattedString(num) / 100;
            num = formattedString(num);
            outputValue.innerText = num;
        }

        else {
            //add number to history
            num = reverseFormattedString(num);
            history += num;

            //buttons(+ - * /)
            if(e.target.id !== "=" && num !== "") {
                history += e.target.id;
                historyValue.innerText = history;
                outputValue.innerText = "";
                num = "";
        }
            //button(=)
            else if(num !== "") {
                let value = eval(history);

                //when a number is divided by zero
                if(isNaN(value) || value === Infinity || value === -Infinity) {
                    outputValue.innerText = "Cannot be divided by Zero";
                    historyValue.innerText = "";
                    history = "";
                    num = "";
                    return;
                }

                else if(value === -0) {
                    outputValue.innerText = "0";
                    historyValue.innerText = "";
                    history = "";
                    num = "";
                    return;
                }

                value = formattedString(value);
                outputValue.innerText = value;
                historyValue.innerText = "";
                history = "";
                num = value;
        }
        }
    })
}

//convert a string without comma to a string with comma
const formattedString = (num) => {
    num = Number(num); //convert string to number
    num = num.toLocaleString("en"); //convert number to string with comma
    return num;
}

//removes comma from a string
const reverseFormattedString = (num) => {
    num = num.replace(/,/g, ""); //removes comma from string
    return num;
}