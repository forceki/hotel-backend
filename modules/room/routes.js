import express from 'express';
import { authenticationCheck } from '../../middleware/auth.js';
import { createJenisKamar, createKamar, deleteJenisKamar, deletekamar, getJenisKamar, getKamar, getInventory, editJenisKamar, editKamar, getKamarId, editInventory, deleteInventory, createInventory, getJenisKamarById, getKamarByJenis } from './kamar.js';
import multer from 'multer'

const roomRouter=express.Router();

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };
  
const storage = multer.diskStorage({
    destination: "./resources/kamar/",
    filename:(req,file,cb) =>{
        return cb(
            null,
            `kamar_${Date.now()}${path.extname(file.originalname)}`
        );
    },
})

const upload = multer ({
    storage:storage,
    fileFilter: imageFilter
});




const modulePath="/services"

roomRouter.get(modulePath+"/kamar",getKamar)
roomRouter.post(modulePath+"/kamar",createKamar)
roomRouter.put(modulePath+"/kamar",editKamar)
roomRouter.delete(modulePath+"/kamar",deletekamar)
roomRouter.get(modulePath+"/kamar/one",getKamarId)
roomRouter.get(modulePath+"/kamar/jenis",getKamarByJenis)

roomRouter.put(modulePath+"/kamar-detail",editInventory)
roomRouter.get(modulePath+"/kamar-detail",getInventory)
roomRouter.delete(modulePath+"/kamar-detail",deleteInventory)
roomRouter.post(modulePath+"/kamar-detail",createInventory)

roomRouter.get(modulePath+"/jenis-kamar",getJenisKamar)
roomRouter.get(modulePath+"/jenis-kamar/one",getJenisKamarById)
roomRouter.put(modulePath+"/jenis-kamar",editJenisKamar)
roomRouter.post(modulePath+"/jenis-kamar",createJenisKamar)
roomRouter.delete(modulePath+"/jenis-kamar",deleteJenisKamar)

export default roomRouter;  
