import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RatingBreakdown from '../../client/src/Ratings/RatingBreakdown';

test('RatingBreakdown renders', () => {
  var { getByTestId } = render(<RatingBreakdown/>);
  var divEl = getByTestId('practice-div');
  expect(divEl.textContent).toBe('This is a Practice component');
})