import { Router } from "express";
import * as galaxiesCtrl from '../controllers/galaxies.js'


const router = Router()


router.get('/mygalaxies', galaxiesCtrl.showMyGalaxies)


export {
  router
}