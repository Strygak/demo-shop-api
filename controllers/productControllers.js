const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(500).send("There was a problem.");
    }
    res.json(products);
  });
}

exports.getProductsWithDiscount = (req, res) => {
  Product.find({ discount: true }, (err, products) => {
    if (err) {
      return res.status(500).send("There was a problem.");
    }
    res.json(products);
  });
};

exports.createProduct = (req, res) => {
  Product.create({
    title: req.body.title,
    price: req.body.price,
    owner_id: req.userId,
    discount: req.body.discount
  }, (err, product) => {
    if (err) { 
      return res.status(500).send("There was a problem of registering the product.");
    }
    res.status(200).send({ product_id: product._id, message: 'Product created' });
  });
}

exports.deleteProduct = (req, res) => {
  Product.remove({ _id: req.params.id, owner_id: req.userId }, (err, doc) => {
    if (err) {
      return res.status(500).send("There was a problem of deliting the product.");
    }
    
    if (!doc.n) {
      return res.send({ message: 'You are not owner of this product' });
    }
    res.status(200).send({ message: 'Product was deleted' });
  });
}

exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id, owner_id: req.userId }, 
                           { $set: { title: req.body.title, price: req.body.price, discount: req.body.discount }}, 
    { new: true }, (err, doc) => {
      if (err) {
        return res.status(500).send("There was a problem of updating the product.");
      }

      if (!doc) {
        return res.send({ message: 'You are not owner of this product' });
      }
      res.status(200).send({ message: 'Product was updated' });
  });
}
