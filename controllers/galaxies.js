import { Galaxy } from "../models/galaxy.js";
import { Profile } from "../models/profile.js";


function index(req, res) {
  Galaxy.find({})
  .populate('createdBy')
  .then(galaxies => {
    res.render('galaxies/index', {
      galaxies,
      title: "All Galaxies"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

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

function show(req, res) {
  Galaxy.findById(req.params.id)
    .populate('createdBy')
    .populate({path: 'planets', populate: {path: 'createdBy'}})  
    .then(galaxy => {
      if(req.user) {
      Galaxy.find({createdBy: req.user.profile._id})
        .then(galaxies => {
            res.render('galaxies/show', {
              galaxies,
              galaxy,
              title: "My Galaxy"
            })
          })
        } else {
            res.render('galaxies/show', {
            galaxy,
            title: "My Galaxy"
            })
         }
      })
    .catch(err => {
      console.log(err)
      res.redirect('/galaxies/mygalaxies')
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

function edit(req, res) {
  Galaxy.findById(req.params.id)
    .then(galaxy => {
      res.render('galaxies/edit', {
        galaxy,
        title: 'Edit Galaxy'
      })
    })
}

function update(req, res) {
  Galaxy.findByIdAndUpdate(req.params.id, req.body)
    .then(galaxy => {
      res.redirect('/galaxies/mygalaxies')
    })
    .catch(err => {
      console.log("the error:", err)
      res.redirect(`/galaxies/${req.params.id}/edit`)
    })
}

function deleteGalaxy(req, res) {
  Galaxy.findByIdAndDelete(req.params.id)
  .then(galaxy => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.galaxies.pop(galaxy._id)
      profile.save()
      res.redirect('/galaxies/mygalaxies')
      })
    })
  .catch(err => {
    console.log(err)
    res.redirect('/galaxies/mygalaxies')
    })
  }

  function addPlanet(req, res) {
    Galaxy.findById(req.body.galaxyId) 
      .then(galaxy => {
      galaxy.planets.push(req.params.id)
      galaxy.save()
      res.redirect(`/galaxies/${req.body.galaxyId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/planets')
        })
   }

   function removePlanet(req, res) {
    Galaxy.findById(req.params.galaxyId)
      .then(galaxy => {
        galaxy.planets.remove({_id: req.params.planetId})
        galaxy.save()
        res.redirect(`/galaxies/${req.params.galaxyId}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(`/galaxies/${req.params.galaxyId}`)
      })
   } 

export {
  index,
  newGalaxy as new,
  showMyGalaxies,
  show,
  create,
  deleteGalaxy as delete,
  edit,
  update,
  addPlanet,
  removePlanet
}


