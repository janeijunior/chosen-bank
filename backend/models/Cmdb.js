const mongoose = require('../db/conn')
const { Schema } = mongoose

const Cmdb = mongoose.model(
  'Cmdb',
  new Schema({
    name: {
      type: String,
      required: true,
    },
  
    description: {
      type: String,
    },
  }, {timestamps: true}),
)

module.exports = Cmdb
