import React from 'react';

const AddQuestions = (props) => {

  return (
    <div>
      {props.question.map(question =>
        <div className = "question-row" key = {question.question_id}>
          <div className = "question-body">{question.question_body}</div>
          <div className = "question-helpful">{question.question_helpfulness}</div>
        </div>
      )}
    </div>
  )
};

export default AddQuestions;