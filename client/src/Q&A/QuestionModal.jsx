import React, {useState, useEffect} from 'react';
import AnswerModal from './AnswerModal.jsx';
import AskNewQuestionOrAnswer from './AskNewQuestionOrAnswer.jsx';
import './QuestionModal.css';

const QuestionModal = (props) => {
  const [loading, setloading] = useState(false);
  const [loadingQuestion, setloadingQuestion] = useState(2);
  const [buttonPopup, setbuttonPopup] = useState(false);
  const [answerPopup, setanswerPopup] = useState(false);
  const [typeofbutton, settypeofbutton] = useState('');
  const [questionId, setquestionId] = useState(0);
  const [afterFilter, setafterFilter] = useState([]);

  const showbutton = (props) => {
    if (props.question.length > loadingQuestion) {
      return <button data-testid="moreQuestionBtn" className = 'moreAnswerBtn' onClick={() => getMoreQuestion()}>+ More Answered Questions</button>
    }
  }

  const collaspseButton = (props) => {
    if (props.question.length <= 2) {
      return '';
    }
    return <button className = 'collaspedBtn' onClick={() => collapsedQuestion()}>Collasped Questions</button>
  }

  const collapsedQuestion = () => {
    setloading(false);
    setloadingQuestion(2);
  }

  const getMoreQuestion = (question) => {
    setloadingQuestion(loadingQuestion + 2);
    setloading(true);
  }

  const helpful = (e, props, questionId) => {

    if (props.questionHelpfulList.indexOf(questionId) === -1) {
      var numberofHelpful = parseInt(e.target.innerText) + 1;
      e.target.innerText = numberofHelpful;
      props.questionHelpful(questionId);
    }

  }

  const questionReport = (e, props, questionId) => {
    e.preventDefault()
    props.questionReport(questionId);
    e.target.innerText = 'Reported';
  }

  const show = (props, moreThanTwo) => {
    var question = props.question;
    var temp = [];
    question.sort(function(a, b) {
      return (b['question_helpfulness']) - (a['question_helpfulness']);
    });

    if (moreThanTwo === true && props.searchTerm === '') {
      var twoQuestion = question.slice(0, loadingQuestion);
    }
    else if (moreThanTwo === true && props.searchTerm !== '') {
      for (var i = 0; i < question.length; i++) {
        if (question[i].question_body.toLowerCase().includes(props.searchTerm.toLowerCase())) {
          temp.push(question[i]);
        }
      }
      // setafterFilter(temp);
      if (temp.length > 2) {
        var twoQuestion = temp.slice(0, loadingQuestion);
      } else {
        var twoQuestion = temp;
      }
    }
    else {
      var twoQuestion = question;
    }

    function highlight(props, questionBody) {
      var search = props.searchTerm;
      // console.log('dfsaqweq', search)
      if (search.length === 0) {
        return questionBody;
      }
      let newString = questionBody.replace(new RegExp(search, "gi"), g => `<mark>${g}</mark>`);
      // var re = new RegExp(search,"g");
      // let newString = questionBody.replace(re, <mark>{search}</mark>)
      // var result = dangerouslySetInnerHTML={{ __html: newString }}
      // console.log('newString', newString);
      // return questionBody;
      return <span dangerouslySetInnerHTML={{ __html: newString }}></span>;
      // return <mark>ffff</mark>
    }

    //Filter by searchTerm
    return (
      twoQuestion.filter((question, index ) => {
        let searchTerm = props.searchTerm;
        var  count = 0;
        let questionBody = question.question_body;
        if (searchTerm === '') {
          return question;
        } else if (questionBody.toLowerCase().includes(searchTerm.toLowerCase())) {
          return question;
        }
      }).map((question, i) =>
          <div className = "Question-row" key = {question.question_id} data-testid = 'Questions-id'>
            <div className = "Question-body" data-testid={'question ' + i} style = {{float: "left"}}>Q: {highlight(props, question.question_body)}</div>
            <div className = "Question-helpful" style = {{float: "right", left: "10px"}}>Helpful? YES(<a className = 'question-help-btn' data-testid = {'questionHelpful ' + i} style = {{"textDecoration":"underline"}}
            onClick = {(e) => {helpful(e, props, question.question_id)}}>{question.question_helpfulness}</a>)&nbsp;&nbsp;|&nbsp;&nbsp;
            <a className = 'question-add-answer-btn' style = {{"textDecoration":"underline"}} onClick ={() => {setbuttonPopup(true); settypeofbutton('answer'); setquestionId(question.question_id)}}>Add Answer</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;<a className = 'question-report-btn' style = {{"textDecoration":"underline"}} onClick = {(e) => questionReport(e, props, question.question_id)}>Report</a>
            </div>
            <br />
              <div>
                <br />
                <AnswerModal answer = {question.answers} answerHelpfulList = {props.answerHelpfulList} answerHelpful = {(e) => props.answerHelpful(e)} answerReport = {(e) => props.answerReport(e)}/>
              </div>
          </div>
        )
    )
  };

  return (
    <div>
      <div className = "Questions" style = {props.question.length < 2 ? props.question.length < 1 ? {overflowY: 'scroll', height:'50px'} : {overflowY: 'scroll', height:'250px'} : {overflowY: 'scroll', height:'500px'}}>
        {/* <input type="text" id="searchBar" placeholder = "Have a question? Search for answers..." onChange = {(e) => handleSearch(e, props) } style={{width: "80%", height:"30px",}}/> */}
        {props.question.length > loadingQuestion || props.question.length <= 2? show(props, true) : show(props)}
      </div>
      <div className = 'question-btns-block' data-testid="questionBtn">
        {loadingQuestion < props.question.length? showbutton(props) : collaspseButton(props)}
        <button className = 'addQuestionbtn' onClick = {() => {setbuttonPopup(true); settypeofbutton('question')}}>+ Add A Question</button>
      </div>
        <AskNewQuestionOrAnswer trigger = {buttonPopup} setTrigger = {setbuttonPopup} questionParmer = {props.questionParmer} typeofbutton = {typeofbutton} questionId = {questionId}></AskNewQuestionOrAnswer>
    </div>
  )
};

export default QuestionModal;