const Product = require('../models/product');

//Desc: Create a new Product 
//Parameters: @req.body
//Url: /products
//Method: POST
//Error: status code 500
exports.createNewProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error);
  }
}

//Desc: Update a product with id
//Parameters: @id
//Url: /products/:id
//Method: PUT
//Error: status code 500
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    })
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json(error);
  }
}

//Desc: Delete a product 
//Parameters: @id
//Url: /products/:id
//Method: DELETE
//Error: status code 500
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product deleted successfully.")
  } catch (error) {
    res.status(500).json(error);
  }
}

//Desc: Get a single product
//Parameters: @id
//Url: /products/:id
//Method: GET
//Error: status code 500
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error);
  }
}

//Desc: Get all products
//Parameters: -
//Query: @new, @category
//Url: /products
//Method: GET
//Error: status code 500
exports.getAllProducts = async (req, res) => {
  const queryNew = req.query.new
  const queryCategory = req.query.category
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({
        createdAt: -1
      }).limit(1)
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory]
        }
      })
    } else {
      products = await Product.find()
    }

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}