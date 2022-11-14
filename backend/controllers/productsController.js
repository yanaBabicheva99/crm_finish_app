const Products = require('../models/Products');
const errorHandler = require('../utils/errorHandler');

module.exports.getUserProducts = async function(req, res) {
  try {
      const products = await Products.find({
          user: req.user.id
      })
      res.status(200).json(products);
  } catch(err) {
      errorHandler(res, err);
  }

}

module.exports.removeUserProducts = async function(req, res) {
    try {
        const product = await Products.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(product)
    } catch(err) {
        errorHandler(res, err);
    }
}

module.exports.createUserProducts = async function(req, res) {

    try {
        const product = await new Products({
            store: req.body.store,
            productName: req.body.productName,
            category: req.body.category,
            price: req.body.price,
            creationData: req.body.creationData,
            weight: req.body.weight,
            remains: req.body.remains,
            user: req.user.id
        }).save()
        res.status(201).json(product)
    } catch(err) {
        errorHandler(res, err);
    }

}

module.exports.updateUserProducts = async function(req, res) {
    try {
        const product = await Products.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(product)
    } catch(err) {
        errorHandler(res, err);
    }

}

module.exports.changeUserProducts = async function(req, res) {
    try {
        const product = await Products.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(product)
    } catch(err) {
        errorHandler(res, err);
    }
}
