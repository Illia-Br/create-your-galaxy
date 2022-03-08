import { Router } from "express"
import * as planetsCtrl from '../controllers/planets.js'

const router = Router()

router.get('/new', planetsCtrl.new)

router.get('/myplanets', planetsCtrl.showMyPlanets)

router.post('/myplanets', planetsCtrl.create)

export {
  router
}