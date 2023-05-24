const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  lastname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  created_at: {type: Date, required: true},
  updated_at: {type: Date, required: false},
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }, // Referencia al rol del usuario
  // Otros campos del usuario, si los necesitas

});

const User = mongoose.model('Users', userSchema);

module.exports = User;
