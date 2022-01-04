import React from "react";

var SortReviews = ({numReviews, sortAndGet}) => (
  <div className="sort-dropdown">{numReviews} reviews, sorted by
    <select name="sortDropdown" id="sortDropdown" onChange={(e) => {
      var selection = e.target.value.toLowerCase();
      sortAndGet(1, selection);
    }}>
      <option value="Relevant">Relevant</option>
      <option value="Helpful">Helpful</option>
      <option value="Newest">Newest</option>
    </select>
  </div>
)

export default SortReviews;