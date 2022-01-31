import AddToCart from '../../client/src/Overview/components/cartComponents/addToCart.jsx';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Overview from '../../client/src/Overview/overview.jsx';
import ProductInfo from '../../client/src/Overview/components/productInformation.jsx';
import StyleSelector from '../../client/src/Overview/components/styleComponents/styleSelector.jsx';
import Style from '../../client/src/Overview/components/styleComponents/style.jsx';

const mockProductData = require("../../server/routes/overviewRoutes/dummyData.js");

/* <ProductInfo className=' related relatedCard'
         productList={this.state.productList}
         styleList ={this.state.styleList}
         reviewMeta= {this.state.reviewMeta}
         current={this.state.current}
         currentStyle ={this.state.currentStyle}
         changeStyle = {this.changeStyle}
        /> */

afterEach(()=>{cleanup();})

test('Should render Product Info', () => {
  const {getByTestId } = render(<ProductInfo className=' related relatedCard'
  productList={mockProductData.data}
  styleList ={mockProductData.styles.results}
  reviewMeta= {mockProductData.meta}
  current={mockProductData.data}
  currentStyle ={mockProductData.styles.results[0]}
  changeStyle = {()=>{console.log('Hullo');}}
 />)
 render(<StyleSelector styleList = {mockProductData.styles.results} currentStyle = {mockProductData.styles.results[0] }/>);
 render(<AddToCart currentStyle = {mockProductData.styles.results[0] } />);

 getByTestId('desc')
 getByTestId('price')
 /* getByTestId('styleSelectorr')
 getByTestId('cart') */
})
