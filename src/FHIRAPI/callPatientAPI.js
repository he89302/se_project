function CallPatientAPI(patientId) {
    return (fetch('http://hapi.fhir.org/baseR4/Patient?identifier=' + patientId, { method: 'GET' })
        .then(response => response.json())
        .then((data) => data.entry[0].resource)
        .catch(console.log()));
}

export default CallPatientAPI;