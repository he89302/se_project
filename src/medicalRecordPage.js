import React, { Component, useState } from 'react';
import { Navbar, Nav, Form, Dropdown, Button, ButtonToolbar, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MakeProcedureModal from './makeProcedureModal';
import CallPatientAPI from './FHIRAPI/callPatientAPI';
import CallAllergyIntoleranceAPI from './FHIRAPI/callAllergyIntoleranceAPI';
import CallProcedureAPI from './FHIRAPI/callProcedureAPI';

import Patient from './patient'

function CrateNewProceedureModelButton(props) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <ButtonToolbar>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Create new procedure
        </Button>
            <MakeProcedureModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow={setModalShow}
                data={props.procedureData}
                currentTime={props.currentTime}
                id={props.id}
            />
        </ButtonToolbar>
    );
}

class MedicalRecordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'http://hapi.fhir.org/baseR4',
            id: "",                 //FHIR自己產生的ID
            patientId: 'I200339123',//身分證
            contacts: {},
            birthDate: [],
            name: {},
            gender: "",
            telecom: [],
            imageUrl: "",
            address: {},
            coding: [],
            procedure: [],
            currentProcedId: 0,
            currentTime: null,
            message: '',
        }
    }

    callBackFunction = (patient) => {
        this.setState({message:patient})
    }

    prepare(inputArray) {
        let array = [];
        inputArray.forEach(value => {
            array.push(value);
        })
        return array;
    }

    patientInfo() {
        CallPatientAPI(this.state.patientId).then(data => {
            let telecomArray = this.prepare(data.telecom);
            this.setState({
                id: data.id,
                birthDate: data.birthDate,
                name: data.name[0],
                gender: data.gender,
                address: data.address[0],
                imageUrl: data.photo[0].url,
                telecom: telecomArray,
            });
            CallAllergyIntoleranceAPI(this.state.id).then(data => {
                let codingArray = this.prepare(data.code.coding);
                this.setState({
                    coding: codingArray
                });
            });
            CallProcedureAPI(this.state.id).then(data => {
                let entryArray = this.prepare(data);
                this.setState({
                    procedure: entryArray,
                    currentProcedId: entryArray[0].resource.id,
                });
            });
        });
    }

    componentWillMount() {
        this.patientInfo();
        setInterval(function () {
            this.setState({
                currentTime: new Date().toLocaleString()
            });
        }.bind(this), 1000);
    }

    buildMedicalRecordTable() {
        return (
            <div>
            <table align="center" border="1">
                <tbody>
                    <tr >
                        <h1 align='center'>電子病歷</h1>
                        <tr>
                            <td width="300px">
                                病歷號碼 :
                            </td>
                            <td>
                                {this.state.currentProcedId}
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                姓名：
                        </td>
                            <td width="80%">
                                {this.state.name.family} {this.state.name.given}
                            </td>
                        </tr>
                        <tr>
                            <td width="300px">
                                生日：
                            </td>
                            <td>
                                {this.state.birthDate}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                性別：
                            </td>
                            <td>
                                {this.state.gender}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                身分證字號 :
                        </td>
                            <td>
                                {this.state.patientId}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                住址 :
                        </td>
                            <td>
                                {this.state.address.city} {this.state.address.text}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                電話 :
                        </td>
                            <td>
                                {this.state.telecom.map((item) => {
                                    if (item.value !== undefined)
                                        return (<div>{item.value}<br /></div>);
                                    else return null;
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                藥物過敏史：
                        </td>
                            {this.state.coding.map((item) => {
                                return (<tr>{item.display} </tr>);
                            })}
                        </tr>
                        <tr>
                            <td>
                                過去病史:
                        </td>
                            <td>
                                <tabble>
                                    <tr>
                                        <tr>
                                            <td >時間</td>
                                            <td >名稱</td>
                                            <td >後續處理</td>
                                        </tr>
                                        {this.state.procedure.map((item) => {

                                            let childMap = this.prepare(item.resource.code.coding);
                                            let display = {};

                                            childMap.forEach((data) => {
                                                display = data.display;
                                            })
                                            return (

                                                <tr>
                                                    <td >{item.resource.performedDateTime}</td>
                                                    <td >{display}</td>
                                                    <td >{item.resource.outcome.text}</td>
                                                </tr>
                                            );
                                        })}
                                    </tr>
                                </tabble>
                            </td>
                        </tr>
                        <tr>
                            <td width='600px' height='300px'>
                                病人圖像
                            </td>
                            <td>
                                <div style={{ 'margin-bottom': '300px', 'width': '200px' }}>
                                    <img
                                        src={this.state.imageUrl}
                                        alt="new"
                                    />
                                </div>
                                <div>

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                主治醫師：小馮 醫師
                        </td>
                            <td>
                                {this.state.currentTime}
                            </td>
                        </tr>
                    </tr>
                </tbody>
            </table>
            <div>
                <Patient medicalPageCallBack={this.callBackFunction} />
                <button>{this.state.message}</button>
                </div>
            </div>
        );
    }

    render() {
        document.body.style = 'background: #DDDDDD;';
        return (
            <div >
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
                                        小馮 醫師
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="function-manager" style={{ display: 'flex', }}>
                            <CrateNewProceedureModelButton procedureData={this.state.procedure} id={this.state.id} />
                        </div>
                        <br />
                        <div className="button-position" style={{ display: 'flex' }}>
                            {this.buildMedicalRecordTable()}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default MedicalRecordPage;