import React from "react";
import getClicks from "../getClicks.jsx";

var SortReviews = ({numReviews, sortAndGet}) => (
  <div className="sort-dropdown">
    <span>{numReviews} reviews, sorted by</span>
    <select name="sortDropdown" id="sortDropdown" onChange={(e) => {
      var selection = e.target.value.toLowerCase();
      sortAndGet(1, selection);
    }}>
      <option value="Relevant">Relevance</option>
      <option value="Helpful">Helpfulness</option>
      <option value="Newest">Most Recent</option>
    </select>
  </div>
)

export default getClicks(SortReviews);