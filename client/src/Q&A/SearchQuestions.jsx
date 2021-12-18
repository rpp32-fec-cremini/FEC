import React from 'react';

const handleSearch = (e, props) => {
  props.search(e.target.value);
}

const SearchQuestion = (props) => {
  return (
    <div>
      <form>
        <label>
          <input type="text" defaultValue = "Have a question? Search for answers..." onChange = {(e) => handleSearch(e, props) } />
        </label>
      </form>
    </div>
  )

};

export default SearchQuestion;