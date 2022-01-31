import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import StyleSelector from '../../client/src/Overview/components/styleComponents/styleSelector.jsx';
import Style from '../../client/src/Overview/components/styleComponents/style.jsx';
import Overview from '../../client/src/Overview/overview.jsx';

const mockProductData = require("../../server/routes/overviewRoutes/dummyData.js");

afterEach(() => {cleanup();})

test('should output Available Styles', () => {
  render(<StyleSelector styleList = {mockProductData.styles.results} currentStyle = {mockProductData.styles.results[0] }/>);
  const availableStyles = screen.getByTestId('availableStyles');
  expect(availableStyles.textContent).toBe('Available Styles');
})

test('Style component renders', () => {
  const { getByTestId } = render(<StyleSelector  styleList = {mockProductData.styles.results} currentStyle = {mockProductData.styles.results[0] } /> );
  getByTestId('styleSelect');
  getByTestId('styleList')
})