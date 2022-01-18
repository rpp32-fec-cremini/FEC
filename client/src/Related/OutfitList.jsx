import React from 'react';
import axios from 'axios';
import './related.css';
import { IoAdd } from "react-icons/io5";
import Arrows from './Arrows.jsx';
import Card from './Card.jsx';
import getClicks from "../getClicks.jsx";

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      currentProduct: null
    }
  }

  componentDidMount() {
    this.getOutfits();
    this.setCurrentProduct(this.props.productId);
  }

  componentDidUpdate() {
    if (this.state.currentProduct === null || this.props.productId !== this.state.currentProduct.id) {
      this.setCurrentProduct();
    }
  }

  getOutfits = () => {
    let outfits = JSON.parse(localStorage.getItem('outfits'));
    if (localStorage.getItem('outfits') !== null) {
      this.setState({ outfits: outfits });
    }
  }

  // setCurrentProduct = () => {
  //   $.get(`/products/${this.props.productId}`, data => {
  //     this.setState({ currentProduct: JSON.parse(data) });
  //   })
  // };

  setCurrentProduct = () => {
    axios.get(`/products/${this.props.productId}`)
      .then(product => this.setState({ currentProduct: product.data }))
      .catch(err => console.log('current product request failed'));
  }

  xClick = (id) => {
    let storedOutfits = JSON.parse(localStorage.getItem('outfits'));
    let index = storedOutfits.findIndex(obj => obj.id === id);
    storedOutfits.splice(index, 1);
    localStorage.setItem('outfits', JSON.stringify(storedOutfits));
    this.setState({ outfits: storedOutfits });
  }

  addClick = (id) => {
    let outfit = this.state.currentProduct;
    this.setLocalStorage(outfit);
  }

  setLocalStorage = (outfit) => {
    let storedOutfits = [];
    if (localStorage.getItem('outfits') === null) {
      storedOutfits.push(outfit);
    } else {
      storedOutfits = JSON.parse(localStorage.getItem('outfits'));
      if (!storedOutfits.find(obj => obj.id === outfit.id)) {
        storedOutfits.unshift(outfit);
      }
    }
    localStorage.setItem('outfits', JSON.stringify(storedOutfits));
    this.setState({ outfits: storedOutfits });
  }

  render() {
    let list = '#outfit-list';
    return (
      <div data-testid='outfitContainer' className='related-container' id='outfit-container'>
        <h4 data-testid='outfitHeader' className='related-title' >YOUR OUTFIT</h4>
        <div data-testid='add-card' className='related-card' id='related-add' onClick={(id) => this.addClick(this.props.productId)}>
          <div id='add-text'>
            <IoAdd id='add-icon' />
            <p>Add to Outfit</p>
          </div>
        </div>
        <ul data-testid='outfitList' className='related-list' id='outfit-list'>
          {this.state.outfits.map(outfit => (
            < Card
              key={outfit.id}
              product={outfit}
              type='outfit'
              actionClick={this.xClick}
              setproductId={this.props.setproductId}
            />
          ))
          }
        </ul >
        <Arrows
          productId={this.props.productId}
          type='outfit'
          listLength={this.state.outfits.length}
        />
      </div>
    )
  }
};

export default getClicks(OutfitList);