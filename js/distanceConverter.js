console.log("distance script loaded")


const finalDist = document.getElementById('milesToKm')
const givenM = document.getElementById('milesInput')
const givenKm = document.getElementById('kmInput')





const distForm = document.getElementById('distForm');

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



function setupConverter() {

    /* Distance Page */

        if (givenKm.value === "") {
            value1 = "Mile"
            value2 = "Km"
            createConverter(value1, value2)
        }
        else if (givenM.value === "") {
            value1 = "Km"
            value2 = "Mile"
            createConverter(value1, value2)
        }
    }



const createConverter = (fromUnit, toUnit) => {

    switch (fromUnit) {
        case "Mile":
            valueToConvert = givenM.value;
            convertedValue = (valueToConvert * 1.60934);
            finalDist.textContent = valueToConvert + " Miles converted to metric is: " + convertedValue + "Km";
            break;
        case "Km":
            valueToConvert = givenKm.value;
            convertedValue = (valueToConvert / 1.609);
            finalDist.textContent = valueToConvert + " Km converted to imperial is: " + convertedValue + "miles";
            break;
    }
}