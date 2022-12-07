const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  refreshToken: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tokens', tokenSchema);