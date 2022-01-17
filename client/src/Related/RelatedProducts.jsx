import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import './related.css';
import RelatedList from './RelatedList.jsx';
import Compare from './Compare.jsx';
import Arrows from './Arrows.jsx';
import getClicks from "../getClicks.jsx";

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'related',
      mainProduct: {},
      compProduct: {
        id: 456,
        name: 'Sample Comp Product',
        category: 'example'
      },
      products: [],
      relatedIDs: [],
      relatedProducts: [],
      relatedStyles: []
    }
  }

  componentDidMount() {
    this.setMainProduct();
    // this.setBackoff();
    this.getRelatedIDs();
    this.setCompProduct(59555);
    // this.setState({ relatedProducts: [] });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.productId !== this.props.productId) {
      this.setMainProduct();
      this.setState({ relatedProducts: [] });
      // this.setBackoff();
      this.getRelatedIDs();
    }
  }

  // getAllProducts = () => {
  //   $.get(`/products`, data => {
  //     let products = JSON.parse(data);
  //     this.setState({ products: products });
  //   });
  // };

  setMainProduct = () => {
    $.get(`/products/${this.props.productId}`, data => {
      let mainProduct = JSON.parse(data);
      this.setState({ mainProduct: mainProduct });
    })
  };

  setCompProduct = (id) => {
    $.get(`/products/${id}`, data => {
      let compProduct = JSON.parse(data);
      this.setState({ compProduct: compProduct });
    })
  };

  // delay = retryCount =>
  //   new Promise(resolve => setTimeout(resolve, 10 ** retryCount));

  // setBackoff = (retryCount = 0) =>
  //   this.getRelatedIDs().catch(() => delay(retryCount).then(() => getResource(retryCount + 1)));

  // setBackoff = async (id, retryCount = 0, lastError = 'ratings failed') => {
  //   if (retryCount > 5) throw new Error(lastError);
  //   try {
  //     this.getRelatedIDs();
  //   } catch (err) {
  //     await delay(retryCount);
  //     return getRatings(retryCount + 1, e);
  //   }
  // }

  getRelatedIDs = async () => {
    let relatedIDs = [];
    try {
      let IDs = await axios.get(`/products/${this.props.productId}/related`);
      let data = IDs.data;
      data.forEach(id => {
        relatedIDs.push(id);
        this.setRelatedProducts(id);
      })
      this.setState({ relatedIDs: relatedIDs });
    } catch (err) {
      console.log(data, err);
    }
  };

  setRelatedProducts = async (id) => {
    try {
      let product = await axios.get(`/products/${id}`);
      let data = product.data;
      this.setState({ relatedProducts: [...this.state.relatedProducts, data] });
    } catch (err) {
      console.log(err);
    }
  };

  // starClick = (id) => {
  //   this.setCompProduct(id);
  //   $('.compare').removeClass('hide');
  //   $('.compare').addClass('show');
  //   $('.related-container').parents('#root, body, html').css({ 'overflow': 'hidden' });
  //   $('.related-list').css({ 'overflow-x': 'hidden' });
  //   this.hideModal();
  // }

  // isStar = (e) => {
  //   let isStar = false;
  //   if (e.target.parentNode.className === "action-btn" ||
  //     e.target.className === "action-btn") {
  //     isStar = true;
  //   }
  //   return isStar;
  // }

  // hideModal = () => {
  //   $('.related-container').parents('body').click((e) => {
  //     let isStar = this.isStar(e);

  //     if (!isStar) {
  //       $('.compare').removeClass('show');
  //       $('.compare').addClass('hide');
  //       $('.related-container').parents('#root, body, html').css({ 'overflow': 'auto' });
  //       $('.related-list').css({ 'overflow-x': 'auto' });
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <div data-testid='listContainer' className='related-container top-container' >
          <h4 data-testid='listHeader' className='related-title' >RELATED PRODUCTS</h4>
          <RelatedList
            relatedProducts={this.state.relatedProducts}
            actionClick={this.starClick}
            mainProduct={this.state.mainProduct}
            setCompProduct={this.setCompProduct}
            setproductId={this.props.setproductId}
          />
          <Arrows productId={this.props.productId} type='related' listLength={this.state.relatedIDs.length} />
          <div className='compare hide'>
            <Compare className='show' mainProduct={this.state.mainProduct} compProduct={this.state.compProduct} />
          </div>
        </div>
      </div>
    )
  }
};

export default getClicks(RelatedProducts);