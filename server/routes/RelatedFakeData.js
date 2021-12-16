let fakeProducts = [
  {
    "id": 11,
    "name": "Air Minis 250",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "nike Shoes",
    "default_price": "0",
    "features": [
      {
        "feature": "Sole",
        "value": "Rubber"
      },
      {
        "feature": "Material",
        "value": "FullControlSkin"
      },
      // ...
    ],
  },
  {
    "id": 31,
    "name": "OG Jordan",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "nike Shoes",
    "default_price": "0",
    "features": [
      {
        "feature": "Sole",
        "value": "Rubber"
      },
      {
        "feature": "Material",
        "value": "BreathableMesh"
      },
      // ...
    ],
  },
  {
    "id": 43,
    "name": "Cross Court",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "nike Shoes",
    "default_price": "0",
    "features": [
      {
        "feature": "Sole",
        "value": "Rubber"
      },
      {
        "feature": "Material",
        "value": "FoamMesh"
      },
      // ...
    ],
  }
];

let fakeProductStyles = [
  {
    "product_id": "11",
    "results": [
      {
        "style_id": 1,
        "name": "Forest Green & Black",
        "original_price": "140",
        "sale_price": "0",
        "default?": true,
        "photos": [
          {
            "thumbnail_url": "https://source.unsplash.com/200x200/?shoes&nike",
            "url": "https://source.unsplash.com/?shoes&nike"
          },
          {
            "thumbnail_url": "https://source.unsplash.com/thumbnail/?shoes&nike",
            "url": "https://source.unsplash.com/1600x900/?shoes&nike"
          }
          // ...
        ],
        "skus": {
          "37": {
            "quantity": 8,
            "size": "XS"
          },
          "38": {
            "quantity": 16,
            "size": "S"
          },
          "39": {
            "quantity": 17,
            "size": "M"
          },
          //...
        }
      },
      {
        "style_id": 2,
        "name": "Desert Brown & Tan",
        "original_price": "140",
        "sale_price": "0",
        "default?": false,
        "photos": [
          {
            "thumbnail_url": "https://source.unsplash.com/200x200/?shoes&nike",
            "url": "https://source.unsplash.com/1600x900/?shoes&nike"
          }
          // ...
        ],
        "skus": {
          "37": {
            "quantity": 8,
            "size": "XS"
          },
          "38": {
            "quantity": 16,
            "size": "S"
          },
          "39": {
            "quantity": 17,
            "size": "M"
          },
          //...
        }
      },
    ]
  },
  {
    "product_id": "31",
    "results": [
      {
        "style_id": 1,
        "name": "Red & Black",
        "original_price": "120",
        "sale_price": "115",
        "default?": true,
        "photos": [
          {
            "thumbnail_url": "https://source.unsplash.com/200x200/?shoes&nike",
            "url": "https://source.unsplash.com/?shoes&nike"
          },
          {
            "thumbnail_url": "https://source.unsplash.com/200x200/?shoes&nike",
            "url": "https://source.unsplash.com/1600x900/?shoes&nike"
          }
          // ...
        ],
        "skus": {
          "37": {
            "quantity": 8,
            "size": "XS"
          },
          "38": {
            "quantity": 16,
            "size": "S"
          },
          "39": {
            "quantity": 17,
            "size": "M"
          }
        }
      },
      {
        "style_id": 2,
        "name": "Desert Tan",
        "original_price": "120",
        "sale_price": "0",
        "default?": false,
        "photos": [
          {
            "thumbnail_url": "https://source.unsplash.com/200x200/?shoes&nike",
            "url": "https://source.unsplash.com/1600x900/?shoes&nike"
          }
          // ...
        ],
        "skus": {
          "37": {
            "quantity": 8,
            "size": "XS"
          },
          "38": {
            "quantity": 16,
            "size": "S"
          },
          "39": {
            "quantity": 17,
            "size": "M"
          },
          //...
        }
      }
    ]
  },
  {
    "product_id": "43",
    "results": [
      {
        "style_id": 1,
        "name": "Green & Black",
        "original_price": "110",
        "sale_price": "0",
        "default?": true,
        "photos": [
          {
            "thumbnail_url": "https://source.unsplash.com/200x200/?shoes&nike",
            "url": "https://source.unsplash.com/1600x900/?shoes&nike"
          },
          {
            "thumbnail_url": "https://source.unsplash.com/200x200/?shoes&nike",
            "url": "https://source.unsplash.com/1600x900/?shoes&nike"
          }
          // ...
        ],
        "skus": {
          "37": {
            "quantity": 8,
            "size": "XS"
          },
          "38": {
            "quantity": 16,
            "size": "S"
          },
          "39": {
            "quantity": 17,
            "size": "M"
          },
          //...
        }
      },
      {
        "style_id": 2,
        "name": "Red & White",
        "original_price": "110",
        "sale_price": "100",
        "default?": false,
        "photos": [
          {
            "thumbnail_url": "https://source.unsplash.com/200x200/?shoes&nike",
            "url": "https://source.unsplash.com/1600x900/?shoes&nike"
          }
          // ...
        ],
        "skus": {
          "37": {
            "quantity": 8,
            "size": "XS"
          },
          "38": {
            "quantity": 16,
            "size": "S"
          },
          "39": {
            "quantity": 17,
            "size": "M"
          },
          //...
        }
      }
    ]
  }
];

let fakeRelated = {
  11: [31, 43],
  31: [11, 43],
  43: [11, 31]
}

module.exports.fakeProducts = fakeProducts;
module.exports.fakeProductStyles = fakeProductStyles;
module.exports.fakeRelated = fakeRelated;
