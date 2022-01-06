import React from 'react';
import axios from 'axios';
import $ from 'jquery';

import AnswerModal from './AnswerModal.jsx';
import AddQuestions from './AddQuestions.jsx';
import IndividualQuestion from './IndividualQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';
// import AddAnswerModal from './AddAnswerModal.jsx';
import "./QaA.css";

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: '',
      question: [],
      answers:[],
      questionHelpfulList:[],
      answerHelpfulList:[]
    };
    this.individualAnswer = this.individualAnswer.bind(this);
  }


  search(value) {
    // console.log('seach value', value);
  };


  individualAnswer(result) {
    result = result[0]['question_id']
    var self = this;
    axios({
      method: 'GET',
      url: `/qa/questions/${result}/answers`
    })
    .then((results) => {
      let answer = results.data;
      // console.log('the answer', answer);
      // // console.log('this is result', answer)
      if (this.state.answers !== answer) {
        self.setState ({
          answers: answer
        }, () => {
          // console.log('sssssssssssssssthe answer', this.state.answers);
        })
      }
    })
  }

  individualQuestion() {
    var self = this;
    axios({
      method: 'GET',
      url: '/qa/questions'
    })
    .then((results) => {
      let question = results.data;
      self.individualAnswer(question);
      self.setState ({
        question: question,
      }, () => {
        // console.log('the question', this.state.question);
      })
    })
  }

  questionHelpful(questionId) {
    var temp = this.state.questionHelpfulList;
    temp.push(questionId);
    this.setState ({
      questionHelpfulList: temp
    })
  }

  answerHelpful(answerId) {
    var temp = this.state.answerHelpfulList;
    temp.push(answerId);
    this.setState ({
      answerHelpfulList: temp
    })
  }

  questionParmer(data) {
    var self = this;
    var questionId = data['questionId'];
    console.log('question parmer', questionId);

    if (questionId === 0) {
      axios({
        method: 'POST',
        url: '/qa/questions',
        data: {question: data['question'],
               nickName: data['nickName'],
               email: data['email'],
               product_id: '59555',
              }
      })
      .then((results) => {
        console.log('data send')
      })
      .catch((err) => {
        console.log('err');
      })
    } else {
      axios({
        method: 'POST',
        url: `/qa/questions/${questionId}/answers`,
        data: {question: data['question'],
          nickName: data['nickName'],
          email: data['email'],
        }
      })
      .then((results) => {
        console.log('data send')
      })
      .catch((err) => {
        console.log('err');
      })
    }
  }

  componentWillMount() {
    this.individualQuestion();
  }

  render() {
    return (
      <div className='QaABox'>
        <h3>QUESTION & ANSWERS</h3>
        <SearchQuestions searchBar = {this.state.searchBar} search = {(e) => this.search(e)}/>
        <IndividualQuestion question = {this.state.question} questionHelpful = {(e) => this.questionHelpful(e)} answerHelpful = {(e) => this.answerHelpful(e)}
        questionHelpfulList = {this.state.questionHelpfulList} answerHelpfulList = {this.state.answerHelpfulList} questionParmer = {(e) => this.questionParmer(e)}/>
      </div>
      )

  }
}

export default QA;
