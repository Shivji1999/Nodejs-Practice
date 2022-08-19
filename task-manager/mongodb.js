const {MongoClient,ObjectId} = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error,client)=>{
    if(error){
        return console.log(error)
    }
    const db = client.db(databaseName)
    // db.collection('tasks').findOne({_id: new ObjectId('62fcc02660407e2eac907341')}, (error,task)=>{
    //     if(error){
    //         return console.log('Unable to find!')
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error,res)=>{
    //     if(error){
    //         return console.log('Unable to find!')
    //     }
    //     console.log(res)
    // })

    db.collection('tasks').updateMany({
        completed: false
    },{
        $set: {
            completed: true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
})