const Tasks = require('../models/taskModel')


const getAllTasks = async (req, res) => {
    const data = await Tasks.find({})
    const filteredUser = data.filter(el => !el._isDeleted)
        .map(el => {
            return {
                _id: el._id,
                title: el.title,
                status: el.status
            }
        })
    res.json(filteredUser)
}

const addTask = async (req, res) => {
    try {
        const newTask = new Tasks({
            title: req.body.title
        })
        const savedTask = await newTask.save()
        res.json(savedTask)
    } catch (e) {
        res.status(401).json({message: "Ошибка сохранения!"})
    }

}

const deleteTask = async (req, res) => {
    const deletedTask = await Tasks.findOneAndUpdate(
        {_id: req.params.id},
        {_isDeleted: true, _deletedAt: +new Date()},
        {new: true})
    res.json(deletedTask)
}

const updateTask = async (req, res) => {
    const id = req.params.id
    const status = req.body.status
    const statusOptions = ['done', 'new', 'in progress', 'blocked']
    if (statusOptions.includes(req.body.status)) {
        const updateStatusTask = await Tasks.findOneAndUpdate({_id: id}, {status}, {new: true})
        res.json(updateStatusTask)
    } else {
        res.status(501).json({"status": "error", "message": "incorrect status"})
    }
}

const getByTime = async (req, res) => {
    const data = await Tasks.find({})
    const timeSpan = {
        'day': 1000 * 60 * 60 * 24,
        'week': 1000 * 60 * 60 * 24 * 7,
        'month': 1000 * 60 * 60 * 24 * 30
    }
    const filteredData = data.filter(item => +new Date() - item._createdAt < timeSpan[req.params.timespan]).map(el => {
        return {
            _id: el._id,
            title: el.title,
            status: el.status
        }
    })
    res.json(filteredData)
}


module.exports = {
    getAllTasks,
    getByTime,
    addTask,
    deleteTask,
    updateTask
}