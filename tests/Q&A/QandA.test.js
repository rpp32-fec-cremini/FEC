import React from 'react';
import { render, fireEven } from '@testing-library/react';
import Question from '../../client/src/Q&A/QandA.jsx';

test('Question component renders text content correctly', () => {
  var { getByTestId } = render(<Question/>);
  var divEl = getByTestId('question-div');
  expect(divEl.textContent).toBe('This is a Question component');
  expect(divEl.textContent).not.toBe('This is a random component');
})