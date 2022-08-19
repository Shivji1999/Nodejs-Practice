const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true
})

//Creating User Model
const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        required: true,
        trim: true,
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    }, password: {
        type: String,
        required: true,
        minLength: [7,'Password must be greater than 6 character.'],
        validate (value) {
            if(value.includes('password')){
                throw new Error('Password must not contain password in it.')
            }
        }
    }, age: {
        type: Number,
        default: 0
    }
})

//Creating Task Model
const Task = mongoose.model('Task',{
    description: { type: String, required: true, trim: true }, 
    completed: { type: Boolean, default: false }
})

//Creating and saving user object
// const shiv = new User({ name: 'Shiv', email: 'shiv@abc.com', password: '123456'})
// shiv.save().then(()=>{ console.log(shiv) })
// .catch((err)=>{ console.log('Error!',err) })

//Creating and saving task object
const t1 = new Task({
    description: "To clean house"
 })
t1.save().then(()=>{console.log(t1)})
.catch((err)=>{console.log('Error!',err)})

