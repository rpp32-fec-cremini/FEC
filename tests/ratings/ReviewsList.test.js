import React from 'react';
import { rest } from "msw";
import { setupServer } from "msw/node"
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import RatingContainer from '../../client/src/Ratings/RatingContainer';

var exampleData = require("../../server/routes/ReviewsfakeData").fakeReviews;
var firstId = exampleData.results[0].review_id;
var testId = `Tile ${firstId}`;

var server = setupServer(
  rest.get("/reviews", (req, res, ctx) => {
    return res(
      ctx.json(JSON.stringify(exampleData))
    )
  })
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('ReviewsList renders components based on server response', async () => {
  // https://testing-library.com/docs/react-testing-library/example-intro
  render(<RatingContainer/>)

  await waitFor(() => screen.getByTestId(testId))
  expect(screen.getByTestId(testId).textContent).toBe("Individual Review TilestarRating: 3dateWritten: April 14, 2019summary: I'm enjoying wearing these shadesbody: Comfortable and practical.recommend: name: shortandsweeethelpfulness: 5")
})