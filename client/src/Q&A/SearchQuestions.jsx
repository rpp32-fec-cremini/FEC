import React from 'react';
import "./QaA.css";
import './SearchQuestions.css';

const handleSearch = (e, props) => {
  props.search(e.target.value);
}

const SearchQuestion = (props) => {

  return (
    <div>
      <form className = "searchBox">
        <label >
          <input type="text" placeholder = "Have a question? Search for answers..." onChange = {(e) => handleSearch(e, props) } style={{width: "80%", height:"30px",}}/>
          <button className = "searchSubmitBtn" type="submit"><i class="fa fa-search"></i></button>
        </label>
      </form>
    </div>
  )
};

export default SearchQuestion;