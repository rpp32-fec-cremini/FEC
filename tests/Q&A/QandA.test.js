import React from 'react';
import { rest} from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, cleanup} from '@testing-library/react';
import Question from '../../client/src/Q&A/QandA.jsx';
import IndividualQuestion from '../../client/src/Q&A/IndividualQuestion.jsx';
import SearchQuestions from '../../client/src/Q&A/SearchQuestions.jsx';
import AnswerModal from '../../client/src/Q&A/AnswerModal.jsx';
import AskNewQuestion from '../../client/src/Q&A/AskNewQuestion.jsx';

var QaAFakeDataSevenQuestion = require("../../server/routes/QaAFakeData").fakeQaASevenQuestions;
var fakeAnswer =require("../../server/routes/QaAFakeData").fakeAnswer;
console.log('all question', fakeAnswer.answers);
const getQuestion = rest.get('/qa/questions', (req, res, ctx) => {
  return res(
    ctx.json(JSON.stringify(QaAFakeDataSevenQuestion.results))
  );
});

const handlers = [getQuestion];

const server = new setupServer(...handlers);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Q&A section title testing', () => {
  const { getByTestId } = render(<Question/>);
  const title = getByTestId('Title');
  expect(title.textContent).toBe('QUESTION & ANSWERS');
})

test('First element exist', () => {
  const { getByTestId } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results} searchTerm={''} />);
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

// test('Add more helpful when clicked question helpful button', async () => {
//   const { getByTestId, queryByTestId, getByText } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results}
//     searchTerm={''} questionId = {40} questionHelpfulList = {[]} questionHelpful = {function(){}}/>);
//   const questionHelpful = getByTestId('questionHelpful 1');
//   const numberofHelpful = questionHelpful.textContent ;
//   // console.log('questionBtn 1', numberofHelpful);

//   fireEvent.click(questionHelpful, { target: { innerText: numberofHelpful } });
//   // fireEvent.click(questionHelpful)
//   // fireEvent.click(questionHelpful)
//   // console.log('questionBtn 2 ', questionHelpful.textContent);

//   expect((questionHelpful.textContent)).toBe(3);

// })

// test('Search in search bar and showing questions', () => {
//   // const { getByTestId, queryByTestId, getByText } = render(<IndividualQuestion question={QaAFakeDataSevenQuestion.results}/>);
//   // const { getByTestId, queryByTestId, getByText } = render(<SearchQuestions search = {function(){}}/>);
//   render(<IndividualQuestion question = {QaAFakeDataSevenQuestion.results} />,  <SearchQuestions search = {function(){}}/>)
//   // const questionHelpful = getByTestId('questionHelpful 1');
//   // const numberofHelpful = questionHelpful.textContent ;
//   // // console.log('questionBtn 1', numberofHelpful);
//   const searchQuestion = getByTestId('searchQuestion');
//   fireEvent.change(searchQuestion, { target: { value: 'hello' } });
//   // const questionBody = getByTestId('question 0')
//   // console.log('what we have', questionBody.textContent);
//   // expect(questionBody.textContent).toBe('Q: Why is this product cheaper here than other sites?');
//   // fireEvent.click(questionHelpful)
//   // fireEvent.click(questionHelpful)
//   // console.log('questionBtn 2 ', questionHelpful.textContent);

//   // expect((questionHelpful.textContent)).toBe(3);

// })

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
  const { getByTestId, queryByTestId, getByText } = render(<AnswerModal answer = {fakeAnswer.answers}/>);
  const newImg = queryByTestId('answer-btn');
  expect(newImg.textContent).toBe('See more answers')
  fireEvent.click(newImg);
  expect(newImg.textContent).toBe('Collasped answer')
})


// test('report should become reported after clicked', () => {
//   const { getByTestId, queryByTestId, getByText } = render(<AnswerModal answer = {fakeAnswer.answers}/>);
//   const reportBtn = getByTestId('answer-report');
//   console.log('imgbut', newImg[0])
//     // expect(newImg.textContent).toBe('See more answers')
//   // fireEvent.click(newImg);
//   // expect(newImg.textContent).toBe('Collasped answer')
// })