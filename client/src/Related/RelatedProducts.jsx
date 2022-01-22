import React from 'react';
import axios from 'axios';
import './related.css';
import List from './List.jsx';
import Compare from './Compare.jsx';
import Arrows from './Arrows.jsx';
import getClicks from "../getClicks.jsx";

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainProduct: {},
      compProduct: {
        id: 456,
        name: 'Sample Comp Product',
        category: 'example'
      },
      products: [],
      relatedProducts: [],
      relatedStyles: []
    }
  }

  componentDidMount() {
    this.setMainProduct();
    this.setBackoff();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.productId !== this.props.productId) {
      this.setMainProduct();
      this.setState({ relatedProducts: [] });
      this.setBackoff();
    }
  }

  setMainProduct = () => {
    axios.get(`/products/${this.props.productId}`)
      .then(product => this.setState({ mainProduct: product.data }))
      .catch(err => console.log('main product request failed'));
  }

  setCompProduct = (id) => {
    axios.get(`/products/${id}`)
      .then(product => this.setState({ compProduct: product.data }))
      .catch(err => console.log('compare product request failed'));
  }

  delay = retryCount =>
    new Promise(resolve => setTimeout(resolve, 10 ** retryCount));

  setBackoff = async (id, retryCount = 0, lastError = 'related products failed') => {
    if (retryCount > 5) throw new Error(lastError);
    try {
      this.getRelatedIds();
    } catch (err) {
      await this.delay(retryCount);
      return this.setBackoff(retryCount + 1, e);
    }
  }

  getRelatedIds = () => {
    axios.get(`/products/${this.props.productId}/related`)
      .then(ids => {
        this.setRelatedProducts(ids.data);
      })
      .catch(err => console.log('related products request failed'));
  }

  setRelatedProducts = async (ids) => {
    let requests = ids.map(id => {
      return axios.get(`/products/${id}`);
    })

    Promise.all(requests).then(resArray => {
      let products = [];
      resArray.forEach(product => products.push(product.data));
      this.setState({ relatedProducts: products });
    })
  }

  render() {
    return (
      <div>
        <div data-testid='listContainer' className='related-container top-container' >
          <p data-testid='listHeader' className='related-title' >RELATED PRODUCTS</p>
          <List
            relatedProducts={this.state.relatedProducts}
            actionClick={this.starClick}
            mainProductId={this.props.productId}
            setCompProduct={this.setCompProduct}
            setproductId={this.props.setproductId}
          />
          <Arrows
            productId={this.props.productId}
            type='related'
            listLength={this.state.relatedProducts.length}
          />
          <div className='compare hide'>
            <Compare className='show' mainProduct={this.state.mainProduct} compProduct={this.state.compProduct} />
          </div>
        </div>
      </div >
    )
  }
};

export default getClicks(RelatedProducts);