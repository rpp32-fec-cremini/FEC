import React, {useState, useEffect} from 'react';

const AddAnswerModal = ({answer}) => {
  const [loading, setloading] = useState(false);
  const [size, setsize] = useState(0);

  const showbutton = () => {
    if (Object.keys(answer).length > 2) {
      return <button onClick={() => getMoreAnswer(answer)}>See more answers</button>
    }
  }
  const show = (answer, moreThanTwo) => {
    if (moreThanTwo === true) {
      var twoAnswer = Object.keys(answer).slice(0, 2)
    } else {
      var twoAnswer = Object.keys(answer)
    }
    return twoAnswer.map(key =>
      <div key={answer[key]['id']}> A: {answer[key]['body']}
        <div>by {answer[key]['answerer_name']},{dateConvenver(answer[key]['date'])}  |  Helpful? YES({answer[key]['helpfulness']})</div>
      </div>
    )
  }

  const getMoreAnswer = (answer) => {
    setloading(true);
    setsize('length', Object.keys(answer).length)
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
        {loading === false ? showbutton() : null}
    </div>
  )

};

export default AddAnswerModal;