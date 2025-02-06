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
            createDistanceConverter(value1, value2)
        }
        else if (givenM.value === "") {
            value1 = "Km"
            value2 = "Mile"
            createDistanceConverter(value1, value2)
        }
    }



const createDistanceConverter = (fromUnit, toUnit) => {

    finalDist.textContent = "";
    
    switch (fromUnit) {
        case "Mile":
            dValueToConvert = givenM.value;
            if (dValueToConvert.includes(",")) {
                const dValuesArray = dValueToConvert.split(",");

                for (const dValue of dValuesArray) {
                    dFormattedValue = dValue.replace(',', '');
                    dConvertedValue = (dFormattedValue * 1.60934);
    
                    finalDist.textContent = finalDist.textContent.concat(" (" + dFormattedValue + " Miles" + " --> ", dConvertedValue + " Km) ");
                    givenM.value = null;
                }
            }
            else {
                dConvertedValue = (dValueToConvert * 1.60934);
                finalDist.textContent = dValueToConvert + " Miles converted to metric is: " + dConvertedValue + " Km";
                givenM.value = null;
            }
                
            break;
        case "Km":
            dValueToConvert = givenKm.value;
            if (dValueToConvert.includes(",")) {
                const dValuesArray = dValueToConvert.split(",");

                for (const dValue of dValuesArray) {
                    dFormattedValue = dValue.replace(',', '');
                    dConvertedValue = (dFormattedValue * 0.621371);

                    finalDist.textContent = finalDist.textContent.concat(" (" + dFormattedValue + " Km" + " --> ", dConvertedValue + " Miles" + ") ");
                    givenKm.value = null;
                }
            }
            else {
                dConvertedValue = (dValueToConvert * 0.621371);
                finalDist.textContent = dValueToConvert + " Km converted to imperial is: " + dConvertedValue + " Miles";
                givenKm.value = null;
            }
            
            break;
    }
}
    