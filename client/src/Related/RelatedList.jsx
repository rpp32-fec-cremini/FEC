import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import './related.css';
import Card from './Card.jsx';
import Compare from './Compare.jsx';
import Scroll from './Scroll.jsx';
import Arrows from './Arrows.jsx';
import getClicks from "../getClicks.jsx";

class RelatedList extends React.Component {
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
    this.getRelatedIDs();
    this.setMainProduct();
    this.setCompProduct(59555);
    this.setState({ relatedProducts: [] });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.productId !== this.props.productId) {
      this.setState({ relatedProducts: [] });
      this.setMainProduct();
      this.getRelatedIDs();
    }
  }

  getAllProducts = () => {
    $.get(`/products`, data => {
      let products = JSON.parse(data);
      this.setState({ products: products });
    });
  };

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
      // this.getStyles(id, data);
      this.setState({ relatedProducts: [...this.state.relatedProducts, data] });
    } catch (err) {
      console.log(err);
    }
  };

  starClick = (id) => {
    this.setCompProduct(id);
    $('.compare').removeClass('hide');
    $('.compare').addClass('show');
    $('.related-container').parents('#root, body, html').css({ 'overflow': 'hidden' });
    $('.related-list').css({ 'overflow-x': 'hidden' });
    this.hideModal();
  }

  isStar = (e) => {
    let isStar = false;
    if (e.target.parentNode.className === "action-btn" ||
      e.target.className === "action-btn") {
      isStar = true;
    }
    return isStar;
  }

  hideModal = () => {
    $('.related-container').parents('body').click((e) => {
      let isStar = this.isStar(e);

      if (!isStar) {
        $('.compare').removeClass('show');
        $('.compare').addClass('hide');
        $('.related-container').parents('#root, body, html').css({ 'overflow': 'auto' });
        $('.related-list').css({ 'overflow-x': 'auto' });
      }
    });
  }

  cardClick = (id) => {
    $('.related-card').click((e) => {
      let isStar = this.isStar(e);
      if (!isStar) this.props.changePage(id);
    });
  }


  getOffset = () => {
    let $container = $('.related-container');
    let $list = $('#related-list');
    console.log($container.attr('class'));
    console.log($list.position().left);
  }


  render() {
    const list = '#related-list';

    return (
      <div>
        <div data-testid='listContainer' className='related-container top-container' >
          <h4 data-testid='listHeader' className='related-title' >RELATED PRODUCTS</h4>
          <ul data-testid='list' className='related-list' id='related-list'>
            {this.state.relatedProducts.map((product, i) => (
              < Card key={product.id + i} product={product} type={this.state.type}
                actionClick={this.starClick} mainProduct={this.state.mainProduct} cardClick={this.props.changePage} />
            ))
            }
          </ul >
          <Arrows list={list} length={this.state.relatedProducts.length} getOffset={this.getOffset} />
          <div className='compare hide'>
            <Compare className='show' mainProduct={this.state.mainProduct} compProduct={this.state.compProduct} />
          </div>
        </div>
      </div>
    )
  }
};

export default getClicks(RelatedList);