const managerController = require("../controllers/manager.controller")
const router = require("express").Router()

router.post('/login', managerController.login)
router.post('/logout',managerController.authenticateToken, managerController.logout)
router.post('/searchMaterial',managerController.authenticateToken,managerController.searchMaterialInformation)
router.post('/supplierCategories',managerController.authenticateToken,managerController.getSupplierCategories)
router.post('/makeReport',managerController.authenticateToken,managerController.makeReport)
router.post('/supplier',managerController.authenticateToken,managerController.addSuppier)

router.get('/supplier',managerController.authenticateToken,managerController.getAllSupplier)
router.get('/fabric',managerController.authenticateToken,managerController.getAllFabric)
router.get('/import',managerController.authenticateToken,managerController.getAllImport)
router.get('/order',managerController.authenticateToken,managerController.getAllOrdering)
router.get('/bolt',managerController.authenticateToken,managerController.getAllBolt)
router.get('/customer',managerController.authenticateToken,managerController.getAllCustomer)
router.get('/employee',managerController.authenticateToken,managerController.getAllEmployee)



export default router