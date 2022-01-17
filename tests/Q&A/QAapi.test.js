import React from 'react';
import { rest} from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Question from '../../client/src/Q&A/QandA.jsx';
import IndividualQuestion from '../../client/src/Q&A/QuestionModal.jsx';
import SearchQuestions from '../../client/src/Q&A/SearchQuestions.jsx';
import AnswerModal from '../../client/src/Q&A/AnswerModal.jsx';
import AskNewQuestion from '../../client/src/Q&A/AskNewQuestionOrAnswer.jsx';

var QaAFakeDataSevenQuestion = require("../../server/routes/QaAFakeData").fakeQaASevenQuestions;
var fakeAnswer = require("../../server/routes/QaAFakeData").fakeAnswer;

var server = setupServer(
  rest.get('/qa/questions/:product_id', (req, res, ctx) => {
    return res(
      ctx.json(QaAFakeDataSevenQuestion.results)
    )
  }),
  rest.get('/qa/questions/:question_id/answers', (req, res, ctx) => {
    return res(
      ctx.json(JSON.stringify(fakeAnswer))
    );
  }),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const mockedSetSearchWord = jest.fn();

//integration test
test('Should filter Q&A after filter by search Bar?', async () => {
  const { getByTestId, getAllByTestId } = render(<Question searchWord={[]} search = {() => {}} setSearchWord = {mockedSetSearchWord}/>);
  await waitFor(() => getByTestId('question 0'))
  const questionBody = screen.getByText('Q: Why is this product cheaper here than other sites?');
  const allQuestion = screen.getByText('Q: How long does it last?');
  expect(questionBody).toBeDefined();
  const searchElement = screen.getByPlaceholderText("Have a question? Search for answers...");
  fireEvent.change(searchElement, {target: {value: 'long'}});
  expect(allQuestion).toBeDefined();
})
