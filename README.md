# Project Atelier
Team Cremini version


## Overview
Project Atelier comprises a complete redesign of an outdated, client-facing retail portal designed to modernize the site. Thus new user interface allows customers to browse items in a retail catalog.


### Details
#### Overview Highlights
* An image gallery
* Dynamic pricing details
* Style choices with additional details and images for each if available
* Interactive size and quantity selectors
![Overview](https://user-images.githubusercontent.com/82000132/150625406-008175d6-98ec-4950-b3ed-8954e7cd7ceb.gif)

#### Related Products Highlights
* A carousel list displaying products that are similar
  or related to the current product
  -each item has an interactive star icon that displays
   a comparison between the current product and this product
* A carousel list that contains outfit items that the user would like to save
  -each product has a delete icon to remove it
  -the first item is an interactive button to Add to Outfit list
  -this list is unique to each user and persists in local storage on a page refresh
* Each item in both lists is clickable and will route the user to that item's detail page
* Each list is scrollable with interactive arrows which respond to list size
![RelatedProducts](https://user-images.githubusercontent.com/82000132/150625410-b4416694-99e8-4802-9d63-4d2cc2831e5d.gif)

#### Questions & Answers Highlights
* Displays an expandable list of asked questions
  -each question has an expandable list of answers if available
* Allows users to ask a question (email required)
* Allows users to submit an answer with optional photos (email required)
* Questions are filterable by a keyword search
* Users are able to mark answers as helpful or report as inappropriate
![QA](https://user-images.githubusercontent.com/82000132/150625416-71377225-3bb1-4253-9708-269558564034.gif)

#### Ratings & Reviews Highlights
* Ratings are dispalyed in numeric, star and bar graphics
* Displays the percentage of buyers who recommend the product
* Diplays a bar graph of the quality based on buyer feedback
* Displays an expandable review list
* Reviews are sorted by most helpful by default
 -reviews can optioanlly be filtered by relevance and most recent
* Users can mark reviews as helpful or report inappropriate reviews
* Users can submit reviews with a star rating and optional photos
![Rating](https://user-images.githubusercontent.com/82000132/150625418-40981e4e-8e57-4dcb-a35c-02d82a28dd62.gif)


## Installation
Basic front end dependecies include node, express, jquery react, reactDOM, axios, and babel for webpack configuration. We also used react-icons.

We used jest, jest-dom, testing-library/react, and msw to write tests.

### Installing Dependencies
In the terminal, run $ npm install

### Compiling non-Javascript assets
In the terminal, run $ npm run build

### Starting Server
In the terminal, run $ npm start

### Running Tests
In the terminal, run $ npm test

## Contributors
Austin Cobb - Overview
Bonnie Owens - Related Products
Glen Li - Questions & Answers
Joseph Nahm - Ratings & Reviews
