const managerController = require("../controllers/manager.controller")
const router = require("express").Router()

router.post('/login', managerController.login)
router.post('/logout',managerController.isLogin, managerController.logout)
router.get('/searchMaterial',managerController.isLogin,managerController.searchMaterialInformation)
router.get('/supplierCategories',managerController.isLogin,managerController.getSupplierCategories)
router.post('/makeReport',managerController.isLogin,managerController.makeReport)
router.post('/supplier',managerController.isLogin,managerController.addSuppier)

router.get('/supplier',managerController.isLogin,managerController.getAllSupplier)
// router.get('/category',managerController.isLogin,managerController.getAllCategory)
// router.get('/import',managerController.isLogin,managerController.getAllImport)

export default router