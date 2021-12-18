import React from 'react';
import axios from 'axios';
import $ from 'jquery';

import AddAnswerModal from './AddAnswerModal.jsx';
import AddQuestions from './AddQuestions.jsx';
import IndividualQuestion from './IndividualQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import "./QaA.css";

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: '',
      question: []
    };
  }


  search(value) {
    console.log('seach value', value);
  };


  individualQuestion() {
    var self = this;
    axios({
      method: 'GET',
      url: '/qa/questions'
    })
    .then((results) => {
      let question = results.data;
      self.setState ({
        question: question,
      }, () => {
        console.log('the question', this.state.question);
      })
    })
  }

  componentDidMount() {
    this.individualQuestion();
  }

  render() {
    return (
      <div className='QaABox'>
        <h3>QUESTION & ANSWERS</h3>
        <SearchQuestions searchBar = {this.state.searchBar} search = {(e) => this.search(e)}/>
        <IndividualQuestion question = {this.state.question} />
        <p>---------------------------------------------------------------------------------</p>
        This is a Question component
      </div>
      )

  }
}

export default QA;
