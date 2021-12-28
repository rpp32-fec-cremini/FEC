import React from 'react';
import { rest } from "msw";
import { setupServer } from "msw/node"
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import RatingContainer from '../../client/src/Ratings/RatingContainer';

var mockReviews = require("../../server/routes/ReviewsfakeData").fakeReviews;
var mockMeta = require("../../server/routes/ReviewsfakeData").fakeMetaData;

var server = setupServer(
  rest.get("/reviews", (req, res, ctx) => {
    return res(
      ctx.json(JSON.stringify(mockReviews))
    )
  }),
  rest.get("/reviews/meta", (req, res, ctx) => {
    return res(
      ctx.json(JSON.stringify(mockMeta))
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
  var firstPost = mockReviews.results[0]
  expect(getByTestId(5).textContent.split('9')[1].substring(0, 60)).toBe(firstPost.summary.substring(0, 60))
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
      "overflow-y": "scroll"
  })
})

test("Modal window pops up when user clicks on an image, and closes when the close button is clicked", async () => {
  var { getAllByRole, getByTestId, queryAllByTestId } = render(<RatingContainer/>)
  await waitFor(() => getByTestId(5))
  var firstImg = getAllByRole("img")[0];
  expect(queryAllByTestId('modal')[0].style._values.display).toBe("none")
  fireEvent.click(firstImg)
  expect(queryAllByTestId('modal')[0].style._values.display).not.toBe("none")
  expect(queryAllByTestId('modal')[0].style._values.display).toBe("block")
  fireEvent.click(queryAllByTestId('close')[0])
  expect(queryAllByTestId('modal')[0].style._values.display).not.toBe("block")
  expect(queryAllByTestId('modal')[0].style._values.display).toBe("none")
})