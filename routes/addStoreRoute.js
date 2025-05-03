const express = require('express');
const Store = require('../model/store')
const router = express.Router();


router.post('/addStore', async (req, res) => {
    const { name, storeCode, address, zipcode, city, state, clientId, storeManagerId }= req.body;

    if (!name || !storeCode || !address || !zipcode || !city || !state || !clientId || !storeManagerId) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const existingStore = await Store.findOne({ storeCode })

    if (existingStore) {
        return res.status(400).json({ message: "Store already exists" })
    }
    try {
        const newStore = new Store({
            name,
            storeCode,
            address,
            zipcode,
            city,
            state,
            clientId,
            storeManagerId

        })
        await newStore.save();
        res.status(201).json({
            message: 'Store added successfully',
            store: {
                id: newStore._id,
                name: newStore.name,
                storeCode: newStore.storeCode,
                address: newStore.address,
                zipcode: newStore.zipcode,
                city: newStore.city,
                state: newStore.state,
                clientId: newStore.clientId,
                storeManagerId: newStore.storeManagerId
            }
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).send({
                message: 'Validation failed',
                errors: messages
            });
        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).send({
                message: `Duplicate value: ${field} already exists`
            })
        }
        res.status(500).send({ message: error.message || 'Server error' })
    }
})


router.get('/stores', async (req, res) => {
    try {
        const stores = await Store.find()
        .populate('storeManagerId', 'name')
        .populate('clientId','clientName');
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

module.exports = router;
