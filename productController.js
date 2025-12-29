const products = require("../data/products");
const { v4: uuidv4 } = require("uuid");

// CREATE product
exports.createProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    price
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// GET all products
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// GET product by ID
exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// UPDATE product
exports.updateProduct = (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name ?? product.name;
  product.price = req.body.price ?? product.price;

  res.json(product);
};

// DELETE product
exports.deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct[0]);
};
