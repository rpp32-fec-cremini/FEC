import React from 'react';
import { rest} from "msw";
import { setupServer } from "msw/node";
import { render, fireEven, screen, cleanup} from '@testing-library/react';
import Question from '../../client/src/Q&A/QandA.jsx';
import IndividualQuestion from '../../client/src/Q&A/IndividualQuestion.jsx';

var QaAFakeData = require("../../server/routes/QaAFakeData").fakeQaA;
console.log('all question', QaAFakeData.results[0]);
// const getQuestion = rest.get('/qa/questions', (req, res, ctx) => {
//   return res(
//     ctx.json(JSON.stringify(QaAFakeData.results))
//   );
// });

// const handlers = [getQuestion];

// const server = new setupServer(...handlers);

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())
// test.afterEach(cleanup)

test('Q&A section title testing', () => {
  const { getByTestId } = render(<Question/>);
  const title = getByTestId('Title');
  expect(title.textContent).toBe('QUESTION & ANSWERS');
})

// test('should have contain Why is this product cheaper here than other sites', () => {
//   render(<Question/>);
//   var lives = screen.findByText();
//   console.log('lives', lives);
//   expect(lives).toBeVisible();
// })

test('Question body first element should be Why is this product cheaper here than other sites?', () => {
  const { getByTestId } = render(<IndividualQuestion question={QaAFakeData.results} searchTerm={''} />);
  const questionBody = getByTestId('Questions-body')
  // console.log('question body', questionBody.map(question => question.textContent));

  expect(questionBody('Why is this product cheaper here than other sites?').toBeInTheDocument());
  // console.log('question body', typeof(questionBody));
  expect(questionBody).toHaveTextContent('Why is this product cheaper here than other sites?');
})
