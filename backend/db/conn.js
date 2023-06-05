require('dotenv').config()
const mongoose = require('mongoose')

async function main() {
  //await mongoose.connect(`${process.env.DB_LOCAL_URL}`)
  //await mongoose.connect('mongodb://127.0.0.1:27017/heimdall')
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}${process.env.DB_HOST}`)
  console.log('Conectou ao banco!')
}

main().catch((err) => console.log(err))

module.exports = mongoose

