import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddReview from '../../client/src/Ratings/AddReview';

test('AddReview renders', () => {
  var { getByTestId } = render(<AddReview/>);
  var divEl = getByTestId('practice-div');
  expect(divEl.textContent).toBe('This is a Practice component');
})