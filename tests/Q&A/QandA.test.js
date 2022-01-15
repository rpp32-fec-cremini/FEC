import React from 'react';
import { rest} from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Question from '../../client/src/Q&A/QandA.jsx';
import IndividualQuestion from '../../client/src/Q&A/IndividualQuestion.jsx';
import SearchQuestions from '../../client/src/Q&A/SearchQuestions.jsx';
import AnswerModal from '../../client/src/Q&A/AnswerModal.jsx';
import AskNewQuestion from '../../client/src/Q&A/AskNewQuestion.jsx';

var QaAFakeDataSevenQuestion = require("../../server/routes/QaAFakeData").fakeQaASevenQuestions;
var fakeAnswer = require("../../server/routes/QaAFakeData").fakeAnswer;

const mockedSetSearchWord = jest.fn();

test('Q&A section title testing', () => {
  const { getByTestId } = render(<Question />);
  const title = getByTestId('Title');
  expect(title.textContent).toBe('QUESTION & ANSWERS');
})

test('First element exist', () => {
  const { getByTestId } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results} searchTerm={''} />);
  // const { getByTestId } = render(<Question searchTerm={''} />);
  const questionBody = getByTestId('question 0')
  expect(questionBody.textContent).toBe('Q: Why is this product cheaper here than other sites?');
  expect(questionBody.textContent).toBeTruthy();
})

test('Only show max 2 questions?', () => {
  const { queryByTestId } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results} searchTerm={''} />);
  expect(queryByTestId('question 3')).toBeNull();
})

test('Show 2 more questions when click more Answer Question?', () => {
  const { getByTestId, queryByTestId } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results} searchTerm={''} />);
  const moreQuestion = getByTestId('moreQuestionBtn');
  fireEvent.click(moreQuestion);
  expect(queryByTestId('question 3')).toBeTruthy();
})


test('More Question button changed to collasped questions button after 3 clicks?', () => {
  const { getByTestId, queryByTestId, getByText } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results} searchTerm={''} />);
  const moreQuestion = getByTestId('moreQuestionBtn');
  expect(getByText('+ More Answered Questions')).toBeDefined();
  fireEvent.click(moreQuestion);
  fireEvent.click(moreQuestion);
  fireEvent.click(moreQuestion);
  expect(getByText('Collasped Questions')).toBeDefined();
})

test('More Question button changed to collasped questions button after 3 clicks?', () => {
  const { getByTestId, queryByTestId, getByText } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results} searchTerm={''} />);
  const moreQuestion = getByTestId('moreQuestionBtn');
  expect(getByText('+ More Answered Questions')).toBeDefined();
  fireEvent.click(moreQuestion);
  fireEvent.click(moreQuestion);
  fireEvent.click(moreQuestion);
  expect(getByText('Collasped Questions')).toBeDefined();
})

test('More Question button changed to collasped questions button after 3 clicks?', () => {
  const { getByTestId, queryByTestId, getByText } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results} searchTerm={''} />);
  const moreQuestion = getByTestId('moreQuestionBtn');
  expect(getByText('+ More Answered Questions')).toBeDefined();
  fireEvent.click(moreQuestion);
  fireEvent.click(moreQuestion);
  fireEvent.click(moreQuestion);
  expect(getByText('Collasped Questions')).toBeDefined();
})

test('Should render same text passed into search bar?', async () => {
  render(<Question searchWord={[]} search = {() => {}} setSearchWord = {mockedSetSearchWord}/>);
  const searchElement = screen.getByPlaceholderText("Have a question? Search for answers...");
  fireEvent.change(searchElement, {target: {value: 'hello'}});
  expect(searchElement.value).toBe('hello');
})

test('It should show a warning when submit a empty question or answer', () => {
  const { getByTestId, queryByTestId, getByText } = render(<AskNewQuestion trigger = {true}/>);
  const newQA = queryByTestId('question-input-box');
  const submutNewQA = getByTestId('submitnewQA');
  const askNewQAbox = getByTestId('question-block');

  fireEvent.click(submutNewQA);
  expect(askNewQAbox).toHaveTextContent('This field can not be blank');
  fireEvent.change(newQA , { target: { value: 'What is the quesion' } });
  fireEvent.click(submutNewQA);
  expect(askNewQAbox).not.toHaveTextContent('This field can not be blank');
})

test('"See more answers button become "Collasped answer" button after click', () => {
  const { getByTestId, queryByTestId, getByText } = render(<AnswerModal answer = {fakeAnswer}/>);
  const newImg = queryByTestId('answer-btn');
  expect(newImg.textContent).toBe('See more answers')
  fireEvent.click(newImg);
  expect(newImg.textContent).toBe('Collasped answer')
})

