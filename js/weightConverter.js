const givenLb = document.getElementById('lbInput')
const givenKg = document.getElementById('kgInput')
const finalWeight = document.getElementById('lbToKgResult')

const weightForm = document.getElementById('weightForm');

weightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const weightFd = new FormData(weightForm);
    const weightObj = Object.fromEntries(weightFd);

    const weightJson = JSON.stringify(weightObj);
    localStorage.setItem('weightForm', weightJson);
})

const weightJson = localStorage.getItem('weightForm');
const weightObj = JSON.parse(weightJson);

for (key in weightObj) {
    const markup = `
    <div>
        <span>${key}: ${weightObj[key]}</span>
    </div>
    `;
    finalWeight.value = markup;
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

    switch (fromUnit) {
        case "Lb":
            weightValueToConvert = givenLb.value;
            convertedWeightValue = (weightValueToConvert * 0.45359237);
            finalWeight.value = weightValueToConvert + "Lb converted to imperial is: " + convertedWeightValue + "Kg";
            break;
        case "Kg":
            weightValueToConvert = givenKg.value;
            convertedWeightValue = (weightValueToConvert * 2.20462262185);
            finalWeight.value = weightValueToConvert + "Kg converted to imperial is: " + convertedWeightValue + "Lb";
            break;
    }
}