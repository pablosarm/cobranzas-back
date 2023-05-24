const Permission = require('../models/Permission');

const permissionController = {
    getAllPermissions: async (req, res) => {
        try {
            const permissions = await Permission.find();
            res.status(200).json(permissions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor.' });
        }
    },

    getPermissionById: async (req, res) => {
        try {
            const permissionId = req.params.id;
            const permission = await Permission.findById(permissionId);
            if (!permission) {
                return res.status(404).json({ error: 'Permiso no encontrado.' });
            }
            res.status(200).json({ permission });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor.' });
        }
    },

    createPermission: async (req, res) => {
        try {
            const { name, description } = req.body;
            const created_at = new Date();
            const permission = await Permission.create({ name, description, created_at });
            res.status(200).json({ message: 'Permiso creado con éxito.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor.' });
        }
    },

    updatePermission: async (req, res) => {
        try {
            const permissionId = req.params.id;
            const { name, description } = req.body;

            const permission = await Permission.findByIdAndUpdate(permissionId, { name, description }, { new: true });
            if (!permission) {
                return res.status(404).json({ error: 'Permiso no encontrado.' });
            }
            res.status(200).json({message: 'Permiso editado con éxito.'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor.' });
        }
    },

    deletePermission: async (req, res) => {
        try {
            const permissionId = req.params.id;
            const permission = await Permission.findByIdAndDelete(permissionId);
            if (!permission) {
                return res.status(404).json({ error: 'Permiso no encontrado' });
            }
            res.status(204).json({message: 'Permiso eliminado con éxito.'} );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor.' });
        }
    },
};

module.exports = permissionController;
