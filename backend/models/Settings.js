
const mongoose = require('../db/conn')
const { Schema } = mongoose

const Settings = mongoose.model(
    'Settings',
    new Schema({

        site_name: {
            type: String,
        },
        description: {
            type: String,
        },
        total_investors: {
            type: String,
        }
  }, { timestamps: true }),
)

module.exports = Settings

