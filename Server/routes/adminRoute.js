const express =require('express');
const router=express.Router();
const adminController=require('../controllers/admin/adminController')

router.post('/adminlogin',adminController.adminLogin);
router.get('/getUserData',adminController.fetchAllUser);
router.get('/fetchOneUser/:userId',adminController.fetchOneUser);
router.post('/adminedituser/:userid',adminController.adminedituser);
router.delete('/deleteUser/:userId',adminController.deleteUser);
router.post('/createuser',adminController.adminCreateUser)
router.get('/adminLogeedIn',adminController.getLoggedInAdmin);
router.get('/adminlogout',adminController.Adminlogout)
module.exports=router