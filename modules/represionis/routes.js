import express from 'express';
import { authenticationCheck } from '../../middleware/auth.js';
import { getRepresionis, pemesananKamarByCustomer, pemesananKamarByRep } from './represionis.js';


const represionisRouter=express.Router();


represionisRouter.get("/represionis",authenticationCheck,getRepresionis)
represionisRouter.get("/represionis/v2",authenticationCheck,pemesananKamarByRep)
represionisRouter.get("/customer",authenticationCheck,pemesananKamarByCustomer)



export default represionisRouter