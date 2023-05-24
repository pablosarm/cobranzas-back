const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false, unique: false }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
