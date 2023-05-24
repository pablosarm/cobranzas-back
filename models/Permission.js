const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
