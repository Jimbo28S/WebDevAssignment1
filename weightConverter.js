/*
* Weight Converter
* 02/06/25
* A program is covnvert weight values from Pounds to Kilograms or kilograms to pounds.
* The input can be the single value or an array of values
*
*
*/


//Save HTML elements as javascript variables

const givenLb = document.getElementById('lbInput')
const givenKg = document.getElementById('kgInput')
const finalWeight = document.getElementById('lbToKgResult')
const weightForm = document.getElementById('weightForm');

// Code to prevent the form from reloding and losing information
weightForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const weightFd = new FormData(weightForm);
    const weightObj = Object.fromEntries(weightFd);

    const weightJson = JSON.stringify(weightObj);
    localStorage.setItem('weightForm', weightJson);
})

const weightJson = localStorage.getItem('weightForm');
const weightObj = JSON.parse(weightJson);

for (key in weightObj) {
    const weightMarkup = `
    <div>
        <span>${key}: ${weightObj[key]}</span>
    </div>
    `;
    finalWeight.value = weightMarkup;
}


//Function to determine which way the conversion is going, and call the converter 
function weightConverter() {

    /* Weight Page */
    if (givenKg) {
        if (givenKg.value === "") {
            value1 = "Lb"
            value2 = "Kg"
            createWeightConverter(value1, value2)
        }
        else if (givenLb.value === "") {
            value1 = "Kg"
            value2 = "Lb"
            createWeightConverter(value1, value2)
        }
    }
    
} 


// Function to convert a single value, or an array of values
const createWeightConverter = (fromUnit, toUnit) => {

    finalWeight.textContent = "";

    switch (fromUnit) {
        case "Lb":
            weightValueToConvert = givenLb.value;

            //If multiple values have been entered
            if (weightValueToConvert.includes(",")) {
                const wValuesArray = weightValueToConvert.split(",");

                for (const wValue of wValuesArray) {
                    wFormattedValue = wValue.replace(',', '');
                    convertedWeightValue = (wFormattedValue * 0.45359237);

                    finalWeight.textContent = finalWeight.textContent.concat(" (" + wFormattedValue + "Lb" + " --> ", convertedWeightValue + " Kg) ");
                    givenLb.value = null;
                }
            }


            // If a single value has been entered
            else {
                convertedWeightValue = (weightValueToConvert * 0.45359237);
                finalWeight.textContent = weightValueToConvert + " Lb converted to metric is: " + convertedWeightValue + " Kg";
                givenLb.value = null;
            }
            
            break;
        case "Kg":
            weightValueToConvert = givenKg.value;

            // If multiple values has been entered
            if (weightValueToConvert.includes(",")) {
                const wValuesArray = weightValueToConvert.split(",");

                for (const wValue of wValuesArray) {
                    wFormattedValue = wValue.replace(',', '');
                    convertedWeightValue = (wFormattedValue * 2.20462262185);

                    finalWeight.textContent = finalWeight.textContent.concat(" (" + wFormattedValue + "Kg" + " --> ", convertedWeightValue + "Lb" + ") ");
                    givenKg.value = null;
                }
            }

            // If a single value has been entered
            else {
                convertedWeightValue = (weightValueToConvert * 2.20462262185);
                finalWeight.textContent = weightValueToConvert + " Kg converted to imperial is: " + convertedWeightValue + "Lb";
                givenKg.value = null;
            }
            
            break;
    }
}
