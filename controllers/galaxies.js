import { Galaxy } from "../models/galaxy.js";
import { Profile } from "../models/profile.js";


function newGalaxy(req, res) {
  res.render('galaxies/new', {title: 'New Galaxy'})
}

function showMyGalaxies(req, res) {
  Galaxy.find({createdBy: req.user.profile._id})
    .populate('createdBy')
    .then(galaxies => {
      res.render('galaxies/mygalaxies', {
        galaxies,
        title: 'My Galaxies'
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
}

function create(req, res) {
  req.body.createdBy = req.user.profile._id
  Galaxy.create(req.body)
    .then(galaxy => {
      Profile.findById(req.user.profile._id)
        .then(profile => {
          profile.galaxies.push(galaxy._id)
          profile.save()
          res.redirect('/galaxies/mygalaxies')
          })
        })
    .catch(err => {
    console.log(err)
    res.redirect('/galaxies/new')
    })
}

export {
  newGalaxy as new,
  showMyGalaxies,
  create
}


