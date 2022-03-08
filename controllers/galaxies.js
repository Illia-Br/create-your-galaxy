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

export {
  newGalaxy as new,
  showMyGalaxies
}


