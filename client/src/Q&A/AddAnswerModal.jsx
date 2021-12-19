import React, {useState, useEffect} from 'react';

const AddAnswerModal = ({answer}) => {
  const [loading, setloading] = useState(false);
  const [size, setsize] = useState(0);


  const showbutton = () => {
    if (Object.keys(answer).length > 2) {
      return <button onClick={() => getMoreAnswer(answer)}>See more answers</button>
    }
  }

  const collaspseButton = () => {
    return <button onClick={() => collapsedAnswer()}>Collasped answer</button>
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

    answer.sort(function(a, b) {
      return (a[1]['helpfulness']) - (b[1]['helpfulness'])
    });

    if (moreThanTwo === true) {
      var twoAnswer = answer.slice(0, 2)
    } else {
      var twoAnswer = answer
    }
    console.log('this is the answer', twoAnswer);
    return twoAnswer.map(answer =>
      <div key={answer[1]['id']}> A: {answer[1]['body']}
        <div>by {answer[1]['answerer_name']},{dateConvenver(answer[1]['date'])}  |  Helpful? YES({answer[1]['helpfulness']})</div>
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
        <div>
          {loading === false && size < 2 ? show(answer, true) : show(answer)}
        </div>
        {loading === false ? showbutton() : collaspseButton()}
    </div>
  )

};

export default AddAnswerModal;