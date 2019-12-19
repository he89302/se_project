async function CallObservationAPI(id) {
    return (await fetch('http://hapi.fhir.org/baseR4/Observation?patient=' + id, { method: 'GET' })
        .then(response => response.json())
        .then((data) => data.entry)
        .catch(console.log()));
}

export default CallObservationAPI;