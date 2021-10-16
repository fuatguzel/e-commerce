# E-commerce api with Express and mongoDB

---
### Getting Started

```sh
$ git clone https://github.com/fuatguzel/e-commerce-api.git
$ cd ./e-commerce-api
$ npm install
$ npm start
```

---

### Base URL
`localhost:5000/api/v1`

## Products
---
`GET /products`
```json
[
    {
        "_id": "6165f3bd5e783bf1646ca518",
        "title": "Nike shoes",
        "description": "Jordan",
        "image": "example-url",
        "categories": [
            "shoes",
            "woman"
        ],
        "size": "40",
        "color": "pink",
        "price": 75,
        "createdAt": "2021-10-12T20:44:45.358Z",
        "updatedAt": "2021-10-12T20:44:45.358Z",
        "__v": 0
    },
    ...
]
```

`GET /products?new=true`

- Returns last added product

`GET /products?category=example-category `

- Returns products which has include example-category category.


