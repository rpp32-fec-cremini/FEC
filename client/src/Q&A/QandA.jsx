import React from 'react';
import axios from 'axios';
import $ from 'jquery';

import AddAnswerModal from './AddAnswerModal.jsx';
import AddQuestions from './AddQuestions.jsx';
import IndividualQuestion from './IndividualQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div data-testid='QandA-div'>
        This is a Question component
      </div>
      )

  }
}

export default QA;
