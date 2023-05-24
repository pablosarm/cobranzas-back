const Role = require('../models/Role');
const Permission = require('../models/Permission');

const roleController = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await Role.find();
            res.status(200).json(roles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },

    getRoleById: async (req, res) => {
        try {
            const roleId = req.params.id;
            const role = await Role.findById(roleId);
            if (!role) {
                return res.status(404).json({ error: 'Rol no encontrado' });
            }
            res.status(200).json(role);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },

    createRole: async (req, res) => {
        try {
            const { name, description } = req.body;
            const created_at = new Date();
            const role = await Role.create({ name, description, created_at });
            res.status(200).json({ message: 'Rol creado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },

    updateRole: async (req, res) => {
        try {
            const roleId = req.params.id;
            const { name, description } = req.body;
            const {updated_at} = new Date();
            const role = await Role.findByIdAndUpdate(roleId, { name, description, updated_at }, { new: true });
            if (!role) {
                return res.status(404).json({ error: 'Rol no encontrado' });
            }
            res.status(200).json({ message: 'Rol editado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },

    deleteRole: async (req, res) => {
        try {
            const roleId = req.params.id;
            const role = await Role.findByIdAndDelete(roleId);
            if (!role) {
                return res.status(404).json({ error: 'Rol no encontrado' });
            }
            res.status(204).json({ message: 'Rol eliminado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },

    assignPermissionToRole: async (req, res) => {
        try {
            const roleId = req.params.roleId;
            const permissionId = req.params.permissionId;

            const role = await Role.findById(roleId);
            const permission = await Permission.findById(permissionId);

            if (!role || !permission) {
                return res.status(404).json({ error: 'Rol o permiso no encontrado' });
            }

            role.permissions.push(permissionId);
            await role.save();

            res.status(200).json({ message: 'Permiso asignado al rol con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },

    removePermissionFromRole: async (req, res) => {
        try {
            const roleId = req.params.roleId;
            const permissionId = req.params.permissionId;

            const role = await Role.findById(roleId);
            const permission = await Permission.findById(permissionId);

            if (!role || !permission) {
                return res.status(404).json({ error: 'Rol o permiso no encontrado' });
            }

            // Remover el permiso de la lista de permisos del rol
            const index = role.permissions.indexOf(permissionId);
            if (index !== -1) {
                role.permissions.splice(index, 1);
                await role.save();
            }

            res.status(200).json({ message: 'Permiso removido del rol con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },
};

module.exports = roleController;