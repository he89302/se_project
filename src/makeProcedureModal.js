import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import callPostProcedureAPI from './FHIRAPI/callPostProcedureAPI';

function MakeProcedureModal(props) {
    const [state, setState] = useState({
        display: '',
        outcome: '',
    });
    var moment = require('moment');

    function buildProceduredata(display, outcome) {
        let obj = {resource: {
            resourceType: 'Procedure',
            code: {
                coding: [{
                    system: "http://snomed.info/sct",
                    code: "230056204",
                    display: display
                }],
                text: "230056004"
            },
            subject: { reference: "Patient/".concat(props.id) },
            performedDateTime: moment().format('YYYY-MM-DD'),
            outcome: { text: outcome }
        }};
        return obj;
    }

    function handleSubmit(event) {
        if (state.display === '') {
            alert('病情判斷不能為空');
            return;
        } else if (state.outcome === '') {
            alert('後續處理不能為空');
            return;
        }

        let obj = buildProceduredata(state.display, state.outcome);
        props.data.push(obj);
        
        callPostProcedureAPI(obj);
        props.setModalShow(false);
    }

    function handleChange(event) {
        const value = event.target.value;
        if(event.target.id === 'formCodeDisplay') {
            setState({
                ...state,
                display: value,
              });
        } else if(event.target.id === 'formOutcome') {
            setState({
                ...state,
                outcome: value,
              });
        }
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
                    新增病歷
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCodeDisplay">
                        <Form.Label>病情判斷</Form.Label>
                        <Form.Control type="formCodeDisplay" placeholder="Enter procedure" onChange={handleChange} />
                        <Form.Text className="text-muted" >

                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formOutcome">
                        <Form.Label>後續處理</Form.Label>
                        <Form.Control type="formCodeOutcome" as="textarea" placeholder="Enter outcome" onChange={handleChange} />
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

export default MakeProcedureModal;