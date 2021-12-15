import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SortReviews from '../../client/src/Ratings/SortReviews';

test('SortReviews renders', () => {
  var { getByTestId } = render(<SortReviews/>);
  var divEl = getByTestId('practice-div');
  expect(divEl.textContent).toBe('This is a Practice component');
})