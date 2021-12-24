import React, {useState} from 'react';
import AddAnswerModal from './AddAnswerModal.jsx';

const IndividualQuestion = (props) => {
  const answerForEachQuestion = (res) => {
    props.answer(res);
  }
  return (
    <div className = "Questions" style={{overflowY: 'scroll', height:'500px'}}>
      {props.question.map(question =>
        <div className="Question-row" key = {question.question_id} >
          {answerForEachQuestion(question.question_id)}
          <div className="Question-body" style={{float: "left"}}>Q: {question.question_body}</div>
          <div className="Question-helpful" style={{float: "right"}}>Helpful? YES({question.question_helpfulness})</div>
          <br />
            <div>
              <AddAnswerModal answer = {question.answers}/>
              <br />
            </div>
        </div>
      )}
      <button onClick={() => getMoreAnswer()}>See more question</button>
    </div>
  )
};

export default IndividualQuestion;