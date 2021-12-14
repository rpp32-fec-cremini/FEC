import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReviewsList from '../../client/src/Ratings/ReviewsList';

test('ReviewsList renders', () => {
  var { getByTestId } = render(<ReviewsList/>);
  var divEl = getByTestId('practice-div');
  expect(divEl.textContent).toBe('This is a Practice component');
})