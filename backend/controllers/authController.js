const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');


module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if(candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

           res.status(200).json({
               token: `Bearer ${token}`,
               userId: candidate._id,
           })

        } else {
            res.status(401).json({
                message: 'Passwords dont match. Try again'
            })
        }

    } else {
        res.status(404).json({
            message: 'User with this email not found'
        })
    }

}

module.exports.register = async function(req, res) {

      const candidate = await User.findOne({email: req.body.email});

      if(candidate) {
          res.status(409).json({
             message: 'This email already exists'
          })
      } else {
         const salt = bcrypt.genSaltSync(10)
         const password = req.body.password
         const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            name: req.body.name,
            lastName: req.body.lastName,
            companyName: req.body.companyName
         })
         try {
            await user.save();
            res.status(201).json(user)
         } catch(err) {
             errorHandler()
         }

      }
}

module.exports.getUser = async function(req, res) {
    try {
        const user = await User.findOne({
            _id:req.params.id
        });
        res.status(200).json(user);
    } catch(err) {
        errorHandler(res, err);
    }
}
module.exports.updateUser = async function(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(user)
    } catch(err) {
        errorHandler(res, err);
    }
}

module.exports.changeUser = async function(req, res) {
    try {
        const user = await User.findOne({_id: req.params.id});
        const passwordResult = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (passwordResult) {
            const salt = bcrypt.genSaltSync(10);

            const {oldPassword, newPassword, ...updateData} = req.body;
            const newData = {...updateData, password: bcrypt.hashSync(req.body.newPassword, salt)}

            const updateUser = await User.updateOne(
                {_id: req.params.id},
              {$set: newData},
              {new: true}
            )
            res.status(200).json(updateUser)
        }

        else {
            res.status(401).json({
                message: 'Passwords don\'t match, try again'
            })
        }
    } catch(err) {
        errorHandler(res, err);
    }
}

