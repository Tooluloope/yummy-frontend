import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";


// Basic Test with React-test-renderer
it("renders correctly react-test-renderer", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
