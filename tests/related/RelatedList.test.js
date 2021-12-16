import React from 'react';
import { render, screen, within } from '@testing-library/react';
import RelatedList from '../../client/src/Related/RelatedList.jsx';

const exampleData = require('../../server/routes/RelatedFakeData').fakeProducts;
let exampleItem = exampleData[0].id;

test('should output *RELATED PRODUCTS*', () => {
  let { getByTestId } = render(<RelatedList />);
  let listHeader = getByTestId('listHeader');
  expect(listHeader.textContent).toBe('RELATED PRODUCTS');
})

// test('should output *Related Products List*', () => {
//   let { getByTestId } = render(<RelatedList />);
//   let container = getByTestId('container');
//   expect(container.textContent).toBe('RELATED PRODUCTS');
// })