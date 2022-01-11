import React, {useState, useEffect} from 'react';
import AnswerModal from './AnswerModal.jsx';
import AskNewQuestion from './AskNewQuestion.jsx';
import './IndividualQuestion.css';

const IndividualQuestion = (props) => {
  console.log('questions all', props.question)
  const [loading, setloading] = useState(false);
  const [loadingQuestion, setloadingQuestion] = useState(2);
  const [buttonPopup, setbuttonPopup] = useState(false);
  const [answerPopup, setanswerPopup] = useState(false);
  const [typeofbutton, settypeofbutton] = useState('');
  const [questionId, setquestionId] = useState(0);

  const showbutton = (props) => {
    if (props.question.length > loadingQuestion) {
      return <button className = 'moreAnswerBtn' onClick={() => getMoreQuestion()}>+ More Answered Questions</button>
    }
  }

  const collaspseButton = () => {
    console.log('how many', loadingQuestion)
    return <button className = 'collaspedBtn' onClick={() => collapsedQuestion()}>Collasped Questions</button>
  }

  const collapsedQuestion = () => {
    console.log('collapsedQuestion')
    setloading(false);
    setloadingQuestion(2);
  }

  const getMoreQuestion = (question) => {
    console.log('getMoreQuestion')
    setloadingQuestion(loadingQuestion + 2);
    setloading(true);
  }

  const helpful = (e, props, questionId) => {
    // e.preventDefault()
    if (props.questionHelpfulList.indexOf(questionId) === -1) {
      var numberofHelpful = Number(e.target.innerText) + 1;
      e.target.innerText = numberofHelpful;
      props.questionHelpful(questionId);
    }
      // console.log('this question', props.questionHelpfulList, questionId);
  }

  const questionReport = (props, questionId) => {
    props.questionReport(questionId);
    // console.log('quesion id', questionId);
  }
  // const questionReport = (props, question.question_id) => {
  //   // e.preventDefault()
  //   console.log('quesion id', question.question_id);
  //     // console.log('this question', props.questionHelpfulList, questionId);
  // }

  const show = (props, moreThanTwo) => {
    var question = props.question;
    question.sort(function(a, b) {
      return (b['question_helpfulness']) - (a['question_helpfulness']);
    });

    if (moreThanTwo === true) {
      var twoQuestion = question.slice(0, loadingQuestion);
      // console.log('this is two question', question);
    } else {
      // var loadTwoMoreQuestion = setloadingQuestion(loadingQuestion + 2);
      // var twoQuestion = question.slice(0, loadTwoMoreQuestion);
      var twoQuestion = question;
    }

    return (
      twoQuestion.filter((question) => {
        if (props.searchTerm === '') {
          return question;
        } else if (question.question_body.toLowerCase().includes(props.searchTerm.toLowerCase())) {
          return question;
        }
      }).map((question, i) =>
          <div className="Question-row" key={question.question_id} data-testid='Questions-id'>
            <div className="Question-body" data-testid={i} style={{float: "left"}}>Q: {question.question_body}</div>
            <div className="Question-helpful" style={{float: "right"}}>Helpful? YES(<a className = 'question-help-btn' style={{"textDecoration":"underline"}} onClick = {(e) => helpful(e, props, question.question_id)}>{question.question_helpfulness}</a>)&nbsp;&nbsp;|&nbsp;&nbsp;
            <a className = 'question-add-answer-btn' style={{"textDecoration":"underline"}} onClick ={() => {setbuttonPopup(true); settypeofbutton('answer'); setquestionId(question.question_id)}}>Add Answer</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;<a className = 'question-report-btn' style={{"textDecoration":"underline"}} onClick = {() => questionReport(props, question.question_id)}>Report</a>
            </div>
            <br />
              <div>
                <br />
                <AnswerModal answer = {question.answers} answerHelpfulList = {props.answerHelpfulList} answerHelpful = {(e) => props.answerHelpful(e)} answerReport = {(e) => props.answerReport(e)}/>
              </div>
          </div>
        )
      //   twoQuestion.map(question =>
      //   <div className="Question-row" key = {question.question_id} >
      //     {/* {answerForEachQuestion(question.question_id)} */}
      //     <div className="Question-body" style={{float: "left"}}>Q: {question.question_body}</div>
      //     <div className="Question-helpful" style={{float: "right"}}>Helpful? YES(<a style={{"textDecoration":"underline"}} onClick = {(e) => helpful(e, props, question.question_id)}>{question.question_helpfulness}</a>)   |  <a style={{"textDecoration":"underline"}} onClick ={() => {setbuttonPopup(true); settypeofbutton('answer'); setquestionId(question.question_id)}}>Add Answer</a>
      //       |  <a style={{"textDecoration":"underline"}} onClick = {() => questionReport(props, question.question_id)}>Report</a>
      //     </div>
      //     <br />
      //       <div>
      //         <AnswerModal answer = {question.answers} answerHelpfulList = {props.answerHelpfulList} answerHelpful = {(e) => props.answerHelpful(e)} answerReport = {(e) => props.answerReport(e)}/>
      //         <br />
      //       </div>
      //   </div>
      // )
    )
  };

  return (
    <div>
      <div className = "Questions" style={{overflowY: 'scroll', height:'500px'}}>
        {/* <input type="text" id="searchBar" placeholder = "Have a question? Search for answers..." onChange = {(e) => handleSearch(e, props) } style={{width: "80%", height:"30px",}}/> */}
        {props.question.length > loadingQuestion || props.question.length <= 2? show(props, true) : show(props)}
      </div>
        {loadingQuestion < props.question.length ? showbutton(props) : collaspseButton()}
        <button className = 'addQuestionbtn' onClick ={() => {setbuttonPopup(true); settypeofbutton('question')}}>+ Add A Question</button>
        <AskNewQuestion trigger={buttonPopup} setTrigger={setbuttonPopup} questionParmer = {props.questionParmer} typeofbutton = {typeofbutton} questionId = {questionId}></AskNewQuestion>
    </div>
  )
};

export default IndividualQuestion;