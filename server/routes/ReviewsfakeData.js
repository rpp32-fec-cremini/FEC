var reviewBody1 = [...Array(255)].map(word => "hello").join(" ")
var reviewBody2 = [...Array(10)].map(word => "goodbye").join(" ")

var fakeReviews = {
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades wow this is such a goodiee oh what a good day me oh my this is a really long summary",
      "recommend": true,
      "response": null,
      "body": reviewBody1,
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "https://via.placeholder.com/150"
        },
        {
          "id": 2,
          "url": "https://via.placeholder.com/300"
        }
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": []
    },
    {
      "review_id": 1,
      "rating": 1,
      "summary": "Yeah whatever",
      "recommend": false,
      "response": "Sorry to hear that",
      "body": reviewBody2,
      "date": "2017-06-23T00:00:00.000Z",
      "reviewer_name": "joejoe",
      "helpfulness": 2,
      "photos": []
    },
    {
      "review_id": 10,
      "rating": 2,
      "summary": "alright",
      "recommend": false,
      "response": "Sorry to hear that",
      "body": "These feel like cardboard",
      "date": "2016-09-23T00:00:00.000Z",
      "reviewer_name": "tubes",
      "helpfulness": 3,
      "photos": []
    },
    {
      "review_id": 20,
      "rating": 5,
      "summary": "Great stuff",
      "recommend": true,
      "response": "Yay so glad",
      "body": "Real food stuff",
      "date": "2016-06-23T00:00:00.000Z",
      "reviewer_name": "alice",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "https://via.placeholder.com/250"
        },
        {
          "id": 2,
          "url": "https://via.placeholder.com/1920"
        }
      ]
    }
  ]
}

var fakeMetaData = {
  "product_id": "2",
  "ratings": {
    "2": 1,
    "3": 1,
    "4": 2
  },
  "recommended": {
    "0": 5
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    }
  }
}

module.exports.fakeReviews = fakeReviews;
module.exports.fakeMetaData = fakeMetaData;