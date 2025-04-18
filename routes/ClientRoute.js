const express = require('express');
const Client = require('../model/client')
const router = express.Router();


router.post('/createClient', async (req, res) => {
    const { clientName } = req.body;

    if (!clientName) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    const existingClient = await Client.findOne({ clientName });

    if (existingClient) {
        return res.status(400).json({ message: 'Client already exists' });
    }
    try {
        const newClient = new Client({
            clientName
        });

        await newClient.save();

        res.status(201).json({
            message: 'Client registered successfully',
            client: {
                id: newClient._id,
                clientName: newClient.clientName
            }
        });
    } catch (error) {
        console.log(error)
    }
})

router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;