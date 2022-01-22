import React from 'react';
import { render, screen } from '@testing-library/react';
import OutfitList from '../../client/src/Related/OutfitList.jsx';

// const exampleData = require('../../server/routes/RelatedFakeData').fakeProducts;
// let exampleItem = exampleData[0].id;

test('should output *YOUR OUTFIT*', () => {
  let { getByTestId } = render(<OutfitList />);
  let listHeader = getByTestId('outfitHeader');
  expect(listHeader.textContent).toBe('YOUR OUTFIT');
})

test('outfitList component renders', () => {
  const { getByTestId } = render(<OutfitList />);
  getByTestId('outfitContainer');
  getByTestId('outfitList');
});

test('Outfit List should start with no items', () => {
  const { getByTestId } = render(<OutfitList />);
  const list = getByTestId('outfitList');
  const outfits = list.children;
  expect(outfits).toHaveLength(0);
  //get the ul inside of outfit list component
  //get all of the lis in the ul
  //check the number of lis
  //look at the content of the lis

  // const {getAllByRole} = within('list');
  // const items = getAllByRole('listitem');
});

test('OutFit container should have an "Add to Outfits" card', () => {
  const { getByText, getByTestId } = render(<OutfitList />);
  const addCard = getByTestId('add-card');
  const addText = getByText('Add to Outfit');
  expect(addText).toBeInTheDocument();
})

test('should have scroll arrows', () => {
  const { getByText, getByTestId } = render(<OutfitList />);
  const outfitContainer = getByTestId('outfitContainer');
  const arrows = getByTestId('arrows');
  expect(outfitContainer.children).toContainEqual(arrows);
})

// const users = [{id: 1, name: 'Hugo'}, {id: 2, name: 'Francesco'}];

// test('we should have ids 1 and 2', () => {
//   expect(users).toEqual(
//     expect.arrayContaining([
//       expect.objectContaining({id: 1}),
//       expect.objectContaining({id: 2})
//     ])
//   );
// });