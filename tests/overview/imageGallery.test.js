import ImageGallery from '../../client/src/Overview/components/imageGallery.jsx';
import GalleryList from '../../client/src/Overview/components/galleryList.jsx';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Overview from '../../client/src/Overview/overview.jsx';

const mockProductData = require("../../server/routes/overviewRoutes/dummyData.js");
const mockImageArray = mockProductData.styles.results;
//console.log('Trying to understand mockimage ', mockImageArray )
afterEach(() => {cleanup();})

test('GalleryList renders', () => {
  render(<ImageGallery styleList = {mockProductData.styles.results} currentStyle = {mockProductData.styles.results[0] } currentUrl = {mockProductData.styles.results[0]}  />);
  render(<GalleryList styleList = {mockProductData.styles.results} currentStyle = {mockProductData.styles.results[0] } />);
  const galleryList = screen.getByTestId('galleryList');
  /* const gallery = screen.getByTestId('gallery');
  expect(gallery).toEqual(expect.arrayContaining(mockImageArray)); */
})

/* test('Image Gallery Renders', () => {
  const { getByTestId } = render(<StyleSelector  styleList = {mockProductData.styles.results} currentStyle = {mockProductData.styles.results[0] } /> );
  getByTestId('styleSelect');
  getByTestId('styleList')
}) */