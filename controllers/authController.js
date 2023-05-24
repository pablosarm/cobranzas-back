const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const { validatePassword } = require('../utils/passwordUtils');

const authController = {
  register: async (req, res) => {
    try {
      const { name, lastname, password, email } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
      }

      // Verificar si todos los campos requeridos están presentes
      if (!name || !lastname || !password || !email) {
        return res.status(400).json({ error: 'Por favor, proporciona todos los campos requeridos' });
      }

      // Validar el formato y los requisitos del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El correo electrónico proporcionado no es válido' });
      }

      // Validar la complejidad de la nueva contraseña
      const isPasswordValid = validatePassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({
          error: 'La nueva contraseña debe tener al menos 6 caracteres, incluyendo una letra mayúscula y un símbolo válido',
        });
      }

      // Crear una instancia del modelo de usuario
      const user = new User({
        name,
        lastname,
        password,
        email,
        created_at: new Date(), // Establecer la fecha de creación como la fecha actual
      });

      // Generar el hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      // Asignar la contraseña hasheada al usuario
      user.password = hashedPassword;

      // Guardar el usuario en la base de datos
      await user.save();

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Verificar si el correo electrónico y la contraseña están presentes
      if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, proporciona el correo electrónico y la contraseña' });
      }

      // Verificar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Credenciales inválidas' });
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar el token JWT
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '24h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { password, new_password, repeat_password } = req.body;

      // Verificar si todos los campos requeridos están presentes
      if (!password || !new_password || !repeat_password) {
        return res.status(400).json({ error: 'Por favor, proporciona todos los campos requeridos' });
      }

      // Validar que las contraseñas nuevas coincidan
      if (new_password !== repeat_password) {
        return res.status(400).json({ error: 'Las nuevas contraseñas no coinciden' });
      }

      // Validar la complejidad de la nueva contraseña
      const isPasswordValid = validatePassword(new_password);
      if (!isPasswordValid) {
        return res.status(400).json({
          error: 'La nueva contraseña debe tener al menos 6 caracteres, incluyendo una letra mayúscula y un símbolo válido',
        });
      }

      // Obtener el usuario actual
      const userId = req.user.userId;
      const user = await User.findById(userId);

      // Verificar la contraseña actual
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
      }

      // Generar el hash de la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(new_password, salt);

      // Actualizar la contraseña del usuario en la base de datos
      user.password = hashedPassword;
      user.updated_at = new Date();
      await user.save();

      res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
  }

};

module.exports = authController;

