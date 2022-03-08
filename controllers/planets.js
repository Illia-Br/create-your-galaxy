import { Planet } from "../models/planet.js"
import { Profile } from '../models/profile.js'


function showMyPlanets(req, res) {
  Planet.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(planets => {
      res.render('planets/myplanets', {
        planets,
        title: 'My planets'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}


function newPlanet(req, res) {
  res.render('planets/new', {title: 'New Planet'})
}


  function create(req, res) {
    req.body.createdBy = req.user.profile._id
    req.body.shared = !!req.body.shared
    Planet.create(req.body)
      .then(planet => {
        Profile.findById(req.user.profile._id)
          .then(profile => {
            profile.planets.push(planet._id)
            profile.save()
            res.redirect('/planets/myplanets')
            })
          })
      .catch(err => {
      console.log(err)
      res.redirect('/planets/new')
      })
  }



export {
  newPlanet as new,
  create,
  showMyPlanets
}