import React from 'react';
import { render } from '@testing-library/react';
import RelatedProducts from '../../client/src/Related/RelatedProducts.jsx';

const exampleData = require('../../server/routes/RelatedFakeData').fakeProducts;
let exampleItem = exampleData[0].id;

test('should have title *RELATED PRODUCTS*', () => {
  let { getByTestId } = render(<RelatedProducts />);
  let listHeader = getByTestId('listHeader');
  expect(listHeader.textContent).toBe('RELATED PRODUCTS');
})

test('relatedList component renders to the page', () => {
  const { getByTestId } = render(<RelatedProducts />);
  getByTestId('listContainer');
  getByTestId('list');
});

//should contain all of the related items of a product

test('should have scroll arrows', () => {
  const { getByTestId } = render(<RelatedProducts />);
  const relatedContainer = getByTestId('listContainer');
  const arrows = getByTestId('arrows');
  expect(relatedContainer.children).toContainEqual(arrows);
})
