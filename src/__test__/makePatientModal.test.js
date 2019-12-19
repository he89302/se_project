import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MakePatientModal from '../makePatientModal';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  configure({ adapter: new Adapter() });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Updates the handleCityChange", () => {
    const MakePatientModalComponent = mount(<MakePatientModal />);
    let formNameGivenControl = MakePatientModalComponent.find('formNameGiven');
    expect(formNameGivenControl.length).toBe(1);
    // const spy = jest.spyOn(MakePatientModalComponent, 'handleSubmit');


});