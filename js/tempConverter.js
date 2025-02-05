console.log("temp script loaded")


const finalTemp = document.getElementById('celsiusToFahrenheit')
const givenC = document.getElementById('celsiusInput')
const givenF = document.getElementById('fahrenheitInput')

const tempForm = document.getElementById('tempForm');

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



const createConverter = (fromUnit, toUnit) => {

    switch (fromUnit) {
        case "°C":
            valueToConvert = givenC.value;
            convertedValue = ((valueToConvert * 9) / 5 + 32);
            finalTemp.textContent = valueToConvert + " °C converted to fahrenheit is: " + convertedValue + "°F";
            givenC.value = null;
            break;
        case "°F":
            valueToConvert = givenF.value;
            convertedValue = ((valueToConvert - 32) * (5/9));
            finalTemp.textContent = valueToConvert + " °F converted to celsius is: " + convertedValue + "°C";
            givenF.value = null;
            break;
    }
}