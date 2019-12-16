import React, { useState } from 'react';
import MakePatientModal from './makePatientModal'
import { ButtonToolbar, Button } from 'react-bootstrap';

export default function EditUserInforModelButton(props) {
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
                updateName={props.updateName}
                updateObservationInfo={props.updateObservationInfo}
                updateAllergyInfo={props.updateAllergyInfo}
                updateFamilyHistory={props.updateFamilyHistory}
            />
        </ButtonToolbar>
    );
}