const express = require('express');
const Schedule = require('../model/schedule');
const ticketGenerator = require('../utils/ticketGenerator');
const router = express.Router();
const adminAuthMiddleware = require('../authMiddleware/adminAuthMiddleware')

router.post('/createSchedule', adminAuthMiddleware, async (req, res) => {
    try {
        const { storeId, technicianId, scheduleType, scheduleDate } = req.body;
        if (!storeId || !technicianId || !scheduleType || !scheduleDate) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const ticketNo = ticketGenerator();
        const newSchedule = new Schedule({
            ticketNo,
            storeId,
            technicianId,
            scheduleType,
            scheduleDate
        });
        await newSchedule.save();
        res.status(201).json({
            message: 'Schedule created successfully',
            data: newSchedule
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find().populate({ path: 'storeId', populate: { path: 'clientId', select: 'clientName' } }).populate('technicianId').sort({ scheduleDate: -1 });
        res.status(200).json(schedules);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;