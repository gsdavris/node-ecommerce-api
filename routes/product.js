const express = require( 'express');
const router = express.Router();

const { 
    create,
    productById,
    read,
    remove,
    update,
    list,
    listSearch,
    listRelated,
    listCategories,
    listBySearch,
    image
} = require ('../controllers/product');

const { 
    requireSignin,    
    isAuth,
    isAdmin
} = require('../controllers/auth');

const { 
    userById,
} = require ('../controllers/user');




router.post('/product/create/:userId',requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.put('/product/:productId/:userId',requireSignin, isAuth, isAdmin, update);
router.delete('/product/:productId/:userId',requireSignin, isAuth, isAdmin, remove);

router.get('/products', list);
router.get("/products/search", listSearch);
router.get('/products/related/:productId', listRelated)
router.get('/products/categories', listCategories)
router.post("/products/by/search", listBySearch);
router.get('/product/image/:productId', image)

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;