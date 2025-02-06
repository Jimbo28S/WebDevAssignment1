/*
* Temperature Converter
* 02/06/25
* A program to convert temerature values from the celsius to fahrenheit, or fahrenheit to celsius
* The input can be a single value, or an array of values
*
*/



//Save HTML elements as javascript variables
const finalTemp = document.getElementById('celsiusToFahrenheit')
const givenC = document.getElementById('celsiusInput')
const givenF = document.getElementById('fahrenheitInput')
const tempForm = document.getElementById('tempForm');

// Code to prevent the form from reloading and losing information


tempForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tempFd = new FormData(tempForm);
    const tempObj = Object.fromEntries(tempFd);

    const tempJson = JSON.stringify(tempObj);
    localStorage.setItem('tempForm', tempJson);
})

const tempJson = localStorage.getItem('tempForm');
const tempObj = JSON.parse(tempJson);

for (tempKey in tempObj) {
    const markup = `
    <div>
        <span>${tempKey}: ${tempObj[tempKey]}</span>
    </div>
    `;
    finalTemp.value = markup;
}

//Function to determine which way the conversion is going , and calls the converter


function setupConverter() {

    /* Temperature Page */
    if (givenC) {
        if (givenC.value === "") {
            value1 = "°F"
            value2 = "°C"
            createConverter(value1, value2)
        }
        else if (givenF.value === "") {
            value1 = "°C"
            value2 = "°F"
            createConverter(value1, value2)
        }
    }
}


// Function to convert a single value ,or an array of values
const createConverter = (fromUnit, toUnit) => {

    finalTemp.textContent = "";

    switch (fromUnit) {
        case "°C":
            valueToConvert = givenC.value;

            // If  multiple values have been entered
            if (valueToConvert.includes(",")) {
                const valuesArray = valueToConvert.split(",");

                for (const value of valuesArray) {
                    formattedValue = value.replace(',', '')
                    convertedValue = ((formattedValue * 9) / 5 + 32);

                    finalTemp.textContent = finalTemp.textContent.concat(" (" + formattedValue + "°C" + " --> ", convertedValue + "°F" + ") ");
                    givenC.value = null;
                }
            }

            //If a single value has been entered
            else {
                convertedValue = ((valueToConvert * 9) / 5 + 32);
                finalTemp.textContent = valueToConvert + " °C converted to fahrenheit is: " + convertedValue + "°F";
                givenC.value = null;
            }
            
            break;
        case "°F":
            valueToConvert = givenF.value;
            if (valueToConvert.includes(",")) {
                const valuesArray = valueToConvert.split(",");

                for (const value of valuesArray) {
                    formattedValue = value.replace(',', '')
                    convertedValue = ((formattedValue - 32) * 5) / 9;

                    finalTemp.textContent = finalTemp.textContent.concat(" (" + formattedValue + "°F" + " --> ", convertedValue + "°C" + ") ");
                    givenF.value = null;
                }
            }

            // if a single value has been entered
            else {
                convertedValue = ((valueToConvert - 32) * 5) / 9;
                finalTemp.textContent = valueToConvert + " °F converted to fahrenheit is: " + convertedValue + "°C";
                givenF.value = null;
            }

            break;
    }
}