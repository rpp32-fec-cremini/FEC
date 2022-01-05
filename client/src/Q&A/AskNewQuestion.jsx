import React, {useState, useEffect} from 'react';
import './AskNewQuestion.css';

const AskNewQuestion = (props) => {
  const [size, setsize] = useState(0);
  const [question, setquestion] = useState('');
  const [nickName, setnickName] = useState('');
  const [email, setemail] = useState('');

  const handlequestionChange = (e) => {

    var questionContent = e.target.value;
    setquestion(questionContent);
    setsize(questionContent.length);
  }

  const handleNickNameChange = (e) => {
    setnickName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  }

  const sendData = (props) => {
    // var result = e.target.value;
    // console.log('hello')
    props.questionParmer([question, nickName, email]);
  }

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <form >
          <div className = "question-block">
            <label><b>Question:</b></label>
            <br />
            <textarea className = "question-input-box" type="text" maxLength={1000} onChange={(e) => handlequestionChange(e)} placeholder="Why did you like the product or not?" required/>
            <p4 className = "max-word-length">{size}/1000</p4>
            <br />
          </div>
          <div className = "nickname-block">
            <label><b>Nickname:</b></label>
            <br />
            <input className = "nickname-input-box" type="text" maxLength={60} onChange={(e) => handleNickNameChange(e)} placeholder="Example: jackson11!" required/>
            <br />
            <p4 className = "warning">For privacy reasons, do not use your full name or email address</p4>
          </div >
          <div className = "email-block">
            <label><b>Email:</b></label>
            <br />
            <input className = "email-input-box" type="text" maxLength={60} onChange={(e) => handleEmailChange(e)} placeholder="Example: jackson11@email.com" required/>
            <br />
            <p4 className = "warning">For authentication reasons, you will not be emailed</p4>
          </div>
          <button className="submit-btn" onClick={() => sendData(props)}>Submit</button>
        </form>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
      </div>
    </div>
  ) : "";
};

export default AskNewQuestion;