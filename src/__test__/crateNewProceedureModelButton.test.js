import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { configure, mount } from 'enzyme';
import CrateNewProceedureModelButton from '../crateNewProceedureModelButton';
import { Button } from 'react-bootstrap'
import Adapter from 'enzyme-adapter-react-16';
import MakeProcedureModal from '../makeProcedureModal';

beforeEach(() => {
    // setup a DOM element as a render target
    editUserInforModelButton = document.createElement("div");
    document.body.appendChild(editUserInforModelButton);
    configure({ adapter: new Adapter() });
});

let editUserInforModelButton = null;
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(editUserInforModelButton);
    editUserInforModelButton.remove();
    editUserInforModelButton = null;
});

describe('CrateNewProceedureModelButton amount onclick', () => {
    it("onClick", () => {
        let CrateNewProceedureModelButtonComponent = mount(<CrateNewProceedureModelButton />);
        let button = CrateNewProceedureModelButtonComponent.find(Button);
        button.simulate('click')
        expect(button.length).toBe(1);
        expect(button.props().children).toEqual("Create new procedure");
    });

    it("procedureModal should be amount", () => {
        let onHide = jest.fn();
        const procedure = {
            resource: {
                resourceType: 'Procedure',
                code: {
                    coding: [{
                        system: "http://snomed.info/sct",
                        code: "230056204",
                        display: "SARS"
                    }],
                    text: "230056004"
                },
                subject: { reference: "Patient/99409" },
                performedDateTime: "2019-10-11",
                outcome: { text: "isolate home" }
            }
        };
        let CrateNewProceedureModelButtonComponent = mount(<CrateNewProceedureModelButton />);
        let procedureModal = CrateNewProceedureModelButtonComponent.find(MakeProcedureModal);
        procedureModal.props().data = procedure;
        procedureModal.props().onHide = onHide;
        expect(procedureModal.props().show).toEqual(false);
        expect(procedureModal.props().data).toEqual(procedure);
        expect(procedureModal.props().onHide).toEqual(onHide); 
    });
});