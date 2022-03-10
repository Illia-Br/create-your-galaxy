import { Router } from "express"
import * as planetsCtrl from '../controllers/planets.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

router.get('/', planetsCtrl.index)

router.get('/new',isLoggedIn, planetsCtrl.new)

router.get('/:id/edit', planetsCtrl.edit)

router.get('/myplanets',isLoggedIn, planetsCtrl.showMyPlanets)

router.post('/myplanets',isLoggedIn, planetsCtrl.create)

router.put('/:id', planetsCtrl.update)

router.delete('/:id', planetsCtrl.delete)

export {
  router
}