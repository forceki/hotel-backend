import express from 'express';
import { authenticationCheck } from '../../middleware/auth.js';
import { createInventory, deleteInventory, getInventory } from './inventory.js';
import { createServiceHotel, deleteServiceHotel, editServiceHotel, getServiceHotel } from './services.js';



const inventoryRouter=express.Router()


inventoryRouter.get("/inventory-hotel",getInventory)
inventoryRouter.delete("/inventory-hotel",deleteInventory)
inventoryRouter.post("/inventory-hotel",createInventory)


inventoryRouter.get("/services-hotel",getServiceHotel)
inventoryRouter.post("/services-hotel",createServiceHotel)
inventoryRouter.delete("/services-hotel",deleteServiceHotel)
inventoryRouter.put("/services-hotel",editServiceHotel)

export default inventoryRouter