import React, {useState, useEffect} from 'react';
import AnswerModal from './AnswerModal.jsx';
import AskNewQuestion from './AskNewQuestion.jsx';
import AddNewAnswer from './AddNewAnswer.jsx';

const IndividualQuestion = (props) => {
  const [loading, setloading] = useState(false);
  const [loadingQuestion, setloadingQuestion] = useState(2);
  const [buttonPopup, setbuttonPopup] = useState(false);
  const [answerPopup, setanswerPopup] = useState(false);
  // const answerForEachQuestion = (res) => {
  //   props.answer(res);
  // }

  const showbutton = (props) => {
    // setloadingQuestion(loadingQuestion + 2);
    if (props.question.length > loadingQuestion) {
      return <button onClick={() => getMoreQuestion()}>More Answered Questions</button>
    }
  }

  const collaspseButton = () => {
    return <button onClick={() => collapsedQuestion()}>Collasped Questions</button>
  }

  const collapsedQuestion = () => {
    setloading(false);
    setloadingQuestion(2);
  }

  const getMoreQuestion = (question) => {
    setloadingQuestion(loadingQuestion + 2);
    // if (props.question.length <= loadingQuestion) {
      setloading(true);
    // }
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
        twoQuestion.map(question =>
        <div className="Question-row" key = {question.question_id} >
          {/* {answerForEachQuestion(question.question_id)} */}
          <div className="Question-body" style={{float: "left"}}>Q: {question.question_body}</div>
          <div className="Question-helpful" style={{float: "right"}}>Helpful? YES(<a style={{"textDecoration":"underline"}} onClick = {(e) => helpful(e, props, question.question_id)}>{question.question_helpfulness}</a>)   |  <a style={{"textDecoration":"underline"}} onClick ={() => setanswerPopup(true)}>Add Answer</a>
          <AddNewAnswer trigger={answerPopup} setTrigger={setanswerPopup} questionParmer = {props.questionParmer}></AddNewAnswer></div>
          <br />
            <div>
              <AnswerModal answer = {question.answers} answerHelpfulList = {props.answerHelpfulList} answerHelpful = {(e) => props.answerHelpful(e)}/>
              <br />
            </div>
        </div>
      )
    )
  };

  return (
    <div className = "Questions" style={{overflowY: 'scroll', height:'500px'}}>
      {props.question.length > loadingQuestion || props.question.length <= 2? show(props, true) : show(props)}
      {loading === false  ? showbutton(props) : collaspseButton()}
      <button onClick ={() => setbuttonPopup(true)}>Add A Question</button>
      <AskNewQuestion trigger={buttonPopup} setTrigger={setbuttonPopup} questionParmer = {props.questionParmer}></AskNewQuestion>
    </div>
  )
};

export default IndividualQuestion;