import express from 'express';
import { getDataKamar } from './customer.js';
import { loginCostumer } from './login_customer.js';
import { registerCustomer } from './register_customer.js';

const authCustomerRouter=express.Router()
const authCustomerPath = "/auth-customer"

authCustomerRouter.post(authCustomerPath+"/login",loginCostumer);
authCustomerRouter.post(authCustomerPath+"/register",registerCustomer);
authCustomerRouter.get("/customer-kamar",getDataKamar)

export default authCustomerRouter