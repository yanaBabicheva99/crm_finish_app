const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Token = require('../models/Token');
const User = require('../models/User');

module.exports.saveToken = async function(userId, refreshToken) {
  const tokenData = await Token.findOne({
    user: userId
  })

  if (tokenData){
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await Token.create({
    user: userId,
    refreshToken
  })
  return token;
}

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, keys.jwtRefresh);
    return userData;
  } catch(err) {
    return null;
  }
}

module.exports.refreshToken = async function(refreshToken) {
  if (!refreshToken) {
    throw new Error('The user is not Authorized');
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await Token.findOne({refreshToken});

  if (!userData || ! tokenFromDb) {
    throw  new Error('The user is not Authorized');
  }

  const user = await User.findById(userData.userId);

  const accessTokenNew = jwt.sign({
    email: user.email,
    userId: user._id
  }, keys.jwtAccess, {expiresIn: 60 * 60});

  const refreshTokenNew = jwt.sign({
    email: user.email,
    userId: user._id,
  }, keys.jwtRefresh, {expiresIn: 30 * 24 * 60 * 60 * 1000});

  await this.saveToken(user._id, refreshTokenNew);

  return {
    accessToken: accessTokenNew,
    refreshToken: refreshTokenNew,
    userId: user._id,
  }
}

module.exports.removeToken = async function(refreshToken) {
  const tokenData = await Token.deleteOne({refreshToken});
  return tokenData;
}