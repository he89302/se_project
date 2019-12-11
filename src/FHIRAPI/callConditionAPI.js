function CallConditionAPI(id) {
    // http://hapi.fhir.org/baseR4/Procedure?patient=99409
    return (fetch('http://hapi.fhir.org/baseR4/Condition?patient=' + id, { method: 'GET' })
        .then(response => response.json())
        .then((data) => data.entry)
        .catch(console.log()));
}

export default CallConditionAPI;