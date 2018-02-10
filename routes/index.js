const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
const verifyToken = require('../services/verifyToken');

router.get('/', controllers.getAllProducts);
router.post('/products', verifyToken, controllers.createProduct);
router.put('/products/:id', verifyToken, controllers.updateProduct);
router.delete('/products/:id', verifyToken, controllers.deleteProduct);

module.exports = router;
