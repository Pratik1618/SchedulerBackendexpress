  const mongoose = require('mongoose');

  const storeSchema = new mongoose.Schema({
      name: { type: String, required: true },
      storeCode: { type: String },
      address: { type: String },
      zipcode: { type: Number },
      city: { type: String },
      state: { type: String },
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
      storeManagerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // <-- Reference to User model
    });

    module.exports = mongoose.model('Store', storeSchema);