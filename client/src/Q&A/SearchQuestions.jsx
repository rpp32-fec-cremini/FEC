import React from 'react';
import "./QaA.css";
import './SearchQuestions.css';


const SearchQuestion = (props) => {

  const handleSearch = (e, props) => {
    e.preventDefault;
    props.search(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className = "searchBox" onSubmit={onSubmit}>
        <label >
          <input type="text" data-testid={'searchQuestion'} placeholder = "Have a question? Search for answers..." onChange = {(e) => handleSearch(e, props) } style={{width: "80%", height:"30px",}}/>
          <button className = "searchSubmitBtn" ><i className="fa fa-search"></i></button>
        </label>
      </form>
    </div>
  )
};

export default SearchQuestion;