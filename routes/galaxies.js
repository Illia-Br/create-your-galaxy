import { Router } from "express";
import * as galaxiesCtrl from '../controllers/galaxies.js'
import { isLoggedIn } from "../middleware/middleware.js";


const router = Router()


router.get('/mygalaxies', galaxiesCtrl.showMyGalaxies)

router.get('/new', isLoggedIn,  galaxiesCtrl.new)

export {
  router
}