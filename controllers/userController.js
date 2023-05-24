const User = require('../models/User');

const userController = {
    assignRoleToUser: async (req, res) => {
        try {
            const { userId, roleId } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const role = await Role.findById(roleId);
            if (!role) {
                return res.status(404).json({ error: 'Rol no encontrado' });
            }

            user.role = role._id;
            await user.save();

            res.status(200).json({ message: 'Rol asignado al usuario con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },
    removeRoleFromUser: async (req, res) => {
        try {
            const { userId, roleId } = req.body;

            // Verificar si el usuario y el rol existen
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const role = await Role.findById(roleId);
            if (!role) {
                return res.status(404).json({ error: 'Rol no encontrado' });
            }

            // Remover el rol del usuario
            const index = user.roles.indexOf(roleId);
            if (index > -1) {
                user.roles.splice(index, 1);
                await user.save();
            }

            res.status(200).json({ message: 'Rol removido del usuario con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
        }
    },

};

module.exports = userController;
