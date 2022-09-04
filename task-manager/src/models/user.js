const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        unique: true,
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
    }, avatar: {
        type: Buffer
    }, tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

//Setting tasks for users Virtually
userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

//for hiding data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    if(userObject.avatar){
        delete userObject.avatar
    } 

    return userObject
}

//for generating token
userSchema.methods.generateToken = async function (){
    const user = this
    const token =  jwt.sign({ "_id": user._id.toString()}, "SECRET")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//for logging in users
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Username or Password Incorrect")
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if(!isMatch){
        throw new Error("Username or Password Incorrect")
    }

    return user
}

//for securing passwords
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function(next){
    const user = this

    await Task.deleteMany({author: user._id})

    next()
})

const User = mongoose.model('User',userSchema)



module.exports = User