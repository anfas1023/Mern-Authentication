const express = require('express');
const router = express.Router();
const upload = require('../utils/multer'); 
const userController = require('../controllers/userControl');
const verifyToken=require('../utils/verifyToken')
router.post('/updateimage', upload.single('file'), userController.uploadImage);
router.post('/updateuser/:id',verifyToken,userController.userProfileUpdate);
router.delete('/delete/:id',verifyToken,userController.deleteUser)

module.exports = router;
