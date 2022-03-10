import { Router } from "express"
import * as planetsCtrl from '../controllers/planets.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', planetsCtrl.index)

router.get('/new',isLoggedIn, planetsCtrl.new)

router.get('/:id/edit',isLoggedIn, planetsCtrl.edit)

router.get('/myplanets',isLoggedIn, planetsCtrl.showMyPlanets)

router.post('/myplanets',isLoggedIn, planetsCtrl.create)

router.put('/:id',isLoggedIn, planetsCtrl.update)

router.delete('/:id',isLoggedIn, planetsCtrl.delete)

export {
  router
}