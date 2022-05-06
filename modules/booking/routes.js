import express from 'express';
import { authenticationCheck } from '../../middleware/auth.js';
import { createBookingRoom, createPemesananKamar, createPemesananKamarV2, deleteBookingRoom, getBookingRoom, getPemesananKamar, updateBookingRoom } from './booking_room.js';

const bookingRouter=express.Router();

const modulePath="/hotel"

// bookingRouter.use(authenticationCheck)

bookingRouter.get(modulePath+"/kamar",getBookingRoom)
bookingRouter.post(modulePath+"/kamar",createBookingRoom)
bookingRouter.put(modulePath+"/kamar/:id",updateBookingRoom)
bookingRouter.delete(modulePath+"/kamar/:id",deleteBookingRoom)

bookingRouter.get(modulePath+"/pesan-kamar",getPemesananKamar)
bookingRouter.post(modulePath+"/pesan-kamar",authenticationCheck,createPemesananKamar)
bookingRouter.post(modulePath+"/pesan-kamar/v2",authenticationCheck,createPemesananKamarV2)

export default bookingRouter