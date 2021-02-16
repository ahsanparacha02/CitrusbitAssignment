/**
 * @format
 */

import "react-native";
import React from "react";
import Home from "../src/components/Home";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const HomeData = renderer.create(<Home />).getInstance();
  expect(HomeData.change(2)).toEqual(2);
});
