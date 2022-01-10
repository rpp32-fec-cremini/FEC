import React, {useState, useEffect, useRef} from 'react';
import './AskNewQuestion.css';

const AskNewQuestion = (props) => {
  // console.log('question id', props.questionId);
  const [size, setsize] = useState(0);
  const [question, setquestion] = useState('');
  const [nickName, setnickName] = useState('');
  const [email, setemail] = useState([]);
  const [previewImage, setpreviewImage] = useState('');
  const [files, setfiles] = useState([]);
  const [emailError, setemailError] = useState('');
  const [nameError, setnameError] = useState('');
  const [questionError, setquestionError] = useState('');
  const [fileSize, setfileSize] = useState('0 file is chosen')
  const fileRef = useRef();

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

  const validate = () => {
    let emailError = '';
    let nameError = '';
    let questionError = '';
    if (!email.includes('@')) {
      emailError = 'The email address provided is not in correct email format';
    }
    if (nickName.length === 0) {
      nameError = 'This field can not be blank';
    }
    else if (nickName.length !== 0) {
      setnameError('');
    }
    if (question.length === 0) {
      questionError = 'This field can not be blank';
    }
    else if (question.length !== 0) {
      setquestionError('');
    }
    if (questionError) {
      setquestionError(questionError);
      return false;
    }
    if (nameError) {
      setnameError(nameError);
      return false;
    }
    if (emailError) {
      setemailError(emailError);
      return false;
    }
    return true;
  }

  const sendData = (e, props) => {
    e.preventDefault();
    var id = props.questionId;
    const isValid = validate();
    if (isValid) {
      props.questionParmer({'question': question, 'nickName': nickName, 'email': email, 'questionId': id, 'files': files});
      setfiles([]);
      setquestion('');
      setnickName('');
      setemail('');
      props.setTrigger(false)
    }
  }

  const handleImageChange = (e) => {
    // e.preventDefault;
    var file = e.target.files;
    console.log (URL.createObjectURL(file[0]))
    var img = [];
    var imgURLs = []
    // if (file.length > 5) {
    //   file.splice(5);
    console.log('how many', file);
    if (file.length > 5) {
      for (let i =0; i < 5; i++) {
        img.push(file[i])
        imgURLs.push(URL.createObjectURL(file[i]))
      }
    } else {
      for (let i =0; i < file.length; i++) {
        img.push(file[i])
        imgURLs.push(URL.createObjectURL(file[i]))
      }
    }
    // }
    setpreviewImage(imgURLs);
    setfiles([...files, img]);
    // console.log('file', img)
  }

  const renderPreviewImage = (image) => {
    var image = Object.values(image);
      return image.map((img) => {
        return <img className = 'preview-img' style={{width: '40px', height:'40px'}} src={img} key={img}/>
      })
  }


  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <form >
          <div className = "question-block">
            {props.typeofbutton === 'answer' ? <label><b>Answer:</b></label> : <label><b>Question:</b></label>}
            <br />
            <textarea className = "question-input-box" value={question} type="text" maxLength={1000} onChange={(e) => handlequestionChange(e)} placeholder="Why did you like the product or not?" />
            <p4 className = "max-word-length">{size}/1000</p4>
            <br />
            <br />
            {questionError ? <div style={{fontSize:12, color:"red"}}>{questionError}</div> : null}
          </div>
          <div className = "nickname-block">
            <label><b>Nickname:</b></label>
            <br />
            <input className = "nickname-input-box" value={nickName} type="text" maxLength={60} onChange={(e) => handleNickNameChange(e)} placeholder="Example: jackson11!" />
            <br />
            {nameError ? <div style={{fontSize:12, color:"red"}}>{nameError}</div> : null}
            <p4 className = "warning">For privacy reasons, do not use your full name or email address</p4>
          </div >
          <div className = "email-block">
            <label><b>Email:</b></label>
            <br />
            <input className = "email-input-box" value={email} type="text" maxLength={60} onChange={(e) => handleEmailChange(e)} placeholder="Example: jackson11@email.com" />
            <br />
            {emailError ? <div style={{fontSize:12, color:"red"}}>{emailError}</div> : null}
            <p4 className = "warning">For authentication reasons, you will not be emailed</p4>
            { props.typeofbutton === 'answer' ?
                <div className='imageUpload' >
                  <br />
                  <label><b>Upload Image:</b></label>
                  <input ref={fileRef} style={{display: "none"}} type="file" accept="image/gif,image/jpeg,image/jpg,image/png"  multiple onChange={(e)=>handleImageChange(e)} />
                  <button className="upload-file-btn" onClick={(e) => {e.preventDefault(); fileRef.current.click()}}>
                    <span>Choose Images(max 5 photos)</span>
                  </button>
                </div> : null}
                {renderPreviewImage(previewImage)}
          </div>
          <br />
          <button className="submit-btn" onClick={(e) => sendData(e, props)}>Submit</button>
        </form>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
      </div>
    </div>
  ) : "";
};

export default AskNewQuestion;