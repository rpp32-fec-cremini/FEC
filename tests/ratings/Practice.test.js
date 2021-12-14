import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Practice from '../../client/src/Ratings/Practice';

test('Practice component renders text content correctly', () => {
  var { getByTestId } = render(<Practice/>);
  var divEl = getByTestId('practice-div');
  expect(divEl.textContent).toBe('This is a Practice component');
  expect(divEl.textContent).not.toBe('This is a random component');
})