'use strict';

const Gallery = require('../model/gallery.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/.baearer-auth-middleware.js');

module.exports = router => {
  router.route('/gallery/:id?')
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {
    //checking for user in my reque3st
      req.body.userId = req.user._id;
      return new Gallery(req.body).save()
        .then(createdGallery => res.status(201).json(createdGallery))
        .catch (err=> errorHandler(err, res));
    })
    .get(bearerAuthMiddleware, (req, res) => {
      //returns one gallery
      if(req.params._id) {
        return Gallery.findById(req.params._id)
          .then(gallery => res.status(200).json(gallery))
          .catch(err => errorHandler(err, res));
      }
      return Gallery.find()
        .then(galleries => {
          let galleriesIds = galleries.map(gallery => gallery._id);
          
        });
    });
};