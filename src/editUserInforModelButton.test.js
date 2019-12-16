import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import EditUserInforModelButton from './editUserInforModelButton';


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("<EditUserInforModelButton />", () => {
  act(() => {
    render(<EditUserInforModelButton />, container);
  });
  expect(container.textContent).toBe("Edit");
});

it("onClick", () => { 
    
});