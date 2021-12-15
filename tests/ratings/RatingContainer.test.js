import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RatingContainer from '../../client/src/Ratings/RatingContainer';
import '@testing-library/jest-dom'

jest.mock("../../client/src/Ratings/ReviewsList.jsx", () => () => <div data-testid="ReviewsList"/>)
jest.mock("../../client/src/Ratings/AddReview.jsx", () => () => <div data-testid="AddReview"/>)
jest.mock("../../client/src/Ratings/SortReviews.jsx", () => () => <div data-testid="SortReviews"/>)
jest.mock("../../client/src/Ratings/RatingBreakdown.jsx", () => () => <div data-testid="RatingBreakdown"/>)
jest.mock("../../client/src/Ratings/ProductBreakdown.jsx", () => () => <div data-testid="ProductBreakdown"/>)

test('Rating Container renders', () => {
  var { getByTestId } = render(<RatingContainer/>);
  expect(getByTestId(/ReviewsList/)).toBeInTheDocument()
  expect(getByTestId(/AddReview/)).toBeInTheDocument()
  expect(getByTestId(/SortReviews/)).toBeInTheDocument()
  expect(getByTestId(/RatingBreakdown/)).toBeInTheDocument()
  expect(getByTestId(/ProductBreakdown/)).toBeInTheDocument()
})