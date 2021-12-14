import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RatingContainer from '../../client/src/Ratings/RatingContainer';

test('Rating Container renders', () => {
  var { getByTestId } = render(<RatingContainer/>);
  var divEl = getByTestId('practice-div');
  expect(divEl.textContent).toBe('This is a Practice component');
})