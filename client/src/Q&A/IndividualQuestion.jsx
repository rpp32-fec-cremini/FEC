import React, {useState, useEffect} from 'react';
import AnswerModal from './AnswerModal.jsx';
import AskNewQuestion from './AskNewQuestion.jsx';
import './IndividualQuestion.css';

const IndividualQuestion = (props) => {
  
  const [loading, setloading] = useState(false);
  const [loadingQuestion, setloadingQuestion] = useState(2);
  const [buttonPopup, setbuttonPopup] = useState(false);
  const [answerPopup, setanswerPopup] = useState(false);
  const [typeofbutton, settypeofbutton] = useState('');
  const [questionId, setquestionId] = useState(0);

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
    question.sort(function(a, b) {
      return (b['question_helpfulness']) - (a['question_helpfulness']);
    });

    if (moreThanTwo === true && props.searchTerm === '') {
      var twoQuestion = question.slice(0, loadingQuestion);
    } else {
      var twoQuestion = question;
    }

    return (
      twoQuestion.filter((question) => {
        let searchTerm = props.searchTerm;
        let questionBody = question.question_body;
        if (searchTerm === '') {
          return question;
        } else if (questionBody.toLowerCase().includes(searchTerm.toLowerCase())) {
          return question;
        }
      }).map((question, i) =>
          <div className = "Question-row" key = {question.question_id} data-testid = 'Questions-id'>
            {/* <div className = "Question-body" data-testid={'question ' + i} style = {{float: "left"}}>Q: {question.question_body.slice(0, 1)}<span style = {{"background-color": "#FFFF00"}}>{question.question_body.slice(1, 4)}</span>{question.question_body.slice(5)}</div> */}
            <div className = "Question-body" data-testid={'question ' + i} style = {{float: "left"}}>Q: {question.question_body}</div>
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
        {loadingQuestion < props.question.length ? showbutton(props) : collaspseButton(props)}
        <button className = 'addQuestionbtn' onClick = {() => {setbuttonPopup(true); settypeofbutton('question')}}>+ Add A Question</button>
      </div>
        <AskNewQuestion trigger = {buttonPopup} setTrigger = {setbuttonPopup} questionParmer = {props.questionParmer} typeofbutton = {typeofbutton} questionId = {questionId}></AskNewQuestion>
    </div>
  )
};

export default IndividualQuestion;