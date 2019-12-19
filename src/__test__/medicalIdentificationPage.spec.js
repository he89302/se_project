import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MedicalIdentificationPage from '../medicalIdentificationPage';
import expect from 'expect';

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

it("renders init MedicalIdentificationPage", () => {

  act(() => {
    render(<MedicalIdentificationPage />, container);
  });
  expect(container.textContent).toBe("Medical Service System  Edit姓名 :  性別 : 身分證字號 : I200339123出生年月日 : 年齡 : 0身高 : 0 cm體重 : 0 kg血型 : 家族病史 : 過敏藥物 : 住址 :  電話 : 監護人姓名 : 監護人關係 : 監護人手機 : 備註 : 無");
});

it('should call patientInfo when mounted', () => {
  let patientInfo = jest.fn()
  MedicalIdentificationPage.prototype.componentWillMount = patientInfo;
  mount(<MedicalIdentificationPage />);

  expect(patientInfo).toBeCalled();
});



