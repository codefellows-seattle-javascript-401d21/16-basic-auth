'use strict'

const mongoose = require('mongoose')
const Gallery = mongoose.Schema({})

module.exports = mongoose.model('gallerie', Gallery) //mongoose adds an 's' when epxorting so thats we we have 'gallerie'