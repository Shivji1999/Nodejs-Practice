const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User