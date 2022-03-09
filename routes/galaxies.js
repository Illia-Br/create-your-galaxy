import { Router } from "express";
import * as galaxiesCtrl from '../controllers/galaxies.js'
import { isLoggedIn } from "../middleware/middleware.js";


const router = Router()

router.get('/', galaxiesCtrl.index)

router.get('/mygalaxies', galaxiesCtrl.showMyGalaxies)

router.get('/:id', galaxiesCtrl.show)

router.get('/new', isLoggedIn,  galaxiesCtrl.new)

router.get('/:id/edit', galaxiesCtrl.edit)

router.post('/mygalaxies', galaxiesCtrl.create)

router.post('/:id/planets', galaxiesCtrl.addPlanet)

router.put('/:id', galaxiesCtrl.update)

router.delete('/:id', galaxiesCtrl.delete)

export {
  router
}