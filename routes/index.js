const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const verifyToken = require('../services/verifyToken');

router.get('/', productControllers.getAllProducts);
router.post('/products', verifyToken, productControllers.createProduct);
router.put('/products/:id', verifyToken, productControllers.updateProduct);
router.delete('/products/:id', verifyToken, productControllers.deleteProduct);

module.exports = router;
