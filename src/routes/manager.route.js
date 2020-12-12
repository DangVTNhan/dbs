const managerController = require("../controllers/manager.controller")
const router = require("express").Router()

router.post('/login', managerController.login)
router.post('/logout',managerController.authenticateToken, managerController.logout)
router.get('/searchMaterial',managerController.authenticateToken,managerController.searchMaterialInformation)
router.get('/supplierCategories',managerController.authenticateToken,managerController.getSupplierCategories)
router.post('/makeReport',managerController.authenticateToken,managerController.makeReport)
router.post('/supplier',managerController.authenticateToken,managerController.addSuppier)

router.get('/supplier',managerController.authenticateToken,managerController.getAllSupplier)
// router.get('/category',managerController.authenticateToken,managerController.getAllCategory)
// router.get('/import',managerController.authenticateToken,managerController.getAllImport)

export default router