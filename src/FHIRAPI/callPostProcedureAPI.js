export default function callPostProcedureAPI(obj) {
    fetch('http://hapi.fhir.org/baseR4/Procedure', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(
            obj.resource
        )
    }).then((response) => {
        return response.json();

    }).then((jsonData) => {
        console.log(jsonData);
    }).catch((err) => {
        console.log('錯誤:', err);
    })
}