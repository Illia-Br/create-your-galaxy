import { Router } from "express"
import * as planetsCtrl from '../controllers/planets.js'

const router = Router()

router.get('/new', planetsCtrl.new)


export {
  router
}