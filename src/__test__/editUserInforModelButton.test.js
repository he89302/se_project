import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { configure, mount } from 'enzyme';
import EditUserInforModelButton from '../editUserInforModelButton';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'react-bootstrap'

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

it("<EditUserInforModelButton />", () => {
  act(() => {
    render(<EditUserInforModelButton />, editUserInforModelButton);
  });
  expect(editUserInforModelButton.textContent).toBe("Edit");
});

describe('edit user infor model should mount', () => {
  it('Click Button', () => {
    let EditUserInforModelButtonComponent = mount(<EditUserInforModelButton />);
    let button = EditUserInforModelButtonComponent.find(Button);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(button.props().children).toEqual("Edit");
  });
});
