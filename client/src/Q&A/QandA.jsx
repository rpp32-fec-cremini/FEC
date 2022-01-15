import React from 'react';
import axios from 'axios';
import $ from 'jquery';

import AnswerModal from './AnswerModal.jsx';
import QuestionModal from './QuestionModal.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import "./QaA.css";
// import cloudinaryAPI from '../../../config.js';

class QA extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      question: [],
      answers:[],
      questionHelpfulList:[],
      answerHelpfulList:[]
    };
    this.productId = this.props.productId;
    this.individualAnswer = this.individualAnswer.bind(this);
  }

  search(value) {
    if (value.length >= 3) {
      this.setState ({
        searchTerm: value,
      }, () => {
        // console.log('searchterm', value)
      })
    } else {
      this.setState ({
        searchTerm: '',
      })
    }
  };


  individualAnswer(result) {
    result = result[0]['question_id']
    var self = this;
    axios({
      method: 'GET',
      url: `/qa/questions/${result}/answers`
    })
    .then((results) => {
      // let answer = results.data;
      // if (this.state.answers !== answer) {
      //   self.setState ({
      //     answers: answer
      //   }, () => {
      //     // console.log('sssssssssssssssthe answer', this.state.answers);
      //   })
      // }
    })
  }

  individualQuestion() {
    var self = this;
    axios({
      method: 'GET',
      url: `/qa/questions/${this.productId}`,
      // data: this.productId,
    })
    .then((results) => {
      let question = results.data;
      // console.log('question will be ', question);
      self.individualAnswer(question);
      self.setState ({
        question: question,
      }, () => {
        // console.log('the question', this.state.question);
      })
    })
  }

  imageToURL(imgfile) {
    var cloudinary_url = 'https://api.cloudinary.com/v1_1/dy91vvft0/upload';
    var cloudinary_upload_preset = 'p9buobh3';
    var allImages = [];
    var promises = [];
    if (imgfile[0] !== undefined) {
      for (let i = 0; i< imgfile[0].length; i++) {
        var formData = new FormData();
        formData.append('file', imgfile[0][i]);
        formData.append('upload_preset', cloudinary_upload_preset);
        promises.push(
          axios({
            method: 'POST',
            url: cloudinary_url,
            data: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {
            allImages.push(res.data.url);
          }).catch(function(err){
            console.error(err);
          })
        )
      }
    }

    return Promise.all(promises).then(() => {
      return allImages;
    })

  }

  questionHelpful(questionId) {
    var temp = this.state.questionHelpfulList;
    temp.push(questionId);
    this.setState ({
      questionHelpfulList: temp
    })
    axios({
      method: 'PUT',
      url: `/qa/questions/${questionId}/helpful`,
    })
    .then((results) => {
      console.log('data send')
    })
    .catch((err) => {
      console.log('err');
    })
  }

  questionReport(questionId) {
    axios({
      method: 'PUT',
      url: `/qa/questions/${questionId}/report`,
    })
    .then((results) => {
      console.log('data send')
    })
    .catch((err) => {
      console.log('err');
    })
  }

  answerHelpful(answerId) {
    var temp = this.state.answerHelpfulList;
    temp.push(answerId);
    this.setState ({
      answerHelpfulList: temp
    })
    axios({
      method: 'PUT',
      url: `/qa/answers/${answerId}/helpful`,
    })
    .then((results) => {
      console.log('data send')
    })
    .catch((err) => {
      console.log('err');
    })
  }

  answerReport(answerId) {
    axios({
      method: 'PUT',
      url: `/qa/answers/${answerId}/report`,
    })
    .then((results) => {
      console.log('data send')
    })
    .catch((err) => {
      console.log('err');
    })
  }

  questionParmer(data) {
    var self = this;
    var questionId = data['questionId'];
    if (questionId === 0) {
      axios({
        method: 'POST',
        url: '/qa/questions',
        data: {question: data['question'],
        nickName: data['nickName'],
        email: data['email'],
        product_id: this.productId,
      }
    })
    .then((results) => {
      console.log('data send')
      self.individualQuestion();
    })
    .catch((err) => {
      console.log('err');
    })
  } else {
    this.imageToURL(data.files)
    .then((file) => {
      axios({
        method: 'POST',
        url: `/qa/questions/${questionId}/answers`,
        data: {question: data['question'],
        nickName: data['nickName'],
        email: data['email'],
        file: file,
        }
      })
      .then((results) => {
          self.individualQuestion();
          console.log('data send')
        })
      })
    .catch((err) => {
      console.log('err');
    })
  }
}

  componentDidMount() {
    this._isMounted = false;
    this.individualQuestion();
  }

  render() {
    return (
      <div className='QaABox'>
        <h2 data-testid='Title' className = 'Title'>QUESTION & ANSWERS</h2>
        <SearchQuestions searchBar = {this.state.searchBar} search = {(e) => this.search(e)}/>
        <QuestionModal question = {this.state.question} questionHelpful = {(e) => this.questionHelpful(e)} questionReport = {(e) => this.questionReport(e)}
        answerHelpful = {(e) => this.answerHelpful(e)} questionHelpfulList = {this.state.questionHelpfulList}
        answerHelpfulList = {this.state.answerHelpfulList} questionParmer = {(e) => this.questionParmer(e)} answerReport = {(e) => this.answerReport(e)}
        searchTerm = {this.state.searchTerm}/>
      </div>
    )
  }
}

export default QA;
