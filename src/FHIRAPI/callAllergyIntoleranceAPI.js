function CallAllergyIntoleranceAPI(id) {
    return (fetch('http://hapi.fhir.org/baseR4/AllergyIntolerance?patient=' + id, { method: 'GET' })
        .then(response => response.json())
        .then((data) => data.entry[0].resource.code.coding)
        .catch(console.log()));
}

export default CallAllergyIntoleranceAPI;