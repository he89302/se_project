import React, { useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MakeProcedureModal from './makeProcedureModal';

export default function CrateNewProceedureModelButton(props) {
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