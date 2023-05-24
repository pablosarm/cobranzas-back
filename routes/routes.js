const express = require('express');
const router = express.Router();

// Importar los controladores necesarios
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionController = require('../controllers/permissionController');
const roleController = require('../controllers/roleController');
const userController = require('../controllers/userController');

// Definir las rutas de autenticación
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.put('/auth/change-password', authMiddleware.authenticate, authController.changePassword);

// Definir las rutas de permisos
router.get('/permissions', authMiddleware.authenticate, permissionController.getAllPermissions);
router.get('/permissions/:id', authMiddleware.authenticate, permissionController.getPermissionById);
router.post('/permissions', authMiddleware.authenticate, permissionController.createPermission);
router.put('/permissions/:id', authMiddleware.authenticate, permissionController.updatePermission);
router.delete('/permissions/:id', authMiddleware.authenticate, permissionController.deletePermission);

// Definir las rutas de roles
router.get('/roles', authMiddleware.authenticate, roleController.getAllRoles);
router.get('/roles/:id', authMiddleware.authenticate, roleController.getRoleById);
router.post('/roles', authMiddleware.authenticate, roleController.createRole);
router.put('/roles/:id', authMiddleware.authenticate, roleController.updateRole);
router.delete('/roles/:id', authMiddleware.authenticate, roleController.deleteRole);
router.post('/roles/:roleId/permissions/:permissionId', authMiddleware.authenticate, roleController.assignPermissionToRole);
router.delete('/roles/:roleId/permissions/:permissionId', authMiddleware.authenticate, roleController.removePermissionFromRole);

// Ruta de usuarios
router.post('/users/assignRole', authMiddleware.authenticate, userController.assignRoleToUser);
router.put('/users/removeRole', authMiddleware.authenticate, userController.removeRoleFromUser);

// Exportar el enrutador
module.exports = router;
