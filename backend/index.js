const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON response
app.use(express.json())

// Resolve o problema de cors Solve CORS
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
const PetRoutes = require('./routes/PetRoutes')
const UserRoutes = require('./routes/UserRoutes')
const CmdbRoutes = require('./routes/CmdbRoutes')

app.use('/pets', PetRoutes)

app.use('/cmdb', CmdbRoutes)

app.use('/users', UserRoutes)

app.listen(5000)
