import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RatingContainer from '../../client/src/Ratings/RatingContainer';

test('Rating Container renders', () => {
  var { getByTestId } = render(<RatingContainer/>);
  var containerEl = getByTestId('container');

  expect(containerEl.textContent).toBe('ReviewModuleThis is a Practice componentThis is a Practice componentThis is a Practice componentThis is a Practice componentThis is a Practice component');
})