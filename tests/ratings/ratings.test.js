import React from 'react';
import { rest } from "msw";
import { setupServer } from "msw/node"
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import RatingContainer from '../../client/src/Ratings/RatingContainer';

var mockReviews = require("../../server/routes/ReviewsfakeData").fakeReviews;

var server = setupServer(
  rest.get("/reviews", (req, res, ctx) => {
    return res(
      ctx.json(JSON.stringify(mockReviews))
    )
  })
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('ReviewsList renders components based on server response', async () => {
  // https://testing-library.com/docs/react-testing-library/example-intro
  var { getByTestId } = render(<RatingContainer/>)

  await waitFor(() => getByTestId(5))
  expect(getByTestId(5).textContent).toBe("Individual Review TilestarRating: 3dateWritten: April 14, 2019summary: I'm enjoying wearing these shadesbody: Comfortable and practical.recommend: name: shortandsweeethelpfulness: 5")
})

test('Only 2 reviews should be rendered initially until "More Reviews" button is clicked', async () => {
  var { getByText, getByTestId, queryByTestId } = render(<RatingContainer/>)
  await waitFor(() => getByTestId(5))
  var buttonEl = getByText("More Reviews")
  expect(queryByTestId(5)).toBeInTheDocument()
  expect(queryByTestId(3)).toBeInTheDocument()
  expect(queryByTestId(1)).not.toBeInTheDocument()
  fireEvent.click(buttonEl)
  expect(queryByTestId(1)).toBeInTheDocument()
})

test('Scroll bar appears after review module contains more than 3 review tiles', async () => {
  var { getByText, getByTestId, queryByTestId } = render(<RatingContainer/>)
  await waitFor(() => getByTestId(5))
  var buttonEl = getByText("More Reviews")
  var scrollEl = getByTestId("scrolllist")
  expect(scrollEl.style._values).toEqual({})
  fireEvent.click(buttonEl)
  expect(scrollEl.style._values).toEqual({
      "height": "700px",
      "overflow-y": "scroll",
  })
})