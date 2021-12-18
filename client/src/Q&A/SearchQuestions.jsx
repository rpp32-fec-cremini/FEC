import React from 'react';
import "./QaA.css";

const handleSearch = (e, props) => {
  props.search(e.target.value);
}

const SearchQuestion = (props) => {

  return (
    <div className = "searchBox">
      <form>
        <label >
          <input type="text" id="searchBar" defaultValue = "Have a question? Search for answers..." onChange = {(e) => handleSearch(e, props) } style={{width: "80%", height:"30px",}}/>
        </label>
      </form>
    </div>
  )
};

export default SearchQuestion;