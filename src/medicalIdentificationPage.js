import React, { Component, useState } from 'react';
import { Navbar, Nav, Form, Dropdown, ButtonToolbar, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CallPatientAPI from './FHIRAPI/callPatientAPI';
import MakePatientModal from './makePatientModal'
import CallAllergyIntoleranceAPI from './FHIRAPI/callAllergyIntoleranceAPI';
import CallObservationAPI from './FHIRAPI/callObservationAPI';
import CallConditionAPI from './FHIRAPI/callConditionAPI.js'

function EditUserInforModelButton(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <ButtonToolbar>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Edit
        </Button>
            <MakePatientModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow={setModalShow}
                {...props}
                currentTime={props.currentTime}
            />
        </ButtonToolbar>
    );
}

class MedicalIdentificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",                 //FHIR自己產生的ID
            patientId: 'I200339123',//身分證
            contacts: [],
            birthDate: "",
            age: 0,
            name: {},
            gender: "",
            telecom: [],
            imageUrl: "",
            address: {},
            coding: [],
            procedure: [],
            observation: [],
            contactsFamily:'',
            contactsGiven:'',
            contactsRelation: [],
            contactsTel: '',
            height: 0,
            weight: 0,
            bloodGroup: '',
            familyHistory: [],
        }
    }

    patientInfo() {
        CallPatientAPI(this.state.patientId).then(data => {
            let telecomArray = this.prepare(data.telecom);
            let contactsArray = this.prepare(data.contact);
            this.setState({
                id: data.id,
                birthDate: data.birthDate,
                name: data.name[0],
                gender: data.gender,
                address: data.address[0],
                imageUrl: data.photo[0].url,
                telecom: telecomArray,
                contacts: contactsArray,
            });
            CallAllergyIntoleranceAPI(this.state.id).then(data => {
                let codingArray = this.prepare(data);
                this.setState({
                    coding: codingArray
                });
            });
            CallObservationAPI(this.state.id).then(data => {
                let entryArray = this.prepare(data);
                entryArray.forEach((item) => {
                    this.updateObservationInfo(item.resource.code.coding[0].code, item.resource)
                });
            });
            CallConditionAPI(this.state.id).then(data => {
                let entryArray = this.prepare(data);
                entryArray.forEach((item) => {
                    this.updateFamilyHistory(item.resource.code);
                });
            });
            const age = this.calculatedAge();
            this.updatedContactsInfo(age);
        });
    }

    updateFamilyHistory(code) {
        let itemDisplayArray = [];
        code.coding.forEach((item) => {
            itemDisplayArray.push(item.display)
        })
        this.setState({
            familyHistory: itemDisplayArray
        })
    }

    updateObservationInfo(type, observationResource) {
        if (type === 'Weight') {
            this.setWeight(observationResource);
        } else if (type === 'Height') {
            this.setHeight(observationResource);
        } else if (type === 'BloodGroup') {
            this.setBloodGroup(observationResource);
        }
    }

    setWeight(observationResource) {
        this.setState({
            weight: observationResource.valueQuantity.value
        })
    }

    setHeight(observationResource) {
        this.setState({
            height: observationResource.valueQuantity.value
        })
    }

    setBloodGroup(observationResource) {
        this.setState({
            bloodGroup: observationResource.valueString
        })
    }

    calculatedAge = () => {
        var moment = require('moment');
        let birthDate = this.state.birthDate;
        return moment().diff(parseInt(birthDate, 10) + 1, 'years');
    }

    updatedContactsInfo(age) {
        let codeArray = [];
        let contactsFamily = "";
        let contactsGiven = "";
        let contactsTel = "";
        let contacts = this.prepare(this.state.contacts);
        contacts.forEach((item) => {
            contactsFamily = item.name.family;
            contactsGiven = item.name.given;
            let relationshipArray = this.prepare(item.relationship);
            let telecomArray = this.prepare(item.telecom);
            codeArray.push(relationshipArray[0].coding[0].code);
            contactsTel = telecomArray[0].value;
        });
        this.setState({
            contactsFamily: contactsFamily,
            contactsGiven: contactsGiven,
            age: age,
            contactsRelation: codeArray,
            contactsTel: contactsTel,
        });
    }

    componentWillMount() {
        this.patientInfo();
    }

    prepare(inputArray) {
        let array = [];
        inputArray.forEach(value => {
            array.push(value);
        })
        return array;
    }

    render() {
        return (
            <div>
                <Container>
                    <Navbar bg="primary" variant="dark" className="fixed-top">
                        <Navbar.Brand >
                            Medical Service System
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>

                        <Form inline>
                            <Dropdown >
                                <Dropdown.Toggle className="toggle-button" variant="secondary">
                                    <font color="white">
                                        {this.state.name.family} {this.state.name.given}
                                    </font>&nbsp;
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-right">
                                    <Dropdown.Item eventKey="1">
                                        <div onClick={() => { this.goToModifyPersonalInformation() }}>Modify personal information</div>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="2" href="/ezKanban/logout">
                                        Logout
                      </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form>
                    </Navbar><br /><br /><br /><br />
                        <div className="button-position" style={{ display: 'flex' }}>
                            <EditUserInforModelButton {...this.state} />
                            <table align="center" border="1px"><tbody>
                                <tr>
                                    <td>
                                        <img src={this.state.imageUrl} alt="new" width="500px" height="500px" />
                                    </td>
                                    <tr>
                                        <td>姓名 : </td>
                                        <td>{this.state.name.family} {this.state.name.given}</td>
                                    </tr>
                                    <tr>
                                        <td>性別 : </td>
                                        <td>{this.state.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>身分證字號 : </td>
                                        <td>{this.state.patientId}</td>
                                    </tr>
                                    <tr>
                                        <td>出生年月日 : </td>
                                        <td>{this.state.birthDate}</td>
                                    </tr>
                                    <tr>
                                        <td>年齡 : </td>
                                        <td>{this.state.age}</td>
                                    </tr>
                                    <tr>
                                        <td>身高 : </td>
                                        <td>{this.state.height} cm</td>
                                    </tr>
                                    <tr>
                                        <td>體重 : </td>
                                        <td>{this.state.weight} kg</td>
                                    </tr>
                                    <tr>
                                        <td>血型 : </td>
                                        <td>{this.state.bloodGroup}</td>
                                    </tr>
                                    <tr>
                                        <td>家族病史 : </td>
                                        <td>{this.state.familyHistory}</td>
                                    </tr>
                                    <tr>
                                        <td>過敏藥物 : </td>
                                        <td>{this.state.coding.map((item) => {
                                            return (<tr>{item.display} </tr>);
                                        })}</td>
                                    </tr>
                                    <tr>
                                        <td>住址 : </td>
                                        <td>{this.state.address.city} {this.state.address.text}</td>
                                    </tr>
                                    <tr>
                                        <td>電話 : </td>
                                        <td>{this.state.telecom.map((item) => {
                                            if (item.value !== undefined)
                                                return (<div>{item.value}<br /></div>);
                                            else return null;
                                        })}</td>
                                    </tr>
                                    <tr>
                                        <td>監護人姓名 : </td>
                                        <td>{this.state.contacts.map((item) => {
                                            if (item !== undefined)
                                                return (<div>{item.name.family} {item.name.given}</div>);
                                            else return null;
                                        })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>監護人關係 : </td>
                                        <td>{
                                            this.state.contactsRelation}</td>
                                    </tr>
                                    <tr>
                                        <td>監護人手機 : </td>
                                        <td>{this.state.contactsTel}</td>
                                    </tr>
                                    <tr>
                                        <td>備註 : </td>
                                        <td>無</td>
                                    </tr>
                                </tr></tbody>
                            </table>
                        </div>
                </Container>
            </div>

        );
    }

}

export default MedicalIdentificationPage;