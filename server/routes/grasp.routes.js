import express from 'express'
import graspController from '../controllers/grasp.controller'

const router = express.Router()

router.route('/api/grasps')
  .get(graspController.list)
  .post(graspController.create)
  
export default router
