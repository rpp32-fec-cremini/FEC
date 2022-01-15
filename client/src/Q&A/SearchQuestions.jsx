import React, {useState, useEffect} from 'react';
import "./QaA.css";
import './SearchQuestions.css';


const SearchQuestion = (props) => {

  const [searchWord, setsearchWord] = useState('')

  const handleSearch = (e, props) => {
    e.preventDefault;
    setsearchWord(e.target.value);
    props.search(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className = "searchBox" onSubmit={onSubmit}>
        <label >
          <input type = "text" data-testid = 'searchQuestion' value = {searchWord} placeholder = "Have a question? Search for answers..." onChange = {(e) => handleSearch(e, props) } style={{width: "80%", height:"30px",}}/>
          <button className = "searchSubmitBtn" ><i className="fa fa-search"></i></button>
        </label>
      </form>
    </div>
  )
};

export default SearchQuestion;