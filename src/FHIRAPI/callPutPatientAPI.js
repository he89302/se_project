export default function callPutPatientAPI(obj) {
    fetch('http://hapi.fhir.org/baseR4/Patient/'.concat(obj.id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(
            obj
        )
    }).then((response) => {
        return response.json();

    }).then((jsonData) => {
        console.log(jsonData);
    }).catch((err) => {
        console.log('錯誤:', err);
    })
}