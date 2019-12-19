import React, { useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import callPutObservationAPI from "./FHIRAPI/callPutObservationAPI";
import callPutPatientAPI from "./FHIRAPI/callPutPatientAPI";
import callPutAllergyAPI from "./FHIRAPI/callPutAllergyAPI";
import callPutFamilyHistoryAPI from "./FHIRAPI/callPutFamilyHistoryAPI";

function MakePatientModal(props) {
    const [state, setState] = useState({
        ...props,
        nameFamily: props.nameFamily,
        nameGiven: props.nameGiven,
        gender: props.gender,
        patientId: props.patientId,
        height: props.height,
        weight: props.weight,
        birthDate: props.birthDate,
        age: 0,
        bloodGroup: props.bloodGroup,
        familyHistory: props.familyHistory,
        allergy: props.allergy,
        city: props.city,
        addressText: props.addressText,
        telecom: props.telecom,
        contactsFamily: props.contactsFamily,
        contactsGiven: props.contactsGiven,
        contactsRelation: props.contactsRelation,
        contactsTel: props.contactsTel,
        note: '',
    });
    var moment = require('moment');

    function handleSubmit(event) {
        console.log('bbbb', state.city)
        let nameFamily = state.nameFamily;
        let nameGiven = state.nameGiven;
        let gender = state.gender;
        let birthDate = moment(state.birthDate).format('YYYY-MM-DD')
        let telecomeValue = state.telecom;
        let address = [];
        let name = [];
        let telecom = [];
        let contact = [];
        telecom.push({
            "system": "phone",
            "value": telecomeValue,
            "use": "home",
        })
        address.push({
            "use": "home",
            "type": "both",
            "text": state.addressText,
            "city": state.city,
            "district": "",
            "postalCode": "1",
        })
        name.push({
            'family': nameFamily,
            'given': nameGiven
        })
        contact.push({
            'name': {
                'family': state.contactsFamily,
                'given': state.contactsGiven
            },
            'telecom': [{ 'value': state.contactsTel }],
            'relationship': [{ 'coding': [{ 'code': state.contactsRelation }] }]
        })
        let data = {
            "resourceType": "Patient",
            "id": props.id,
            "identifier": [{
                "value": state.patientId
            }],
            "photo": [{
                "url": "https://ppt.cc/fG5Gtx@.png"
            }],
            name,
            gender,
            birthDate,
            telecom,
            address,
            contact
        }
        let observationWeightResource = {
            "resourceType": "Observation",
            "id": props.observationWeightId,
            "code": {
                "coding": [{
                    "system": "http ://loinc.org",
                    "code": "Weight"
                }]
            },
            "subject": {
                "reference": "Patient/".concat(props.id)
            }, 'valueQuantity': {
                "value": state.weight,
                "unit": "kg"
            }
        }
        let observationHeightResource = {
            "resourceType": "Observation",
            "id": props.observationHeightId,
            "code": {
                "coding": [{
                    "system": "http ://loinc.org",
                    "code": "Height"
                }]
            },
            "subject": {
                "reference": "Patient/".concat(props.id)
            }, 'valueQuantity': {
                "value": state.height,
                "unit": "cm"
            }
        }
        let observationBloodGroupResource = {
            "resourceType": "Observation",
            "id": props.observationBloodGroupId,
            "code": {
                "coding": [{
                    "system": "http ://loinc.org",
                    "code": "BloodGroup"
                }]
            },
            "subject": {
                "reference": "Patient/".concat(props.id)
            }, "valueString": state.bloodGroup
        }

        let allergyResource = {
            "resourceType": "AllergyIntolerance",
            "id": props.allergyId,
            "type": "allergy",
            "category": [
                "medication"
            ],
            "code": {
                "coding": [{
                    "system": "http://snomed.info/sct",
                    "code": "7980",
                    "display": state.allergy
                }]
            },
            "patient": {
                "reference": "Patient/".concat(props.id)
            }
        }

        let familyHistoryResource = {
            "resourceType": "Condition",
            "id": props.familyHistoryId,
            "code": {
                "coding": [{
                    "system": "http://snomed.info/sct",
                    "code": "312824007",
                    "display": state.familyHistory
                }]
            },
            "subject": {
                "reference": "Patient/".concat(props.id)
            }
        }
        props.updateName(data);
        props.calculatedAge(birthDate);
        props.updateObservationInfo('Weight', observationWeightResource);
        props.updateObservationInfo('Height', observationHeightResource);
        props.updateObservationInfo('BloodGroup', observationBloodGroupResource);
        props.updateAllergyInfo(allergyResource);
        props.updateFamilyHistory(familyHistoryResource);
        // callPutObservationAPI(observationWeightResource);
        // callPutObservationAPI(observationHeightResource);
        // callPutObservationAPI(observationBloodGroupResource);
        // callPutPatientAPI(data);
        // callPutAllergyAPI(allergyResource);
        // callPutFamilyHistoryAPI(familyHistoryResource);
        props.setModalShow(false);
    }

    function handleCityChange(event) {
        console.log('aaaa', event.target.value);
        setState({
            ...state,
            city: event.target.value
        })
    }

    function handleNameFamilyChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            nameFamily: value,
        });
    }

    function handleBirthDayChange(date) {
        setState({
            ...state,
            birthDate: date
        });
    };

    function handleNameGivenChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            nameGiven: value,
        });
    }

    function handleGenderChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            gender: value,
        });
    }

    function handlePatientIdChange(event) {
        setState({
            ...state,
            patientId: event.target.value,
        });
    }

    function handleHeightChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            height: value,
        });
    }

    function handleWeightChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            weight: value,
        });
    }

    function handleBloodGroupChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            bloodGroup: value,
        });
    }

    function handleFamilyHistoryChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            familyHistory: value,
        });
    }

    function handleAllergyChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            allergy: value,
        });
    }

    function handleAddressTextChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            addressText: value,
        });
    }

    function handleTelecomChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            telecom: value,
        });
    }

    function handleContactsNameFamilyChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            contactsFamily: value,
        });
    }

    function handleContactsNameGivenChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            contactsGiven: value,
        });
    }

    function handleContactsRelationChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            contactsRelation: value,
        });
    }

    function handleContactsTelChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            contactsTel: value,
        });
    }

    function handleNoteChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            note: value,
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    修改
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group >
                        <Form.Row>
                            <Form.Label>姓名 :</Form.Label>
                            <Col>
                                <Form.Control id="formNameFamily" placeholder="姓" defaultValue={props.nameFamily} onChange={handleNameFamilyChange} />
                            </Col>
                            <Col>
                                <Form.Control id="formNameGiven" placeholder="名" defaultValue={props.nameGiven} onChange={handleNameGivenChange} />
                            </Col>
                        </Form.Row>
                        <Form.Text className="text-muted" >
                            姓名為必填
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formGendar">
                        <Form.Label>性別 :</Form.Label>
                        <Form.Control id="formGender" placeholder="性別" defaultValue={props.gender} onChange={handleGenderChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>身分證字號 :</Form.Label>
                        <Form.Control id="formPatientId" placeholder="身分證字號" defaultValue={props.patientId} onChange={handlePatientIdChange} />
                        <Form.Text className="text-muted" >
                            身分證字號為必填
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>生日 :</Form.Label>
                        <DatePicker
                            id="birthPicker"
                            showPopperArrow={false}
                            placeholderText={props.birthDate}
                            selected={state.birthDate}
                            onChange={date => handleBirthDayChange(date)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>身高 :</Form.Label>
                        <Form.Control id="formHeight" type="formCodeDisplay" placeholder="身高" defaultValue={props.height} onChange={handleHeightChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>體重 :</Form.Label>
                        <Form.Control id="formWeight" placeholder="體重" defaultValue={props.weight} onChange={handleWeightChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>血型 :</Form.Label>
                        <Form.Control id="formBloodGroup" placeholder="血型" defaultValue={props.bloodGroup} onChange={handleBloodGroupChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>家族病史 :</Form.Label>
                        <Form.Control id="formFamilyHistory" placeholder="家族病史" defaultValue={props.familyHistory} onChange={handleFamilyHistoryChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>過敏藥物 :</Form.Label>
                        <Form.Control id="formAllergy" placeholder="過敏藥物" defaultValue={props.allergy} onChange={handleAllergyChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label>地區 :</Form.Label>
                                <Form.Control id="formCity" placeholder="地區" defaultValue={props.city} onChange={handleCityChange} />
                            </Col>
                            <Col>
                                <Form.Label>住址 :</Form.Label>
                                <Form.Control id="formAddressText" placeholder="住址" defaultValue={props.addressText} onChange={handleAddressTextChange} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>電話 :</Form.Label>
                        <Form.Control id="formTelecom" placeholder="電話" defaultValue={props.telecom} onChange={handleTelecomChange} />
                    </Form.Group>
                    <Form.Group controlId="formOutcome">
                        <Form.Label>監護人姓名</Form.Label>
                        <Form.Row>
                            <Col>
                                <Form.Control id="formContactFamily" placeholder="姓" defaultValue={props.contactsFamily} onChange={handleContactsNameFamilyChange} />
                            </Col>
                            <Col>
                                <Form.Control id="formContactGiven" type="formCodeDisplay" placeholder="名" defaultValue={props.contactsGiven} onChange={handleContactsNameGivenChange} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>監護人關係</Form.Label>
                        <Form.Control id="formContactRelation" placeholder="監護人關係" defaultValue={props.contactsRelation} onChange={handleContactsRelationChange} />
                    </Form.Group>
                    <Form.Group controlId="formOutcome">
                        <Form.Label>監護人手機</Form.Label>
                        <Form.Control id="formContactTelecom" placeholder="監護人手機" defaultValue={props.contactsTel} onChange={handleContactsTelChange} />
                    </Form.Group>
                    <Form.Group controlId="formOutcome">
                        <Form.Label>備註</Form.Label>
                        <Form.Control id="formNote" as="textarea" placeholder="Enter outcome" onChange={handleNoteChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={handleSubmit} >Create</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default MakePatientModal;