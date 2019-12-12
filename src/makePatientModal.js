import React, { useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap'

export function callPostProcedureAPI(obj) {
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

function MakePatientModal(props) {
    const [state, setState] = useState({
        nameFamily: props.nameFamily,
        nameGiven: props.nameGiven,
        gender: props.gender,
        patientId: props.patientId,
        height: props.height,
        weight: props.weight,
        bloodGroup: props.bloodGroup,
        familyHistory: props.familyHistory,
        allergy: props.coding,
        city: props.address.city,
        address: props.address.text,
        telecom: props.telecom,
        contactsFamily: props.contactsFamily,
        contactsGiven: props.contactsGiven,
        contactsRelation: props.contactsRelation,
        contactsTel: props.contactsTel,
        note: '',
    });
    // var moment = require('moment');

    // function buildProceduredata(display, outcome) {
    //     let obj = {
    //         resource: {
    //             resourceType: 'Procedure',
    //             code: {
    //                 coding: [{
    //                     system: "http://snomed.info/sct",
    //                     code: "230056204",
    //                     display: display
    //                 }],
    //                 text: "230056004"
    //             },
    //             subject: { reference: "Patient/99409" },
    //             performedDateTime: moment().format('YYYY-MM-DD'),
    //             outcome: { text: outcome }
    //         }
    //     };
    //     return obj;
    // }

    function handleSubmit(event) {
        let nameFamily = state.nameFamily;
        let nameGiven = state.nameGiven;
        let gender = state.gender;
        let birthDate = state.birthDate;
        let telecomeValue = state.telcome;
        let address = [];
        let coding = state.coding;
        let contactsFamily = state.contactsFamily;
        let contactsGiven = state.contactsGiven;
        let contactsRelation = state.contactsRelation;
        let contactsTel = state.contactsTel;
        let height = state.height;
        let weight = state.weight;
        let bloodGroup = state.bloodGroup;
        let familyHistory = state.familyHistory;
        let name = [];
        let telecome = [];
        telecome.push({
            "system": "phone",
            "value": telecomeValue,
            "use": "home",
        })
        address.push({
            "use": "home",
            "type": "both",
            "text": state.address,
            "city": state.city,
            "district": "大安區",
            "postalCode": "1",
        })
        name.push({
            'family': nameFamily,
            'given': nameGiven 
        })
        let contact = [];
        contact.push({
            'name': {
                'family':state.contactsFamily,
                'given':state.given
            },
            'telecom':[{'value':state.contactsTel}],
            'relationship':[{'coding':[{'code':state.contactsRelation}]}]
        })
        let data = { name, gender, birthDate, telecome, address, contact}
        props.updateName(data);
        props.setModalShow(false);
    }

    function handleNameFamilyChange(event) {
        const value = event.target.value;
        const nameFamily = props.nameFamily;
        if (value !== '') {
            setState({
                ...state,
                nameFamily: value,
            });
        } else if (value === '') {
            setState({
                ...state,
                nameFamily: nameFamily,
            });
        }
    }

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
        const value = event.target.value;
        setState({
            ...state,
            patientId: value,
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

    function handleAddressChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            address: value,
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
            contactsFamily: value,
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
                            <Col controlId="formNameFamily">
                                <Form.Control type="formNameFamily" placeholder="姓" defaultValue={props.nameFamily} onChange={handleNameFamilyChange} />
                            </Col>
                            <Col>
                                <Form.Control controlId="formNameGiven" type="formCodeDisplay" placeholder="名" defaultValue={props.nameGiven} onChange={handleNameGivenChange} />
                            </Col>
                        </Form.Row>
                        <Form.Text className="text-muted" >
                            姓名為必填
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formGendar">
                        <Form.Label>性別 :</Form.Label>
                        <Form.Control type="formCodeDisplay" placeholder="性別" defaultValue={props.gender} onChange={handleGenderChange} />
                    </Form.Group>
                    <Form.Group controlId="formPatientId">
                        <Form.Label>身分證字號 :</Form.Label>
                        <Form.Control type="formCodeDisplay" placeholder="身分證字號" defaultValue={props.patientId} onChange={handlePatientIdChange} />
                        <Form.Text className="text-muted" >
                            身分證字號為必填
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formHeight">
                        <Form.Label>身高 :</Form.Label>
                        <Form.Control type="formCodeDisplay" placeholder="身高" defaultValue={props.height} onChange={handleHeightChange} />
                    </Form.Group>
                    <Form.Group controlId="formWeight">
                        <Form.Label>體重 :</Form.Label>
                        <Form.Control type="formCodeDisplay" placeholder="體重" defaultValue={props.weight} onChange={handleWeightChange} />
                    </Form.Group>
                    <Form.Group controlId="formBloodGroup">
                        <Form.Label>血型 :</Form.Label>
                        <Form.Control type="formCodeDisplay" placeholder="血型" defaultValue={props.bloodGroup} onChange={handleBloodGroupChange} />
                    </Form.Group>
                    <Form.Group controlId="formFamilyHistory">
                        <Form.Label>家族病史 :</Form.Label>
                        <Form.Control type="formCodeDisplay" placeholder="家族病史" defaultValue={props.familyHistory} onChange={handleFamilyHistoryChange} />
                    </Form.Group>
                    <Form.Group controlId="formFamilyHistory">
                        <Form.Label>過敏藥物 :</Form.Label>
                        {props.coding.map((item, index) => {
                            return (<Form.Control type="formCodeDisplay" placeholder="過敏藥物" defaultValue={item.display} onChange={handleAllergyChange} />);
                        })}
                    </Form.Group>
                    <Form.Group controlId="formFamilyHistory">
                        <Form.Row>
                            <Col>
                                <Form.Label>地區 :</Form.Label>
                                <Form.Control type="formCodeDisplay" placeholder="地區" defaultValue={props.address.city} onChange={handleAddressChange} />
                            </Col>
                            <Col>
                                <Form.Label>住址 :</Form.Label>
                                <Form.Control type="formCodeDisplay" placeholder="住址" defaultValue={props.address.text} onChange={handleAddressChange} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formFamilyHistory">
                        <Form.Label>電話 :</Form.Label>
                        {props.telecom.map((item, index) => {
                            if (item.value !== undefined)
                                return (<Form.Control type="formCodeDisplay" placeholder="電話" defaultValue={item.value} onChange={handleTelecomChange} />);
                            else
                                return null;
                        })}
                    </Form.Group>
                    <Form.Group controlId="formOutcome">
                        <Form.Label>監護人姓名</Form.Label>
                        <Form.Row>
                            <Col controlId="formNameFamily">
                                <Form.Control type="formNameFamily" placeholder="姓" defaultValue={props.contactsFamily} onChange={handleContactsNameFamilyChange} />
                            </Col>
                            <Col>
                                <Form.Control controlId="formNameGiven" type="formCodeDisplay" placeholder="名" defaultValue={props.contactsGiven} onChange={handleContactsNameGivenChange} />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formOutcome">
                        <Form.Label>監護人關係</Form.Label>
                            <Form.Control type="formCodeDisplay" placeholder="監護人關係" defaultValue={props.contactsRelation} onChange={handleContactsRelationChange} />
                    </Form.Group>
                    <Form.Group controlId="formOutcome">
                        <Form.Label>監護人手機</Form.Label>
                        <Form.Control type="formCodeDisplay" placeholder="監護人手機" defaultValue={props.contactsTel} onChange={handleContactsTelChange} />
                    </Form.Group>
                    <Form.Group controlId="formOutcome">
                        <Form.Label>備註</Form.Label>
                        <Form.Control type="formCodeOutcome" as="textarea" placeholder="Enter outcome" onChange={handleNoteChange} />
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