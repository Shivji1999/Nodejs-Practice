const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})

//Creating User Model
const User = mongoose.model('User',{
    name: {
        type: String
    }, age: {
        type: Number
    }
})

//Creating Task Model
const Task = mongoose.model('Task',{
    description: { type: String }, 
    completed: { type: Boolean }
})

//Creating and saving user object
const shiv = new User({ name: 'Shiv', age: 22 })
shiv.save().then(()=>{ console.log(shiv) })
.catch((err)=>{ console.log('Error!',err) })

//Creating and saving task object
const t1 = new Task({ description: 123, completed: true })
t1.save().then(()=>{console.log(t1)})
.catch((err)=>{console.log('Error!',err)})

