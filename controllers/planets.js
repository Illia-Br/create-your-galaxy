import { Planet } from "../models/planet.js"


function newPlanet(req, res) {
  res.render('planets/new', {title: 'New Planet'})
}



export {
  newPlanet as new
}