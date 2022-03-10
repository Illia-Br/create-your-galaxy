import { Router } from "express";
import * as galaxiesCtrl from '../controllers/galaxies.js'
import { isLoggedIn } from "../middleware/middleware.js";


const router = Router()

router.get('/', galaxiesCtrl.index)

router.get('/mygalaxies',isLoggedIn, galaxiesCtrl.showMyGalaxies)

router.get('/new', isLoggedIn,  galaxiesCtrl.new)

router.get('/:id', galaxiesCtrl.show)

router.get('/:id/edit',isLoggedIn, galaxiesCtrl.edit)

router.post('/mygalaxies',isLoggedIn, galaxiesCtrl.create)

router.post('/:id/planets',isLoggedIn, galaxiesCtrl.addPlanet)

router.put('/:id', galaxiesCtrl.update)

router.delete('/:id',isLoggedIn, galaxiesCtrl.delete)

router.delete('/:galaxyId/planets/:planetId',isLoggedIn, galaxiesCtrl.removePlanet)

export {
  router
}