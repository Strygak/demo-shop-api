const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const verifyToken = require('../services/verifyToken');

router.get('/', (req, res, next) => {

  Product.find({}, (err, products) => {
    if (err) {
      return res.status(500).send("There was a problem.");
    }

    res.json(products);
  });
});

router.post('/products', verifyToken, (req, res) => {

  Product.create({
    title: req.body.title,
    price: req.body.price,
    owner_id: req.userId
  }, (err, product) => {
    if (err) { 
      return res.status(500).send("There was a problem of registering the product.");
    }
    
    res.status(200).send({ product_id: product._id, message: 'Product created' });
  });

});

router.put('/products/:id', verifyToken, (req, res) => {

  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(500).send("There was a problem to find the product.");
    }
    
    if (product.owner_id === req.userId) {
      Product.findOneAndUpdate({ _id: req.params.id }, { $set:{ title: req.body.title, price: req.body.price }}, 
        { new: true }, (err, doc) => {
          if (err) {
            return res.status(500).send("There was a problem of updating the product.");
          }

          res.status(200).send({ message: 'Product was updated' });
      });
    } 
    else {
      res.send({ message: 'You are not owner of this product' });
    }
  });
});

router.delete('/products/:id', verifyToken, (req, res) => {
  
  Product.findOne({_id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(500).send("There was a problem to find the product.");
    }
    
    if (product.owner_id === req.userId) {
      Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {

        if (err) {
          return res.status(500).send("There was a problem of deliting the product.");
        }
    
        res.status(200).send({ message: 'Product was deleted' });
    
      });
    } 
    else {
      res.send({ message: 'You are not owner of this product' });
    }

  });
  
});

module.exports = router;
