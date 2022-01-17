import React, {useState, useEffect} from 'react';
import './AnswerModal.css';

const AnswerModal = ({answer, answerHelpfulList, answerHelpful, answerReport}) => {
  const [loading, setloading] = useState(false);
  const [size, setsize] = useState(0);
  const [vote, setvote] = useState(false);
  const [imgPopup, setimgPopup] = useState(false);
  const [imgURL, setimgURL] = useState('');

  const showbutton = () => {
    if (Object.keys(answer).length > 2) {
      return <button className = 'answer-btn' data-testid = 'answer-btn' onClick={() => getMoreAnswer(answer)}><span>See more answers</span></button>
    }
  }

  const collaspseButton = () => {
    return <button className = 'answer-collaspse-btn' onClick={() => collapsedAnswer()}><span>Collasped answer</span></button>
  }

  const collapsedAnswer = () => {
    setloading(false);
    setsize(0);
  }

  const show = (answerarr, moreThanTwo) => {
    var answer = [];
    for (var item in answerarr) {
      answer.push([item, answerarr[item]]);
    }
    // sort with helfulness
    answer.sort(function(a, b) {
      return (b[1]['helpfulness']) - (a[1]['helpfulness']);
    });
    // sort with sellers or other customers
    answer.sort(function(a, b) {
      return (b[1]['answerer_name'] === 'Seller') - (a[1]['answerer_name'] === 'Seller')
    });

    if (moreThanTwo === true) {
      var twoAnswer = answer.slice(0, 2)
    } else {
      var twoAnswer = answer
    }

    const report = (e, answerId) => {
      e.preventDefault()
      e.target.innerText = 'Reported';
      answerReport(answerId);
    }

    const helpful = (e, answerId) => {
      if (answerHelpfulList.indexOf(answerId) === -1) {
        var numberofHelpful = Number(e.target.innerText) + 1;
        e.target.innerText = numberofHelpful;
        answerHelpful(answerId);
      }
    }

    const imgPopups = (imgURL) => {
      return (
        <div className = 'imgPopUp'>
            <div className = 'imgPopUp-inner' >
              <img className = 'imgEnlarge' src = {imgURL}>
              </img>
                <button className = "img-close-btn" onClick={() => setimgPopup(false)}>X</button>
            </div>
        </div>
      )
    }

    return twoAnswer.map(answer =>
      <div className = 'answer-body' key = {answer[1]['id']}> A: {answer[1]['body']}
        <br />
        {answer[1]['photos'].length !== 0 ?
         answer[1]['photos'].map((pic, j) => <img className = 'img' src = {pic} key = {j} onClick = {() => {setimgPopup(true); setimgURL(pic)}}></img>) : ''}
        <div className = "answer-title-button" >by <a style={{"fontweight": answer[1]['answerer_name'] === 'Seller' ? "bold" : ''}}>{answer[1]['answerer_name']}</a>, {dateConvenver(answer[1]['date'])}&nbsp;&nbsp;|&nbsp;&nbsp;Helpful? YES
        (<a className = 'answer-helpful-btn' style = {{"textDecoration":"underline"}} onClick = {(e) => helpful(e, answer[1]['id'])}>{answer[1]['helpfulness']}</a>)&nbsp;&nbsp;|&nbsp;&nbsp;
        <a className = 'answer-report-btn' style = {{"textDecoration":"underline"}}  data-testid = {'answerReport'} onClick = {(e) => report(e, answer[1]['id'])}>Report</a></div>
        {imgPopup === true ? imgPopups(imgURL): ''}
      </div>
    )
  }

  const getMoreAnswer = (answer) => {
    setloading(true);
    setsize(Object.keys(answer).length)
  }

  const dateConvenver = (date) => {
    var date = new Date(date);
    var dateConverter = date.toDateString().split(' ');
    return dateConverter[1] + ' ' + dateConverter[2] + ', ' + dateConverter[3];
  }

  return (
    <div>
        <div className = 'answerBody' >
          {loading === false && size < 2 ? show(answer, true) : show(answer)}
        </div>
        {loading === false ? showbutton() : collaspseButton()}
    </div>
  )

};

export default AnswerModal;