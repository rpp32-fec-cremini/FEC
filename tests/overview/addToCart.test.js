import AddToCart from '../../client/src/Overview/components/cartComponents/addToCart.jsx';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Overview from '../../client/src/Overview/overview.jsx';

const mockProductData = require("../../server/routes/overviewRoutes/dummyData.js");

afterEach(()=>{cleanup();})

test('Should contain a button', () => {
  render(<AddToCart currentStyle = {mockProductData.styles.results[0] } />)
  const button = screen.getByTestId('bawtun');
  expect(button.textContent).toBe('Add to Cart');
})