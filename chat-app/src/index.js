const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', ()=>{
    console.log('Setup socket Connection')
})

server.listen(3000, ()=>{
    console.log('Server Started')
})