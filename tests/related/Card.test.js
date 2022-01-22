import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from "msw";
import { setupServer } from "msw/node";
import Card from '../../client/src/Related/Card.jsx';
import List from '../../client/src/Related/List.jsx';

// //59561 59557

// var mockOutfits = require("../../server/routes/RelatedfakeData").fakeOutfits;
// var mockStyles = require("../../server/routes/RelatedfakeData").fakeOutfitFeatures;

// var server = setupServer(
//   rest.get("/products/:product_id", (req, res, ctx) => {

//     return res(
//       ctx.json(JSON.stringify(mockOutfits[0]))
//     )
//   }),
//   rest.post("/products/:product_id/styles", (req, res, ctx) => {
//     return res(
//       ctx.json(JSON.stringify(mockStyles[0]))
//     )
//   }),
//   rest.post("/products", (req, res, ctx) => {
//     return res(
//       ctx.json(JSON.stringify(mockStyles))
//     )
//   })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())


// test('Card renders components based on server response', async () => {
//   var { getByTestId } = render(<List relatedProducts='59561, 59557' />)

//   await waitFor(() => getByTestId('card'));
//   // expect(getByTestId(fir).textContent.split('9')[1].substring(0, 60)).toBe(firstPost.summary.substring(0, 60))
// })

// // test('it shoud contain the product\'s category', () => {

// // })

// // test('it shoud contain the product\'s category', () => {

// // })