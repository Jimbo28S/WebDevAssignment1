console.log("weight script loaded")

const givenLb = document.getElementById('lbInput')
const givenKg = document.getElementById('kgInput')
const finalWeight = document.getElementById('lbToKgResult')

const weightForm = document.getElementById('weightForm');

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


function weightConverter() {
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


const createWeightConverter = (fromUnit, toUnit) => {

    finalWeight.textContent = "";

    switch (fromUnit) {
        case "Lb":
            weightValueToConvert = givenLb.value;
            if (weightValueToConvert.includes(",")) {
                const wValuesArray = weightValueToConvert.split(",");

                for (const wValue of wValuesArray) {
                    wFormattedValue = wValue.replace(',', '');
                    convertedWeightValue = (wFormattedValue * 0.45359237);

                    finalWeight.textContent = finalWeight.textContent.concat(" (" + wFormattedValue + "Lb" + " --> ", convertedWeightValue + " Kg) ");
                    givenLb.value = null;
                }
            }
            else {
                convertedWeightValue = (weightValueToConvert * 0.45359237);
                finalWeight.textContent = weightValueToConvert + " Lb converted to metric is: " + convertedWeightValue + " Kg";
                givenLb.value = null;
            }
            
            break;
        case "Kg":
            weightValueToConvert = givenKg.value;
            if (weightValueToConvert.includes(",")) {
                const wValuesArray = weightValueToConvert.split(",");

                for (const wValue of wValuesArray) {
                    wFormattedValue = wValue.replace(',', '');
                    convertedWeightValue = (wFormattedValue * 2.20462262185);

                    finalWeight.textContent = finalWeight.textContent.concat(" (" + wFormattedValue + "Kg" + " --> ", convertedWeightValue + "Lb" + ") ");
                    givenKg.value = null;
                }
            }
            else {
                convertedWeightValue = (weightValueToConvert * 2.20462262185);
                finalWeight.textContent = weightValueToConvert + " Kg converted to imperial is: " + convertedWeightValue + "Lb";
                givenKg.value = null;
            }
            
            break;
    }
}
