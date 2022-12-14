const tokenService = require('../services/tokenService');

module.exports.refresh = async function(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const userData = await tokenService.refreshToken(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(userData);
  } catch(err) {
    next(err);
  }
}
