import { Router } from "express";
import * as galaxiesCtrl from '../controllers/galaxies.js'
import { isLoggedIn } from "../middleware/middleware.js";


const router = Router()


router.get('/mygalaxies', galaxiesCtrl.showMyGalaxies)

router.get('/new', isLoggedIn,  galaxiesCtrl.new)

router.post('/mygalaxies', galaxiesCtrl.create)


router.delete('/:id', galaxiesCtrl.delete)

export {
  router
}