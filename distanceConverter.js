
// Save HTML elements as javascript variables
const finalDist = document.getElementById('milesToKm')
const givenM = document.getElementById('milesInput')
const givenKm = document.getElementById('kmInput')

const distForm = document.getElementById('distForm');

// Code to prevent the form from reloading and losing information
distForm.addEventListener('submit', (ed) => {
    ed.preventDefault();
    const distFd = new FormData(distForm);
    const distObj = Object.fromEntries(distFd);

    const distJson = JSON.stringify(distObj);
    localStorage.setItem('distForm', distJson);
})

const distJson = localStorage.getItem('distForm');
const distObj = JSON.parse(distJson);

for (distKey in distObj) {
    const markup = `
    <div>
        <span>${distKey}: ${distObj[distKey]}</span>
    </div>
    `;
    finalDist.value = markup;
}


// Function to determine which way the conversion is going, and calls the converter
function setupConverter() {

    /* Distance Page */

        if (givenKm.value === "") {
            value1 = "Mile"
            value2 = "Km"
            createDistanceConverter(value1, value2)
        }
        else if (givenM.value === "") {
            value1 = "Km"
            value2 = "Mile"
            createDistanceConverter(value1, value2)
        }
    }


// Function to convert a single value, or an array of values
const createDistanceConverter = (fromUnit, toUnit) => {

    finalDist.textContent = "";
    
    switch (fromUnit) {
        case "Mile":
            dValueToConvert = givenM.value;

            // If multiple values have been entered
            if (dValueToConvert.includes(",")) {
                const dValuesArray = dValueToConvert.split(",");

                for (const dValue of dValuesArray) {
                    dFormattedValue = dValue.replace(',', '');
                    dConvertedValue = (dFormattedValue * 1.60934);
    
                    finalDist.textContent = finalDist.textContent.concat(" (" + dFormattedValue + " Miles" + " --> ", dConvertedValue + " Km) ");
                    givenM.value = null;
                }
            }

            // If a single value has been entered
            else {
                dConvertedValue = (dValueToConvert * 1.60934);
                finalDist.textContent = dValueToConvert + " Miles converted to metric is: " + dConvertedValue + " Km";
                givenM.value = null;
            }
                
            break;
        case "Km":
            dValueToConvert = givenKm.value;

            // If multiple values have been entered
            if (dValueToConvert.includes(",")) {
                const dValuesArray = dValueToConvert.split(",");

                for (const dValue of dValuesArray) {
                    dFormattedValue = dValue.replace(',', '');
                    dConvertedValue = (dFormattedValue * 0.621371);

                    finalDist.textContent = finalDist.textContent.concat(" (" + dFormattedValue + " Km" + " --> ", dConvertedValue + " Miles" + ") ");
                    givenKm.value = null;
                }
            }

            // If a single value has been entered
            else {
                dConvertedValue = (dValueToConvert * 0.621371);
                finalDist.textContent = dValueToConvert + " Km converted to imperial is: " + dConvertedValue + " Miles";
                givenKm.value = null;
            }
            
            break;
    }
}
    