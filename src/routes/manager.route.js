const managerController = require("../controllers/manager.controller")
const router = require("express").Router()


router.post('/login', managerController.login)
router.post('/logout',managerController.isLogin, managerController.logout)
router.get('/searchMaterial',managerController.isLogin,managerController.searchMaterialInformation)
router.get('/supplierCategories',managerController.isLogin,managerController.getSupplierCategories)
router.post('/makeReport',managerController.isLogin,managerController.makeReport)
router.post('/suppier',managerController.isLogin,managerController.addSuppier)

export default router