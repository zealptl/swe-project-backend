import express from 'express';
import { getOrders } from './controllers/OrderControllers/getOrders';
import { createOrder } from './controllers/OrderControllers/createOrder';
import { cookOrder } from './controllers/OrderControllers/cookOrder';
import { deliverOrder } from './controllers/OrderControllers/deliverOrder';


const router = express.Router();
router.get('/', getOrders);
router.post('/', createOrder);
router.patch('/cook/:orderId', cookOrder);
router.patch('/deliver/:orderId', deliverOrder);

export default router;