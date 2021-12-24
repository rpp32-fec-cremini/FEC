import React, {useState, useEffect} from 'react';

const AddAnswerModal = ({answer}) => {
  const [loading, setloading] = useState(false);
  const [size, setsize] = useState(0);
  const [vote, setvote] = useState(false);

  // console.log('this is answers', answers);
  console.log('this is anwer', answer);
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

    const report = (e) => {
      e.preventDefault()
      e.target.innerText = 'Reported';
    }

    const helpful = (e) => {
      // e.preventDefault()
      setvote(true);

      if (vote === false) {
        var numberofHelpful = Number(e.target.innerText) + 1;
        e.target.innerText = numberofHelpful;
      }
    }
    return twoAnswer.map(answer =>
      <div key={answer[1]['id']}> A: {answer[1]['body']}
        <br />
        {answer[1]['photos'].length !== 0 ?
          answer[1]['photos'].map (pic =>
            <img src = {pic} style={{width: '80px', height:'80px'}}></img>) : ''}
        <div>by {answer[1]['answerer_name']},{dateConvenver(answer[1]['date'])}  |  Helpful? YES (<a style={{"textDecoration":"underline"}} onClick = {helpful}>{answer[1]['helpfulness']}</a>) | <a style={{"textDecoration":"underline"}} onClick = {report}>Report</a></div>
        <br />
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