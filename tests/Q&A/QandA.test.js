import React from 'react';
import { render, fireEven } from '@testing-library/react';
import Question from '../../client/src/Q&A/QandA.jsx';

test('Q&A section title testing', () => {
  var { getByTestId } = render(<Question/>);
  var Title = getByTestId('Title');
  expect(Title.textContent).toBe('QUESTION & ANSWERS');
})

