import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Patient extends Component {
    
    sentData = () => { 
        this.props.medicalPageCallBack('Test Fuckkkkkk');
    }

    // callAllergyIntoleranceAPI() {
    //     fetch(this.state.url + '/AllergyIntolerance?patient=' + this.state.id, { method: 'GET' })
    //         .then(response => response.json())
    //         .then((data) => {
    //             let codingArray = this.prepare(data.entry[0].resource.code.coding);
    //             this.setState({
    //                 coding: codingArray,
    //             });
    //         })
    //         .catch(console.log())
    // }

    // callProcedureAPI() {
    //     // http://hapi.fhir.org/baseR4/Procedure?patient=99409
    //     fetch(this.state.url + '/Procedure?patient=' + this.state.id, { method: 'GET' })
    //         .then(response => response.json())
    //         .then((data) => {
    //             let entryArray = this.prepare(data.entry);

    //             this.setState({
    //                 procedure: entryArray,
    //                 currentProcedId: entryArray[0].resource.id,
    //             });
    //         })
    //         .catch(console.log())
    // }

    // callPatientAPI() {
    //     fetch(this.state.url + '/Patient?identifier=' + this.state.patientId, { method: 'GET' })
    //         .then(response => response.json())
    //         .then((data) => {
    //             let telecomArray = this.prepare(data.entry[0].resource.telecom);
    //             this.setState({
    //                 id: data.entry[0].resource.id,
    //                 birthDate: data.entry[0].resource.birthDate,
    //                 name: data.entry[0].resource.name[0],
    //                 gender: data.entry[0].resource.gender,
    //                 address: data.entry[0].resource.address[0],
    //                 imageUrl: data.entry[0].resource.photo[0].url,
    //                 telecom: telecomArray,
    //             })
    //             // this.callAllergyIntoleranceAPI();
    //             this.callProcedureAPI();
    //         })
    //         .catch(console.log())
    // }


    render() {
        return (
            <text onChange={this.sentData}>click</text>
        );
    }
}

export default Patient;
