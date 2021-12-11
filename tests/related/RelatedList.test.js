import React from 'react';
import { render } from '@testing-library/react';
import RelatedList from '../../client/src/Related/RelatedList.jsx';

test('should output *Related Products List*', () => {
  let { getByTestId } = render(<RelatedList />);
  let container = getByTestId('container');
  expect(container.textContent).toBe('Related Products List');
})