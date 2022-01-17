import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: {},
      percent: 0
    }
  }

  componentDidMount() {
    this.getRatings(this.props.id);
  }

  // delay = retryCount =>
  //   new Promise(resolve => setTimeout(resolve, 10 ** retryCount));

  // setBackoff = (id, retryCount = 0) =>
  //   this.getRatings(id).catch(() => delay(retryCount).then(() => getResource(retryCount + 1)));

  // setBackoff = async (id, retryCount = 0, lastError = 'ratings failed') => {
  //   if (retryCount > 5) throw new Error(lastError);
  //   try {
  //     this.getRatings(id);
  //   } catch (err) {
  //     await delay(retryCount);
  //     return getRatings(retryCount + 1, e);
  //   }
  // }

  getRatings = async (id) => {
    try {
      let data = await axios.get(`reviews/meta?product_id=${id}`);
      let ratings = data.data.ratings;
      this.setState({ ratings: ratings });
      this.setAvg();
    } catch (err) {
      console.log('error in ratings GET req', err);
    }
  };


  setAvg = () => {
    const { ratings } = this.state;
    let count = 0;
    let sum = 0;
    let avg = 0;
    for (let key in ratings) {
      let value = ratings[key] ? parseInt(ratings[key]) : 0;
      let subSum = key * value;
      count += value;
      sum += subSum;
    }
    avg = (Math.round((sum / count) * 4) / 4).toFixed(2);
    let percent = Math.round((avg / 5) * 100);
    this.setState({ percent: percent });
  }




  render() {
    let width = `${this.state.percent}%`;
    return (
      <div>
        <div className="ratings">
          <div className="empty-stars"></div>
          <div className="full-stars" style={{ width: width }}></div>
        </div>
      </div>
    )
  }
}

export default Rating;