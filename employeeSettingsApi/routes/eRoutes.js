const express = require('express');
const router = express.Router();
const employeeController =
    require('../controllers/employeeControllers')
const employeeValidator = require('../validators/employeeValidators')

router.post('/settings', employeeValidator.validateEmployeeSettings,
    employeeController.createEmployeeSettings
);

router.put('/settings',
    employeeValidator.validateEmployeeSettings,
    employeeController.createEmployeeSettings
)

router.get('/settings', employeeController.getAllEmployeeSettings);

router.get('/settings/:employeeId',
    employeeController.getEmployeeSettingsById
);
router.delete('/settings/:employeeId',
    employeeController.deleteEmployeeSettings
)
module.exports = router;