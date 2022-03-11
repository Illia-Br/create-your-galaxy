import { Planet } from "../models/planet.js"
import { Profile } from '../models/profile.js'
import { Galaxy } from '../models/galaxy.js'


function index(req, res) {
  Planet.find({})
  .populate('createdBy')
  .then(planets => {
    if (req.user) {
    Galaxy.find({createdBy: req.user.profile._id})
     .then(galaxies => {
      res.render('planets/index', {
        galaxies,
        planets,
        title: "All Planets"
      })
    })} else {
      res.render('planets/index', {
        planets,
        title: "All Planets"
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function showMyPlanets(req, res) {
  Planet.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(planets => {
      Galaxy.find({createdBy: req.user.profile._id})
       .then(galaxies => {
        res.render('planets/myplanets', {
          galaxies,
          planets,
          title: "My Space Objects"
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}


function newPlanet(req, res) {
  res.render('planets/new', {title: 'New Space Object'})
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


function deletePlanet(req, res) {
    Planet.findByIdAndDelete(req.params.id)
    .then(planet => {
      Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.planets.pop(planet._id)
        profile.save()
        res.redirect('/planets/myplanets')
        })
      })
    .catch(err => {
      console.log(err)
      res.redirect('/planets/myplanets')
      })
    }

function edit(req, res) {
  Planet.findById(req.params.id)
    .then(planet => {
      res.render('planets/edit', {
        planet,
        title: 'Edit Planet'
      })
    })
}

function update(req, res) {
  req.body.shared = !!req.body.shared
  Planet.findByIdAndUpdate(req.params.id, req.body)
    .then(planet => {
      res.redirect('/planets/myplanets')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`/planets/${req.params.id}/edit`)
    })
}

export {
  index,
  newPlanet as new,
  create,
  showMyPlanets,
  deletePlanet as delete,
  edit,
  update
}