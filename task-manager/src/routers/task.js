const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        author: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
         await req.user.populate('tasks')
        // const tasks = await Task.find({"author": req.user._id})
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, "author": req.user.id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({_id: req.params.id, "author": req.user._id})
        
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, "author": req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router